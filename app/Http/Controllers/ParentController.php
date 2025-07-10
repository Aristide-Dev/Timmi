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
            }])
            ->whereHas('teacherProfile', function($q) {
                $q->where('is_verified', true);
            });

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
        if ($teacher->role !== 'teacher' || !$teacher->teacherProfile || !$teacher->teacherProfile->is_verified) {
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
}
