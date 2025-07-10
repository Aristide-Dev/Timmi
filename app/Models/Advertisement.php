<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'advertiser_name',
        'advertiser_email',
        'advertiser_phone',
        'image',
        'link',
        'position',
        'start_date',
        'end_date',
        'amount_paid',
        'max_impressions',
        'current_impressions',
        'clicks',
        'is_active',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'amount_paid' => 'decimal:2',
        'max_impressions' => 'integer',
        'current_impressions' => 'integer',
        'clicks' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Scope pour les publicités actives
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
                    ->where('start_date', '<=', today())
                    ->where('end_date', '>=', today())
                    ->where(function ($q) {
                        $q->whereNull('max_impressions')
                          ->orWhereColumn('current_impressions', '<', 'max_impressions');
                    });
    }

    /**
     * Scope par position
     */
    public function scopeForPosition($query, $position)
    {
        return $query->where('position', $position);
    }

    /**
     * Incrémenter les impressions
     */
    public function incrementImpressions()
    {
        $this->increment('current_impressions');
        
        // Désactiver si le maximum est atteint
        if ($this->max_impressions && $this->current_impressions >= $this->max_impressions) {
            $this->update(['is_active' => false]);
        }
    }

    /**
     * Incrémenter les clics
     */
    public function incrementClicks()
    {
        $this->increment('clicks');
    }

    /**
     * Calculer le CTR (Click-Through Rate)
     */
    public function getCtrAttribute()
    {
        if ($this->current_impressions === 0) {
            return 0;
        }
        
        return round(($this->clicks / $this->current_impressions) * 100, 2);
    }

    /**
     * Vérifier si la publicité est expirée
     */
    public function isExpired(): bool
    {
        return $this->end_date->isPast() || 
               ($this->max_impressions && $this->current_impressions >= $this->max_impressions);
    }
}
