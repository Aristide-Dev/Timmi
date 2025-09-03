<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Child;
use App\Models\Level;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ChildController extends Controller
{
    /**
     * Afficher la liste des enfants du parent
     */
    public function index()
    {
        $children = Child::where('parent_id', Auth::id())
            ->withCount(['bookings as active_sessions' => function ($query) {
                $query->whereIn('status', ['pending', 'confirmed']);
            }])
            ->withCount(['bookings as completed_sessions' => function ($query) {
                $query->where('status', 'completed');
            }])
            ->get();

        return Inertia::render('Parent/Children/Index', [
            'children' => $children
        ]);
    }

    /**
     * Afficher le formulaire de création d'un enfant
     */
    public function create()
    {
        $levels = Level::with('cycle')->get();

        return Inertia::render('Parent/Children/Create', [
            'levels' => $levels
        ]);
    }

    /**
     * Enregistrer un nouvel enfant
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:1|max:18',
            'grade_level' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'string'
        ]);

        $data = $request->only(['name', 'age', 'grade_level', 'is_active']);
        $data['parent_id'] = Auth::id();
        $data['is_active'] = $request->is_active === '1';

        // Gérer l'upload de l'avatar
        if ($request->hasFile('avatar')) {
            $data['avatar'] = $request->file('avatar')->store('children/avatars', 'public');
        }

        Child::create($data);

        return redirect()->route('parent.children.index')
            ->with('success', 'Profil d\'enfant créé avec succès.');
    }

    /**
     * Afficher le formulaire d'édition d'un enfant
     */
    public function edit(Child $child)
    {
        // Vérifier que l'enfant appartient au parent connecté
        if ($child->parent_id !== Auth::id()) {
            abort(403);
        }

        $levels = Level::with('cycle')->get();

        return Inertia::render('Parent/Children/Edit', [
            'child' => $child,
            'levels' => $levels
        ]);
    }

    /**
     * Mettre à jour un enfant
     */
    public function update(Request $request, Child $child)
    {
        // Vérifier que l'enfant appartient au parent connecté
        if ($child->parent_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:1|max:18',
            'grade_level' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean'
        ]);

        $data = $request->only(['name', 'age', 'grade_level', 'is_active']);

        // Gérer l'upload de l'avatar
        if ($request->hasFile('avatar')) {
            // Supprimer l'ancien avatar s'il existe
            if ($child->avatar) {
                Storage::disk('public')->delete($child->avatar);
            }
            $data['avatar'] = $request->file('avatar')->store('children/avatars', 'public');
        }

        $child->update($data);

        return redirect()->route('parent.children.index')
            ->with('success', 'Profil d\'enfant mis à jour avec succès.');
    }

    /**
     * Supprimer un enfant
     */
    public function destroy(Child $child)
    {
        // Vérifier que l'enfant appartient au parent connecté
        if ($child->parent_id !== Auth::id()) {
            abort(403);
        }

        // Vérifier qu'il n'y a pas de réservations actives
        $activeBookings = $child->bookings()
            ->whereIn('status', ['pending', 'confirmed'])
            ->count();

        if ($activeBookings > 0) {
            return redirect()->route('parent.children.index')
                ->with('error', 'Impossible de supprimer cet enfant car il a des réservations actives.');
        }

        // Supprimer l'avatar s'il existe
        if ($child->avatar) {
            Storage::disk('public')->delete($child->avatar);
        }

        $child->delete();

        return redirect()->route('parent.children.index')
            ->with('success', 'Profil d\'enfant supprimé avec succès.');
    }
}
