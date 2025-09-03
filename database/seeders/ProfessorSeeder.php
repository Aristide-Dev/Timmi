<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Subject;
use App\Models\Level;
use App\Models\City;
use Illuminate\Support\Facades\Hash;

class ProfessorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $professorRole = Role::where('slug', 'professor')->first();
        
        if (!$professorRole) {
            $this->command->error('Rôle professor non trouvé. Exécutez d\'abord RoleSeeder.');
            return;
        }

        // Récupérer quelques sujets, niveaux et villes pour les assigner
        $subjects = Subject::take(3)->get();
        $levels = Level::take(5)->get();
        $cities = City::take(3)->get();

        if ($subjects->isEmpty() || $levels->isEmpty() || $cities->isEmpty()) {
            $this->command->error('Données manquantes. Exécutez d\'abord les seeders pour subjects, levels et cities.');
            return;
        }

        $professors = [
            [
                'name' => 'Dr. Amara Diallo',
                'email' => 'amara.diallo@example.com',
                'phone' => '+224612345679',
                'password' => Hash::make('password'),
                'bio' => 'Professeur de mathématiques avec 10 ans d\'expérience. Spécialisé dans l\'enseignement des mathématiques au collège et lycée.',
                'hourly_rate' => 15000,
                'experience_years' => 10,
                'education' => 'Master en Mathématiques, Université de Conakry',
                'specializations' => ['Algèbre', 'Géométrie', 'Calcul'],
                'languages' => ['Français', 'Soussou'],
                'is_verified' => true,
                'is_available' => true,
                'rating' => 4.8,
                'total_reviews' => 25,
            ],
            [
                'name' => 'Mme Fatoumata Camara',
                'email' => 'fatoumata.camara@example.com',
                'phone' => '+224612345677',
                'password' => Hash::make('password'),
                'bio' => 'Enseignante de français passionnée. J\'aide les élèves à améliorer leur expression écrite et orale.',
                'hourly_rate' => 12000,
                'experience_years' => 7,
                'education' => 'Licence en Lettres Modernes, Université de Kankan',
                'specializations' => ['Grammaire', 'Littérature', 'Expression écrite'],
                'languages' => ['Français', 'Malinké'],
                'is_verified' => true,
                'is_available' => true,
                'rating' => 4.6,
                'total_reviews' => 18,
            ],
            [
                'name' => 'M. Ibrahima Bah',
                'email' => 'ibrahima.bah@example.com',
                'phone' => '+224612345681',
                'password' => Hash::make('password'),
                'bio' => 'Professeur de physique-chimie. J\'utilise des méthodes innovantes pour rendre les sciences accessibles.',
                'hourly_rate' => 18000,
                'experience_years' => 12,
                'education' => 'Master en Physique, Université de Conakry',
                'specializations' => ['Physique', 'Chimie', 'Sciences expérimentales'],
                'languages' => ['Français', 'Pular'],
                'is_verified' => true,
                'is_available' => true,
                'rating' => 4.9,
                'total_reviews' => 32,
            ],
            [
                'name' => 'Mme Mariama Keita',
                'email' => 'mariama.keita@example.com',
                'phone' => '+224612345682',
                'password' => Hash::make('password'),
                'bio' => 'Professeure d\'anglais, spécialiste de la communication orale et écrite.',
                'hourly_rate' => 14000,
                'experience_years' => 8,
                'education' => 'Licence en Anglais, Université Gamal Abdel Nasser',
                'specializations' => ['Conversation', 'Grammaire anglaise', 'Traduction'],
                'languages' => ['Français', 'Anglais'],
                'is_verified' => true,
                'is_available' => false,
                'rating' => 4.7,
                'total_reviews' => 20,
            ],
            [
                'name' => 'M. Alhassane Sylla',
                'email' => 'alhassane.sylla@example.com',
                'phone' => '+224612345684',
                'password' => Hash::make('password'),
                'bio' => 'Professeur d\'histoire-géographie, passionné par la pédagogie active.',
                'hourly_rate' => 13000,
                'experience_years' => 9,
                'education' => 'Master en Histoire, Université de Kankan',
                'specializations' => ['Histoire africaine', 'Géopolitique', 'Cartographie'],
                'languages' => ['Français'],
                'is_verified' => true,
                'is_available' => true,
                'rating' => 4.5,
                'total_reviews' => 15,
            ],
            [
                'name' => 'Mme Aissatou Barry',
                'email' => 'aissatou.barry@example.com',
                'phone' => '+224612345683',
                'password' => Hash::make('password'),
                'bio' => 'Enseignante en biologie passionnée par les sciences de la vie et l\'écologie.',
                'hourly_rate' => 12500,
                'experience_years' => 6,
                'education' => 'Licence en Biologie, Université de Labé',
                'specializations' => ['Écologie', 'Génétique', 'Anatomie'],
                'languages' => ['Français', 'Pular'],
                'is_verified' => true,
                'is_available' => true,
                'rating' => 4.4,
                'total_reviews' => 12,
            ],
            [
                'name' => 'M. Mamadou Conde',
                'email' => 'mamadou.conde@example.com',
                'phone' => '+224612345647',
                'password' => Hash::make('password'),
                'bio' => 'Professeur d\'informatique, spécialisé en programmation et bases de données.',
                'hourly_rate' => 20000,
                'experience_years' => 11,
                'education' => 'Master en Informatique, Université Gamal Abdel Nasser',
                'specializations' => ['Programmation', 'Bases de données', 'Sécurité informatique'],
                'languages' => ['Français', 'Anglais'],
                'is_verified' => true,
                'is_available' => true,
                'rating' => 4.9,
                'total_reviews' => 40,
            ],
            [
                'name' => 'Mme Khady Sow',
                'email' => 'khady.sow@example.com',
                'phone' => '+224612345685',
                'password' => Hash::make('password'),
                'bio' => 'Professeure de philosophie, j\'aide les élèves à développer leur esprit critique.',
                'hourly_rate' => 13500,
                'experience_years' => 9,
                'education' => 'Licence en Philosophie, Université de Conakry',
                'specializations' => ['Éthique', 'Logique', 'Philosophie africaine'],
                'languages' => ['Français'],
                'is_verified' => true,
                'is_available' => false,
                'rating' => 4.3,
                'total_reviews' => 14,
            ],
            [
                'name' => 'M. Ousmane Bangoura',
                'email' => 'ousmane.bangoura@example.com',
                'phone' => '+224612345686',
                'password' => Hash::make('password'),
                'bio' => 'Professeur d\'économie et gestion avec 15 ans d\'expérience.',
                'hourly_rate' => 17000,
                'experience_years' => 15,
                'education' => 'Master en Économie, Université de Kankan',
                'specializations' => ['Macroéconomie', 'Gestion', 'Comptabilité'],
                'languages' => ['Français'],
                'is_verified' => true,
                'is_available' => true,
                'rating' => 4.8,
                'total_reviews' => 29,
            ],
            [
                'name' => 'Mme Hadja Bah',
                'email' => 'hadja.bah@example.com',
                'phone' => '+224612345687',
                'password' => Hash::make('password'),
                'bio' => 'Professeure de sciences sociales, spécialiste de la sociologie et de l\'anthropologie.',
                'hourly_rate' => 12500,
                'experience_years' => 7,
                'education' => 'Licence en Sociologie, Université de Labé',
                'specializations' => ['Sociologie', 'Anthropologie', 'Sciences sociales'],
                'languages' => ['Français', 'Pular'],
                'is_verified' => true,
                'is_available' => true,
                'rating' => 4.5,
                'total_reviews' => 19,
            ],
        ];

        foreach ($professors as $professorData) {
            $professor = User::create($professorData);
            
            // Assigner le rôle professor
            $professor->roles()->attach($professorRole->id);
            
            // Assigner quelques sujets, niveaux et villes
            $professor->subjects()->attach($subjects->random(2)->pluck('id'));
            $professor->levels()->attach($levels->random(3)->pluck('id'));
            $professor->cities()->attach($cities->random(2)->pluck('id'));
            
            $this->command->info("Professeur créé: {$professor->name}");
        }

        $this->command->info('Seeders des professeurs terminé avec succès!');
    }
}
