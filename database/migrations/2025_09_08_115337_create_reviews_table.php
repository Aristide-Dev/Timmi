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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('professor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->integer('rating')->unsigned()->min(1)->max(5);
            $table->text('comment');
            $table->boolean('would_recommend')->default(false);
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('parent_name')->nullable(); // Pour compatibilité avec l'ancien système
            $table->string('subject')->nullable(); // Pour compatibilité avec l'ancien système
            $table->date('date'); // Pour compatibilité avec l'ancien système
            $table->timestamps();
            
            // Index pour améliorer les performances
            $table->index(['professor_id', 'created_at']);
            $table->index(['student_id', 'created_at']);
            $table->index('status');
            
            // Contrainte unique pour éviter les doublons
            $table->unique(['professor_id', 'student_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
