<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // User::factory(10)->create();
        // Suppression de la création du test user par défaut
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CitySeeder::class,
            CycleSeeder::class,
            LevelSeeder::class,
            SubjectSeeder::class,
        ]);
    }
}
