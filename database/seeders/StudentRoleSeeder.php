<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class StudentRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate(
            ['slug' => 'student'],
            [
                'name' => 'Étudiant',
                'description' => 'Utilisateur étudiant pouvant réserver des cours directement',
                'is_admin' => false,
                'permissions' => [
                    'view_own_profile',
                    'edit_own_profile',
                    'search_professors',
                    'view_professor_profiles',
                    'create_bookings',
                    'view_own_bookings',
                    'edit_own_bookings',
                    'cancel_own_bookings',
                    'join_sessions',
                    'create_feedback',
                    'create_reviews',
                ],
            ]
        );
    }
}
