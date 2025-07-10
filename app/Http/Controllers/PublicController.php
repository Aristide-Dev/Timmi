<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    /**
     * Page d'accueil
     */
    public function home()
    {
        $subjects = Subject::active()->ordered()->limit(8)->get();
        $featuredTeachers = User::teachers()
            ->active()
            ->verified()
            ->withMinRating(4)
            ->with(['teacherProfile', 'subjects'])
            ->inRandomOrder()
            ->limit(6)
            ->get();
        
        return Inertia::render('welcome', [
            'subjects' => $subjects,
            'featuredTeachers' => $featuredTeachers,
        ]);
    }

    /**
     * Page À propos
     */
    public function about()
    {
        return Inertia::render('about');
    }

    /**
     * Page Comment ça marche
     */
    public function howItWorks()
    {
        return Inertia::render('how-it-works');
    }

    /**
     * Page FAQ
     */
    public function faq()
    {
        return Inertia::render('faq');
    }

    /**
     * Page Contact
     */
    public function contact()
    {
        return Inertia::render('contact');
    }

    /**
     * Page Devenir professeur
     */
    public function becomeTeacher()
    {
        return Inertia::render('become-teacher');
    }

    /**
     * Page Tarifs
     */
    public function pricing()
    {
        return Inertia::render('pricing');
    }

    /**
     * Page Sécurité
     */
    public function safety()
    {
        return Inertia::render('safety');
    }

    /**
     * Page Conditions d'utilisation
     */
    public function terms()
    {
        return Inertia::render('terms');
    }

    /**
     * Page Politique de confidentialité
     */
    public function privacy()
    {
        return Inertia::render('privacy');
    }

    /**
     * Page Politique des cookies
     */
    public function cookies()
    {
        return Inertia::render('cookies');
    }

    /**
     * Page Mentions légales
     */
    public function disclaimer()
    {
        return Inertia::render('disclaimer');
    }

    /**
     * Liste des professeurs avec filtres
     */
    public function teachers(Request $request)
    {
        $subjects = Subject::active()->ordered()->get();
        
        $teachersQuery = User::teachers()
            ->active()
            ->verified()
            ->with(['teacherProfile', 'subjects']);

        // Filtrer par recherche
        if ($request->filled('search')) {
            $search = $request->get('search');
            $teachersQuery->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhereHas('teacherProfile', function($query) use ($search) {
                      $query->where('bio', 'like', "%{$search}%");
                  });
            });
        }

        // Filtrer par matière
        if ($request->filled('subject')) {
            $teachersQuery->whereHas('subjects', function($q) use ($request) {
                $q->where('slug', $request->get('subject'));
            });
        }

        // Filtrer par ville
        if ($request->filled('city')) {
            $teachersQuery->where('city', $request->get('city'));
        }

        // Filtrer par tarif
        if ($request->filled('min_rate')) {
            $teachersQuery->whereHas('teacherProfile', function($q) use ($request) {
                $q->where('hourly_rate', '>=', $request->get('min_rate'));
            });
        }

        if ($request->filled('max_rate')) {
            $teachersQuery->whereHas('teacherProfile', function($q) use ($request) {
                $q->where('hourly_rate', '<=', $request->get('max_rate'));
            });
        }

        // Filtrer par note minimum
        if ($request->filled('min_rating')) {
            $teachersQuery->whereHas('teacherProfile', function($q) use ($request) {
                $q->where('rating', '>=', $request->get('min_rating'));
            });
        }

        // Récupérer les professeurs avec leurs profils
        $teachers = $teachersQuery->get();
        
        // Vérifier que les relations sont bien chargées
        $teachers = $teachers->map(function($teacher) {
            // S'assurer que le professeur a un profil
            if (!$teacher->teacherProfile) {
                // Charger le profil s'il existe mais n'a pas été chargé
                $teacher->load('teacherProfile');
            }
            
            // S'assurer que le professeur a des matières
            if (!$teacher->subjects || $teacher->subjects->isEmpty()) {
                // Charger les matières si elles existent mais n'ont pas été chargées
                $teacher->load('subjects');
            }
            
            return $teacher;
        });
        
        // Filtrer pour ne garder que les professeurs avec un profil et des matières
        $teachers = $teachers->filter(function($teacher) {
            return $teacher->teacherProfile && $teacher->subjects && $teacher->subjects->isNotEmpty();
        })->values();
        
        // Trier côté PHP pour éviter les problèmes de JOIN
        $sort = $request->get('sort', 'rating');
        $teachers = $teachers->sort(function($a, $b) use ($sort) {
            if (!$a->teacherProfile || !$b->teacherProfile) return 0;
            
            switch($sort) {
                case 'price_asc':
                    return $a->teacherProfile->hourly_rate <=> $b->teacherProfile->hourly_rate;
                case 'price_desc':
                    return $b->teacherProfile->hourly_rate <=> $a->teacherProfile->hourly_rate;
                case 'experience':
                    // Calculer l'expérience depuis la date de création du profil
                    $expA = $a->teacherProfile->created_at ? now()->diffInYears($a->teacherProfile->created_at) : 0;
                    $expB = $b->teacherProfile->created_at ? now()->diffInYears($b->teacherProfile->created_at) : 0;
                    return $expB <=> $expA;
                case 'reviews':
                    return $b->teacherProfile->total_reviews <=> $a->teacherProfile->total_reviews;
                case 'rating':
                default:
                    return $b->teacherProfile->rating <=> $a->teacherProfile->rating;
            }
        })->values();
        
        return Inertia::render('teachers', [
            'teachers' => $teachers,
            'subjects' => $subjects,
            'filters' => [
                'search' => $request->get('search'),
                'subject' => $request->get('subject'),
                'city' => $request->get('city'),
                'min_rate' => $request->get('min_rate') ? (int) $request->get('min_rate') : null,
                'max_rate' => $request->get('max_rate') ? (int) $request->get('max_rate') : null,
                'min_rating' => $request->get('min_rating') ? (float) $request->get('min_rating') : null,
                'sort' => $request->get('sort', 'rating')
            ]
        ]);
    }

    /**
     * Détail d'un professeur
     */
    public function teacherShow(User $teacher)
    {
            
        if (!$teacher || !$teacher->isTeacher()) {
            abort(404, 'Professeur non trouvé');
        }
        
        $teacher->load([
                'teacherProfile', 
                'subjects',
                'reviewsReceived' => function($q) {
                    $q->with('booking')->latest()->limit(10);
                },
                'availabilities'
            ]);
        
        // S'assurer que le professeur a un profil
        if (!$teacher->teacherProfile) {
            // Créer un profil par défaut
            $teacher->teacherProfile = (object)[
                'bio' => "Profil en cours de complétion",
                'hourly_rate' => 5000,
                'rating' => 4.0,
                'total_reviews' => 0,
                'total_hours' => 0,
                'is_verified' => false,
                'created_at' => $teacher->created_at,
                'education' => "Information non disponible",
                'certifications' => [],
                'teaching_method' => "Information non disponible",
                'languages' => ["Français"]
            ];
        }
        
        // S'assurer que le professeur a des matières
        if (!$teacher->subjects || $teacher->subjects->isEmpty()) {
            $teacher->subjects = collect([]);
        }
        
        // S'assurer que le professeur a des avis
        if (!$teacher->reviewsReceived) {
            $teacher->reviewsReceived = collect([]);
        }
        
        // S'assurer que le professeur a des disponibilités
        if (!$teacher->availabilities) {
            $teacher->availabilities = collect([]);
        }
        
        return Inertia::render('teacher-detail', [
            'teacher' => $teacher
        ]);
    }

    /**
     * Liste des matières
     */
    public function subjects()
    {
        $subjects = Subject::active()->ordered()
            ->withCount(['teachers' => function($q) {
                $q->teachers()
                  ->active()
                  ->verified();
            }])
            ->get()
            ->map(function($subject) {
                return [
                    'id' => $subject->id,
                    'name' => $subject->name,
                    'slug' => $subject->slug,
                    'category' => $subject->category,
                    'description' => $subject->description,
                    'teacher_count' => $subject->teachers_count ?? 0
                ];
            });
        
        return Inertia::render('subjects', [
            'subjects' => $subjects
        ]);
    }

    /**
     * Traitement du formulaire de contact
     */
    public function contactSubmit(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
            'userType' => 'required|in:parent,teacher,other'
        ]);

        // Ici vous pourriez envoyer un email, sauvegarder en base, etc.
        // Pour l'instant, on simule juste un succès

        return back()->with('success', 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.');
    }
} 