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
        Schema::table('availabilities', function (Blueprint $table) {
            // Ajouter les colonnes manquantes
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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('availabilities', function (Blueprint $table) {
            $table->dropColumn(['is_online', 'day_of_week', 'start_time', 'end_time']);
        });
    }
};