<?php

declare(strict_types=1);

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Session;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SessionController extends Controller
{
    /**
     * Rejoindre une session
     */
    public function join(Request $request, Session $session): Response
    {
        // Vérifier que la session appartient au professeur
        if ($session->booking->professor_id !== $request->user()->id) {
            abort(403);
        }

        // Vérifier que la session peut être rejointe
        if ($session->status !== 'scheduled') {
            return redirect()->back()
                ->with('error', 'Cette session ne peut pas être rejointe.');
        }

        $session->load(['booking.parent', 'booking.child', 'booking.subject', 'booking.level']);

        return Inertia::render('Professor/Sessions/Join', [
            'session' => $session,
        ]);
    }

    /**
     * Annuler une session
     */
    public function cancel(Request $request, Session $session): RedirectResponse
    {
        // Vérifier que la session appartient au professeur
        if ($session->booking->professor_id !== $request->user()->id) {
            abort(403);
        }

        // Vérifier que la session peut être annulée
        if (!in_array($session->status, ['scheduled', 'in_progress'])) {
            return redirect()->back()
                ->with('error', 'Cette session ne peut pas être annulée.');
        }

        $request->validate([
            'cancellation_reason' => 'required|string|max:500',
        ]);

        $session->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'cancellation_reason' => $request->cancellation_reason,
            'cancelled_by' => 'professor',
        ]);

        return redirect()->back()
            ->with('success', 'Session annulée avec succès.');
    }
}
