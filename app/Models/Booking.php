<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'professor_id',
        'child_id',
        'student_id',
        'subject_id',
        'level_id',
        'duration',
        'total_price',
        'status',
        'payment_status',
        'notes',
        'payment_method',
        'booking_type',
    ];

    protected $casts = [
        'duration' => 'integer',
        'total_price' => 'decimal:2',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function professor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'professor_id');
    }

    public function child(): BelongsTo
    {
        return $this->belongsTo(Child::class);
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class);
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Vérifie si la réservation est faite par un étudiant directement.
     */
    public function isStudentBooking(): bool
    {
        return $this->booking_type === 'student_direct';
    }

    /**
     * Vérifie si la réservation est faite par un parent pour son enfant.
     */
    public function isParentChildBooking(): bool
    {
        return $this->booking_type === 'parent_child';
    }

    /**
     * Retourne l'utilisateur qui a fait la réservation (parent ou étudiant).
     */
    public function getBookerAttribute()
    {
        return $this->isStudentBooking() ? $this->student : $this->parent;
    }

    /**
     * Retourne l'élève concerné par la réservation (enfant ou étudiant).
     */
    public function getLearnerAttribute()
    {
        return $this->isStudentBooking() ? $this->student : $this->child;
    }
}
