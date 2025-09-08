<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Subject;
use App\Models\Level;
use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Statistiques de base
        $stats = [
            'total_bookings' => $user->studentBookings()->count(),
            'upcoming_sessions' => $user->studentBookings()
                ->where('status', 'confirmed')
                ->where('date', '>=', now())
                ->count(),
            'completed_sessions' => $user->studentBookings()
                ->where('status', 'completed')
                ->count(),
            'favorite_subjects' => $user->studentSubjects()->count(),
        ];

        // Réservations récentes
        $recent_bookings = $user->studentBookings()
            ->with(['professor', 'subject', 'level'])
            ->latest()
            ->limit(5)
            ->get();

        // Professeurs favoris (basé sur les réservations)
        $favorite_professors = $user->studentBookings()
            ->with('professor')
            ->selectRaw('professor_id, COUNT(*) as booking_count')
            ->groupBy('professor_id')
            ->orderBy('booking_count', 'desc')
            ->limit(3)
            ->get()
            ->pluck('professor');

        // Prochaines sessions
        $upcoming_sessions = $user->studentBookings()
            ->with(['professor', 'subject', 'level'])
            ->where('status', 'confirmed')
            ->where('date', '>=', now())
            ->orderBy('date')
            ->limit(3)
            ->get();

        return Inertia::render('Student/Dashboard', [
            'stats' => $stats,
            'recent_bookings' => $recent_bookings,
            'favorite_professors' => $favorite_professors,
            'upcoming_sessions' => $upcoming_sessions,
        ]);
    }
}
