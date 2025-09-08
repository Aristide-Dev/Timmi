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
        Schema::table('bookings', function (Blueprint $table) {
            // Rendre parent_id et child_id optionnels pour les étudiants
            $table->foreignId('parent_id')->nullable()->change();
            $table->foreignId('child_id')->nullable()->change();
            
            // Ajouter student_id pour les étudiants autonomes
            $table->foreignId('student_id')->nullable()->constrained('users')->onDelete('cascade');
            
            // Ajouter un champ pour distinguer le type de réservation
            $table->enum('booking_type', ['parent_child', 'student_direct'])->default('parent_child');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['student_id']);
            $table->dropColumn(['student_id', 'booking_type']);
            
            // Remettre les contraintes non-nullables
            $table->foreignId('parent_id')->nullable(false)->change();
            $table->foreignId('child_id')->nullable(false)->change();
        });
    }
};
