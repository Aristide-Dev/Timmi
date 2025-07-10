<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bio',
        'photo',
        'diplomas',
        'experiences',
        'levels',
        'zones',
        'teaching_mode',
        'hourly_rate',
        'total_hours',
        'total_students',
        'rating',
        'total_reviews',
        'is_verified',
        'verified_at',
    ];

    protected $casts = [
        'diplomas' => 'array',
        'experiences' => 'array',
        'levels' => 'array',
        'zones' => 'array',
        'hourly_rate' => 'decimal:2',
        'total_hours' => 'integer',
        'total_students' => 'integer',
        'rating' => 'decimal:2',
        'total_reviews' => 'integer',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
    ];

    /**
     * Utilisateur associé au profil
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Mettre à jour les statistiques du professeur
     */
    public function updateStats()
    {
        $completedBookings = $this->user->bookingsAsTeacher()
            ->where('status', 'completed')
            ->get();

        $this->total_hours = $completedBookings->sum('duration') / 60;
        $this->total_students = $completedBookings->pluck('parent_id')->unique()->count();

        $reviews = $this->user->reviewsReceived()->where('is_visible', true)->get();
        $this->total_reviews = $reviews->count();
        $this->rating = $reviews->count() > 0 ? $reviews->avg('rating') : 0;

        $this->save();
    }

    /**
     * Vérifier si le professeur peut enseigner dans une zone
     */
    public function canTeachInZone($zone): bool
    {
        if (empty($this->zones)) {
            return true; // Accepte toutes les zones si aucune n'est spécifiée
        }
        
        return in_array($zone, $this->zones);
    }

    /**
     * Vérifier si le professeur peut enseigner à un niveau
     */
    public function canTeachLevel($level): bool
    {
        if (empty($this->levels)) {
            return true; // Accepte tous les niveaux si aucun n'est spécifié
        }
        
        return in_array($level, $this->levels);
    }
}
