<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_number',
        'parent_id',
        'teacher_id',
        'child_id',
        'subject_id',
        'class_date',
        'start_time',
        'end_time',
        'duration',
        'teaching_mode',
        'location',
        'online_link',
        'amount',
        'commission_rate',
        'commission_amount',
        'teacher_amount',
        'status',
        'payment_status',
        'teacher_confirmed',
        'teacher_confirmed_at',
        'parent_confirmed',
        'parent_confirmed_at',
        'cancellation_reason',
        'cancelled_at',
    ];

    protected $casts = [
        'class_date' => 'date',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'duration' => 'integer',
        'amount' => 'decimal:2',
        'commission_rate' => 'decimal:2',
        'commission_amount' => 'decimal:2',
        'teacher_amount' => 'decimal:2',
        'teacher_confirmed' => 'boolean',
        'teacher_confirmed_at' => 'datetime',
        'parent_confirmed' => 'boolean',
        'parent_confirmed_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($booking) {
            // Générer un numéro de réservation unique
            $booking->booking_number = 'TM' . date('Y') . strtoupper(Str::random(6));
            
            // Calculer les montants
            $booking->commission_amount = $booking->amount * ($booking->commission_rate / 100);
            $booking->teacher_amount = $booking->amount - $booking->commission_amount;
        });
    }

    /**
     * Parent qui a fait la réservation
     */
    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    /**
     * Professeur
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Enfant concerné
     */
    public function child()
    {
        return $this->belongsTo(Child::class);
    }

    /**
     * Matière
     */
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Paiement associé
     */
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    /**
     * Paiement professeur associé
     */
    public function payout()
    {
        return $this->belongsTo(TeacherPayout::class);
    }

    /**
     * Avis associé
     */
    public function review()
    {
        return $this->hasOne(Review::class);
    }

    /**
     * Vérifier si la réservation peut être annulée
     */
    public function canBeCancelled(): bool
    {
        return in_array($this->status, ['pending', 'confirmed']) && 
               $this->class_date->isFuture();
    }

    /**
     * Vérifier si la réservation peut être confirmée par le professeur
     */
    public function canBeConfirmedByTeacher(): bool
    {
        return $this->status === 'confirmed' && 
               !$this->teacher_confirmed &&
               $this->class_date->isPast();
    }

    /**
     * Vérifier si la réservation peut être confirmée par le parent
     */
    public function canBeConfirmedByParent(): bool
    {
        return $this->status === 'confirmed' && 
               $this->teacher_confirmed &&
               !$this->parent_confirmed &&
               $this->class_date->isPast();
    }

    /**
     * Marquer comme annulée
     */
    public function cancel($reason = null)
    {
        $this->status = 'cancelled';
        $this->cancellation_reason = $reason;
        $this->cancelled_at = now();
        $this->save();
    }

    /**
     * Confirmer par le professeur
     */
    public function confirmByTeacher()
    {
        $this->teacher_confirmed = true;
        $this->teacher_confirmed_at = now();
        $this->save();
    }

    /**
     * Confirmer par le parent
     */
    public function confirmByParent()
    {
        $this->parent_confirmed = true;
        $this->parent_confirmed_at = now();
        $this->status = 'completed';
        $this->save();
    }

    /**
     * Scope pour les réservations à venir
     */
    public function scopeUpcoming($query)
    {
        return $query->where('class_date', '>=', today())
                    ->whereIn('status', ['pending', 'confirmed']);
    }

    /**
     * Scope pour les réservations passées
     */
    public function scopePast($query)
    {
        return $query->where('class_date', '<', today());
    }
}
