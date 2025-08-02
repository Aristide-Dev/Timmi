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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id')->unique(); // ID de transaction unique
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            $table->foreignId('parent_id')->constrained('users')->onDelete('cascade');
            $table->decimal('amount', 10, 2); // Montant payé
            $table->enum('payment_method', ['orange_money', 'visa', 'paycard', 'other']);
            $table->enum('status', ['pending', 'processing', 'completed', 'failed', 'refunded'])->default('pending');
            $table->string('gateway_response')->nullable(); // Réponse de la passerelle de paiement
            $table->json('metadata')->nullable(); // Données additionnelles
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('refunded_at')->nullable();
            $table->decimal('refund_amount', 10, 2)->nullable();
            $table->text('refund_reason')->nullable();
            $table->timestamps();

            $table->index(['booking_id', 'status']);
            $table->index(['parent_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
