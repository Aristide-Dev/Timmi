<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Rôle Super Admin
        Role::create([
            'name' => 'Super Admin',
            'slug' => 'super-admin',
            'description' => 'Rôle avec tous les privilèges',
            'is_default' => false,
            'is_admin' => true,
            'permissions' => null, // Les admins ont toutes les permissions
        ]);

        // Rôle Admin
        Role::create([
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'Rôle administrateur avec accès à la plupart des fonctionnalités',
            'is_default' => false,
            'is_admin' => true,
            'permissions' => null,
        ]);

        // Rôle Modérateur
        Role::create([
            'name' => 'Modérateur',
            'slug' => 'moderator',
            'description' => 'Rôle pour la modération du contenu',
            'is_default' => false,
            'is_admin' => false,
            'permissions' => json_encode([
                'users.view',
                'content.create',
                'content.edit',
                'content.delete',
                'comments.moderate',
            ]),
        ]);

        // Rôle Éditeur
        Role::create([
            'name' => 'Éditeur',
            'slug' => 'editor',
            'description' => 'Rôle pour la gestion du contenu',
            'is_default' => false,
            'is_admin' => false,
            'permissions' => json_encode([
                'content.create',
                'content.edit',
                'content.delete',
            ]),
        ]);

        // Rôle Utilisateur
        Role::create([
            'name' => 'Utilisateur',
            'slug' => 'user',
            'description' => 'Rôle par défaut pour les nouveaux utilisateurs',
            'is_default' => true,
            'is_admin' => false,
            'permissions' => json_encode([
                'profile.edit',
                'comments.create',
            ]),
        ]);
    }
}