<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Booking;
use App\Models\Session;
use App\Models\Payment;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    /**
     * Afficher les analytics principales
     */
    public function index(Request $request): Response
    {
        $period = $request->get('period', 'month'); // day, week, month, year
        $date = $request->get('date', now()->format('Y-m-d'));

        // Données de base
        $analytics = $this->getAnalyticsData($period, $date);

        return Inertia::render('Admin/Analytics/Index', [
            'analytics' => $analytics,
            'period' => $period,
            'date' => $date,
        ]);
    }

    /**
     * Obtenir les données d'analytics
     */
    private function getAnalyticsData(string $period, string $date): array
    {
        $query = $this->getDateQuery($period, $date);

        return [
            'overview' => [
                'total_users' => User::count(),
                'total_professors' => User::whereHas('roles', function ($q) {
                    $q->where('slug', 'professor');
                })->count(),
                'total_parents' => User::whereHas('roles', function ($q) {
                    $q->where('slug', 'parent');
                })->count(),
                'total_bookings' => Booking::count(),
                'total_revenue' => Payment::where('status', 'completed')->sum('amount'),
                'active_sessions' => Session::where('status', 'in_progress')->count(),
            ],
            'period_data' => [
                'new_users' => $query->count(),
                'new_bookings' => Booking::where($this->getDateCondition($period, $date))->count(),
                'completed_bookings' => Booking::where($this->getDateCondition($period, $date))
                    ->where('status', 'completed')->count(),
                'revenue' => Payment::where($this->getDateCondition($period, $date))
                    ->where('status', 'completed')->sum('amount'),
                'average_booking_value' => Payment::where($this->getDateCondition($period, $date))
                    ->where('status', 'completed')->avg('amount') ?? 0,
            ],
            'user_growth' => $this->getUserGrowthData(),
            'revenue_trends' => $this->getRevenueTrendsData(),
            'top_subjects' => $this->getTopSubjectsData(),
            'top_cities' => $this->getTopCitiesData(),
            'conversion_rates' => $this->getConversionRatesData(),
        ];
    }

    /**
     * Obtenir la requête de date
     */
    private function getDateQuery(string $period, string $date)
    {
        return User::where($this->getDateCondition($period, $date));
    }

    /**
     * Obtenir la condition de date
     */
    private function getDateCondition(string $period, string $date): array
    {
        switch ($period) {
            case 'day':
                return ['created_at' => $date];
            case 'week':
                $startOfWeek = now()->parse($date)->startOfWeek();
                $endOfWeek = now()->parse($date)->endOfWeek();
                return [['created_at', '>=', $startOfWeek], ['created_at', '<=', $endOfWeek]];
            case 'month':
                $parsedDate = now()->parse($date);
                return [
                    ['created_at', '>=', $parsedDate->startOfMonth()],
                    ['created_at', '<=', $parsedDate->endOfMonth()]
                ];
            case 'year':
                $parsedDate = now()->parse($date);
                return [
                    ['created_at', '>=', $parsedDate->startOfYear()],
                    ['created_at', '<=', $parsedDate->endOfYear()]
                ];
            default:
                return [];
        }
    }

    /**
     * Obtenir les données de croissance des utilisateurs
     */
    private function getUserGrowthData(): array
    {
        return User::selectRaw('DATE(created_at) as date, COUNT(*) as users')
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->toArray();
    }

    /**
     * Obtenir les données de tendances de revenus
     */
    private function getRevenueTrendsData(): array
    {
        return Payment::selectRaw('DATE(created_at) as date, SUM(amount) as revenue')
            ->where('status', 'completed')
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->toArray();
    }

    /**
     * Obtenir les données des matières populaires
     */
    private function getTopSubjectsData(): array
    {
        return DB::table('bookings')
            ->join('subjects', 'bookings.subject_id', '=', 'subjects.id')
            ->select('subjects.name', 'subjects.id', DB::raw('COUNT(*) as bookings_count'), DB::raw('SUM(bookings.total_price) as revenue'))
            ->where('bookings.status', 'completed')
            ->groupBy('subjects.id', 'subjects.name')
            ->orderBy('bookings_count', 'desc')
            ->limit(10)
            ->get()
            ->toArray();
    }

    /**
     * Obtenir les données des villes populaires
     */
    private function getTopCitiesData(): array
    {
        return DB::table('users')
            ->join('user_city', 'users.id', '=', 'user_city.user_id')
            ->join('cities', 'user_city.city_id', '=', 'cities.id')
            ->select('cities.name', 'cities.id', DB::raw('COUNT(DISTINCT users.id) as users_count'))
            ->whereHas('roles', function ($q) {
                $q->where('slug', 'professor');
            })
            ->groupBy('cities.id', 'cities.name')
            ->orderBy('users_count', 'desc')
            ->limit(10)
            ->get()
            ->toArray();
    }

    /**
     * Obtenir les données de taux de conversion
     */
    private function getConversionRatesData(): array
    {
        $totalVisitors = User::count(); // Approximation
        $totalBookings = Booking::count();
        $completedBookings = Booking::where('status', 'completed')->count();

        return [
            'visitor_to_booking' => $totalVisitors > 0 ? ($totalBookings / $totalVisitors) * 100 : 0,
            'booking_to_completion' => $totalBookings > 0 ? ($completedBookings / $totalBookings) * 100 : 0,
            'overall_conversion' => $totalVisitors > 0 ? ($completedBookings / $totalVisitors) * 100 : 0,
        ];
    }

    /**
     * Afficher les analytics détaillées
     */
    public function detailed(Request $request): Response
    {
        $type = $request->get('type', 'users'); // users, bookings, revenue, performance
        $period = $request->get('period', 'month');

        $data = match ($type) {
            'users' => $this->getDetailedUserAnalytics($period),
            'bookings' => $this->getDetailedBookingAnalytics($period),
            'revenue' => $this->getDetailedRevenueAnalytics($period),
            'performance' => $this->getDetailedPerformanceAnalytics($period),
            default => []
        };

        return Inertia::render('Admin/Analytics/Detailed', [
            'type' => $type,
            'period' => $period,
            'data' => $data,
        ]);
    }

    /**
     * Analytics détaillées des utilisateurs
     */
    private function getDetailedUserAnalytics(string $period): array
    {
        return [
            'user_registrations' => $this->getUserRegistrationsData($period),
            'user_activity' => $this->getUserActivityData($period),
            'user_retention' => $this->getUserRetentionData($period),
            'user_roles_distribution' => $this->getUserRolesDistributionData(),
        ];
    }

    /**
     * Analytics détaillées des réservations
     */
    private function getDetailedBookingAnalytics(string $period): array
    {
        return [
            'booking_trends' => $this->getBookingTrendsData($period),
            'booking_status_distribution' => $this->getBookingStatusDistributionData(),
            'booking_by_subject' => $this->getBookingBySubjectData($period),
            'booking_by_time' => $this->getBookingByTimeData($period),
        ];
    }

    /**
     * Analytics détaillées des revenus
     */
    private function getDetailedRevenueAnalytics(string $period): array
    {
        return [
            'revenue_trends' => $this->getRevenueTrendsData(),
            'revenue_by_professor' => $this->getRevenueByProfessorData($period),
            'revenue_by_subject' => $this->getRevenueBySubjectData($period),
            'payment_methods_distribution' => $this->getPaymentMethodsDistributionData(),
        ];
    }

    /**
     * Analytics détaillées des performances
     */
    private function getDetailedPerformanceAnalytics(string $period): array
    {
        return [
            'session_completion_rates' => $this->getSessionCompletionRatesData($period),
            'average_session_ratings' => $this->getAverageSessionRatingsData($period),
            'professor_performance' => $this->getProfessorPerformanceData($period),
            'system_metrics' => $this->getSystemMetricsData(),
        ];
    }

    // Méthodes helper pour les données détaillées
    private function getUserRegistrationsData(string $period): array
    {
        // Implémentation des données d'inscription des utilisateurs
        return [];
    }

    private function getUserActivityData(string $period): array
    {
        // Implémentation des données d'activité des utilisateurs
        return [];
    }

    private function getUserRetentionData(string $period): array
    {
        // Implémentation des données de rétention des utilisateurs
        return [];
    }

    private function getUserRolesDistributionData(): array
    {
        return User::join('user_role', 'users.id', '=', 'user_role.user_id')
            ->join('roles', 'user_role.role_id', '=', 'roles.id')
            ->select('roles.name', DB::raw('COUNT(*) as count'))
            ->groupBy('roles.id', 'roles.name')
            ->get()
            ->toArray();
    }

    private function getBookingTrendsData(string $period): array
    {
        return Booking::selectRaw('DATE(created_at) as date, COUNT(*) as bookings')
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->toArray();
    }

    private function getBookingStatusDistributionData(): array
    {
        return Booking::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->toArray();
    }

    private function getBookingBySubjectData(string $period): array
    {
        return DB::table('bookings')
            ->join('subjects', 'bookings.subject_id', '=', 'subjects.id')
            ->select('subjects.name', DB::raw('COUNT(*) as count'))
            ->groupBy('subjects.id', 'subjects.name')
            ->orderBy('count', 'desc')
            ->get()
            ->toArray();
    }

    private function getBookingByTimeData(string $period): array
    {
        return Booking::selectRaw('HOUR(created_at) as hour, COUNT(*) as count')
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->toArray();
    }

    private function getRevenueByProfessorData(string $period): array
    {
        return DB::table('bookings')
            ->join('users', 'bookings.professor_id', '=', 'users.id')
            ->select('users.name', DB::raw('SUM(bookings.total_price) as revenue'))
            ->where('bookings.status', 'completed')
            ->groupBy('users.id', 'users.name')
            ->orderBy('revenue', 'desc')
            ->limit(10)
            ->get()
            ->toArray();
    }

    private function getRevenueBySubjectData(string $period): array
    {
        return DB::table('bookings')
            ->join('subjects', 'bookings.subject_id', '=', 'subjects.id')
            ->select('subjects.name', DB::raw('SUM(bookings.total_price) as revenue'))
            ->where('bookings.status', 'completed')
            ->groupBy('subjects.id', 'subjects.name')
            ->orderBy('revenue', 'desc')
            ->get()
            ->toArray();
    }

    private function getPaymentMethodsDistributionData(): array
    {
        return Payment::selectRaw('method, COUNT(*) as count')
            ->groupBy('method')
            ->get()
            ->toArray();
    }

    private function getSessionCompletionRatesData(string $period): array
    {
        $totalSessions = Session::count();
        $completedSessions = Session::where('status', 'completed')->count();

        return [
            'completion_rate' => $totalSessions > 0 ? ($completedSessions / $totalSessions) * 100 : 0,
            'total_sessions' => $totalSessions,
            'completed_sessions' => $completedSessions,
        ];
    }

    private function getAverageSessionRatingsData(string $period): array
    {
        return Review::selectRaw('AVG(rating) as average_rating, COUNT(*) as total_reviews')
            ->first()
            ->toArray();
    }

    private function getProfessorPerformanceData(string $period): array
    {
        return DB::table('users')
            ->join('bookings', 'users.id', '=', 'bookings.professor_id')
            ->join('reviews', 'bookings.id', '=', 'reviews.booking_id')
            ->select('users.name', DB::raw('AVG(reviews.rating) as average_rating'), DB::raw('COUNT(bookings.id) as total_bookings'))
            ->where('bookings.status', 'completed')
            ->groupBy('users.id', 'users.name')
            ->orderBy('average_rating', 'desc')
            ->limit(10)
            ->get()
            ->toArray();
    }

    private function getSystemMetricsData(): array
    {
        return [
            'total_users' => User::count(),
            'total_bookings' => Booking::count(),
            'total_sessions' => Session::count(),
            'total_revenue' => Payment::where('status', 'completed')->sum('amount'),
            'average_rating' => Review::avg('rating') ?? 0,
        ];
    }
}
