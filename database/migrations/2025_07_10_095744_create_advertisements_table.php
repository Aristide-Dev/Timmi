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
        Schema::create('advertisements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('advertiser_name'); // Nom de l'école ou du centre
            $table->string('advertiser_email');
            $table->string('advertiser_phone')->nullable();
            $table->string('image')->nullable(); // Image de la publicité
            $table->string('link')->nullable(); // Lien vers le site
            $table->enum('position', ['home_banner', 'sidebar', 'footer', 'between_results']);
            $table->date('start_date');
            $table->date('end_date');
            $table->decimal('amount_paid', 10, 2); // Montant payé pour la pub
            $table->integer('max_impressions')->nullable(); // Nombre max d'affichages
            $table->integer('current_impressions')->default(0); // Nombre actuel d'affichages
            $table->integer('clicks')->default(0); // Nombre de clics
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['position', 'is_active']);
            $table->index(['start_date', 'end_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advertisements');
    }
};
