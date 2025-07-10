<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'booking_id',
        'parent_id',
        'amount',
        'payment_method',
        'status',
        'gateway_response',
        'metadata',
        'paid_at',
        'refunded_at',
        'refund_amount',
        'refund_reason',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'refund_amount' => 'decimal:2',
        'metadata' => 'array',
        'paid_at' => 'datetime',
        'refunded_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($payment) {
            // Générer un ID de transaction unique
            $payment->transaction_id = 'PAY' . date('YmdHis') . strtoupper(Str::random(6));
        });
    }

    /**
     * Réservation associée
     */
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    /**
     * Parent qui a effectué le paiement
     */
    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    /**
     * Marquer comme payé
     */
    public function markAsPaid()
    {
        $this->status = 'completed';
        $this->paid_at = now();
        $this->save();

        // Mettre à jour le statut de paiement de la réservation
        $this->booking->update([
            'payment_status' => 'paid',
            'status' => 'confirmed',
        ]);
    }

    /**
     * Effectuer un remboursement
     */
    public function refund($amount = null, $reason = null)
    {
        $this->status = 'refunded';
        $this->refunded_at = now();
        $this->refund_amount = $amount ?? $this->amount;
        $this->refund_reason = $reason;
        $this->save();

        // Mettre à jour le statut de paiement de la réservation
        $this->booking->update([
            'payment_status' => 'refunded',
        ]);
    }

    /**
     * Vérifier si le paiement peut être remboursé
     */
    public function canBeRefunded(): bool
    {
        return $this->status === 'completed' && 
               !$this->refunded_at &&
               $this->booking->status === 'cancelled';
    }

    /**
     * Scope pour les paiements complétés
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope pour les paiements en attente
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}
