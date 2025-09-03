<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfessorController extends Controller
{
    public function show(Request $request, User $professor)
    {
        // Vérifier que l'utilisateur est bien un professeur
        if (!$professor->hasRole('professor')) {
            abort(404);
        }
        
        // Charger les relations nécessaires (seulement celles qui existent)
        $professor->load([
            'subjects',
            'levels', 
            'cities',
            // 'certificates', // Temporairement commenté jusqu'à ce que la table soit créée
            // 'availability', // Temporairement commenté jusqu'à ce que la table soit créée
            // 'reviews' => function ($query) { // Temporairement commenté jusqu'à ce que la table soit créée
            //     $query->orderBy('created_at', 'desc')->limit(10);
            // }
        ]);
        
        return Inertia::render('Parent/Professor/Show', [
            'professor' => $professor,
        ]);
    }
}
