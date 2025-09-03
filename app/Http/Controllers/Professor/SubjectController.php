<?php

declare(strict_types=1);

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubjectController extends Controller
{
    /**
     * Afficher les matières du professeur
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        // Récupérer les matières du professeur
        $userSubjects = $user->subjects;
        
        // Récupérer toutes les matières disponibles
        $availableSubjects = Subject::whereNotIn('id', $userSubjects->pluck('id'))->get();

        return Inertia::render('Professor/Subjects/Index', [
            'user_subjects' => $userSubjects,
            'available_subjects' => $availableSubjects,
        ]);
    }

    /**
     * Ajouter une matière au professeur
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
        ]);

        $user = $request->user();
        $subject = Subject::findOrFail($request->subject_id);

        // Vérifier que la matière n'est pas déjà associée
        if (!$user->subjects()->where('subject_id', $subject->id)->exists()) {
            $user->subjects()->attach($subject->id);
            
            return redirect()->route('professor.subjects.index')
                ->with('success', "Matière '{$subject->name}' ajoutée avec succès.");
        }

        return redirect()->route('professor.subjects.index')
            ->with('error', 'Cette matière est déjà associée à votre profil.');
    }

    /**
     * Supprimer une matière du professeur
     */
    public function destroy(Request $request, Subject $subject): RedirectResponse
    {
        $user = $request->user();
        
        // Vérifier que la matière est bien associée au professeur
        if ($user->subjects()->where('subject_id', $subject->id)->exists()) {
            $user->subjects()->detach($subject->id);
            
            return redirect()->route('professor.subjects.index')
                ->with('success', "Matière '{$subject->name}' supprimée avec succès.");
        }

        return redirect()->route('professor.subjects.index')
            ->with('error', 'Cette matière n\'est pas associée à votre profil.');
    }
}
