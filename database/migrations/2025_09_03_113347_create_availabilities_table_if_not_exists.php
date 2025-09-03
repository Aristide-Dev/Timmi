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
        if (!Schema::hasTable('availabilities')) {
            Schema::create('availabilities', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->integer('day_of_week'); // 1 = Lundi, 7 = Dimanche
                $table->time('start_time');
                $table->time('end_time');
                $table->boolean('is_online')->default(true);
                $table->timestamps();
            });
        } else {
            // Ajouter les colonnes manquantes si la table existe
            Schema::table('availabilities', function (Blueprint $table) {
                if (!Schema::hasColumn('availabilities', 'is_online')) {
                    $table->boolean('is_online')->default(true);
                }
                if (!Schema::hasColumn('availabilities', 'day_of_week')) {
                    $table->integer('day_of_week')->nullable();
                }
                if (!Schema::hasColumn('availabilities', 'start_time')) {
                    $table->time('start_time')->nullable();
                }
                if (!Schema::hasColumn('availabilities', 'end_time')) {
                    $table->time('end_time')->nullable();
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('availabilities');
    }
};