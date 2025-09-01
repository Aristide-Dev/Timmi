<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = [
            // Matières principales
            [
                'name' => 'Mathématiques',
                'slug' => 'mathematiques',
                'description' => 'Mathématiques : algèbre, géométrie, arithmétique',
                'icon' => 'calculator',
                'color' => '#3b82f6',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Français',
                'slug' => 'francais',
                'description' => 'Langue française : grammaire, conjugaison, littérature',
                'icon' => 'book-open',
                'color' => '#ef4444',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Histoire',
                'slug' => 'histoire',
                'description' => 'Histoire : chronologie, événements historiques',
                'icon' => 'landmark',
                'color' => '#8b5cf6',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Géographie',
                'slug' => 'geographie',
                'description' => 'Géographie : cartographie, pays, relief',
                'icon' => 'globe',
                'color' => '#10b981',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Sciences',
                'slug' => 'sciences',
                'description' => 'Sciences : biologie, physique, chimie',
                'icon' => 'flask-conical',
                'color' => '#f59e0b',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Anglais',
                'slug' => 'anglais',
                'description' => 'Langue anglaise : grammaire, vocabulaire, conversation',
                'icon' => 'languages',
                'color' => '#06b6d4',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Espagnol',
                'slug' => 'espagnol',
                'description' => 'Langue espagnole : grammaire, vocabulaire, conversation',
                'icon' => 'languages',
                'color' => '#f97316',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Allemand',
                'slug' => 'allemand',
                'description' => 'Langue allemande : grammaire, vocabulaire, conversation',
                'icon' => 'languages',
                'color' => '#84cc16',
                'is_active' => true,
                'sort_order' => 8,
            ],
            [
                'name' => 'Italien',
                'slug' => 'italien',
                'description' => 'Langue italienne : grammaire, vocabulaire, conversation',
                'icon' => 'languages',
                'color' => '#ec4899',
                'is_active' => true,
                'sort_order' => 9,
            ],
            [
                'name' => 'Philosophie',
                'slug' => 'philosophie',
                'description' => 'Philosophie : pensée critique, auteurs, concepts',
                'icon' => 'lightbulb',
                'color' => '#6366f1',
                'is_active' => true,
                'sort_order' => 10,
            ],
            [
                'name' => 'Économie',
                'slug' => 'economie',
                'description' => 'Économie : microéconomie, macroéconomie, marchés',
                'icon' => 'trending-up',
                'color' => '#22c55e',
                'is_active' => true,
                'sort_order' => 11,
            ],
            [
                'name' => 'SVT',
                'slug' => 'svt',
                'description' => 'Sciences de la Vie et de la Terre',
                'icon' => 'leaf',
                'color' => '#16a34a',
                'is_active' => true,
                'sort_order' => 12,
            ],
            [
                'name' => 'Physique-Chimie',
                'slug' => 'physique-chimie',
                'description' => 'Physique et Chimie : mécanique, électricité, réactions',
                'icon' => 'atom',
                'color' => '#dc2626',
                'is_active' => true,
                'sort_order' => 13,
            ],
            [
                'name' => 'Technologie',
                'slug' => 'technologie',
                'description' => 'Technologie : informatique, électronique, mécanique',
                'icon' => 'cpu',
                'color' => '#7c3aed',
                'is_active' => true,
                'sort_order' => 14,
            ],
            [
                'name' => 'Arts Plastiques',
                'slug' => 'arts-plastiques',
                'description' => 'Arts plastiques : dessin, peinture, sculpture',
                'icon' => 'palette',
                'color' => '#eab308',
                'is_active' => true,
                'sort_order' => 15,
            ],
            [
                'name' => 'Musique',
                'slug' => 'musique',
                'description' => 'Musique : solfège, instruments, histoire de la musique',
                'icon' => 'music',
                'color' => '#f43f5e',
                'is_active' => true,
                'sort_order' => 16,
            ],
            [
                'name' => 'EPS',
                'slug' => 'eps',
                'description' => 'Éducation Physique et Sportive',
                'icon' => 'dumbbell',
                'color' => '#0891b2',
                'is_active' => true,
                'sort_order' => 17,
            ],
            [
                'name' => 'Informatique',
                'slug' => 'informatique',
                'description' => 'Informatique : programmation, algorithmes, bureautique',
                'icon' => 'code',
                'color' => '#0ea5e9',
                'is_active' => true,
                'sort_order' => 20,
            ],
            [
                'name' => 'Méthodologie',
                'slug' => 'methodologie',
                'description' => 'Méthodologie : organisation, techniques d\'apprentissage',
                'icon' => 'target',
                'color' => '#64748b',
                'is_active' => true,
                'sort_order' => 21,
            ],
            [
                'name' => 'Aide aux devoirs',
                'slug' => 'aide-aux-devoirs',
                'description' => 'Accompagnement scolaire et aide aux devoirs',
                'icon' => 'help-circle',
                'color' => '#14b8a6',
                'is_active' => true,
                'sort_order' => 22,
            ],
        ];

        foreach ($subjects as $subject) {
            Subject::create($subject);
        }

        $this->command->info('Matières créées avec succès !');
    }
}
