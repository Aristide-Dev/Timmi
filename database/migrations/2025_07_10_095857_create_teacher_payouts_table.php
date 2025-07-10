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
        Schema::create('teacher_payouts', function (Blueprint $table) {
            $table->id();
            $table->string('payout_number')->unique(); // Numéro de paiement unique
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            $table->decimal('amount', 10, 2); // Montant à payer
            $table->integer('bookings_count'); // Nombre de cours inclus
            $table->json('booking_ids'); // IDs des réservations incluses
            $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending');
            $table->enum('payment_method', ['mobile_money', 'bank_transfer', 'cash']);
            $table->string('payment_reference')->nullable(); // Référence de paiement
            $table->date('period_start'); // Début de la période
            $table->date('period_end'); // Fin de la période
            $table->timestamp('processed_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index(['teacher_id', 'status']);
            $table->index(['period_start', 'period_end']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_payouts');
    }
};
