<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\TeacherPayout;
use App\Models\Setting;
use App\Models\Advertisement;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\TeacherApproved;
use App\Models\Notification;

class AdminController extends Controller
{
    /**
     * Dashboard principal pour l'administrateur
     */
    public function dashboard()
    {
        $today = Carbon::today();
        $thisMonth = Carbon::now()->month;
        $thisYear = Carbon::now()->year;

        // Statistiques générales
        $stats = [
            'total_users' => User::count(),
            'total_parents' => User::where('role', 'parent')->count(),
            'total_teachers' => User::where('role', 'teacher')->count(),
            'verified_teachers' => User::where('role', 'teacher')
                ->whereHas('teacherProfile', function($q) {
                    $q->where('is_verified', true);
                })->count(),
            'pending_teachers' => User::where('role', 'teacher')
                ->where('status', 'pending')
                ->count(),
        ];

        // Statistiques des réservations
        $bookingStats = [
            'total_bookings' => Booking::count(),
            'bookings_this_month' => Booking::whereMonth('created_at', $thisMonth)
                ->whereYear('created_at', $thisYear)
                ->count(),
            'completed_classes' => Booking::where('status', 'completed')->count(),
            'upcoming_classes' => Booking::upcoming()->count(),
        ];

        // Statistiques financières
        $financialStats = [
            'total_revenue' => Payment::completed()->sum('amount'),
            'revenue_this_month' => Payment::completed()
                ->whereMonth('paid_at', $thisMonth)
                ->whereYear('paid_at', $thisYear)
                ->sum('amount'),
            'total_commissions' => Booking::where('status', 'completed')
                ->sum('commission_amount'),
            'pending_payouts' => Booking::where('status', 'completed')
                ->where('parent_confirmed', true)
                ->whereDoesntHave('payout')
                ->sum('teacher_amount'),
        ];

        // Graphique des revenus des 6 derniers mois
        $revenueChart = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $revenue = Payment::completed()
                ->whereMonth('paid_at', $date->month)
                ->whereYear('paid_at', $date->year)
                ->sum('amount');
            
            $revenueChart[] = [
                'month' => $date->format('M'),
                'revenue' => $revenue,
            ];
        }

        // Dernières inscriptions
        $recentUsers = User::with('teacherProfile')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Professeurs en attente
        $pendingTeachers = User::where('role', 'teacher')
            ->where('status', 'pending')
            ->with('teacherProfile')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'bookingStats' => $bookingStats,
            'financialStats' => $financialStats,
            'revenueChart' => $revenueChart,
            'recentUsers' => $recentUsers,
            'pendingTeachers' => $pendingTeachers,
        ]);
    }

    /**
     * Gestion des utilisateurs
     */
    public function users(Request $request)
    {
        $query = User::with('teacherProfile');

        // Filtres
        if ($request->role) {
            $query->where('role', $request->role);
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('phone', 'like', '%' . $request->search . '%');
            });
        }

        $users = $query->orderBy('created_at', 'desc')->paginate(20);

        return Inertia::render('admin/users', [
            'users' => $users,
            'filters' => $request->only(['role', 'status', 'search']),
        ]);
    }

    /**
     * Valider un professeur
     */
    public function approveTeacher(User $user)
    {
        if ($user->role !== 'teacher') {
            abort(403);
        }

        DB::beginTransaction();
        try {
            $user->update(['status' => 'active']);
            
            if ($user->teacherProfile) {
                $user->teacherProfile->update([
                    'is_verified' => true,
                    'verified_at' => now(),
                ]);
            }

            // Envoyer l'email de validation
            Mail::to($user->email)
                ->send(new TeacherApproved($user));

            // Envoyer la notification interne
            Notification::create([
                'user_id' => $user->id,
                'type' => 'account_approved',
                'title' => 'Compte approuvé',
                'message' => 'Votre compte professeur a été approuvé. Vous pouvez maintenant recevoir des réservations.',
            ]);

            DB::commit();
            return redirect()->back()->with('success', 'Professeur approuvé avec succès.');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->with('error', 'Une erreur est survenue lors de la validation du professeur.');
        }
    }

    /**
     * Suspendre un utilisateur
     */
    public function suspendUser(User $user)
    {
        $user->update(['status' => 'suspended']);
        
        return redirect()->back()->with('success', 'Utilisateur suspendu.');
    }

    /**
     * Réactiver un utilisateur
     */
    public function activateUser(User $user)
    {
        $user->update(['status' => 'active']);
        
        return redirect()->back()->with('success', 'Utilisateur réactivé.');
    }

    /**
     * Gestion des réservations
     */
    public function bookings(Request $request)
    {
        $query = Booking::with(['parent', 'teacher', 'child', 'subject', 'payment']);

        // Filtres
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->payment_status) {
            $query->where('payment_status', $request->payment_status);
        }
        if ($request->date_from) {
            $query->where('class_date', '>=', $request->date_from);
        }
        if ($request->date_to) {
            $query->where('class_date', '<=', $request->date_to);
        }

        $bookings = $query->orderBy('created_at', 'desc')->paginate(20);

        return Inertia::render('admin/bookings', [
            'bookings' => $bookings,
            'filters' => $request->only(['status', 'payment_status', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Gestion des paiements
     */
    public function payments(Request $request)
    {
        $query = Payment::with(['booking.parent', 'booking.teacher']);

        // Filtres
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->payment_method) {
            $query->where('payment_method', $request->payment_method);
        }

        $payments = $query->orderBy('created_at', 'desc')->paginate(20);

        $stats = [
            'total_amount' => Payment::completed()->sum('amount'),
            'pending_amount' => Payment::pending()->sum('amount'),
            'refunded_amount' => Payment::where('status', 'refunded')->sum('refund_amount'),
        ];

        return Inertia::render('admin/payments', [
            'payments' => $payments,
            'stats' => $stats,
            'filters' => $request->only(['status', 'payment_method']),
        ]);
    }

    /**
     * Gestion des paiements aux professeurs
     */
    public function payouts(Request $request)
    {
        $query = TeacherPayout::with('teacher');

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $payouts = $query->orderBy('created_at', 'desc')->paginate(20);

        // Montants en attente par professeur
        $pendingByTeacher = User::where('role', 'teacher')
            ->whereHas('bookingsAsTeacher', function($q) {
                $q->where('status', 'completed')
                  ->where('parent_confirmed', true)
                  ->whereDoesntHave('payout');
            })
            ->with(['bookingsAsTeacher' => function($q) {
                $q->where('status', 'completed')
                  ->where('parent_confirmed', true)
                  ->whereDoesntHave('payout');
            }])
            ->get()
            ->map(function($teacher) {
                return [
                    'teacher' => $teacher,
                    'pending_amount' => $teacher->bookingsAsTeacher->sum('teacher_amount'),
                    'bookings_count' => $teacher->bookingsAsTeacher->count(),
                ];
            })
            ->filter(function($item) {
                return $item['pending_amount'] > 0;
            });

        return Inertia::render('admin/payouts', [
            'payouts' => $payouts,
            'pendingByTeacher' => $pendingByTeacher,
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Créer un paiement pour un professeur
     */
    public function createPayout(Request $request)
    {
        $request->validate([
            'teacher_id' => 'required|exists:users,id',
            'payment_method' => 'required|in:mobile_money,bank_transfer,cash',
        ]);

        $teacher = User::findOrFail($request->teacher_id);
        
        // Obtenir toutes les réservations non payées
        $bookings = $teacher->bookingsAsTeacher()
            ->where('status', 'completed')
            ->where('parent_confirmed', true)
            ->whereDoesntHave('payout')
            ->get();

        if ($bookings->isEmpty()) {
            return redirect()->back()->with('error', 'Aucune réservation à payer pour ce professeur.');
        }

        $payout = TeacherPayout::createForTeacher(
            $teacher->id,
            $bookings->min('class_date'),
            $bookings->max('class_date')
        );

        $payout->update(['payment_method' => $request->payment_method]);

        return redirect()->back()->with('success', 'Paiement créé avec succès.');
    }

    /**
     * Marquer un paiement comme effectué
     */
    public function markPayoutCompleted(TeacherPayout $payout, Request $request)
    {
        $request->validate([
            'payment_reference' => 'required|string',
        ]);

        $payout->markAsProcessed($request->payment_reference);

        // Marquer les réservations comme payées
        Booking::whereIn('id', $payout->booking_ids)
            ->update(['payout_id' => $payout->id]);

        return redirect()->back()->with('success', 'Paiement marqué comme effectué.');
    }

    /**
     * Gestion des paramètres
     */
    public function settings()
    {
        $settings = Setting::orderBy('group')->orderBy('label')->get();
        $groupedSettings = $settings->groupBy('group');

        return Inertia::render('admin/settings', [
            'settings' => $groupedSettings,
        ]);
    }

    /**
     * Mettre à jour les paramètres
     */
    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string',
            'settings.*.value' => 'required',
        ]);

        foreach ($validated['settings'] as $setting) {
            Setting::set($setting['key'], $setting['value']);
        }

        return redirect()->back()->with('success', 'Paramètres mis à jour avec succès.');
    }

    /**
     * Gestion des publicités
     */
    public function advertisements()
    {
        $advertisements = Advertisement::orderBy('created_at', 'desc')->paginate(20);

        return Inertia::render('admin/advertisements', [
            'advertisements' => $advertisements,
        ]);
    }

    /**
     * Statistiques et rapports
     */
    public function reports(Request $request)
    {
        $startDate = $request->get('start_date', Carbon::now()->startOfMonth());
        $endDate = $request->get('end_date', Carbon::now()->endOfMonth());

        // Rapport des réservations
        $bookingReport = [
            'total' => Booking::whereBetween('created_at', [$startDate, $endDate])->count(),
            'completed' => Booking::whereBetween('created_at', [$startDate, $endDate])
                ->where('status', 'completed')->count(),
            'cancelled' => Booking::whereBetween('created_at', [$startDate, $endDate])
                ->where('status', 'cancelled')->count(),
        ];

        // Rapport financier
        $financialReport = [
            'revenue' => Payment::completed()
                ->whereBetween('paid_at', [$startDate, $endDate])
                ->sum('amount'),
            'commissions' => Booking::where('status', 'completed')
                ->whereBetween('class_date', [$startDate, $endDate])
                ->sum('commission_amount'),
            'teacher_earnings' => Booking::where('status', 'completed')
                ->whereBetween('class_date', [$startDate, $endDate])
                ->sum('teacher_amount'),
        ];

        // Top professeurs
        $topTeachers = User::where('role', 'teacher')
            ->withCount(['bookingsAsTeacher as completed_classes' => function($q) use ($startDate, $endDate) {
                $q->where('status', 'completed')
                  ->whereBetween('class_date', [$startDate, $endDate]);
            }])
            ->withSum(['bookingsAsTeacher as total_earnings' => function($q) use ($startDate, $endDate) {
                $q->where('status', 'completed')
                  ->whereBetween('class_date', [$startDate, $endDate]);
            }], 'teacher_amount')
            ->orderBy('completed_classes', 'desc')
            ->limit(10)
            ->get();

        // Matières populaires
        $popularSubjects = \App\Models\Subject::withCount(['bookings' => function($q) use ($startDate, $endDate) {
                $q->whereBetween('class_date', [$startDate, $endDate]);
            }])
            ->orderBy('bookings_count', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('admin/reports', [
            'bookingReport' => $bookingReport,
            'financialReport' => $financialReport,
            'topTeachers' => $topTeachers,
            'popularSubjects' => $popularSubjects,
            'dateRange' => [
                'start' => $startDate,
                'end' => $endDate,
            ],
        ]);
    }
}
