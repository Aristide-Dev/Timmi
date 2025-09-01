<?php

namespace Database\Seeders;

use App\Models\Cycle;
use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    public function run(): void
    {
        // Récupérer les cycles
        $maternelle = Cycle::where('slug', 'maternelle')->first();
        $primaire = Cycle::where('slug', 'primaire')->first();
        $college = Cycle::where('slug', 'college')->first();
        $lycee = Cycle::where('slug', 'lycee')->first();
        $superieur = Cycle::where('slug', 'superieur')->first();

        $levels = [
            // Maternelle
            [
                'cycle_id' => $maternelle->id,
                'name' => 'Petite Section',
                'slug' => 'petite-section',
                'description' => 'Première année de maternelle (3-4 ans)',
                'grade_level' => 'PS',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'cycle_id' => $maternelle->id,
                'name' => 'Moyenne Section',
                'slug' => 'moyenne-section',
                'description' => 'Deuxième année de maternelle (4-5 ans)',
                'grade_level' => 'MS',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'cycle_id' => $maternelle->id,
                'name' => 'Grande Section',
                'slug' => 'grande-section',
                'description' => 'Troisième année de maternelle (5-6 ans)',
                'grade_level' => 'GS',
                'is_active' => true,
                'sort_order' => 3,
            ],

            // Primaire
            [
                'cycle_id' => $primaire->id,
                'name' => 'CP',
                'slug' => 'cp',
                'description' => 'Cours Préparatoire (6-7 ans)',
                'grade_level' => 'CP',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'cycle_id' => $primaire->id,
                'name' => 'CE1',
                'slug' => 'ce1',
                'description' => 'Cours Élémentaire 1 (7-8 ans)',
                'grade_level' => 'CE1',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'cycle_id' => $primaire->id,
                'name' => 'CE2',
                'slug' => 'ce2',
                'description' => 'Cours Élémentaire 2 (8-9 ans)',
                'grade_level' => 'CE2',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'cycle_id' => $primaire->id,
                'name' => 'CM1',
                'slug' => 'cm1',
                'description' => 'Cours Moyen 1 (9-10 ans)',
                'grade_level' => 'CM1',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'cycle_id' => $primaire->id,
                'name' => 'CM2',
                'slug' => 'cm2',
                'description' => 'Cours Moyen 2 (10-11 ans)',
                'grade_level' => 'CM2',
                'is_active' => true,
                'sort_order' => 8,
            ],

            // Collège
            [
                'cycle_id' => $college->id,
                'name' => '7ème Année',
                'slug' => '7eme',
                'description' => 'Sixième Année',
                'grade_level' => '7ème Année',
                'is_active' => true,
                'sort_order' => 9,
            ],
            [
                'cycle_id' => $college->id,
                'name' => '8ème Année',
                'slug' => '8eme',
                'description' => 'Cinquième Année',
                'grade_level' => '8ème Année',
                'is_active' => true,
                'sort_order' => 10,
            ],
            [
                'cycle_id' => $college->id,
                'name' => '9ème Année',
                'slug' => '9eme',
                'description' => 'Quatrième Année',
                'grade_level' => '9ème Année',
                'is_active' => true,
                'sort_order' => 11,
            ],
            [
                'cycle_id' => $college->id,
                'name' => '10ème Année',
                'slug' => '10eme',
                'description' => 'Troisième Année',
                'grade_level' => '10ème Année',
                'is_active' => true,
                'sort_order' => 12,
            ],

            // Lycée
            [
                'cycle_id' => $lycee->id,
                'name' => 'Seconde',
                'slug' => 'seconde',
                'description' => 'Seconde générale et technologique (15-16 ans)',
                'grade_level' => '2nde',
                'is_active' => true,
                'sort_order' => 13,
            ],
            [
                'cycle_id' => $lycee->id,
                'name' => 'Première',
                'slug' => 'premiere',
                'description' => 'Première générale et technologique (16-17 ans)',
                'grade_level' => '1ère',
                'is_active' => true,
                'sort_order' => 14,
            ],
            [
                'cycle_id' => $lycee->id,
                'name' => 'Terminale',
                'slug' => 'terminale',
                'description' => 'Terminale générale et technologique (17-18 ans)',
                'grade_level' => 'Term',
                'is_active' => true,
                'sort_order' => 15,
            ],

            // Supérieur
            [
                'cycle_id' => $superieur->id,
                'name' => 'Bac+1',
                'slug' => 'bac-plus-1',
                'description' => 'Première année d\'enseignement supérieur',
                'grade_level' => 'Bac+1',
                'is_active' => true,
                'sort_order' => 16,
            ],
            [
                'cycle_id' => $superieur->id,
                'name' => 'Bac+2',
                'slug' => 'bac-plus-2',
                'description' => 'Deuxième année d\'enseignement supérieur',
                'grade_level' => 'Bac+2',
                'is_active' => true,
                'sort_order' => 17,
            ],
            [
                'cycle_id' => $superieur->id,
                'name' => 'Bac+3',
                'slug' => 'bac-plus-3',
                'description' => 'Troisième année d\'enseignement supérieur (Licence)',
                'grade_level' => 'Bac+3',
                'is_active' => true,
                'sort_order' => 18,
            ],
            [
                'cycle_id' => $superieur->id,
                'name' => 'Bac+4',
                'slug' => 'bac-plus-4',
                'description' => 'Quatrième année d\'enseignement supérieur',
                'grade_level' => 'Bac+4',
                'is_active' => true,
                'sort_order' => 19,
            ],
            [
                'cycle_id' => $superieur->id,
                'name' => 'Bac+5',
                'slug' => 'bac-plus-5',
                'description' => 'Cinquième année d\'enseignement supérieur (Master)',
                'grade_level' => 'Bac+5',
                'is_active' => true,
                'sort_order' => 20,
            ],
        ];

        foreach ($levels as $level) {
            Level::create($level);
        }

        $this->command->info('Niveaux éducatifs créés avec succès !');
    }
}
