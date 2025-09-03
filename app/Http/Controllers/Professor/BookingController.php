<?php

declare(strict_types=1);

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Afficher les réservations du professeur
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        $query = Booking::where('professor_id', $user->id)
            ->with(['parent', 'child', 'subject', 'level']);

        // Filtres
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('scheduled_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('scheduled_at', '<=', $request->date_to);
        }

        // Toutes les réservations
        $allBookings = $query->orderBy('scheduled_at', 'desc')->get();
        
        // Réservations à venir (futures)
        $upcomingBookings = $allBookings->where('scheduled_at', '>', now())
            ->whereIn('status', ['pending', 'confirmed'])
            ->take(5);
            
        // Réservations récentes (passées)
        $recentBookings = $allBookings->where('scheduled_at', '<=', now())
            ->whereIn('status', ['completed', 'cancelled'])
            ->take(5);

        return Inertia::render('Professor/Bookings/Index', [
            'bookings' => $allBookings,
            'upcoming_bookings' => $upcomingBookings,
            'recent_bookings' => $recentBookings,
            'filters' => $request->only(['status', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Afficher les détails d'une réservation
     */
    public function show(Request $request, Booking $booking): Response
    {
        // Vérifier que la réservation appartient au professeur
        if ($booking->professor_id !== $request->user()->id) {
            abort(403);
        }

        $booking->load(['parent', 'child', 'subject', 'level', 'session']);

        return Inertia::render('Professor/Bookings/Show', [
            'booking' => $booking,
        ]);
    }

    /**
     * Confirmer une réservation
     */
    public function confirm(Request $request, Booking $booking): RedirectResponse
    {
        // Vérifier que la réservation appartient au professeur
        if ($booking->professor_id !== $request->user()->id) {
            abort(403);
        }

        // Vérifier que la réservation est en attente
        if ($booking->status !== 'pending') {
            return redirect()->back()
                ->with('error', 'Cette réservation ne peut pas être confirmée.');
        }

        $booking->update([
            'status' => 'confirmed',
            'confirmed_at' => now(),
        ]);

        return redirect()->back()
            ->with('success', 'Réservation confirmée avec succès.');
    }

    /**
     * Marquer une réservation comme terminée
     */
    public function markCompleted(Request $request, Booking $booking): RedirectResponse
    {
        // Vérifier que la réservation appartient au professeur
        if ($booking->professor_id !== $request->user()->id) {
            abort(403);
        }

        // Vérifier que la réservation est confirmée
        if ($booking->status !== 'confirmed') {
            return redirect()->back()
                ->with('error', 'Cette réservation ne peut pas être marquée comme terminée.');
        }

        $booking->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        return redirect()->back()
            ->with('success', 'Réservation marquée comme terminée avec succès.');
    }

    /**
     * Annuler une réservation
     */
    public function cancel(Request $request, Booking $booking): RedirectResponse
    {
        // Vérifier que la réservation appartient au professeur
        if ($booking->professor_id !== $request->user()->id) {
            abort(403);
        }

        // Vérifier que la réservation peut être annulée
        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            return redirect()->back()
                ->with('error', 'Cette réservation ne peut pas être annulée.');
        }

        $request->validate([
            'cancellation_reason' => 'required|string|max:500',
        ]);

        $booking->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'cancellation_reason' => $request->cancellation_reason,
            'cancelled_by' => 'professor',
        ]);

        return redirect()->back()
            ->with('success', 'Réservation annulée avec succès.');
    }
}
