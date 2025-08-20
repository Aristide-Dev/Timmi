<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Appeler les seeders dans l'ordre approprié
        $this->call([
            SettingSeeder::class,
            SubjectSeeder::class,
            CitySeeder::class,
            CommuneSeeder::class,
            NeighborhoodSeeder::class,
            UserSeeder::class,
        ]);
    }
}
