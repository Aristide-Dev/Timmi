<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Subject;
use App\Models\User;
use App\Models\Booking;

class ParentController extends Controller
{
    /**
     * Dashboard principal pour les parents
     */
    public function dashboard(Request $request)
    {
        $user = $request->user();
        
        $upcomingBookings = $user->bookingsAsParent()
            ->with(['teacher', 'child', 'subject'])
            ->upcoming()
            ->orderBy('class_date')
            ->orderBy('start_time')
            ->limit(5)
            ->get();

        $recentBookings = $user->bookingsAsParent()
            ->with(['teacher', 'child', 'subject', 'review'])
            ->past()
            ->orderBy('class_date', 'desc')
            ->limit(5)
            ->get();

        $stats = [
            'total_bookings' => $user->bookingsAsParent()->count(),
            'completed_classes' => $user->bookingsAsParent()->where('status', 'completed')->count(),
            'upcoming_classes' => $user->bookingsAsParent()->upcoming()->count(),
            'total_spent' => $user->payments()->completed()->sum('amount'),
        ];

        return Inertia::render('parent/dashboard', [
            'upcomingBookings' => $upcomingBookings,
            'recentBookings' => $recentBookings,
            'stats' => $stats,
            'children' => $user->children,
        ]);
    }

    /**
     * Rechercher des professeurs
     */
    public function searchTeachers(Request $request)
    {
        $request->validate([
            'subject_id' => 'nullable|exists:subjects,id',
            'level' => 'nullable|string',
            'zone' => 'nullable|string',
            'teaching_mode' => 'nullable|in:presentiel,en_ligne,both',
        ]);

        $query = User::where('role', 'teacher')
            ->where('status', 'active')
            ->with(['teacherProfile', 'subjects', 'reviewsReceived' => function($q) {
                $q->visible();
            }]);
            // Temporairement retiré pour debug: ->whereHas('teacherProfile', function($q) {
            //     $q->where('is_verified', true);
            // });

        // Filtrer par matière
        if ($request->subject_id) {
            $query->whereHas('subjects', function($q) use ($request) {
                $q->where('subjects.id', $request->subject_id);
            });
        }

        // Filtrer par niveau
        if ($request->level) {
            $query->whereHas('teacherProfile', function($q) use ($request) {
                $q->whereJsonContains('levels', $request->level);
            });
        }

        // Filtrer par zone
        if ($request->zone) {
            $query->whereHas('teacherProfile', function($q) use ($request) {
                $q->whereJsonContains('zones', $request->zone);
            });
        }

        // Filtrer par mode d'enseignement
        if ($request->teaching_mode && $request->teaching_mode !== 'both') {
            $query->whereHas('teacherProfile', function($q) use ($request) {
                $q->where('teaching_mode', $request->teaching_mode)
                  ->orWhere('teaching_mode', 'both');
            });
        }

        $teachers = $query->paginate(12);

        // S'assurer que les données sont bien structurées
        if (!$teachers) {
            $teachers = collect([])->paginate(12);
        }

        // Filtrer les professeurs sans profil après la pagination
        $teachers->getCollection()->transform(function ($teacher) {
            // S'assurer que le professeur a un profil
            if (!$teacher->teacherProfile) {
                $teacher->teacherProfile = (object) [
                    'bio' => 'Profil en cours de complétion',
                    'hourly_rate' => 5000,
                    'rating' => 4.0,
                    'total_reviews' => 0,
                    'total_hours' => 0,
                    'is_verified' => false,
                    'teaching_mode' => 'presentiel',
                    'zones' => ['Plateau'],
                    'levels' => ['Primaire', 'Collège']
                ];
            }
            
            // S'assurer que le professeur a des matières
            if (!$teacher->subjects) {
                $teacher->subjects = collect([]);
            }
            
            // S'assurer que le professeur a une ville
            if (!$teacher->city) {
                $teacher->city = 'Ville non spécifiée';
            }
            
            return $teacher;
        });

        return Inertia::render('parent/search-teachers', [
            'teachers' => $teachers,
            'subjects' => Subject::active()->ordered()->get(),
            'filters' => $request->only(['subject_id', 'level', 'zone', 'teaching_mode']),
        ]);
    }

    /**
     * Voir le profil d'un professeur
     */
    public function viewTeacher(User $teacher)
    {
        if ($teacher->role !== 'teacher') {
            abort(404);
        }

        $teacher->load([
            'teacherProfile',
            'subjects',
            'availabilities' => function($q) {
                $q->active();
            },
            'reviewsReceived' => function($q) {
                $q->visible()->with('parent')->latest();
            }
        ]);

        // S'assurer que le professeur a un profil
        if (!$teacher->teacherProfile) {
            $teacher->teacherProfile = (object) [
                'bio' => 'Profil en cours de complétion',
                'photo' => null,
                'diplomas' => [],
                'experiences' => [],
                'hourly_rate' => 5000,
                'rating' => 4.0,
                'total_reviews' => 0,
                'total_hours' => 0,
                'total_students' => 0,
                'is_verified' => false,
                'teaching_mode' => 'presentiel',
                'zones' => ['Plateau'],
                'levels' => ['Primaire', 'Collège']
            ];
        } else {
            // S'assurer que les propriétés sont bien des tableaux
            if (!isset($teacher->teacherProfile->experiences) || !is_array($teacher->teacherProfile->experiences)) {
                $teacher->teacherProfile->experiences = [];
            }
            if (!isset($teacher->teacherProfile->diplomas) || !is_array($teacher->teacherProfile->diplomas)) {
                $teacher->teacherProfile->diplomas = [];
            }
            if (!isset($teacher->teacherProfile->levels) || !is_array($teacher->teacherProfile->levels)) {
                $teacher->teacherProfile->levels = ['Primaire', 'Collège'];
            }
            if (!isset($teacher->teacherProfile->zones) || !is_array($teacher->teacherProfile->zones)) {
                $teacher->teacherProfile->zones = ['Plateau'];
            }
        }

        // S'assurer que le professeur a des matières
        if (!$teacher->subjects) {
            $teacher->subjects = collect([]);
        } else {
            // S'assurer que chaque matière a un pivot avec des spécialités
            $teacher->subjects = $teacher->subjects->map(function ($subject) {
                if (!$subject->pivot) {
                    $subject->pivot = (object) [
                        'specialties' => [],
                        'hourly_rate' => $teacher->teacherProfile->hourly_rate ?? 5000
                    ];
                } elseif (!isset($subject->pivot->specialties) || !is_array($subject->pivot->specialties)) {
                    $subject->pivot->specialties = [];
                }
                return $subject;
            });
        }

        // S'assurer que le professeur a des disponibilités
        if (!$teacher->availabilities) {
            $teacher->availabilities = collect([]);
        }

        // S'assurer que le professeur a des avis
        if (!$teacher->reviewsReceived) {
            $teacher->reviewsReceived = collect([]);
        }

        // S'assurer que le professeur a une ville
        if (!$teacher->city) {
            $teacher->city = 'Ville non spécifiée';
        }

        return Inertia::render('parent/view-teacher', [
            'teacher' => $teacher,
        ]);
    }

    /**
     * Gérer les enfants
     */
    public function children(Request $request)
    {
        $children = $request->user()->children()->get();

        return Inertia::render('parent/children', [
            'children' => $children,
        ]);
    }

    /**
     * Historique des réservations
     */
    public function bookings(Request $request)
    {
        $bookings = $request->user()->bookingsAsParent()
            ->with(['teacher', 'child', 'subject', 'payment', 'review'])
            ->orderBy('class_date', 'desc')
            ->orderBy('start_time', 'desc')
            ->paginate(10);

        return Inertia::render('parent/bookings', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Historique des paiements
     */
    public function payments(Request $request)
    {
        $payments = $request->user()->payments()
            ->with(['booking.teacher', 'booking.child', 'booking.subject'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $stats = [
            'total_paid' => $request->user()->payments()->completed()->sum('amount'),
            'pending_amount' => $request->user()->payments()->pending()->sum('amount'),
            'total_transactions' => $request->user()->payments()->count(),
        ];

        return Inertia::render('parent/payments', [
            'payments' => $payments,
            'stats' => $stats,
        ]);
    }
}
