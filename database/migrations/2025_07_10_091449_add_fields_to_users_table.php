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
            $table->enum('role', ['parent', 'etudiant', 'teacher', 'admin'])->default('parent')->after('email');
            $table->string('phone')->nullable()->after('role');
            $table->string('city')->nullable()->after('phone');
            $table->enum('status', ['active', 'pending', 'suspended'])->default('active')->after('city');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'phone', 'city', 'status']);
        });
    }
};
