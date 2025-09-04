<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use App\Models\Subject;
use App\Models\Level;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Afficher la liste de toutes les réservations
     */
    public function index(Request $request): Response
    {
        $query = Booking::with(['professor', 'parent', 'child', 'subject', 'level']);

        // Filtres
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('professor', function ($profQuery) use ($search) {
                    $profQuery->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('parent', function ($parentQuery) use ($search) {
                    $parentQuery->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('child', function ($childQuery) use ($search) {
                    $childQuery->where('name', 'like', "%{$search}%");
                });
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        if ($request->filled('subject')) {
            $query->where('subject_id', $request->subject);
        }

        if ($request->filled('level')) {
            $query->where('level_id', $request->level);
        }

        if ($request->filled('professor')) {
            $query->where('professor_id', $request->professor);
        }

        if ($request->filled('parent')) {
            $query->where('parent_id', $request->parent);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('scheduled_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('scheduled_at', '<=', $request->date_to);
        }

        if ($request->filled('price_min')) {
            $query->where('total_price', '>=', $request->price_min);
        }

        if ($request->filled('price_max')) {
            $query->where('total_price', '<=', $request->price_max);
        }

        $bookings = $query->orderBy('created_at', 'desc')->paginate(15);

        // Données pour les filtres
        $subjects = Subject::where('is_active', true)->get();
        $levels = Level::where('is_active', true)->get();
        $professors = User::whereHas('roles', function ($q) {
            $q->where('slug', 'professor');
        })->get();
        $parents = User::whereHas('roles', function ($q) {
            $q->where('slug', 'parent');
        })->get();

        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => $bookings,
            'subjects' => $subjects,
            'levels' => $levels,
            'professors' => $professors,
            'parents' => $parents,
            'filters' => $request->only([
                'search', 'status', 'payment_status', 'subject', 'level',
                'professor', 'parent', 'date_from', 'date_to', 'price_min', 'price_max'
            ]),
        ]);
    }

    /**
     * Afficher les détails d'une réservation
     */
    public function show(Booking $booking): Response
    {
        $booking->load([
            'professor.roles', 'parent.roles', 'child', 'subject', 'level',
            'sessions.feedback'
        ]);

        // Historique des statuts (simulé - à implémenter avec un modèle StatusHistory)
        $statusHistory = [
            [
                'status' => $booking->status,
                'changed_at' => $booking->updated_at->format('Y-m-d H:i:s'),
                'changed_by' => 'Système',
            ]
        ];

        return Inertia::render('Admin/Bookings/Show', [
            'booking' => $booking,
            'statusHistory' => $statusHistory,
        ]);
    }

    /**
     * Mettre à jour le statut d'une réservation
     */
    public function updateStatus(Request $request, Booking $booking): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled',
            'notes' => 'nullable|string|max:500',
        ]);

        $oldStatus = $booking->status;
        $booking->update([
            'status' => $validated['status'],
            'admin_notes' => $validated['notes'] ?? $booking->admin_notes,
        ]);

        // Logique métier selon le statut
        if ($validated['status'] === 'cancelled' && $oldStatus !== 'cancelled') {
            // Remboursement automatique si payé
            if ($booking->payment_status === 'paid') {
                $booking->update(['payment_status' => 'refunded']);
            }
        }

        return back()->with('success', 'Statut de la réservation mis à jour avec succès.');
    }

    /**
     * Mettre à jour le statut de paiement d'une réservation
     */
    public function updatePaymentStatus(Request $request, Booking $booking): RedirectResponse
    {
        $validated = $request->validate([
            'payment_status' => 'required|in:pending,paid,refunded',
            'transaction_id' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:500',
        ]);

        $booking->update([
            'payment_status' => $validated['payment_status'],
            'transaction_id' => $validated['transaction_id'] ?? $booking->transaction_id,
            'admin_notes' => $validated['notes'] ?? $booking->admin_notes,
        ]);

        return back()->with('success', 'Statut de paiement mis à jour avec succès.');
    }

    /**
     * Supprimer une réservation
     */
    public function destroy(Booking $booking): RedirectResponse
    {
        // Vérifier si la réservation peut être supprimée
        if (in_array($booking->status, ['confirmed', 'completed'])) {
            return back()->with('error', 'Impossible de supprimer une réservation confirmée ou terminée.');
        }

        $booking->delete();

        return redirect()->route('admin.bookings.index')
            ->with('success', 'Réservation supprimée avec succès.');
    }

    /**
     * Exporter les réservations
     */
    public function export(Request $request)
    {
        // Implémentation de l'export CSV/Excel
        // À implémenter avec Laravel Excel
        return back()->with('info', 'Fonctionnalité d\'export en cours de développement.');
    }

    /**
     * Statistiques des réservations
     */
    public function stats(): Response
    {
        $stats = [
            'total_bookings' => Booking::count(),
            'pending_bookings' => Booking::where('status', 'pending')->count(),
            'confirmed_bookings' => Booking::where('status', 'confirmed')->count(),
            'completed_bookings' => Booking::where('status', 'completed')->count(),
            'cancelled_bookings' => Booking::where('status', 'cancelled')->count(),
            'total_revenue' => Booking::where('status', 'completed')->sum('total_price'),
            'pending_payments' => Booking::where('payment_status', 'pending')->count(),
            'paid_bookings' => Booking::where('payment_status', 'paid')->count(),
            'refunded_bookings' => Booking::where('payment_status', 'refunded')->count(),
        ];

        return Inertia::render('Admin/Bookings/Stats', [
            'stats' => $stats,
        ]);
    }
}
