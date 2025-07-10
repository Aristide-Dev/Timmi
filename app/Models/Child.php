<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Child extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'name',
        'grade',
        'level',
        'age',
        'notes',
    ];

    protected $casts = [
        'age' => 'integer',
    ];

    /**
     * Parent de l'enfant
     */
    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    /**
     * Réservations de l'enfant
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
