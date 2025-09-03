<?php

declare(strict_types=1);

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Level;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LevelController extends Controller
{
    /**
     * Afficher les niveaux du professeur
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        // Récupérer les niveaux du professeur
        $userLevels = $user->levels;
        
        // Récupérer tous les niveaux disponibles
        $availableLevels = Level::whereNotIn('id', $userLevels->pluck('id'))->get();

        return Inertia::render('Professor/Levels/Index', [
            'user_levels' => $userLevels,
            'available_levels' => $availableLevels,
        ]);
    }

    /**
     * Ajouter un niveau au professeur
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'level_id' => 'required|exists:levels,id',
        ]);

        $user = $request->user();
        $level = Level::findOrFail($request->level_id);

        // Vérifier que le niveau n'est pas déjà associé
        if (!$user->levels()->where('level_id', $level->id)->exists()) {
            $user->levels()->attach($level->id);
            
            return redirect()->route('professor.levels.index')
                ->with('success', "Niveau '{$level->name}' ajouté avec succès.");
        }

        return redirect()->route('professor.levels.index')
            ->with('error', 'Ce niveau est déjà associé à votre profil.');
    }

    /**
     * Supprimer un niveau du professeur
     */
    public function destroy(Request $request, Level $level): RedirectResponse
    {
        $user = $request->user();
        
        // Vérifier que le niveau est bien associé au professeur
        if ($user->levels()->where('level_id', $level->id)->exists()) {
            $user->levels()->detach($level->id);
            
            return redirect()->route('professor.levels.index')
                ->with('success', "Niveau '{$level->name}' supprimé avec succès.");
        }

        return redirect()->route('professor.levels.index')
            ->with('error', 'Ce niveau n\'est pas associé à votre profil.');
    }
}
