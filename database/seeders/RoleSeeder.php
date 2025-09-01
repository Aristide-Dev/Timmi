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
            'description' => 'Rôle avec tous les privilèges sur la plateforme Timmi',
            'is_default' => false,
            'is_admin' => true,
            'permissions' => null, // Les super admins ont toutes les permissions
        ]);

        // Rôle Admin
        Role::create([
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'Rôle administrateur pour la gestion de la plateforme Timmi',
            'is_default' => false,
            'is_admin' => true,
            'permissions' => json_encode([
                'users.view',
                'users.edit',
                'users.delete',
                'professors.validate',
                'professors.manage',
                'parents.manage',
                'students.manage',
                'reservations.manage',
                'payments.manage',
                'disputes.resolve',
                'content.manage',
                'statistics.view',
                'reports.generate',
                'advertisements.manage',
            ]),
        ]);

        // Rôle Parent
        Role::create([
            'name' => 'Parent',
            'slug' => 'parent',
            'description' => 'Rôle pour les parents d\'élèves utilisant la plateforme',
            'is_default' => false,
            'is_admin' => false,
            'permissions' => json_encode([
                'profile.edit',
                'children.manage',
                'professors.search',
                'professors.view',
                'reservations.create',
                'reservations.view',
                'reservations.cancel',
                'payments.make',
                'payments.view',
                'reviews.create',
                'disputes.create',
                'notifications.receive',
            ]),
        ]);

        // Rôle Professeur
        Role::create([
            'name' => 'Professeur',
            'slug' => 'professor',
            'description' => 'Rôle pour les professeurs particuliers',
            'is_default' => false,
            'is_admin' => false,
            'permissions' => json_encode([
                'profile.edit',
                'profile.complete',
                'subjects.manage',
                'levels.manage',
                'zones.manage',
                'schedule.manage',
                'reservations.view',
                'reservations.confirm',
                'reservations.mark-completed',
                'payments.view',
                'earnings.view',
                'notifications.receive',
            ]),
        ]);

        // Rôle Élève/Étudiant
        Role::create([
            'name' => 'Élève/Étudiant',
            'slug' => 'student',
            'description' => 'Rôle pour les élèves/étudiants (peut être lié à un compte parent)',
            'is_default' => false,
            'is_admin' => false,
            'permissions' => json_encode([
                'profile.view',
                'courses.view',
                'reviews.view',
            ]),
        ]);

        // Rôle Utilisateur (par défaut)
        Role::create([
            'name' => 'Utilisateur',
            'slug' => 'user',
            'description' => 'Rôle par défaut pour les nouveaux utilisateurs non assignés',
            'is_default' => true,
            'is_admin' => false,
            'permissions' => json_encode([
                'profile.edit',
                'profile.view',
            ]),
        ]);
    }
}