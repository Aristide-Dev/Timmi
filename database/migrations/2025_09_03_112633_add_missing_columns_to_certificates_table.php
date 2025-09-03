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
        Schema::table('certificates', function (Blueprint $table) {
            // Ajouter les colonnes manquantes
            if (!Schema::hasColumn('certificates', 'issued_date')) {
                $table->date('issued_date')->nullable();
            }
            if (!Schema::hasColumn('certificates', 'expiry_date')) {
                $table->date('expiry_date')->nullable();
            }
            if (!Schema::hasColumn('certificates', 'issuing_organization')) {
                $table->string('issuing_organization')->nullable();
            }
            if (!Schema::hasColumn('certificates', 'file_path')) {
                $table->string('file_path')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->dropColumn(['issued_date', 'expiry_date', 'issuing_organization', 'file_path']);
        });
    }
};