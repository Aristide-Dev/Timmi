<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking;
use App\Models\Subject;
use App\Models\Availability;
use Carbon\Carbon;

class TeacherController extends Controller
{
    /**
     * Dashboard principal pour les professeurs
     */
    public function dashboard(Request $request)
    {
        $user = $request->user();
        $today = Carbon::today();
        $thisMonth = Carbon::now()->month;
        $thisYear = Carbon::now()->year;
        
        // Cours du jour
        $todayClasses = $user->bookingsAsTeacher()
            ->with(['parent', 'child', 'subject'])
            ->where('class_date', $today)
            ->where('status', 'confirmed')
            ->orderBy('start_time')
            ->get();

        // Prochains cours
        $upcomingClasses = $user->bookingsAsTeacher()
            ->with(['parent', 'child', 'subject'])
            ->where('class_date', '>', $today)
            ->where('status', 'confirmed')
            ->orderBy('class_date')
            ->orderBy('start_time')
            ->limit(5)
            ->get();

        // Statistiques du mois
        $monthStats = [
            'total_hours' => $user->bookingsAsTeacher()
                ->where('status', 'completed')
                ->whereMonth('class_date', $thisMonth)
                ->whereYear('class_date', $thisYear)
                ->sum('duration') / 60,
            'total_earnings' => $user->bookingsAsTeacher()
                ->where('status', 'completed')
                ->whereMonth('class_date', $thisMonth)
                ->whereYear('class_date', $thisYear)
                ->sum('teacher_amount'),
            'completed_classes' => $user->bookingsAsTeacher()
                ->where('status', 'completed')
                ->whereMonth('class_date', $thisMonth)
                ->whereYear('class_date', $thisYear)
                ->count(),
            'pending_confirmations' => $user->bookingsAsTeacher()
                ->where('status', 'confirmed')
                ->where('class_date', '<', $today)
                ->where('teacher_confirmed', false)
                ->count(),
        ];

        // Statistiques globales
        $globalStats = [
            'total_hours_all_time' => $user->teacherProfile->total_hours ?? 0,
            'total_students' => $user->teacherProfile->total_students ?? 0,
            'average_rating' => $user->teacherProfile->rating ?? 0,
            'total_reviews' => $user->teacherProfile->total_reviews ?? 0,
        ];

        return Inertia::render('teacher/dashboard', [
            'todayClasses' => $todayClasses,
            'upcomingClasses' => $upcomingClasses,
            'monthStats' => $monthStats,
            'globalStats' => $globalStats,
            'profile' => $user->teacherProfile,
            'isProfileComplete' => $user->teacherProfile && 
                                 $user->teacherProfile->bio && 
                                 $user->subjects()->exists(),
        ]);
    }

    /**
     * Page d'attente pour les professeurs non validés
     */
    public function pending()
    {
        return Inertia::render('teacher/pending');
    }

    /**
     * Gérer le profil du professeur
     */
    public function profile(Request $request)
    {
        $user = $request->user();
        $profile = $user->teacherProfile;
        $subjects = Subject::active()->ordered()->get();
        $teacherSubjects = $user->subjects()->get();

        return Inertia::render('teacher/profile', [
            'profile' => $profile,
            'subjects' => $subjects,
            'teacherSubjects' => $teacherSubjects,
        ]);
    }

    /**
     * Mettre à jour le profil
     */
    public function updateProfile(Request $request)
    {
        $request->validate([
            'bio' => 'required|string|min:50',
            'levels' => 'required|array|min:1',
            'zones' => 'required|array|min:1',
            'teaching_mode' => 'required|in:presentiel,en_ligne,both',
            'hourly_rate' => 'required|numeric|min:1000',
            'subjects' => 'required|array|min:1',
            'subjects.*.id' => 'required|exists:subjects,id',
            'subjects.*.hourly_rate' => 'nullable|numeric|min:1000',
            'subjects.*.specialties' => 'nullable|array',
        ]);

        $user = $request->user();
        $profile = $user->teacherProfile;

        // Mettre à jour le profil
        $profile->update([
            'bio' => $request->bio,
            'levels' => $request->levels,
            'zones' => $request->zones,
            'teaching_mode' => $request->teaching_mode,
            'hourly_rate' => $request->hourly_rate,
        ]);

        // Mettre à jour les matières
        $subjectsData = [];
        foreach ($request->subjects as $subject) {
            $subjectsData[$subject['id']] = [
                'hourly_rate' => $subject['hourly_rate'] ?? $request->hourly_rate,
                'specialties' => json_encode($subject['specialties'] ?? []),
            ];
        }
        $user->subjects()->sync($subjectsData);

        return redirect()->back()->with('success', 'Profil mis à jour avec succès.');
    }

    /**
     * Gérer les disponibilités
     */
    public function availabilities(Request $request)
    {
        $availabilities = $request->user()->availabilities()
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();

        return Inertia::render('teacher/availabilities', [
            'availabilities' => $availabilities,
        ]);
    }

    /**
     * Ajouter une disponibilité
     */
    public function storeAvailability(Request $request)
    {
        $request->validate([
            'day_of_week' => 'required|integer|between:0,6',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'is_recurring' => 'boolean',
            'start_date' => 'nullable|date|after_or_equal:today',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        $request->user()->availabilities()->create($request->validated());

        return redirect()->back()->with('success', 'Disponibilité ajoutée avec succès.');
    }

    /**
     * Calendrier des cours
     */
    public function calendar(Request $request)
    {
        $month = $request->get('month', Carbon::now()->month);
        $year = $request->get('year', Carbon::now()->year);

        $bookings = $request->user()->bookingsAsTeacher()
            ->with(['parent', 'child', 'subject'])
            ->whereMonth('class_date', $month)
            ->whereYear('class_date', $year)
            ->whereIn('status', ['confirmed', 'completed'])
            ->get();

        return Inertia::render('teacher/calendar', [
            'bookings' => $bookings,
            'currentMonth' => $month,
            'currentYear' => $year,
        ]);
    }

    /**
     * Historique des cours
     */
    public function bookings(Request $request)
    {
        $bookings = $request->user()->bookingsAsTeacher()
            ->with(['parent', 'child', 'subject', 'payment', 'review'])
            ->orderBy('class_date', 'desc')
            ->orderBy('start_time', 'desc')
            ->paginate(10);

        return Inertia::render('teacher/bookings', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Confirmer qu'un cours a été donné
     */
    public function confirmClass(Booking $booking)
    {
        if ($booking->teacher_id !== auth()->id() || !$booking->canBeConfirmedByTeacher()) {
            abort(403);
        }

        $booking->confirmByTeacher();

        return redirect()->back()->with('success', 'Cours confirmé avec succès.');
    }

    /**
     * Revenus et paiements
     */
    public function earnings(Request $request)
    {
        $user = $request->user();

        // Revenus par mois sur les 12 derniers mois
        $monthlyEarnings = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $earnings = $user->bookingsAsTeacher()
                ->where('status', 'completed')
                ->whereMonth('class_date', $date->month)
                ->whereYear('class_date', $date->year)
                ->sum('teacher_amount');
            
            $monthlyEarnings[] = [
                'month' => $date->format('M Y'),
                'amount' => $earnings,
            ];
        }

        // Paiements reçus
        $payouts = $user->payouts()
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Montant en attente
        $pendingAmount = $user->bookingsAsTeacher()
            ->where('status', 'completed')
            ->where('parent_confirmed', true)
            ->whereDoesntHave('payout')
            ->sum('teacher_amount');

        return Inertia::render('teacher/earnings', [
            'monthlyEarnings' => $monthlyEarnings,
            'payouts' => $payouts,
            'pendingAmount' => $pendingAmount,
        ]);
    }
}
