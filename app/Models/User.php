<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
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
        'password',
        'role',
        'phone',
        'city',
        'status',
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
            'password' => 'hashed',
        ];
    }

    /**
     * Vérifier si l'utilisateur est un parent
     */
    public function isParent(): bool
    {
        return $this->role === 'parent';
    }

    /**
     * Vérifier si l'utilisateur est un professeur
     */
    public function isTeacher(): bool
    {
        return $this->role === 'teacher';
    }

    /**
     * Vérifier si l'utilisateur est un admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Relations pour les parents
     */
    public function children()
    {
        return $this->hasMany(Child::class, 'parent_id');
    }

    /**
     * Relations pour les professeurs
     */
    public function teacherProfile()
    {
        return $this->hasOne(TeacherProfile::class);
    }

    public function teacherSubjects()
    {
        return $this->hasMany(TeacherSubject::class, 'teacher_id');
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'teacher_subjects', 'teacher_id', 'subject_id')
            ->withPivot('specialties', 'hourly_rate')
            ->withTimestamps();
    }

    public function availabilities()
    {
        return $this->hasMany(Availability::class, 'teacher_id');
    }

    /**
     * Relations communes
     */
    public function bookingsAsParent()
    {
        return $this->hasMany(Booking::class, 'parent_id');
    }

    public function bookingsAsTeacher()
    {
        return $this->hasMany(Booking::class, 'teacher_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'parent_id');
    }

    public function reviewsGiven()
    {
        return $this->hasMany(Review::class, 'parent_id');
    }

    public function reviewsReceived()
    {
        return $this->hasMany(Review::class, 'teacher_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function payouts()
    {
        return $this->hasMany(TeacherPayout::class, 'teacher_id');
    }
}
