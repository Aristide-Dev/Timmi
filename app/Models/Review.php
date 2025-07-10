<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'parent_id',
        'teacher_id',
        'rating',
        'comment',
        'is_visible',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_visible' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($review) {
            // Mettre à jour les statistiques du professeur
            $review->teacher->teacherProfile->updateStats();
        });

        static::updated(function ($review) {
            // Mettre à jour les statistiques du professeur si la visibilité change
            if ($review->isDirty('is_visible') || $review->isDirty('rating')) {
                $review->teacher->teacherProfile->updateStats();
            }
        });

        static::deleted(function ($review) {
            // Mettre à jour les statistiques du professeur
            $review->teacher->teacherProfile->updateStats();
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
     * Parent qui a laissé l'avis
     */
    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    /**
     * Professeur concerné
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Scope pour les avis visibles
     */
    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    /**
     * Obtenir la note formatée avec des étoiles
     */
    public function getStarsAttribute()
    {
        return str_repeat('★', $this->rating) . str_repeat('☆', 5 - $this->rating);
    }
}
