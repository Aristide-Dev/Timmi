<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Session;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    /**
     * Afficher la liste des rapports
     */
    public function index(): Response
    {
        $reports = [
            [
                'id' => 1,
                'title' => 'Rapport des utilisateurs',
                'type' => 'users',
                'description' => 'Rapport détaillé sur les utilisateurs du système',
                'last_generated' => now()->subDays(1)->format('Y-m-d H:i:s'),
                'status' => 'available',
            ],
            [
                'id' => 2,
                'title' => 'Rapport des réservations',
                'type' => 'bookings',
                'description' => 'Rapport détaillé sur les réservations',
                'last_generated' => now()->subHours(3)->format('Y-m-d H:i:s'),
                'status' => 'available',
            ],
            [
                'id' => 3,
                'title' => 'Rapport des revenus',
                'type' => 'revenue',
                'description' => 'Rapport détaillé sur les revenus et paiements',
                'last_generated' => now()->subDays(2)->format('Y-m-d H:i:s'),
                'status' => 'available',
            ],
            [
                'id' => 4,
                'title' => 'Rapport de performance',
                'type' => 'performance',
                'description' => 'Rapport de performance des professeurs et du système',
                'last_generated' => now()->subDays(5)->format('Y-m-d H:i:s'),
                'status' => 'generating',
            ],
        ];

        return Inertia::render('Admin/Reports/Index', [
            'reports' => $reports,
        ]);
    }

    /**
     * Générer un rapport
     */
    public function generate(Request $request): Response
    {
        $validated = $request->validate([
            'type' => 'required|in:users,bookings,revenue,performance',
            'period' => 'required|in:day,week,month,quarter,year',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date|after_or_equal:date_from',
            'filters' => 'nullable|array',
        ]);

        $reportData = $this->generateReportData($validated);

        return Inertia::render('Admin/Reports/Generate', [
            'reportData' => $reportData,
            'filters' => $validated,
        ]);
    }

    /**
     * Générer les données du rapport
     */
    private function generateReportData(array $filters): array
    {
        $type = $filters['type'];
        $period = $filters['period'];
        $dateFrom = $filters['date_from'] ?? $this->getDefaultDateFrom($period);
        $dateTo = $filters['date_to'] ?? now()->format('Y-m-d');

        return match ($type) {
            'users' => $this->generateUsersReport($dateFrom, $dateTo),
            'bookings' => $this->generateBookingsReport($dateFrom, $dateTo),
            'revenue' => $this->generateRevenueReport($dateFrom, $dateTo),
            'performance' => $this->generatePerformanceReport($dateFrom, $dateTo),
            default => []
        };
    }

    /**
     * Obtenir la date de début par défaut selon la période
     */
    private function getDefaultDateFrom(string $period): string
    {
        return match ($period) {
            'day' => now()->format('Y-m-d'),
            'week' => now()->subWeek()->format('Y-m-d'),
            'month' => now()->subMonth()->format('Y-m-d'),
            'quarter' => now()->subMonths(3)->format('Y-m-d'),
            'year' => now()->subYear()->format('Y-m-d'),
            default => now()->subMonth()->format('Y-m-d'),
        };
    }

    /**
     * Générer le rapport des utilisateurs
     */
    private function generateUsersReport(string $dateFrom, string $dateTo): array
    {
        $query = User::whereBetween('created_at', [$dateFrom, $dateTo]);

        return [
            'summary' => [
                'total_users' => $query->count(),
                'new_users' => $query->where('created_at', '>=', $dateFrom)->count(),
                'verified_users' => $query->whereNotNull('email_verified_at')->count(),
                'active_users' => $query->where('is_available', true)->count(),
            ],
            'by_role' => $this->getUsersByRole($dateFrom, $dateTo),
            'by_city' => $this->getUsersByCity($dateFrom, $dateTo),
            'registration_trends' => $this->getRegistrationTrends($dateFrom, $dateTo),
            'user_activity' => $this->getUserActivity($dateFrom, $dateTo),
        ];
    }

    /**
     * Générer le rapport des réservations
     */
    private function generateBookingsReport(string $dateFrom, string $dateTo): array
    {
        $query = Booking::whereBetween('created_at', [$dateFrom, $dateTo]);

        return [
            'summary' => [
                'total_bookings' => $query->count(),
                'completed_bookings' => $query->where('status', 'completed')->count(),
                'pending_bookings' => $query->where('status', 'pending')->count(),
                'cancelled_bookings' => $query->where('status', 'cancelled')->count(),
                'total_revenue' => $query->where('status', 'completed')->sum('total_price'),
            ],
            'by_status' => $this->getBookingsByStatus($dateFrom, $dateTo),
            'by_subject' => $this->getBookingsBySubject($dateFrom, $dateTo),
            'by_professor' => $this->getBookingsByProfessor($dateFrom, $dateTo),
            'booking_trends' => $this->getBookingTrends($dateFrom, $dateTo),
        ];
    }

    /**
     * Générer le rapport des revenus
     */
    private function generateRevenueReport(string $dateFrom, string $dateTo): array
    {
        $query = Payment::whereBetween('created_at', [$dateFrom, $dateTo]);

        return [
            'summary' => [
                'total_revenue' => $query->where('status', 'completed')->sum('amount'),
                'total_payments' => $query->count(),
                'completed_payments' => $query->where('status', 'completed')->count(),
                'failed_payments' => $query->where('status', 'failed')->count(),
                'refunded_payments' => $query->where('status', 'refunded')->count(),
                'average_payment' => $query->where('status', 'completed')->avg('amount') ?? 0,
            ],
            'by_method' => $this->getRevenueByMethod($dateFrom, $dateTo),
            'by_professor' => $this->getRevenueByProfessor($dateFrom, $dateTo),
            'revenue_trends' => $this->getRevenueTrends($dateFrom, $dateTo),
            'monthly_breakdown' => $this->getMonthlyRevenueBreakdown($dateFrom, $dateTo),
        ];
    }

    /**
     * Générer le rapport de performance
     */
    private function generatePerformanceReport(string $dateFrom, string $dateTo): array
    {
        return [
            'summary' => [
                'total_sessions' => Session::whereBetween('created_at', [$dateFrom, $dateTo])->count(),
                'completed_sessions' => Session::whereBetween('created_at', [$dateFrom, $dateTo])
                    ->where('status', 'completed')->count(),
                'average_rating' => Review::whereBetween('created_at', [$dateFrom, $dateTo])->avg('rating') ?? 0,
                'total_reviews' => Review::whereBetween('created_at', [$dateFrom, $dateTo])->count(),
            ],
            'professor_performance' => $this->getProfessorPerformance($dateFrom, $dateTo),
            'subject_performance' => $this->getSubjectPerformance($dateFrom, $dateTo),
            'rating_distribution' => $this->getRatingDistribution($dateFrom, $dateTo),
            'session_completion_rates' => $this->getSessionCompletionRates($dateFrom, $dateTo),
        ];
    }

    // Méthodes helper pour les données des rapports
    private function getUsersByRole(string $dateFrom, string $dateTo): array
    {
        return User::join('user_role', 'users.id', '=', 'user_role.user_id')
            ->join('roles', 'user_role.role_id', '=', 'roles.id')
            ->whereBetween('users.created_at', [$dateFrom, $dateTo])
            ->select('roles.name', DB::raw('COUNT(*) as count'))
            ->groupBy('roles.id', 'roles.name')
            ->get()
            ->toArray();
    }

    private function getUsersByCity(string $dateFrom, string $dateTo): array
    {
        return DB::table('users')
            ->join('user_city', 'users.id', '=', 'user_city.user_id')
            ->join('cities', 'user_city.city_id', '=', 'cities.id')
            ->whereBetween('users.created_at', [$dateFrom, $dateTo])
            ->select('cities.name', DB::raw('COUNT(*) as count'))
            ->groupBy('cities.id', 'cities.name')
            ->orderBy('count', 'desc')
            ->limit(10)
            ->get()
            ->toArray();
    }

    private function getRegistrationTrends(string $dateFrom, string $dateTo): array
    {
        return User::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->whereBetween('created_at', [$dateFrom, $dateTo])
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->toArray();
    }

    private function getUserActivity(string $dateFrom, string $dateTo): array
    {
        // Implémentation de l'activité des utilisateurs
        return [];
    }

    private function getBookingsByStatus(string $dateFrom, string $dateTo): array
    {
        return Booking::selectRaw('status, COUNT(*) as count')
            ->whereBetween('created_at', [$dateFrom, $dateTo])
            ->groupBy('status')
            ->get()
            ->toArray();
    }

    private function getBookingsBySubject(string $dateFrom, string $dateTo): array
    {
        return DB::table('bookings')
            ->join('subjects', 'bookings.subject_id', '=', 'subjects.id')
            ->whereBetween('bookings.created_at', [$dateFrom, $dateTo])
            ->select('subjects.name', DB::raw('COUNT(*) as count'))
            ->groupBy('subjects.id', 'subjects.name')
            ->orderBy('count', 'desc')
            ->get()
            ->toArray();
    }

    private function getBookingsByProfessor(string $dateFrom, string $dateTo): array
    {
        return DB::table('bookings')
            ->join('users', 'bookings.professor_id', '=', 'users.id')
            ->whereBetween('bookings.created_at', [$dateFrom, $dateTo])
            ->select('users.name', DB::raw('COUNT(*) as count'))
            ->groupBy('users.id', 'users.name')
            ->orderBy('count', 'desc')
            ->limit(10)
            ->get()
            ->toArray();
    }

    private function getBookingTrends(string $dateFrom, string $dateTo): array
    {
        return Booking::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->whereBetween('created_at', [$dateFrom, $dateTo])
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->toArray();
    }

    private function getRevenueByMethod(string $dateFrom, string $dateTo): array
    {
        return Payment::selectRaw('method, SUM(amount) as total, COUNT(*) as count')
            ->whereBetween('created_at', [$dateFrom, $dateTo])
            ->where('status', 'completed')
            ->groupBy('method')
            ->get()
            ->toArray();
    }

    private function getRevenueByProfessor(string $dateFrom, string $dateTo): array
    {
        return DB::table('bookings')
            ->join('users', 'bookings.professor_id', '=', 'users.id')
            ->whereBetween('bookings.created_at', [$dateFrom, $dateTo])
            ->where('bookings.status', 'completed')
            ->select('users.name', DB::raw('SUM(bookings.total_price) as total'))
            ->groupBy('users.id', 'users.name')
            ->orderBy('total', 'desc')
            ->limit(10)
            ->get()
            ->toArray();
    }

    private function getRevenueTrends(string $dateFrom, string $dateTo): array
    {
        return Payment::selectRaw('DATE(created_at) as date, SUM(amount) as total')
            ->whereBetween('created_at', [$dateFrom, $dateTo])
            ->where('status', 'completed')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->toArray();
    }

    private function getMonthlyRevenueBreakdown(string $dateFrom, string $dateTo): array
    {
        return Payment::selectRaw('strftime("%Y", created_at) as year, strftime("%m", created_at) as month, SUM(amount) as total')
            ->whereBetween('created_at', [$dateFrom, $dateTo])
            ->where('status', 'completed')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get()
            ->toArray();
    }

    private function getProfessorPerformance(string $dateFrom, string $dateTo): array
    {
        return DB::table('users')
            ->join('bookings', 'users.id', '=', 'bookings.professor_id')
            ->leftJoin('reviews', 'bookings.id', '=', 'reviews.booking_id')
            ->whereBetween('bookings.created_at', [$dateFrom, $dateTo])
            ->where('bookings.status', 'completed')
            ->select(
                'users.name',
                DB::raw('COUNT(bookings.id) as total_bookings'),
                DB::raw('SUM(bookings.total_price) as total_revenue'),
                DB::raw('AVG(reviews.rating) as average_rating')
            )
            ->groupBy('users.id', 'users.name')
            ->orderBy('total_revenue', 'desc')
            ->limit(10)
            ->get()
            ->toArray();
    }

    private function getSubjectPerformance(string $dateFrom, string $dateTo): array
    {
        return DB::table('subjects')
            ->join('bookings', 'subjects.id', '=', 'bookings.subject_id')
            ->whereBetween('bookings.created_at', [$dateFrom, $dateTo])
            ->where('bookings.status', 'completed')
            ->select(
                'subjects.name',
                DB::raw('COUNT(bookings.id) as total_bookings'),
                DB::raw('SUM(bookings.total_price) as total_revenue')
            )
            ->groupBy('subjects.id', 'subjects.name')
            ->orderBy('total_revenue', 'desc')
            ->get()
            ->toArray();
    }

    private function getRatingDistribution(string $dateFrom, string $dateTo): array
    {
        return Review::selectRaw('rating, COUNT(*) as count')
            ->whereBetween('created_at', [$dateFrom, $dateTo])
            ->groupBy('rating')
            ->orderBy('rating')
            ->get()
            ->toArray();
    }

    private function getSessionCompletionRates(string $dateFrom, string $dateTo): array
    {
        $totalSessions = Session::whereBetween('created_at', [$dateFrom, $dateTo])->count();
        $completedSessions = Session::whereBetween('created_at', [$dateFrom, $dateTo])
            ->where('status', 'completed')->count();

        return [
            'total_sessions' => $totalSessions,
            'completed_sessions' => $completedSessions,
            'completion_rate' => $totalSessions > 0 ? ($completedSessions / $totalSessions) * 100 : 0,
        ];
    }
}
