<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class EarningController extends Controller
{
    /**
     * Afficher les revenus globaux
     */
    public function index(Request $request): Response
    {
        $query = Booking::where('status', 'completed')
            ->with(['professor', 'parent', 'subject', 'level']);

        // Filtres
        if ($request->filled('professor')) {
            $query->where('professor_id', $request->professor);
        }

        if ($request->filled('subject')) {
            $query->where('subject_id', $request->subject);
        }

        if ($request->filled('level')) {
            $query->where('level_id', $request->level);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $bookings = $query->orderBy('created_at', 'desc')->paginate(15);

        // Calculer les statistiques
        $totalRevenue = $query->sum('total_price');
        $totalBookings = $query->count();
        $averageBookingValue = $totalBookings > 0 ? $totalRevenue / $totalBookings : 0;

        // Revenus par professeur
        $revenueByProfessor = Booking::where('status', 'completed')
            ->join('users', 'bookings.professor_id', '=', 'users.id')
            ->select('users.name', 'users.id', DB::raw('SUM(bookings.total_price) as total_revenue'), DB::raw('COUNT(*) as total_bookings'))
            ->groupBy('users.id', 'users.name')
            ->orderBy('total_revenue', 'desc')
            ->limit(10)
            ->get();

        // Revenus par matière
        $revenueBySubject = Booking::where('status', 'completed')
            ->join('subjects', 'bookings.subject_id', '=', 'subjects.id')
            ->select('subjects.name', 'subjects.id', DB::raw('SUM(bookings.total_price) as total_revenue'), DB::raw('COUNT(*) as total_bookings'))
            ->groupBy('subjects.id', 'subjects.name')
            ->orderBy('total_revenue', 'desc')
            ->limit(10)
            ->get();

        // Revenus mensuels (12 derniers mois)
        $monthlyRevenue = Booking::where('status', 'completed')
            ->where('created_at', '>=', now()->subMonths(12))
            ->select(
                DB::raw('strftime("%Y", created_at) as year'),
                DB::raw('strftime("%m", created_at) as month'),
                DB::raw('SUM(total_price) as revenue'),
                DB::raw('COUNT(*) as bookings_count')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        return Inertia::render('Admin/Earnings/Index', [
            'bookings' => $bookings,
            'totalRevenue' => $totalRevenue,
            'totalBookings' => $totalBookings,
            'averageBookingValue' => $averageBookingValue,
            'revenueByProfessor' => $revenueByProfessor,
            'revenueBySubject' => $revenueBySubject,
            'monthlyRevenue' => $monthlyRevenue,
            'filters' => $request->only(['professor', 'subject', 'level', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Afficher les revenus d'un professeur spécifique
     */
    public function professor(User $professor, Request $request): Response
    {
        $query = Booking::where('professor_id', $professor->id)
            ->where('status', 'completed')
            ->with(['parent', 'child', 'subject', 'level']);

        // Filtres
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $bookings = $query->orderBy('created_at', 'desc')->paginate(15);

        // Statistiques du professeur
        $stats = [
            'total_earnings' => $query->sum('total_price'),
            'total_sessions' => $query->count(),
            'average_session_value' => $query->avg('total_price') ?? 0,
            'this_month_earnings' => Booking::where('professor_id', $professor->id)
                ->where('status', 'completed')
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->sum('total_price'),
            'last_month_earnings' => Booking::where('professor_id', $professor->id)
                ->where('status', 'completed')
                ->whereMonth('created_at', now()->subMonth()->month)
                ->whereYear('created_at', now()->subMonth()->year)
                ->sum('total_price'),
        ];

        return Inertia::render('Admin/Earnings/Professor', [
            'professor' => $professor,
            'bookings' => $bookings,
            'stats' => $stats,
            'filters' => $request->only(['date_from', 'date_to']),
        ]);
    }

    /**
     * Afficher les revenus par période
     */
    public function period(Request $request): Response
    {
        $period = $request->get('period', 'month'); // day, week, month, year
        $date = $request->get('date', now()->format('Y-m-d'));

        $query = Booking::where('status', 'completed');

        // Appliquer le filtre de période
        switch ($period) {
            case 'day':
                $query->whereDate('created_at', $date);
                break;
            case 'week':
                $startOfWeek = now()->parse($date)->startOfWeek();
                $endOfWeek = now()->parse($date)->endOfWeek();
                $query->whereBetween('created_at', [$startOfWeek, $endOfWeek]);
                break;
            case 'month':
                $query->whereYear('created_at', now()->parse($date)->year)
                      ->whereMonth('created_at', now()->parse($date)->month);
                break;
            case 'year':
                $query->whereYear('created_at', now()->parse($date)->year);
                break;
        }

        $bookings = $query->with(['professor', 'parent', 'subject', 'level'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        // Statistiques de la période
        $stats = [
            'total_revenue' => $query->sum('total_price'),
            'total_bookings' => $query->count(),
            'average_booking_value' => $query->avg('total_price') ?? 0,
            'unique_professors' => $query->distinct('professor_id')->count(),
            'unique_parents' => $query->distinct('parent_id')->count(),
        ];

        return Inertia::render('Admin/Earnings/Period', [
            'bookings' => $bookings,
            'stats' => $stats,
            'period' => $period,
            'date' => $date,
        ]);
    }

    /**
     * Exporter les revenus
     */
    public function export(Request $request)
    {
        // Implémentation de l'export CSV/Excel
        // À implémenter avec Laravel Excel
        return back()->with('info', 'Fonctionnalité d\'export en cours de développement.');
    }
}
