<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RoleRequest;
use App\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    /**
     * Afficher la liste des rôles.
     */
    public function index(): Response
    {
        $roles = Role::all();

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
        ]);
    }

    /**
     * Afficher le formulaire de création d'un rôle.
     */
    public function create(): Response
    {
        // Liste des permissions disponibles pour le formulaire
        $availablePermissions = $this->getAvailablePermissions();

        return Inertia::render('Admin/Roles/Create', [
            'availablePermissions' => $availablePermissions,
        ]);
    }

    /**
     * Enregistrer un nouveau rôle.
     */
    public function store(RoleRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        
        // Convertir les permissions en JSON si présentes
        if (isset($validatedData['permissions'])) {
            $validatedData['permissions'] = $validatedData['permissions'];
        }

        Role::create($validatedData);

        return redirect()->route('admin.roles.index')
            ->with('success', 'Rôle créé avec succès.');
    }

    /**
     * Afficher les détails d'un rôle.
     */
    public function show(Role $role): Response
    {
        return Inertia::render('Admin/Roles/Show', [
            'role' => $role,
        ]);
    }

    /**
     * Afficher le formulaire d'édition d'un rôle.
     */
    public function edit(Role $role): Response
    {
        // Liste des permissions disponibles pour le formulaire
        $availablePermissions = $this->getAvailablePermissions();

        return Inertia::render('Admin/Roles/Edit', [
            'role' => $role,
            'availablePermissions' => $availablePermissions,
        ]);
    }

    /**
     * Mettre à jour un rôle.
     */
    public function update(RoleRequest $request, Role $role): RedirectResponse
    {
        $validatedData = $request->validated();
        
        // Convertir les permissions en JSON si présentes
        if (isset($validatedData['permissions'])) {
            $validatedData['permissions'] = $validatedData['permissions'];
        }

        $role->update($validatedData);

        return redirect()->route('admin.roles.index')
            ->with('success', 'Rôle mis à jour avec succès.');
    }

    /**
     * Supprimer un rôle.
     */
    public function destroy(Role $role): RedirectResponse
    {
        // Empêcher la suppression du rôle par défaut
        if ($role->is_default) {
            return back()->with('error', 'Vous ne pouvez pas supprimer le rôle par défaut.');
        }

        $role->delete();

        return redirect()->route('admin.roles.index')
            ->with('success', 'Rôle supprimé avec succès.');
    }

    /**
     * Obtenir la liste des permissions disponibles.
     */
    private function getAvailablePermissions(): array
    {
        return [
            'users' => [
                'users.view' => 'Voir les utilisateurs',
                'users.create' => 'Créer des utilisateurs',
                'users.edit' => 'Modifier des utilisateurs',
                'users.delete' => 'Supprimer des utilisateurs',
            ],
            'content' => [
                'content.view' => 'Voir le contenu',
                'content.create' => 'Créer du contenu',
                'content.edit' => 'Modifier du contenu',
                'content.delete' => 'Supprimer du contenu',
            ],
            'comments' => [
                'comments.view' => 'Voir les commentaires',
                'comments.create' => 'Créer des commentaires',
                'comments.edit' => 'Modifier des commentaires',
                'comments.delete' => 'Supprimer des commentaires',
                'comments.moderate' => 'Modérer les commentaires',
            ],
            'settings' => [
                'settings.view' => 'Voir les paramètres',
                'settings.edit' => 'Modifier les paramètres',
            ],
        ];
    }
}