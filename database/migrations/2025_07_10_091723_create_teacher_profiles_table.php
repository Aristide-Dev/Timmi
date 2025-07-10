<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teacher_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->text('bio')->nullable(); // Biographie
            $table->string('photo')->nullable(); // Photo de profil
            $table->json('diplomas')->nullable(); // Diplômes (stockés en JSON)
            $table->json('experiences')->nullable(); // Expériences (stockés en JSON)
            $table->json('levels')->nullable(); // Niveaux enseignés (ex: ["collège", "lycée"])
            $table->json('zones')->nullable(); // Zones desservies
            $table->enum('teaching_mode', ['presentiel', 'en_ligne', 'both'])->default('both');
            $table->decimal('hourly_rate', 10, 2)->nullable(); // Tarif horaire
            $table->integer('total_hours')->default(0); // Total d'heures données
            $table->integer('total_students')->default(0); // Nombre total d'élèves
            $table->decimal('rating', 3, 2)->default(0); // Note moyenne
            $table->integer('total_reviews')->default(0); // Nombre total d'avis
            $table->boolean('is_verified')->default(false); // Profil vérifié par l'admin
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_profiles');
    }
};
