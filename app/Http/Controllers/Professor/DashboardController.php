<?php

declare(strict_types=1);

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Afficher le tableau de bord du professeur
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        // Statistiques générales
        $stats = [
            'total_bookings' => Booking::where('professor_id', $user->id)->count(),
            'pending_bookings' => Booking::where('professor_id', $user->id)
                ->where('status', 'pending')
                ->count(),
            'completed_bookings' => Booking::where('professor_id', $user->id)
                ->where('status', 'completed')
                ->count(),
            'total_earnings' => Booking::where('professor_id', $user->id)
                ->where('status', 'completed')
                ->sum('total_price'),
            'monthly_earnings' => Booking::where('professor_id', $user->id)
                ->where('status', 'completed')
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->sum('total_price'),
        ];

        // Réservations récentes
        $recent_bookings = Booking::where('professor_id', $user->id)
            ->with(['parent', 'child', 'subject', 'level'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Prochaines sessions
        $upcoming_sessions = Booking::where('professor_id', $user->id)
            ->where('status', 'confirmed')
            ->where('scheduled_at', '>=', now())
            ->with(['parent', 'child', 'subject', 'level'])
            ->orderBy('scheduled_at', 'asc')
            ->limit(5)
            ->get();

        // Revenus des 7 derniers jours
        $weekly_earnings = Booking::where('professor_id', $user->id)
            ->where('status', 'completed')
            ->where('created_at', '>=', now()->subDays(7))
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total_price) as total'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('Professor/Dashboard/Index', [
            'user' => $user->load(['subjects', 'levels', 'cities']),
            'stats' => $stats,
            'recent_bookings' => $recent_bookings,
            'upcoming_sessions' => $upcoming_sessions,
            'weekly_earnings' => $weekly_earnings,
        ]);
    }
}
