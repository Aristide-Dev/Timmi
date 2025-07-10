<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TeacherPayout extends Model
{
    use HasFactory;

    protected $fillable = [
        'payout_number',
        'teacher_id',
        'amount',
        'bookings_count',
        'booking_ids',
        'status',
        'payment_method',
        'payment_reference',
        'period_start',
        'period_end',
        'processed_at',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'bookings_count' => 'integer',
        'booking_ids' => 'array',
        'period_start' => 'date',
        'period_end' => 'date',
        'processed_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($payout) {
            // Générer un numéro de paiement unique
            $payout->payout_number = 'PO' . date('YmdHis') . strtoupper(Str::random(4));
        });
    }

    /**
     * Professeur concerné
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Obtenir les réservations associées
     */
    public function bookings()
    {
        return Booking::whereIn('id', $this->booking_ids ?? [])->get();
    }

    /**
     * Marquer comme traité
     */
    public function markAsProcessed($reference = null)
    {
        $this->update([
            'status' => 'completed',
            'processed_at' => now(),
            'payment_reference' => $reference,
        ]);
    }

    /**
     * Marquer comme échoué
     */
    public function markAsFailed($notes = null)
    {
        $this->update([
            'status' => 'failed',
            'notes' => $notes,
        ]);
    }

    /**
     * Scope pour les paiements en attente
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope pour les paiements complétés
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Créer un paiement pour un professeur
     */
    public static function createForTeacher($teacherId, $startDate, $endDate)
    {
        $bookings = Booking::where('teacher_id', $teacherId)
            ->where('status', 'completed')
            ->whereBetween('class_date', [$startDate, $endDate])
            ->whereDoesntHave('payout')
            ->get();

        if ($bookings->isEmpty()) {
            return null;
        }

        $amount = $bookings->sum('teacher_amount');
        $bookingIds = $bookings->pluck('id')->toArray();

        return self::create([
            'teacher_id' => $teacherId,
            'amount' => $amount,
            'bookings_count' => $bookings->count(),
            'booking_ids' => $bookingIds,
            'period_start' => $startDate,
            'period_end' => $endDate,
            'payment_method' => 'mobile_money', // Par défaut
        ]);
    }
}
