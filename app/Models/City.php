<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class City extends Model
{
    protected $fillable = [
        'name',
        'code',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function communes(): HasMany
    {
        return $this->hasMany(Commune::class);
    }

    public function communesWithNeighborhoods()
    {
        return $this->hasMany(Commune::class)->with('neighborhoods');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
