<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Level;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LevelController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $user->load('studentLevels');
        
        $allLevels = Level::with('cycle')->get();
        
        return Inertia::render('Student/Levels/Index', [
            'user' => $user,
            'levels' => $allLevels,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'level_id' => 'required|exists:levels,id',
        ]);

        $user->studentLevels()->syncWithoutDetaching([$request->level_id]);

        return back()->with('success', 'Niveau ajouté avec succès.');
    }

    public function destroy(Request $request, Level $level)
    {
        $user = $request->user();
        
        $user->studentLevels()->detach($level->id);

        return back()->with('success', 'Niveau supprimé avec succès.');
    }
}
