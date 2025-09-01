<?php

namespace Database\Seeders;

use App\Models\Cycle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CycleSeeder extends Seeder
{
    public function run(): void
    {
        $cycles = [
            [
                'name' => 'Maternelle',
                'slug' => 'maternelle',
                'description' => 'Cycle d\'enseignement préélémentaire pour les enfants de 3 à 6 ans',
                'min_age' => 3,
                'max_age' => 6,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Primaire',
                'slug' => 'primaire',
                'description' => 'Cycle d\'enseignement élémentaire pour les enfants de 6 à 11 ans',
                'min_age' => 6,
                'max_age' => 11,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Collège',
                'slug' => 'college',
                'description' => 'Cycle d\'enseignement secondaire premier degré pour les adolescents de 11 à 15 ans',
                'min_age' => 11,
                'max_age' => 15,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Lycée',
                'slug' => 'lycee',
                'description' => 'Cycle d\'enseignement secondaire second degré pour les adolescents de 15 à 18 ans',
                'min_age' => 15,
                'max_age' => 18,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Supérieur',
                'slug' => 'superieur',
                'description' => 'Enseignement supérieur pour les étudiants de 18 ans et plus',
                'min_age' => 18,
                'max_age' => null,
                'is_active' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($cycles as $cycle) {
            Cycle::create($cycle);
        }

        $this->command->info('Cycles éducatifs créés avec succès !');
    }
}
