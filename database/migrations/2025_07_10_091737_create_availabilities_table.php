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
        Schema::create('availabilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            $table->integer('day_of_week'); // 0 = Dimanche, 1 = Lundi, etc.
            $table->time('start_time');
            $table->time('end_time');
            $table->date('start_date')->nullable(); // Date de début de disponibilité
            $table->date('end_date')->nullable(); // Date de fin de disponibilité
            $table->boolean('is_recurring')->default(true); // Disponibilité récurrente ou unique
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['teacher_id', 'day_of_week']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('availabilities');
    }
};
