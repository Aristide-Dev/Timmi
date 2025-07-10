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
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('fr_FR');

        // Villes principales de Guinée
        $cities = ['Conakry', 'Kankan', 'Labé', 'Kindia', 'Boké', 'Mamou', 'Faranah', 'Siguiri', 'Guéckédou', 'Kissidougou'];
        
        // Quartiers de Conakry
        $conakyQuarters = ['Kaloum', 'Dixinn', 'Matam', 'Ratoma', 'Matoto', 'Lambandji', 'Kipé', 'Sonfonia', 'Hamdallaye', 'Bambeto'];

        // Noms typiquement guinéens
        $guineanNames = [
            'male' => ['Mamadou', 'Amadou', 'Ousmane', 'Ibrahima', 'Boubacar', 'Abdoulaye', 'Alpha', 'Saidou', 'Thierno', 'Fodé', 'Sékou', 'Mohamed', 'Elhadj', 'Alsény', 'Aboubacar'],
            'female' => ['Aissatou', 'Fatoumata', 'Mariama', 'Aminata', 'Kadiatou', 'Hawa', 'Safiatou', 'Ramata', 'Mabinty', 'Djenabou', 'Nènè', 'Adama', 'Binta', 'Salématou', 'Néné']
        ];

        $surnames = ['Diallo', 'Bah', 'Barry', 'Sow', 'Camara', 'Touré', 'Kaba', 'Sylla', 'Conde', 'Keita', 'Sidibé', 'Bangoura', 'Soumah', 'Cissé', 'Fofana', 'Doumbouya', 'Kourouma', 'Yombouno', 'Konaté', 'Sagno'];

        // Créer un administrateur
        $admin = User::create([
            'name' => 'Admin Timmi',
            'email' => 'admin@timmi.gn',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '620000000',
            'city' => 'Conakry',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Créer 20 parents avec leurs enfants
        for ($i = 1; $i <= 20; $i++) {
            $gender = $faker->randomElement(['male', 'female']);
            $firstName = $faker->randomElement($guineanNames[$gender]);
            $lastName = $faker->randomElement($surnames);
            $city = $faker->randomElement($cities);

            $parent = User::create([
                'name' => $firstName . ' ' . $lastName,
                'email' => 'parent' . $i . '@timmi.gn',
            'password' => Hash::make('password'),
            'role' => 'parent',
                'phone' => '6' . $faker->numberBetween(20000000, 99999999),
                'city' => $city,
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

            // Ajouter 1-3 enfants par parent
            $childrenCount = $faker->numberBetween(1, 3);
            for ($j = 1; $j <= $childrenCount; $j++) {
                $childGender = $faker->randomElement(['male', 'female']);
                $childFirstName = $faker->randomElement($guineanNames[$childGender]);
                $grades = ['CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'];
                $grade = $faker->randomElement($grades);
                
                $level = in_array($grade, ['CP', 'CE1', 'CE2', 'CM1', 'CM2']) ? 'Primaire' : 
                        (in_array($grade, ['6ème', '5ème', '4ème', '3ème']) ? 'Collège' : 'Lycée');

        Child::create([
                    'parent_id' => $parent->id,
                    'name' => $childFirstName . ' ' . $lastName,
                    'grade' => $grade,
                    'level' => $level,
                    'age' => $faker->numberBetween(6, 18),
                ]);
            }
        }

        // Créer 60 professeurs
        $teacherData = [
            // Professeurs de Mathématiques
            ['name' => 'Dr. Mamadou Diallo', 'subject' => 'mathematiques', 'specialties' => ['Algèbre', 'Géométrie', 'Analyse', 'Préparation BAC'], 'rate' => 15000],
            ['name' => 'Pr. Aissatou Bah', 'subject' => 'mathematiques', 'specialties' => ['Statistiques', 'Probabilités', 'Mathématiques appliquées'], 'rate' => 18000],
            ['name' => 'Alpha Ousmane Barry', 'subject' => 'mathematiques', 'specialties' => ['Calcul mental', 'Géométrie dans l\'espace', 'Fonctions'], 'rate' => 12000],
            ['name' => 'Fatoumata Sow', 'subject' => 'mathematiques', 'specialties' => ['Arithmétique', 'Algèbre linéaire', 'Trigonométrie'], 'rate' => 14000],
            ['name' => 'Boubacar Camara', 'subject' => 'mathematiques', 'specialties' => ['Mathématiques financières', 'Statistiques', 'Analyse numérique'], 'rate' => 16000],

            // Professeurs de Physique-Chimie
            ['name' => 'Dr. Aminata Touré', 'subject' => 'physique', 'specialties' => ['Mécanique', 'Thermodynamique', 'Optique'], 'rate' => 16000],
            ['name' => 'Ibrahima Kaba', 'subject' => 'physique', 'specialties' => ['Électricité', 'Magnétisme', 'Ondes'], 'rate' => 14000],
            ['name' => 'Kadiatou Sylla', 'subject' => 'chimie', 'specialties' => ['Chimie organique', 'Chimie minérale', 'Biochimie'], 'rate' => 15000],
            ['name' => 'Thierno Conde', 'subject' => 'physique', 'specialties' => ['Physique moderne', 'Astrophysique', 'Physique des particules'], 'rate' => 18000],
            ['name' => 'Hawa Keita', 'subject' => 'chimie', 'specialties' => ['Chimie analytique', 'Cinétique chimique', 'Équilibres'], 'rate' => 13000],

            // Professeurs de Sciences de la Vie et de la Terre
            ['name' => 'Dr. Sékou Sidibé', 'subject' => 'svt', 'specialties' => ['Biologie cellulaire', 'Génétique', 'Écologie'], 'rate' => 15000],
            ['name' => 'Mariama Bangoura', 'subject' => 'svt', 'specialties' => ['Anatomie', 'Physiologie', 'Botanique'], 'rate' => 13000],
            ['name' => 'Fodé Soumah', 'subject' => 'svt', 'specialties' => ['Géologie', 'Paléontologie', 'Sciences de la Terre'], 'rate' => 14000],
            ['name' => 'Safiatou Cissé', 'subject' => 'svt', 'specialties' => ['Microbiologie', 'Immunologie', 'Biotechnologie'], 'rate' => 16000],

            // Professeurs de Français
            ['name' => 'Mme Ramata Fofana', 'subject' => 'francais', 'specialties' => ['Littérature française', 'Grammaire', 'Expression écrite'], 'rate' => 12000],
            ['name' => 'Alsény Doumbouya', 'subject' => 'francais', 'specialties' => ['Analyse littéraire', 'Dissertation', 'Commentaire de texte'], 'rate' => 14000],
            ['name' => 'Mabinty Kourouma', 'subject' => 'francais', 'specialties' => ['Poésie', 'Théâtre', 'Roman contemporain'], 'rate' => 13000],
            ['name' => 'Mohamed Yombouno', 'subject' => 'francais', 'specialties' => ['Orthographe', 'Conjugaison', 'Syntaxe'], 'rate' => 11000],
            ['name' => 'Djenabou Konaté', 'subject' => 'francais', 'specialties' => ['Expression orale', 'Rhétorique', 'Stylistique'], 'rate' => 13500],

            // Professeurs d'Anglais
            ['name' => 'Abdoulaye Sagno', 'subject' => 'anglais', 'specialties' => ['Conversation', 'Business English', 'TOEFL'], 'rate' => 15000],
            ['name' => 'Nènè Barry', 'subject' => 'anglais', 'specialties' => ['Grammaire anglaise', 'Vocabulaire', 'Pronunciation'], 'rate' => 13000],
            ['name' => 'Saidou Diallo', 'subject' => 'anglais', 'specialties' => ['English Literature', 'Writing Skills', 'IELTS'], 'rate' => 16000],
            ['name' => 'Adama Bah', 'subject' => 'anglais', 'specialties' => ['Anglais technique', 'Communication', 'Cambridge exams'], 'rate' => 14000],

            // Professeurs d'Histoire-Géographie
            ['name' => 'Elhadj Sow', 'subject' => 'histoire', 'specialties' => ['Histoire de l\'Afrique', 'Histoire contemporaine', 'Civilisations'], 'rate' => 12000],
            ['name' => 'Binta Camara', 'subject' => 'geographie', 'specialties' => ['Géographie physique', 'Géopolitique', 'Cartographie'], 'rate' => 11000],
            ['name' => 'Aboubacar Touré', 'subject' => 'histoire', 'specialties' => ['Histoire de la Guinée', 'Décolonisation', 'Mouvements sociaux'], 'rate' => 13000],
            ['name' => 'Salématou Kaba', 'subject' => 'geographie', 'specialties' => ['Démographie', 'Économie géographique', 'Environnement'], 'rate' => 12500],

            // Professeurs d'Économie
            ['name' => 'Dr. Ousmane Sylla', 'subject' => 'economie', 'specialties' => ['Microéconomie', 'Macroéconomie', 'Économie du développement'], 'rate' => 17000],
            ['name' => 'Néné Conde', 'subject' => 'economie', 'specialties' => ['Économie internationale', 'Finance', 'Statistiques économiques'], 'rate' => 15000],
            ['name' => 'Amadou Keita', 'subject' => 'economie', 'specialties' => ['Économie politique', 'Théories économiques', 'Économétrie'], 'rate' => 16000],

            // Professeurs de Philosophie
            ['name' => 'Dr. Alpha Sidibé', 'subject' => 'philosophie', 'specialties' => ['Philosophie antique', 'Éthique', 'Métaphysique'], 'rate' => 15000],
            ['name' => 'Fatoumata Bangoura', 'subject' => 'philosophie', 'specialties' => ['Philosophie moderne', 'Logique', 'Anthropologie'], 'rate' => 14000],

            // Professeurs d'Informatique
            ['name' => 'Ibrahima Soumah', 'subject' => 'informatique', 'specialties' => ['Programmation Python', 'Algorithmique', 'Bases de données'], 'rate' => 18000],
            ['name' => 'Aminata Cissé', 'subject' => 'informatique', 'specialties' => ['Développement web', 'JavaScript', 'HTML/CSS'], 'rate' => 16000],
            ['name' => 'Boubacar Fofana', 'subject' => 'informatique', 'specialties' => ['Réseaux informatiques', 'Sécurité', 'Administration système'], 'rate' => 19000],
            ['name' => 'Kadiatou Doumbouya', 'subject' => 'informatique', 'specialties' => ['Intelligence artificielle', 'Machine Learning', 'Data Science'], 'rate' => 22000],

            // Professeurs d'Arabe
            ['name' => 'Cheikh Mamadou Kourouma', 'subject' => 'arabe', 'specialties' => ['Coran', 'Grammaire arabe', 'Littérature arabe'], 'rate' => 12000],
            ['name' => 'Aissatou Yombouno', 'subject' => 'arabe', 'specialties' => ['Arabe moderne', 'Conversation', 'Calligraphie'], 'rate' => 11000],

            // Professeurs d'Arts
            ['name' => 'Mariama Konaté', 'subject' => 'arts-plastiques', 'specialties' => ['Dessin', 'Peinture', 'Sculpture'], 'rate' => 10000],
            ['name' => 'Sékou Sagno', 'subject' => 'musique', 'specialties' => ['Kora', 'Djembé', 'Chant traditionnel'], 'rate' => 12000],

            // Professeurs de Sport
            ['name' => 'Alpha Barry', 'subject' => 'sport', 'specialties' => ['Football', 'Athlétisme', 'Préparation physique'], 'rate' => 8000],
            ['name' => 'Hawa Bah', 'subject' => 'sport', 'specialties' => ['Basketball', 'Volleyball', 'Fitness'], 'rate' => 9000],

            // Professeurs supplémentaires pour atteindre 60
            ['name' => 'Fodé Diallo', 'subject' => 'mathematiques', 'specialties' => ['Géométrie analytique', 'Suites et séries'], 'rate' => 13000],
            ['name' => 'Ramata Camara', 'subject' => 'francais', 'specialties' => ['Littérature africaine', 'Oral du BAC'], 'rate' => 12500],
            ['name' => 'Thierno Touré', 'subject' => 'physique', 'specialties' => ['Mécanique quantique', 'Relativité'], 'rate' => 17000],
            ['name' => 'Safiatou Kaba', 'subject' => 'anglais', 'specialties' => ['Anglais des affaires', 'Traduction'], 'rate' => 14500],
            ['name' => 'Saidou Sylla', 'subject' => 'chimie', 'specialties' => ['Chimie industrielle', 'Polymères'], 'rate' => 15500],
            ['name' => 'Mabinty Conde', 'subject' => 'svt', 'specialties' => ['Évolution', 'Écosystèmes tropicaux'], 'rate' => 14500],
            ['name' => 'Alsény Keita', 'subject' => 'histoire', 'specialties' => ['Histoire médiévale', 'Méthodologie'], 'rate' => 12800],
            ['name' => 'Djenabou Sidibé', 'subject' => 'geographie', 'specialties' => ['Climatologie', 'Géomorphologie'], 'rate' => 12200],
            ['name' => 'Mohamed Bangoura', 'subject' => 'economie', 'specialties' => ['Économie sociale', 'Coopératives'], 'rate' => 14800],
            ['name' => 'Nènè Soumah', 'subject' => 'philosophie', 'specialties' => ['Épistémologie', 'Philosophie politique'], 'rate' => 14200],
            ['name' => 'Aboubacar Cissé', 'subject' => 'informatique', 'specialties' => ['Mobile development', 'UI/UX Design'], 'rate' => 17500],
            ['name' => 'Adama Fofana', 'subject' => 'arabe', 'specialties' => ['Fiqh', 'Tafsir'], 'rate' => 11500],
            ['name' => 'Binta Doumbouya', 'subject' => 'arts-plastiques', 'specialties' => ['Art contemporain', 'Installation'], 'rate' => 10500],
            ['name' => 'Elhadj Kourouma', 'subject' => 'musique', 'specialties' => ['Guitare', 'Piano', 'Composition'], 'rate' => 13000],
            ['name' => 'Salématou Yombouno', 'subject' => 'sport', 'specialties' => ['Tennis', 'Natation', 'Yoga'], 'rate' => 9500],
            ['name' => 'Ousmane Konaté', 'subject' => 'mathematiques', 'specialties' => ['Mathématiques discrètes', 'Cryptographie'], 'rate' => 16500],
            ['name' => 'Aminata Sagno', 'subject' => 'francais', 'specialties' => ['Journalisme', 'Communication écrite'], 'rate' => 13200],
            ['name' => 'Boubacar Barry', 'subject' => 'anglais', 'specialties' => ['Anglais juridique', 'Interprétariat'], 'rate' => 15800],
            ['name' => 'Kadiatou Bah', 'subject' => 'physique', 'specialties' => ['Énergies renouvelables', 'Environnement'], 'rate' => 16200],
            ['name' => 'Alpha Sow', 'subject' => 'chimie', 'specialties' => ['Pétrochimie', 'Matériaux'], 'rate' => 16800],
        ];

        foreach ($teacherData as $index => $data) {
            $city = $faker->randomElement($cities);
            $zones = $city === 'Conakry' ? $faker->randomElements($conakyQuarters, $faker->numberBetween(2, 4)) : [$city];

            $teacher = User::create([
                'name' => $data['name'],
                'email' => 'teacher' . ($index + 1) . '@timmi.gn',
            'password' => Hash::make('password'),
            'role' => 'teacher',
                'phone' => '6' . $faker->numberBetween(20000000, 99999999),
                'city' => $city,
                'status' => $faker->randomElement(['active', 'active', 'active', 'active', 'active', 'active', 'active', 'active', 'active', 'pending']),
            'email_verified_at' => now(),
        ]);

            // Créer le profil professeur
            $isVerified = $teacher->status === 'active';
            $bio = $this->generateTeacherBio($data['name'], $data['subject'], $data['specialties']);
            
            $profile = TeacherProfile::create([
                'user_id' => $teacher->id,
                'bio' => $bio,
                'diplomas' => $this->generateDiplomas($data['subject']),
                'experiences' => $this->generateExperiences($data['subject']),
                'levels' => $faker->randomElements(['Primaire', 'Collège', 'Lycée'], $faker->numberBetween(1, 3)),
                'zones' => $zones,
                'teaching_mode' => $faker->randomElement(['presentiel', 'en_ligne', 'both']),
                'hourly_rate' => $data['rate'],
                'is_verified' => $isVerified,
                'verified_at' => $isVerified ? now() : null,
            ]);

            // Associer la matière au professeur
            $subject = Subject::where('slug', $data['subject'])->first();
            if ($subject) {
                $teacher->subjects()->attach($subject->id, [
                    'specialties' => json_encode($data['specialties']),
                    'hourly_rate' => $data['rate'],
                ]);
            }

            // Créer des disponibilités aléatoires
            if ($isVerified) {
                $this->createRandomAvailabilities($teacher->id, $faker);
            }
        }
    }

    private function generateTeacherBio($name, $subject, $specialties)
    {
        $subjectNames = [
            'mathematiques' => 'mathématiques',
            'physique' => 'physique',
            'chimie' => 'chimie',
            'svt' => 'sciences de la vie et de la terre',
            'francais' => 'français',
            'anglais' => 'anglais',
            'histoire' => 'histoire',
            'geographie' => 'géographie',
            'economie' => 'économie',
            'philosophie' => 'philosophie',
            'informatique' => 'informatique',
            'arabe' => 'arabe',
            'arts-plastiques' => 'arts plastiques',
            'musique' => 'musique',
            'sport' => 'éducation physique et sportive',
        ];

        $subjectName = $subjectNames[$subject] ?? $subject;
        $specialtiesText = implode(', ', array_slice($specialties, 0, 3));

        $bios = [
            "Professeur expérimenté en {$subjectName} avec une passion pour l'enseignement. Spécialisé en {$specialtiesText}. Je m'adapte au rythme de chaque élève pour garantir sa réussite.",
            "Enseignant dévoué avec plusieurs années d'expérience en {$subjectName}. Mes domaines d'expertise incluent {$specialtiesText}. J'utilise des méthodes pédagogiques innovantes.",
            "Passionné par la transmission du savoir en {$subjectName}. Je me spécialise dans {$specialtiesText} et accompagne mes élèves vers l'excellence académique.",
            "Professeur qualifié en {$subjectName} offrant un accompagnement personnalisé. Expert en {$specialtiesText}, je prépare efficacement aux examens.",
        ];

        return $bios[array_rand($bios)];
    }

    private function generateDiplomas($subject)
    {
        $diplomas = [
            'mathematiques' => [
                ['name' => 'Master en Mathématiques', 'year' => '2018', 'institution' => 'Université Gamal Abdel Nasser de Conakry'],
                ['name' => 'Licence en Mathématiques', 'year' => '2016', 'institution' => 'Université Gamal Abdel Nasser de Conakry'],
            ],
            'physique' => [
                ['name' => 'Master en Physique', 'year' => '2019', 'institution' => 'Université Julius Nyerere de Kankan'],
                ['name' => 'Licence en Physique', 'year' => '2017', 'institution' => 'Université Gamal Abdel Nasser de Conakry'],
            ],
            'francais' => [
                ['name' => 'Master en Lettres Modernes', 'year' => '2020', 'institution' => 'Université Gamal Abdel Nasser de Conakry'],
                ['name' => 'Licence en Français', 'year' => '2018', 'institution' => 'Institut Supérieur des Sciences de l\'Éducation'],
            ],
            'anglais' => [
                ['name' => 'Master en Anglais', 'year' => '2019', 'institution' => 'Université Gamal Abdel Nasser de Conakry'],
                ['name' => 'Certification TESOL', 'year' => '2020', 'institution' => 'British Council Guinea'],
            ],
            'informatique' => [
                ['name' => 'Master en Informatique', 'year' => '2021', 'institution' => 'Université Gamal Abdel Nasser de Conakry'],
                ['name' => 'Licence en Informatique', 'year' => '2019', 'institution' => 'Institut Supérieur de Technologie de Mamou'],
            ],
        ];

        return $diplomas[$subject] ?? [
            ['name' => 'Master en ' . ucfirst($subject), 'year' => '2019', 'institution' => 'Université Gamal Abdel Nasser de Conakry'],
            ['name' => 'Licence en ' . ucfirst($subject), 'year' => '2017', 'institution' => 'Université Gamal Abdel Nasser de Conakry'],
        ];
    }

    private function generateExperiences($subject)
    {
        $experiences = [
            ['title' => 'Professeur particulier', 'institution' => 'Indépendant', 'years' => '3 ans'],
            ['title' => 'Enseignant', 'institution' => 'Collège/Lycée', 'years' => '2 ans'],
            ['title' => 'Formateur', 'institution' => 'Centre de formation', 'years' => '1 an'],
        ];

        return array_slice($experiences, 0, rand(2, 3));
    }

    private function createRandomAvailabilities($teacherId, $faker)
    {
        $daysCount = $faker->numberBetween(2, 5);
        $selectedDays = $faker->randomElements(range(0, 6), $daysCount);

        foreach ($selectedDays as $day) {
            $startHour = $faker->numberBetween(8, 16);
            $endHour = $faker->numberBetween($startHour + 2, 20);

        Availability::create([
                'teacher_id' => $teacherId,
                'day_of_week' => $day,
                'start_time' => sprintf('%02d:00', $startHour),
                'end_time' => sprintf('%02d:00', $endHour),
            'is_recurring' => true,
            'is_active' => true,
        ]);
        }
    }
}
