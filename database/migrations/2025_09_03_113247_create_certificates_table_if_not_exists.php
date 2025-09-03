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
        if (!Schema::hasTable('certificates')) {
            Schema::create('certificates', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->string('name');
                $table->string('issuing_organization');
                $table->date('issued_date');
                $table->date('expiry_date')->nullable();
                $table->string('file_path')->nullable();
                $table->timestamps();
            });
        } else {
            // Ajouter les colonnes manquantes si la table existe
            Schema::table('certificates', function (Blueprint $table) {
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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};