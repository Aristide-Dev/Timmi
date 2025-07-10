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
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nom de la matière (ex: Mathématiques)
            $table->string('slug')->unique(); // Slug pour l'URL
            $table->string('category'); // Catégorie (ex: Sciences, Langues)
            $table->text('description')->nullable();
            $table->string('icon')->nullable(); // Icône lucide
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0); // Pour l'ordre d'affichage
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
