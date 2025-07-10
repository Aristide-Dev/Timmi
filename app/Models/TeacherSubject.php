<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherSubject extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'subject_id',
        'specialties',
        'hourly_rate',
    ];

    protected $casts = [
        'specialties' => 'array',
        'hourly_rate' => 'decimal:2',
    ];

    /**
     * Professeur
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Matière
     */
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
