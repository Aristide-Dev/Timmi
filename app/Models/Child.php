<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Child extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'name',
        'age',
        'grade_level',
        'avatar',
        'is_active',
    ];

    protected $casts = [
        'age' => 'integer',
        'is_active' => 'boolean',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
