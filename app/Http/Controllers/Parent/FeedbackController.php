<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Session;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Récupérer toutes les sessions du parent
        $sessions = Session::whereHas('booking', function ($query) use ($user) {
            $query->where('parent_id', $user->id);
        })
        ->with(['booking.professor', 'booking.child', 'booking.subject', 'feedback'])
        ->orderBy('created_at', 'desc')
        ->get();
        
        // Récupérer tous les feedbacks du parent
        $feedbacks = Feedback::whereHas('session.booking', function ($query) use ($user) {
            $query->where('parent_id', $user->id);
        })
        ->with(['session.booking.professor', 'session.booking.child', 'session.booking.subject'])
        ->orderBy('created_at', 'desc')
        ->get();
        
        return Inertia::render('Parent/Feedback/Index', [
            'sessions' => $sessions,
            'feedbacks' => $feedbacks,
        ]);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'session_id' => 'required|exists:sessions,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
            'categories.teaching_quality' => 'required|integer|min:1|max:5',
            'categories.punctuality' => 'required|integer|min:1|max:5',
            'categories.communication' => 'required|integer|min:1|max:5',
            'categories.patience' => 'required|integer|min:1|max:5',
        ]);
        
        $user = $request->user();
        $session = Session::whereHas('booking', function ($query) use ($user) {
            $query->where('parent_id', $user->id);
        })->findOrFail($request->session_id);
        
        // Vérifier que la session est terminée
        if ($session->status !== 'completed') {
            return back()->with('error', 'Vous ne pouvez donner un avis que pour une session terminée.');
        }
        
        // Vérifier qu'il n'y a pas déjà un feedback
        if ($session->feedback) {
            return back()->with('error', 'Vous avez déjà donné un avis pour cette session.');
        }
        
        // Créer le feedback
        $feedback = Feedback::create([
            'session_id' => $session->id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'categories' => $request->categories,
        ]);
        
        // Mettre à jour la note moyenne du professeur
        $this->updateProfessorRating($session->booking->professor_id);
        
        return back()->with('success', 'Avis enregistré avec succès !');
    }
    
    private function updateProfessorRating($professorId)
    {
        $averageRating = Feedback::whereHas('session.booking', function ($query) use ($professorId) {
            $query->where('professor_id', $professorId);
        })->avg('rating');
        
        User::where('id', $professorId)->update([
            'rating' => round($averageRating, 1)
        ]);
    }
}
