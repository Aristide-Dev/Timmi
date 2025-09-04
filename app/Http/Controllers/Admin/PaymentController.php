<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    /**
     * Afficher la liste des paiements
     */
    public function index(Request $request): Response
    {
        $query = Payment::with(['booking.professor', 'booking.parent', 'user']);

        // Filtres
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('transaction_id', 'like', "%{$search}%")
                  ->orWhereHas('booking.professor', function ($profQuery) use ($search) {
                      $profQuery->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('booking.parent', function ($parentQuery) use ($search) {
                      $parentQuery->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('method')) {
            $query->where('method', $request->method);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        if ($request->filled('amount_min')) {
            $query->where('amount', '>=', $request->amount_min);
        }

        if ($request->filled('amount_max')) {
            $query->where('amount', '<=', $request->amount_max);
        }

        $payments = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments,
            'filters' => $request->only([
                'search', 'status', 'method', 'date_from', 'date_to', 'amount_min', 'amount_max'
            ]),
        ]);
    }

    /**
     * Afficher les détails d'un paiement
     */
    public function show(Payment $payment): Response
    {
        $payment->load([
            'booking.professor.roles', 'booking.parent.roles', 'booking.child', 
            'booking.subject', 'booking.level', 'user'
        ]);

        return Inertia::render('Admin/Payments/Show', [
            'payment' => $payment,
        ]);
    }

    /**
     * Mettre à jour le statut d'un paiement
     */
    public function updateStatus(Request $request, Payment $payment): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,completed,failed,refunded',
            'notes' => 'nullable|string|max:500',
        ]);

        $oldStatus = $payment->status;
        $payment->update([
            'status' => $validated['status'],
            'processed_at' => $validated['status'] === 'completed' ? now() : $payment->processed_at,
            'refunded_at' => $validated['status'] === 'refunded' ? now() : $payment->refunded_at,
        ]);

        // Mettre à jour le statut de paiement de la réservation associée
        $payment->booking->update(['payment_status' => $validated['status']]);

        return back()->with('success', 'Statut du paiement mis à jour avec succès.');
    }

    /**
     * Traiter un remboursement
     */
    public function refund(Request $request, Payment $payment): RedirectResponse
    {
        $validated = $request->validate([
            'refund_reason' => 'required|string|max:500',
            'refund_amount' => 'nullable|numeric|min:0|max:' . $payment->amount,
        ]);

        $refundAmount = $validated['refund_amount'] ?? $payment->amount;

        $payment->update([
            'status' => 'refunded',
            'refunded_at' => now(),
            'refund_reason' => $validated['refund_reason'],
            'refund_amount' => $refundAmount,
        ]);

        // Mettre à jour le statut de paiement de la réservation
        $payment->booking->update(['payment_status' => 'refunded']);

        return back()->with('success', 'Remboursement traité avec succès.');
    }

    /**
     * Annuler un paiement
     */
    public function cancel(Request $request, Payment $payment): RedirectResponse
    {
        $validated = $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $payment->update([
            'status' => 'failed',
            'refund_reason' => $validated['reason'],
        ]);

        // Mettre à jour le statut de paiement de la réservation
        $payment->booking->update(['payment_status' => 'pending']);

        return back()->with('success', 'Paiement annulé avec succès.');
    }

    /**
     * Supprimer un paiement
     */
    public function destroy(Payment $payment): RedirectResponse
    {
        // Vérifier si le paiement peut être supprimé
        if (in_array($payment->status, ['completed', 'refunded'])) {
            return back()->with('error', 'Impossible de supprimer un paiement traité ou remboursé.');
        }

        $payment->delete();

        return redirect()->route('admin.payments.index')
            ->with('success', 'Paiement supprimé avec succès.');
    }

    /**
     * Statistiques des paiements
     */
    public function stats(): Response
    {
        $stats = [
            'total_payments' => Payment::count(),
            'pending_payments' => Payment::where('status', 'pending')->count(),
            'completed_payments' => Payment::where('status', 'completed')->count(),
            'failed_payments' => Payment::where('status', 'failed')->count(),
            'refunded_payments' => Payment::where('status', 'refunded')->count(),
            'total_revenue' => Payment::where('status', 'completed')->sum('amount'),
            'total_refunds' => Payment::where('status', 'refunded')->sum('amount'),
            'net_revenue' => Payment::where('status', 'completed')->sum('amount') - Payment::where('status', 'refunded')->sum('amount'),
        ];

        return Inertia::render('Admin/Payments/Stats', [
            'stats' => $stats,
        ]);
    }

    /**
     * Exporter les paiements
     */
    public function export(Request $request)
    {
        // Implémentation de l'export CSV/Excel
        // À implémenter avec Laravel Excel
        return back()->with('info', 'Fonctionnalité d\'export en cours de développement.');
    }
}
