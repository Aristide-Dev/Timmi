<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subject;
use Illuminate\Support\Str;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            // Sciences
            [
                'name' => 'Mathématiques',
                'category' => 'Sciences',
                'icon' => 'Calculator',
                'description' => 'Cours de mathématiques pour tous les niveaux',
            ],
            [
                'name' => 'Physique',
                'category' => 'Sciences',
                'icon' => 'Atom',
                'description' => 'Cours de physique et sciences physiques',
            ],
            [
                'name' => 'Chimie',
                'category' => 'Sciences',
                'icon' => 'Flask',
                'description' => 'Cours de chimie pour collège et lycée',
            ],
            [
                'name' => 'Sciences de la Vie et de la Terre',
                'category' => 'Sciences',
                'icon' => 'Leaf',
                'description' => 'Cours de SVT et biologie',
            ],
            // Langues
            [
                'name' => 'Français',
                'category' => 'Langues',
                'icon' => 'BookOpen',
                'description' => 'Cours de français, grammaire et littérature',
            ],
            [
                'name' => 'Anglais',
                'category' => 'Langues',
                'icon' => 'Globe',
                'description' => 'Cours d\'anglais et conversation',
            ],
            [
                'name' => 'Espagnol',
                'category' => 'Langues',
                'icon' => 'Languages',
                'description' => 'Cours d\'espagnol pour débutants et avancés',
            ],
            [
                'name' => 'Allemand',
                'category' => 'Langues',
                'icon' => 'Languages',
                'description' => 'Cours d\'allemand tous niveaux',
            ],
            [
                'name' => 'Arabe',
                'category' => 'Langues',
                'icon' => 'Languages',
                'description' => 'Cours d\'arabe classique et dialectal',
            ],
            // Sciences humaines
            [
                'name' => 'Histoire-Géographie',
                'category' => 'Sciences humaines',
                'icon' => 'MapPin',
                'description' => 'Cours d\'histoire et de géographie',
            ],
            [
                'name' => 'Philosophie',
                'category' => 'Sciences humaines',
                'icon' => 'Brain',
                'description' => 'Cours de philosophie pour Terminale',
            ],
            [
                'name' => 'Économie',
                'category' => 'Sciences humaines',
                'icon' => 'TrendingUp',
                'description' => 'Cours d\'économie et sciences économiques',
            ],
            // Autres
            [
                'name' => 'Informatique',
                'category' => 'Autres',
                'icon' => 'Computer',
                'description' => 'Cours d\'informatique et programmation',
            ],
            [
                'name' => 'Musique',
                'category' => 'Autres',
                'icon' => 'Music',
                'description' => 'Cours de musique et solfège',
            ],
            [
                'name' => 'Arts plastiques',
                'category' => 'Autres',
                'icon' => 'Palette',
                'description' => 'Cours de dessin et arts plastiques',
            ],
            [
                'name' => 'Éducation physique',
                'category' => 'Autres',
                'icon' => 'Activity',
                'description' => 'Cours de sport et préparation physique',
            ],
        ];

        foreach ($subjects as $index => $subject) {
            Subject::create([
                'name' => $subject['name'],
                'slug' => Str::slug($subject['name']),
                'category' => $subject['category'],
                'description' => $subject['description'],
                'icon' => $subject['icon'],
                'is_active' => true,
                'order' => $index + 1,
            ]);
        }
    }
}
