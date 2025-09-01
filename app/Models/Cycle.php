<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Cycle extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'min_age',
        'max_age',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'min_age' => 'integer',
        'max_age' => 'integer',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($cycle) {
            if (empty($cycle->slug)) {
                $cycle->slug = Str::slug($cycle->name);
            }
        });

        static::updating(function ($cycle) {
            if ($cycle->isDirty('name') && empty($cycle->slug)) {
                $cycle->slug = Str::slug($cycle->name);
            }
        });
    }

    public function levels(): HasMany
    {
        return $this->hasMany(Level::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }
}
