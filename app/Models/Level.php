<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Level extends Model
{
    use HasFactory;

    protected $fillable = [
        'cycle_id',
        'name',
        'slug',
        'description',
        'grade_level',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'grade_level' => 'integer',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($level) {
            if (empty($level->slug)) {
                $level->slug = Str::slug($level->name);
            }
        });

        static::updating(function ($level) {
            if ($level->isDirty('name') && empty($level->slug)) {
                $level->slug = Str::slug($level->name);
            }
        });
    }

    public function cycle(): BelongsTo
    {
        return $this->belongsTo(Cycle::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    public function scopeByCycle($query, $cycleId)
    {
        return $query->where('cycle_id', $cycleId);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_level');
    }
}
