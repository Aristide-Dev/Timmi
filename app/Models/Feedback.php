<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory;

    protected $table = 'feedbacks';

    protected $fillable = [
        'session_id',
        'rating',
        'comment',
        'categories',
    ];

    protected $casts = [
        'rating' => 'integer',
        'categories' => 'array',
    ];

    public function session(): BelongsTo
    {
        return $this->belongsTo(Session::class);
    }
}
