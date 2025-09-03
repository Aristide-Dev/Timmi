<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Contracts\Auth\MustVerifyPhone;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyPhone
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'bio',
        'hourly_rate',
        'experience_years',
        'education',
        'specializations',
        'languages',
        'is_verified',
        'is_available',
        'rating',
        'total_reviews',
        'profile_photo',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'phone_verified_at' => 'datetime',
            'password' => 'hashed',
            'hourly_rate' => 'decimal:2',
            'experience_years' => 'integer',
            'specializations' => 'array',
            'languages' => 'array',
            'is_verified' => 'boolean',
            'is_available' => 'boolean',
            'rating' => 'decimal:1',
            'total_reviews' => 'integer',
        ];
    }

    /**
     * Les rôles qui appartiennent à l'utilisateur.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Vérifie si l'utilisateur a un rôle spécifique.
     */
    public function hasRole(string $roleSlug): bool
    {
        return $this->roles()->where('slug', $roleSlug)->exists();
    }

    /**
     * Vérifie si l'utilisateur est administrateur.
     */
    public function isAdmin(): bool
    {
        return $this->roles()->where('is_admin', true)->exists();
    }

    /**
     * Vérifie si l'utilisateur a une permission spécifique.
     */
    public function hasPermission(string $permission): bool
    {
        // Si l'utilisateur a un rôle admin, il a toutes les permissions
        if ($this->isAdmin()) {
            return true;
        }

        // Vérifier si l'un des rôles de l'utilisateur a la permission
        foreach ($this->roles as $role) {
            if ($role->hasPermission($permission)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Attribue un rôle à l'utilisateur.
     */
    public function assignRole(string $roleSlug): void
    {
        $role = Role::where('slug', $roleSlug)->first();
        
        if ($role && !$this->hasRole($roleSlug)) {
            $this->roles()->attach($role->id);
        }
    }

    /**
     * Retire un rôle à l'utilisateur.
     */
    public function removeRole(string $roleSlug): void
    {
        $role = Role::where('slug', $roleSlug)->first();
        
        if ($role) {
            $this->roles()->detach($role->id);
        }
    }

    /**
     * Vérifie si le numéro de téléphone de l'utilisateur est vérifié.
     */
    public function hasVerifiedPhone(): bool
    {
        return ! is_null($this->phone_verified_at);
    }

    /**
     * Marque le numéro de téléphone de l'utilisateur comme vérifié.
     */
    public function markPhoneAsVerified(): bool
    {
        return $this->forceFill([
            'phone_verified_at' => $this->freshTimestamp(),
        ])->save();
    }

    /**
     * Envoie la notification de vérification du téléphone.
     */
    public function sendPhoneVerificationNotification(): void
    {
        if (!$this->phone) {
            return;
        }
        
        $smsService = new \App\Services\SmsService();
        
        // Générer et stocker le code
        $code = $smsService->generateCode();
        $smsService->storeCode($this->phone, $code);
        
        // Envoyer le SMS
        $smsService->sendVerificationCode($this->phone, $code);
    }

    /**
     * Vérifie si l'utilisateur peut s'authentifier par téléphone.
     */
    public function canAuthenticateWithPhone(): bool
    {
        return ! empty($this->phone) && $this->hasVerifiedPhone();
    }

    /**
     * Vérifie si l'utilisateur peut s'authentifier par email.
     */
    public function canAuthenticateWithEmail(): bool
    {
        return ! empty($this->email) && ! is_null($this->email_verified_at);
    }

    /**
     * Détermine si l'identifiant fourni est un email ou un téléphone.
     */
    public static function isEmail(string $identifier): bool
    {
        return filter_var($identifier, FILTER_VALIDATE_EMAIL) !== false;
    }

    // Relations pour les professeurs
    public function subjects(): BelongsToMany
    {
        return $this->belongsToMany(Subject::class, 'user_subject');
    }

    public function levels(): BelongsToMany
    {
        return $this->belongsToMany(Level::class, 'user_level');
    }

    public function cities(): BelongsToMany
    {
        return $this->belongsToMany(City::class, 'user_city');
    }

    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class);
    }

    public function availabilities(): HasMany
    {
        return $this->hasMany(Availability::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'professor_id');
    }

    // Relations pour les parents
    public function children(): HasMany
    {
        return $this->hasMany(Child::class, 'parent_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'parent_id');
    }

    public function professorBookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'professor_id');
    }
}
