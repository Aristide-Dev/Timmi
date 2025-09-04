<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'professor_id',
        'name',
        'description',
        'issuer',
        'issued_at',
        'expires_at',
        'file_path',
        'status',
        'verified_at',
        'verified_by',
        'certificate_number',
        'credential_id',
        'verification_url',
    ];

    protected $casts = [
        'issued_at' => 'date',
        'expires_at' => 'date',
        'verified_at' => 'datetime',
    ];

    /**
     * Relation avec le professeur
     */
    public function professor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'professor_id');
    }

    /**
     * Relation avec l'admin qui a vérifié
     */
    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    /**
     * Scope pour les certificats vérifiés
     */
    public function scopeVerified($query)
    {
        return $query->where('status', 'verified');
    }

    /**
     * Scope pour les certificats en attente
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope pour les certificats rejetés
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Scope pour les certificats expirés
     */
    public function scopeExpired($query)
    {
        return $query->where('expires_at', '<', now());
    }

    /**
     * Scope pour les certificats valides
     */
    public function scopeValid($query)
    {
        return $query->where('status', 'verified')
                    ->where(function ($q) {
                        $q->whereNull('expires_at')
                          ->orWhere('expires_at', '>', now());
                    });
    }

    /**
     * Vérifier si le certificat est vérifié
     */
    public function isVerified(): bool
    {
        return $this->status === 'verified';
    }

    /**
     * Vérifier si le certificat est en attente
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Vérifier si le certificat est rejeté
     */
    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    /**
     * Vérifier si le certificat est expiré
     */
    public function isExpired(): bool
    {
        return $this->expires_at && $this->expires_at->isPast();
    }

    /**
     * Vérifier si le certificat est valide
     */
    public function isValid(): bool
    {
        return $this->isVerified() && !$this->isExpired();
    }

    /**
     * Obtenir le statut formaté
     */
    public function getFormattedStatusAttribute(): string
    {
        if ($this->isExpired()) {
            return 'Expiré';
        }

        return match ($this->status) {
            'pending' => 'En attente',
            'verified' => 'Vérifié',
            'rejected' => 'Rejeté',
            default => $this->status,
        };
    }

    /**
     * Obtenir la durée de validité restante
     */
    public function getRemainingValidityAttribute(): ?int
    {
        if (!$this->expires_at) {
            return null;
        }

        return now()->diffInDays($this->expires_at, false);
    }

    /**
     * Obtenir l'URL de téléchargement
     */
    public function getDownloadUrlAttribute(): ?string
    {
        return $this->file_path ? asset('storage/' . $this->file_path) : null;
    }
}