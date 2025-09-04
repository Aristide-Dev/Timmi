<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'subject',
        'message',
        'status',
        'priority',
        'admin_response',
        'responded_at',
        'responded_by',
        'attachments',
        'category',
        'tags',
    ];

    protected $casts = [
        'responded_at' => 'datetime',
        'attachments' => 'array',
        'tags' => 'array',
    ];

    /**
     * Relation avec l'utilisateur
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation avec l'admin qui a répondu
     */
    public function responder(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responded_by');
    }

    /**
     * Scope pour les feedbacks ouverts
     */
    public function scopeOpen($query)
    {
        return $query->where('status', 'open');
    }

    /**
     * Scope pour les feedbacks en cours
     */
    public function scopeInProgress($query)
    {
        return $query->where('status', 'in_progress');
    }

    /**
     * Scope pour les feedbacks résolus
     */
    public function scopeResolved($query)
    {
        return $query->where('status', 'resolved');
    }

    /**
     * Scope pour les feedbacks fermés
     */
    public function scopeClosed($query)
    {
        return $query->where('status', 'closed');
    }

    /**
     * Scope pour un type donné
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope pour une priorité donnée
     */
    public function scopeWithPriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    /**
     * Vérifier si le feedback est ouvert
     */
    public function isOpen(): bool
    {
        return $this->status === 'open';
    }

    /**
     * Vérifier si le feedback est en cours
     */
    public function isInProgress(): bool
    {
        return $this->status === 'in_progress';
    }

    /**
     * Vérifier si le feedback est résolu
     */
    public function isResolved(): bool
    {
        return $this->status === 'resolved';
    }

    /**
     * Vérifier si le feedback est fermé
     */
    public function isClosed(): bool
    {
        return $this->status === 'closed';
    }

    /**
     * Vérifier si le feedback a une réponse
     */
    public function hasResponse(): bool
    {
        return !empty($this->admin_response);
    }

    /**
     * Obtenir le statut formaté
     */
    public function getFormattedStatusAttribute(): string
    {
        return match ($this->status) {
            'open' => 'Ouvert',
            'in_progress' => 'En cours',
            'resolved' => 'Résolu',
            'closed' => 'Fermé',
            default => $this->status,
        };
    }

    /**
     * Obtenir la priorité formatée
     */
    public function getFormattedPriorityAttribute(): string
    {
        return match ($this->priority) {
            'low' => 'Faible',
            'medium' => 'Moyenne',
            'high' => 'Élevée',
            'urgent' => 'Urgente',
            default => $this->priority,
        };
    }

    /**
     * Obtenir le type formaté
     */
    public function getFormattedTypeAttribute(): string
    {
        return match ($this->type) {
            'bug' => 'Bug',
            'feature' => 'Fonctionnalité',
            'improvement' => 'Amélioration',
            'complaint' => 'Plainte',
            'compliment' => 'Compliment',
            default => $this->type,
        };
    }
}