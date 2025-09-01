<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupération des rôles
        $superAdminRole = Role::where('slug', 'super-admin')->first();
        $adminRole = Role::where('slug', 'admin')->first();
        $parentRole = Role::where('slug', 'parent')->first();
        $professorRole = Role::where('slug', 'professor')->first();
        $studentRole = Role::where('slug', 'student')->first();

        // Super Admin
        $superAdmin = User::create([
            'name' => 'Super Admin Timmi',
            'email' => 'superadmin@timmi.com',
            'phone' => '620000001',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $superAdmin->roles()->attach($superAdminRole->id);

        // Admin
        $admin = User::create([
            'name' => 'Admin Timmi',
            'email' => 'admin@timmi.com',
            'phone' => '620000002',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $admin->roles()->attach($adminRole->id);

        // Parents
        $parent1 = User::create([
            'name' => 'Marie Dupont',
            'email' => 'marie.dupont@email.com',
            'phone' => '620000003',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $parent1->roles()->attach($parentRole->id);

        $parent2 = User::create([
            'name' => 'Jean Martin',
            'email' => 'jean.martin@email.com',
            'phone' => '620000004',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $parent2->roles()->attach($parentRole->id);

        $parent3 = User::create([
            'name' => 'Sophie Bernard',
            'email' => 'sophie.bernard@email.com',
            'phone' => '620000005',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $parent3->roles()->attach($parentRole->id);

        // Professeurs
        $professor1 = User::create([
            'name' => 'Dr. Pierre Dubois',
            'email' => 'pierre.dubois@email.com',
            'phone' => '620000006',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $professor1->roles()->attach($professorRole->id);

        $professor2 = User::create([
            'name' => 'Prof. Anne Moreau',
            'email' => 'anne.moreau@email.com',
            'phone' => '620000007',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $professor2->roles()->attach($professorRole->id);

        $professor3 = User::create([
            'name' => 'Prof. Michel Leroy',
            'email' => 'michel.leroy@email.com',
            'phone' => '620000008',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $professor3->roles()->attach($professorRole->id);

        $professor4 = User::create([
            'name' => 'Prof. Claire Rousseau',
            'email' => 'claire.rousseau@email.com',
            'phone' => '620000009',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $professor4->roles()->attach($professorRole->id);

        // Élèves/Étudiants
        $student1 = User::create([
            'name' => 'Lucas Dupont',
            'email' => 'lucas.dupont@email.com',
            'phone' => '620000010',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $student1->roles()->attach($studentRole->id);

        $student2 = User::create([
            'name' => 'Emma Martin',
            'email' => 'emma.martin@email.com',
            'phone' => '620000011',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $student2->roles()->attach($studentRole->id);

        $student3 = User::create([
            'name' => 'Thomas Bernard',
            'email' => 'thomas.bernard@email.com',
            'phone' => '620000012',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $student3->roles()->attach($studentRole->id);

        // Utilisateur avec plusieurs rôles (exemple : parent qui est aussi professeur)
        $parentProfessor = User::create([
            'name' => 'Isabelle Petit',
            'email' => 'isabelle.petit@email.com',
            'phone' => '620000013',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $parentProfessor->roles()->attach([$parentRole->id, $professorRole->id]);

        $this->command->info('Utilisateurs créés avec succès !');
        $this->command->info('Super Admin: superadmin@timmi.com / password123');
        $this->command->info('Admin: admin@timmi.com / password123');
        $this->command->info('Parents: marie.dupont@email.com, jean.martin@email.com, sophie.bernard@email.com / password123');
        $this->command->info('Professeurs: pierre.dubois@email.com, anne.moreau@email.com, michel.leroy@email.com, claire.rousseau@email.com / password123');
        $this->command->info('Élèves: lucas.dupont@email.com, emma.martin@email.com, thomas.bernard@email.com / password123');
    }
}
