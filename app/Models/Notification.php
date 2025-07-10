<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'title',
        'message',
        'data',
        'is_read',
        'read_at',
    ];

    protected $casts = [
        'data' => 'array',
        'is_read' => 'boolean',
        'read_at' => 'datetime',
    ];

    /**
     * Utilisateur concerné
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Marquer comme lue
     */
    public function markAsRead()
    {
        if (!$this->is_read) {
            $this->update([
                'is_read' => true,
                'read_at' => now(),
            ]);
        }
    }

    /**
     * Scope pour les notifications non lues
     */
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    /**
     * Scope pour les notifications lues
     */
    public function scopeRead($query)
    {
        return $query->where('is_read', true);
    }

    /**
     * Créer une notification de réservation confirmée
     */
    public static function bookingConfirmed($booking)
    {
        // Notification pour le parent
        self::create([
            'user_id' => $booking->parent_id,
            'type' => 'booking_confirmed',
            'title' => 'Réservation confirmée',
            'message' => "Votre réservation avec {$booking->teacher->name} pour le {$booking->class_date->format('d/m/Y')} est confirmée.",
            'data' => ['booking_id' => $booking->id],
        ]);

        // Notification pour le professeur
        self::create([
            'user_id' => $booking->teacher_id,
            'type' => 'new_booking',
            'title' => 'Nouvelle réservation',
            'message' => "Vous avez une nouvelle réservation de {$booking->parent->name} pour le {$booking->class_date->format('d/m/Y')}.",
            'data' => ['booking_id' => $booking->id],
        ]);
    }

    /**
     * Créer une notification de cours effectué
     */
    public static function classCompleted($booking)
    {
        self::create([
            'user_id' => $booking->parent_id,
            'type' => 'class_completed',
            'title' => 'Cours terminé',
            'message' => "Le cours de {$booking->subject->name} avec {$booking->teacher->name} a été marqué comme terminé.",
            'data' => ['booking_id' => $booking->id],
        ]);
    }

    /**
     * Créer une notification de paiement reçu
     */
    public static function paymentReceived($payment)
    {
        self::create([
            'user_id' => $payment->parent_id,
            'type' => 'payment_received',
            'title' => 'Paiement confirmé',
            'message' => "Votre paiement de {$payment->amount} GNF a été confirmé.",
            'data' => ['payment_id' => $payment->id],
        ]);
    }
}
