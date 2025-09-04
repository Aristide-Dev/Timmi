<?php

declare(strict_types=1);

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class EarningController extends Controller
{
    /**
     * Afficher les revenus du professeur
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        // Revenus totaux
        $totalEarnings = Booking::where('professor_id', $user->id)
            ->where('status', 'completed')
            ->sum('total_price');
            
        // Revenus du mois en cours
        $monthlyEarnings = Booking::where('professor_id', $user->id)
            ->where('status', 'completed')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total_price');
            
        // Sessions terminées
        $completedSessions = Booking::where('professor_id', $user->id)
            ->where('status', 'completed')
            ->count();
            
        // Prix moyen par session
        $averageSessionPrice = Booking::where('professor_id', $user->id)
            ->where('status', 'completed')
            ->avg('total_price') ?? 0;
            
        // Revenus en attente
        $pendingEarnings = Booking::where('professor_id', $user->id)
            ->where('status', 'pending')
            ->sum('total_price');

        // Revenus des 7 derniers jours
        $weeklyEarnings = Booking::where('professor_id', $user->id)
            ->where('status', 'completed')
            ->where('created_at', '>=', now()->subDays(7))
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total_price) as total'),
                DB::raw('COUNT(*) as sessions')
            )
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();

        // Revenus des 12 derniers mois
        $monthlyEarningsData = Booking::where('professor_id', $user->id)
            ->where('status', 'completed')
            ->where('created_at', '>=', now()->subMonths(12))
            ->select(
                DB::raw('strftime("%Y", created_at) as year'),
                DB::raw('strftime("%m", created_at) as month'),
                DB::raw('SUM(total_price) as total'),
                DB::raw('COUNT(*) as sessions')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => $item->year . '-' . str_pad($item->month, 2, '0', STR_PAD_LEFT),
                    'total' => $item->total,
                    'sessions' => $item->sessions,
                ];
            });

        return Inertia::render('Professor/Earnings/Index', [
            'total_earnings' => $totalEarnings,
            'monthly_earnings' => $monthlyEarnings,
            'weekly_earnings' => $weeklyEarnings,
            'monthly_earnings_data' => $monthlyEarningsData,
            'pending_earnings' => $pendingEarnings,
            'completed_sessions' => $completedSessions,
            'average_session_price' => $averageSessionPrice,
        ]);
    }

    /**
     * Afficher les statistiques détaillées des revenus
     */
    public function statistics(Request $request): Response
    {
        $user = $request->user();
        
        // Revenus des 12 derniers mois
        $monthlyEarnings = Booking::where('professor_id', $user->id)
            ->where('status', 'completed')
            ->where('created_at', '>=', now()->subMonths(12))
            ->select(
                DB::raw('strftime("%Y", created_at) as year'),
                DB::raw('strftime("%m", created_at) as month'),
                DB::raw('SUM(amount) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        // Revenus par matière
        $earningsBySubject = Booking::where('professor_id', $user->id)
            ->where('status', 'completed')
            ->join('subjects', 'bookings.subject_id', '=', 'subjects.id')
            ->select(
                'subjects.name',
                DB::raw('SUM(bookings.amount) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('subjects.id', 'subjects.name')
            ->orderBy('total', 'desc')
            ->get();

        // Revenus par niveau
        $earningsByLevel = Booking::where('professor_id', $user->id)
            ->where('status', 'completed')
            ->join('levels', 'bookings.level_id', '=', 'levels.id')
            ->select(
                'levels.name',
                DB::raw('SUM(bookings.amount) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('levels.id', 'levels.name')
            ->orderBy('total', 'desc')
            ->get();

        // Revenus des 7 derniers jours
        $weeklyEarnings = Booking::where('professor_id', $user->id)
            ->where('status', 'completed')
            ->where('created_at', '>=', now()->subDays(7))
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(amount) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();

        return Inertia::render('Professor/Earnings/Statistics', [
            'monthly_earnings' => $monthlyEarnings,
            'earnings_by_subject' => $earningsBySubject,
            'earnings_by_level' => $earningsByLevel,
            'weekly_earnings' => $weeklyEarnings,
        ]);
    }
}
