<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Afficher la liste de tous les utilisateurs
     */
    public function index(Request $request): Response
    {
        $query = User::with(['roles']);

        // Filtres
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->whereHas('roles', function ($q) use ($request) {
                $q->where('slug', $request->role);
            });
        }

        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->whereNotNull('email_verified_at');
            } elseif ($request->status === 'inactive') {
                $query->whereNull('email_verified_at');
            }
        }

        if ($request->filled('verified')) {
            $query->where('is_verified', $request->boolean('verified'));
        }

        $users = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role', 'status', 'verified']),
        ]);
    }

    /**
     * Afficher les détails d'un utilisateur
     */
    public function show(User $user): Response
    {
        $user->load(['roles', 'subjects', 'levels', 'cities', 'certificates', 'children', 'bookings']);

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
        ]);
    }

    /**
     * Afficher le formulaire d'édition d'un utilisateur
     */
    public function edit(User $user): Response
    {
        $user->load(['roles']);

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Mettre à jour un utilisateur
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'is_verified' => 'boolean',
            'is_available' => 'boolean',
            'bio' => 'nullable|string',
            'hourly_rate' => 'nullable|numeric|min:0',
            'experience_years' => 'nullable|integer|min:0',
            'education' => 'nullable|string',
            'specializations' => 'nullable|array',
            'languages' => 'nullable|array',
        ]);

        $user->update($validated);

        return redirect()->route('admin.users.show', $user)
            ->with('success', 'Utilisateur mis à jour avec succès.');
    }

    /**
     * Supprimer un utilisateur
     */
    public function destroy(User $user): RedirectResponse
    {
        // Empêcher la suppression de l'utilisateur actuel
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Vous ne pouvez pas supprimer votre propre compte.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'Utilisateur supprimé avec succès.');
    }

    /**
     * Toggle le statut de vérification d'un utilisateur
     */
    public function toggleVerification(User $user): RedirectResponse
    {
        $user->update(['is_verified' => !$user->is_verified]);

        $status = $user->is_verified ? 'vérifié' : 'non vérifié';

        return back()->with('success', "Utilisateur {$status} avec succès.");
    }

    /**
     * Toggle le statut d'activité d'un utilisateur
     */
    public function toggleStatus(User $user): RedirectResponse
    {
        $user->update(['is_available' => !$user->is_available]);

        $status = $user->is_available ? 'activé' : 'désactivé';

        return back()->with('success', "Utilisateur {$status} avec succès.");
    }

    /**
     * Réinitialiser le mot de passe d'un utilisateur
     */
    public function resetPassword(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Mot de passe réinitialisé avec succès.');
    }
}
