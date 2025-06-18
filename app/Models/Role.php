<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    /**
     * Les attributs qui sont mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'is_default',
        'is_admin',
        'permissions',
    ];

    /**
     * Les attributs qui doivent être castés.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'permissions' => 'json',
        'is_default' => 'boolean',
        'is_admin' => 'boolean',
    ];

    /**
     * Les utilisateurs qui appartiennent à ce rôle.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Vérifie si le rôle a une permission spécifique.
     */
    public function hasPermission(string $permission): bool
    {
        if ($this->is_admin) {
            return true;
        }

        $permissions = $this->permissions ?? [];
        
        return in_array($permission, $permissions);
    }
}