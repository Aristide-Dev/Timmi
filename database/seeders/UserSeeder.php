<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Child;
use App\Models\TeacherProfile;
use App\Models\Subject;
use App\Models\Availability;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer un administrateur
        $admin = User::create([
            'name' => 'Admin Timmi',
            'email' => 'admin@timmi.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '0600000000',
            'city' => 'Dakar',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Créer des parents
        $parent1 = User::create([
            'name' => 'Fatou Diop',
            'email' => 'parent1@timmi.com',
            'password' => Hash::make('password'),
            'role' => 'parent',
            'phone' => '0777123456',
            'city' => 'Dakar',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Ajouter des enfants au parent
        Child::create([
            'parent_id' => $parent1->id,
            'name' => 'Moussa Diop',
            'grade' => '6ème',
            'level' => 'Collège',
            'age' => 12,
        ]);

        Child::create([
            'parent_id' => $parent1->id,
            'name' => 'Awa Diop',
            'grade' => 'Terminale S',
            'level' => 'Lycée',
            'age' => 17,
        ]);

        $parent2 = User::create([
            'name' => 'Ousmane Sow',
            'email' => 'parent2@timmi.com',
            'password' => Hash::make('password'),
            'role' => 'parent',
            'phone' => '0766234567',
            'city' => 'Dakar',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        Child::create([
            'parent_id' => $parent2->id,
            'name' => 'Aissatou Sow',
            'grade' => '3ème',
            'level' => 'Collège',
            'age' => 14,
        ]);

        // Créer des professeurs
        $teacher1 = User::create([
            'name' => 'Dr. Mamadou Ndiaye',
            'email' => 'teacher1@timmi.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '0770987654',
            'city' => 'Dakar',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Profil du professeur 1
        $profile1 = TeacherProfile::create([
            'user_id' => $teacher1->id,
            'bio' => 'Professeur de mathématiques avec 10 ans d\'expérience. Spécialisé dans la préparation aux examens.',
            'diplomas' => [
                ['name' => 'Doctorat en Mathématiques', 'year' => '2015', 'institution' => 'UCAD'],
                ['name' => 'Master en Mathématiques Appliquées', 'year' => '2010', 'institution' => 'UCAD'],
            ],
            'experiences' => [
                ['title' => 'Professeur de Mathématiques', 'institution' => 'Lycée Blaise Diagne', 'years' => '5 ans'],
                ['title' => 'Tuteur privé', 'institution' => 'Indépendant', 'years' => '5 ans'],
            ],
            'levels' => ['Collège', 'Lycée'],
            'zones' => ['Plateau', 'Almadies', 'Mermoz', 'Sacré-Cœur'],
            'teaching_mode' => 'both',
            'hourly_rate' => 10000,
            'is_verified' => true,
            'verified_at' => now(),
        ]);

        // Associer des matières au professeur 1
        $mathSubject = Subject::where('slug', 'mathematiques')->first();
        $physiqueSubject = Subject::where('slug', 'physique')->first();

        if ($mathSubject) {
            $teacher1->subjects()->attach($mathSubject->id, [
                'specialties' => json_encode(['Algèbre', 'Géométrie', 'Statistiques', 'Préparation BAC']),
                'hourly_rate' => 10000,
            ]);
        }

        if ($physiqueSubject) {
            $teacher1->subjects()->attach($physiqueSubject->id, [
                'specialties' => json_encode(['Mécanique', 'Électricité', 'Optique']),
                'hourly_rate' => 12000,
            ]);
        }

        // Disponibilités du professeur 1
        // Lundi et Mercredi après-midi
        Availability::create([
            'teacher_id' => $teacher1->id,
            'day_of_week' => 1, // Lundi
            'start_time' => '14:00',
            'end_time' => '19:00',
            'is_recurring' => true,
            'is_active' => true,
        ]);

        Availability::create([
            'teacher_id' => $teacher1->id,
            'day_of_week' => 3, // Mercredi
            'start_time' => '14:00',
            'end_time' => '19:00',
            'is_recurring' => true,
            'is_active' => true,
        ]);

        // Samedi toute la journée
        Availability::create([
            'teacher_id' => $teacher1->id,
            'day_of_week' => 6, // Samedi
            'start_time' => '09:00',
            'end_time' => '18:00',
            'is_recurring' => true,
            'is_active' => true,
        ]);

        // Créer un deuxième professeur
        $teacher2 = User::create([
            'name' => 'Mme Aminata Ba',
            'email' => 'teacher2@timmi.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '0765432109',
            'city' => 'Dakar',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Profil du professeur 2
        $profile2 = TeacherProfile::create([
            'user_id' => $teacher2->id,
            'bio' => 'Professeur de français et d\'anglais. Passionnée par l\'enseignement des langues.',
            'diplomas' => [
                ['name' => 'Master en Lettres Modernes', 'year' => '2018', 'institution' => 'UCAD'],
                ['name' => 'Certification TEFL', 'year' => '2019', 'institution' => 'British Council'],
            ],
            'experiences' => [
                ['title' => 'Professeur de Français', 'institution' => 'Collège Sacré-Cœur', 'years' => '3 ans'],
                ['title' => 'Professeur d\'Anglais', 'institution' => 'Centre de langues', 'years' => '2 ans'],
            ],
            'levels' => ['Primaire', 'Collège', 'Lycée'],
            'zones' => ['Point E', 'Fann', 'Amitié', 'Médina'],
            'teaching_mode' => 'both',
            'hourly_rate' => 8000,
            'is_verified' => true,
            'verified_at' => now(),
        ]);

        // Associer des matières au professeur 2
        $francaisSubject = Subject::where('slug', 'francais')->first();
        $anglaisSubject = Subject::where('slug', 'anglais')->first();

        if ($francaisSubject) {
            $teacher2->subjects()->attach($francaisSubject->id, [
                'specialties' => json_encode(['Grammaire', 'Littérature', 'Expression écrite', 'Expression orale']),
                'hourly_rate' => 8000,
            ]);
        }

        if ($anglaisSubject) {
            $teacher2->subjects()->attach($anglaisSubject->id, [
                'specialties' => json_encode(['Conversation', 'Grammaire', 'Business English', 'Préparation TOEFL']),
                'hourly_rate' => 10000,
            ]);
        }

        // Disponibilités du professeur 2
        // Mardi et Jeudi soir
        Availability::create([
            'teacher_id' => $teacher2->id,
            'day_of_week' => 2, // Mardi
            'start_time' => '17:00',
            'end_time' => '21:00',
            'is_recurring' => true,
            'is_active' => true,
        ]);

        Availability::create([
            'teacher_id' => $teacher2->id,
            'day_of_week' => 4, // Jeudi
            'start_time' => '17:00',
            'end_time' => '21:00',
            'is_recurring' => true,
            'is_active' => true,
        ]);

        // Dimanche matin
        Availability::create([
            'teacher_id' => $teacher2->id,
            'day_of_week' => 0, // Dimanche
            'start_time' => '09:00',
            'end_time' => '13:00',
            'is_recurring' => true,
            'is_active' => true,
        ]);

        // Créer un professeur non vérifié
        $teacher3 = User::create([
            'name' => 'Ibrahima Fall',
            'email' => 'teacher3@timmi.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '0701234567',
            'city' => 'Dakar',
            'status' => 'pending',
            'email_verified_at' => now(),
        ]);

        TeacherProfile::create([
            'user_id' => $teacher3->id,
            'bio' => 'Étudiant en master d\'informatique, je donne des cours particuliers.',
            'levels' => ['Collège', 'Lycée'],
            'zones' => ['Liberté', 'Dieuppeul'],
            'teaching_mode' => 'presentiel',
            'hourly_rate' => 5000,
            'is_verified' => false,
        ]);
    }
}
