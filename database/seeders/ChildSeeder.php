<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Child;
use Illuminate\Support\Facades\Hash;

class ChildSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Trouver l'utilisateur parent
        $parent = User::whereHas('roles', function ($q) {
            $q->where('slug', 'parent');
        })->first();

        if ($parent) {
            // Créer des enfants pour le parent
            Child::create([
                'parent_id' => $parent->id,
                'name' => 'Marie Diallo',
                'age' => 12,
                'grade_level' => '6ème',
                'is_active' => true,
            ]);

            Child::create([
                'parent_id' => $parent->id,
                'name' => 'Amadou Diallo',
                'age' => 15,
                'grade_level' => '3ème',
                'is_active' => true,
            ]);

            Child::create([
                'parent_id' => $parent->id,
                'name' => 'Fatou Diallo',
                'age' => 8,
                'grade_level' => 'CE2',
                'is_active' => true,
            ]);

            $this->command->info('Enfants créés pour ' . $parent->name);
        } else {
            $this->command->warn('Aucun parent trouvé pour créer des enfants');
        }
    }
}
