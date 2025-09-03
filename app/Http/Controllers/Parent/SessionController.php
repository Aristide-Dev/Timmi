<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function join(Request $request, Session $session)
    {
        // Vérifier que l'utilisateur est le parent de cette session
        if ($session->booking->parent_id !== $request->user()->id) {
            abort(403);
        }
        
        // Logique pour rejoindre la session (redirection vers la plateforme de cours)
        return redirect()->away($session->meeting_link ?? '#')
            ->with('info', 'Redirection vers la session de cours...');
    }
    
    public function cancel(Request $request, Session $session)
    {
        // Vérifier que l'utilisateur est le parent de cette session
        if ($session->booking->parent_id !== $request->user()->id) {
            abort(403);
        }
        
        // Vérifier que la session peut être annulée (24h avant la création)
        if ($session->created_at->diffInHours(now()) < 24) {
            return back()->with('error', 'Impossible d\'annuler une session moins de 24h après sa création.');
        }
        
        $session->update(['status' => 'cancelled']);
        $session->booking->update(['status' => 'cancelled']);
        
        return back()->with('success', 'Session annulée avec succès.');
    }
}
