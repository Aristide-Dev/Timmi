<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Earning extends Model
{
    use HasFactory;

    protected $fillable = [
        'professor_id',
        'amount',
        'currency',
        'period',
        'total_sessions',
        'total_hours',
        'commission_rate',
        'commission_amount',
        'net_amount',
        'status',
        'paid_at',
        'period_start',
        'period_end',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'commission_amount' => 'decimal:2',
        'net_amount' => 'decimal:2',
        'commission_rate' => 'decimal:2',
        'paid_at' => 'datetime',
        'period_start' => 'date',
        'period_end' => 'date',
    ];

    /**
     * Relation avec le professeur
     */
    public function professor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'professor_id');
    }

    /**
     * Scope pour les revenus payés
     */
    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }

    /**
     * Scope pour les revenus en attente
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope pour une période donnée
     */
    public function scopeForPeriod($query, $period)
    {
        return $query->where('period', $period);
    }

    /**
     * Scope pour un professeur donné
     */
    public function scopeForProfessor($query, $professorId)
    {
        return $query->where('professor_id', $professorId);
    }

    /**
     * Vérifier si le revenu est payé
     */
    public function isPaid(): bool
    {
        return $this->status === 'paid';
    }

    /**
     * Vérifier si le revenu est en attente
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Obtenir le montant formaté
     */
    public function getFormattedAmountAttribute(): string
    {
        return number_format($this->amount, 0, ',', ' ') . ' ' . $this->currency;
    }

    /**
     * Obtenir le montant net formaté
     */
    public function getFormattedNetAmountAttribute(): string
    {
        return number_format($this->net_amount, 0, ',', ' ') . ' ' . $this->currency;
    }

    /**
     * Obtenir le statut formaté
     */
    public function getFormattedStatusAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'En attente',
            'paid' => 'Payé',
            'cancelled' => 'Annulé',
            default => $this->status,
        };
    }

    /**
     * Obtenir la période formatée
     */
    public function getFormattedPeriodAttribute(): string
    {
        return match ($this->period) {
            'daily' => 'Quotidien',
            'weekly' => 'Hebdomadaire',
            'monthly' => 'Mensuel',
            'yearly' => 'Annuel',
            default => $this->period,
        };
    }
}
