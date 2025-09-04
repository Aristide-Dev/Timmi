<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Session;
use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SessionController extends Controller
{
    /**
     * Afficher la liste des sessions
     */
    public function index(Request $request): Response
    {
        $query = Session::with(['booking.professor', 'booking.parent', 'booking.child', 'booking.subject', 'booking.level', 'feedback']);

        // Filtres
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('booking.professor', function ($profQuery) use ($search) {
                    $profQuery->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('booking.parent', function ($parentQuery) use ($search) {
                    $parentQuery->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('booking.child', function ($childQuery) use ($search) {
                    $childQuery->where('name', 'like', "%{$search}%");
                });
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('professor')) {
            $query->whereHas('booking', function ($q) use ($request) {
                $q->where('professor_id', $request->professor);
            });
        }

        if ($request->filled('parent')) {
            $query->whereHas('booking', function ($q) use ($request) {
                $q->where('parent_id', $request->parent);
            });
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $sessions = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Sessions/Index', [
            'sessions' => $sessions,
            'filters' => $request->only(['search', 'status', 'professor', 'parent', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Afficher les détails d'une session
     */
    public function show(Session $session): Response
    {
        $session->load([
            'booking.professor.roles', 'booking.parent.roles', 'booking.child', 
            'booking.subject', 'booking.level', 'feedback'
        ]);

        return Inertia::render('Admin/Sessions/Show', [
            'session' => $session,
        ]);
    }

    /**
     * Mettre à jour le statut d'une session
     */
    public function updateStatus(Request $request, Session $session): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:scheduled,in_progress,completed,cancelled',
            'notes' => 'nullable|string|max:500',
        ]);

        $session->update([
            'status' => $validated['status'],
            'notes' => $validated['notes'] ?? $session->notes,
        ]);

        // Mettre à jour le statut de la réservation associée si nécessaire
        if ($validated['status'] === 'completed') {
            $session->booking->update(['status' => 'completed']);
        }

        return back()->with('success', 'Statut de la session mis à jour avec succès.');
    }

    /**
     * Ajouter des notes à une session
     */
    public function addNotes(Request $request, Session $session): RedirectResponse
    {
        $validated = $request->validate([
            'notes' => 'required|string|max:1000',
        ]);

        $session->update([
            'notes' => $validated['notes'],
        ]);

        return back()->with('success', 'Notes ajoutées avec succès.');
    }

    /**
     * Supprimer une session
     */
    public function destroy(Session $session): RedirectResponse
    {
        // Vérifier si la session peut être supprimée
        if (in_array($session->status, ['in_progress', 'completed'])) {
            return back()->with('error', 'Impossible de supprimer une session en cours ou terminée.');
        }

        $session->delete();

        return redirect()->route('admin.sessions.index')
            ->with('success', 'Session supprimée avec succès.');
    }

    /**
     * Statistiques des sessions
     */
    public function stats(): Response
    {
        $stats = [
            'total_sessions' => Session::count(),
            'scheduled_sessions' => Session::where('status', 'scheduled')->count(),
            'in_progress_sessions' => Session::where('status', 'in_progress')->count(),
            'completed_sessions' => Session::where('status', 'completed')->count(),
            'cancelled_sessions' => Session::where('status', 'cancelled')->count(),
            'sessions_with_feedback' => Session::whereHas('feedback')->count(),
            'sessions_without_feedback' => Session::whereDoesntHave('feedback')->where('status', 'completed')->count(),
        ];

        return Inertia::render('Admin/Sessions/Stats', [
            'stats' => $stats,
        ]);
    }
}
