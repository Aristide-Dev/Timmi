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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_number')->unique(); // Numéro de réservation unique
            $table->foreignId('parent_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('child_id')->constrained('children')->onDelete('cascade');
            $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');
            $table->unsignedBigInteger('payout_id')->nullable(); // Créer la colonne sans contrainte
            $table->date('class_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('duration')->default(60); // Durée en minutes
            $table->enum('teaching_mode', ['presentiel', 'en_ligne']);
            $table->string('location')->nullable(); // Adresse pour le présentiel
            $table->string('online_link')->nullable(); // Lien pour le cours en ligne
            $table->decimal('amount', 10, 2); // Montant total
            $table->decimal('commission_rate', 5, 2); // Taux de commission (%)
            $table->decimal('commission_amount', 10, 2); // Montant de la commission
            $table->decimal('teacher_amount', 10, 2); // Montant pour le professeur
            $table->enum('status', ['pending', 'confirmed', 'completed', 'cancelled', 'disputed'])->default('pending');
            $table->enum('payment_status', ['pending', 'paid', 'refunded'])->default('pending');
            $table->boolean('teacher_confirmed')->default(false); // Le prof a confirmé avoir donné le cours
            $table->timestamp('teacher_confirmed_at')->nullable();
            $table->boolean('parent_confirmed')->default(false); // Le parent a confirmé que le cours a eu lieu
            $table->timestamp('parent_confirmed_at')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();

            $table->index(['parent_id', 'status']);
            $table->index(['teacher_id', 'status']);
            $table->index(['class_date', 'status']);
        });

        // Ajouter la contrainte de clé étrangère seulement si la table teacher_payouts existe
        if (Schema::hasTable('teacher_payouts')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->foreign('payout_id')->references('id')->on('teacher_payouts')->onDelete('set null');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
