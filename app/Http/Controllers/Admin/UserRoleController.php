<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserRoleController extends Controller
{
    /**
     * Afficher la liste des utilisateurs avec leurs rôles.
     */
    public function index(): Response
    {
        $users = User::with('roles')->paginate(15);

        return Inertia::render('Admin/UserRoles/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Afficher le formulaire d'attribution de rôles à un utilisateur.
     */
    public function edit(User $user): Response
    {
        $roles = Role::all();
        $userRoles = $user->roles->pluck('id')->toArray();

        return Inertia::render('Admin/UserRoles/Edit', [
            'user' => $user,
            'roles' => $roles,
            'userRoles' => $userRoles,
        ]);
    }

    /**
     * Mettre à jour les rôles d'un utilisateur.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'roles' => ['required', 'array'],
            'roles.*' => ['exists:roles,id'],
        ]);

        $user->roles()->sync($validated['roles']);

        return redirect()->route('admin.user-roles.index')
            ->with('success', 'Rôles de l\'utilisateur mis à jour avec succès.');
    }

    /**
     * Ajouter un rôle à un utilisateur.
     */
    public function addRole(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'role_id' => ['required', 'exists:roles,id'],
        ]);

        if (!$user->roles()->where('role_id', $validated['role_id'])->exists()) {
            $user->roles()->attach($validated['role_id']);
            return back()->with('success', 'Rôle ajouté avec succès.');
        }

        return back()->with('info', 'L\'utilisateur a déjà ce rôle.');
    }

    /**
     * Retirer un rôle d'un utilisateur.
     */
    public function removeRole(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'role_id' => ['required', 'exists:roles,id'],
        ]);

        $user->roles()->detach($validated['role_id']);

        return back()->with('success', 'Rôle retiré avec succès.');
    }
}