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
        Schema::table('users', function (Blueprint $table) {
            // Champs spécifiques aux étudiants
            $table->integer('age')->nullable();
            $table->string('grade_level')->nullable();
            $table->string('school')->nullable();
            $table->text('learning_goals')->nullable();
            $table->json('preferred_subjects')->nullable();
            $table->json('preferred_levels')->nullable();
            $table->json('preferred_cities')->nullable();
            $table->boolean('is_student')->default(false);
            $table->foreignId('parent_id')->nullable()->constrained('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
            $table->dropColumn([
                'age',
                'grade_level',
                'school',
                'learning_goals',
                'preferred_subjects',
                'preferred_levels',
                'preferred_cities',
                'is_student',
                'parent_id'
            ]);
        });
    }
};
