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
            $table->text('bio')->nullable();
            $table->decimal('hourly_rate', 10, 2)->nullable();
            $table->integer('experience_years')->default(0);
            $table->string('education')->nullable();
            $table->json('specializations')->nullable();
            $table->json('languages')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_available')->default(true);
            $table->decimal('rating', 3, 1)->default(0.0);
            $table->integer('total_reviews')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'bio',
                'hourly_rate',
                'experience_years',
                'education',
                'specializations',
                'languages',
                'is_verified',
                'is_available',
                'rating',
                'total_reviews'
            ]);
        });
    }
};
