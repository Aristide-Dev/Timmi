<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Availability extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'day_of_week',
        'start_time',
        'end_time',
        'start_date',
        'end_date',
        'is_recurring',
        'is_active',
    ];

    protected $casts = [
        'day_of_week' => 'integer',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_recurring' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Professeur
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Vérifier si une disponibilité est valide pour une date donnée
     */
    public function isValidForDate($date): bool
    {
        if (!$this->is_active) {
            return false;
        }

        $date = Carbon::parse($date);

        // Vérifier si la date est dans la plage de dates valides
        if ($this->start_date && $date->lt($this->start_date)) {
            return false;
        }

        if ($this->end_date && $date->gt($this->end_date)) {
            return false;
        }

        // Vérifier si le jour de la semaine correspond
        if ($this->day_of_week !== $date->dayOfWeek) {
            return false;
        }

        return true;
    }

    /**
     * Obtenir les créneaux disponibles pour une date donnée
     */
    public function getSlotsForDate($date, $duration = 60)
    {
        if (!$this->isValidForDate($date)) {
            return collect();
        }

        $slots = collect();
        $start = Carbon::parse($date)->setTimeFromTimeString($this->start_time);
        $end = Carbon::parse($date)->setTimeFromTimeString($this->end_time);

        while ($start->addMinutes($duration)->lte($end)) {
            $slotStart = $start->copy();
            $slotEnd = $start->copy();
            
            // Vérifier s'il n'y a pas de réservation sur ce créneau
            $hasBooking = Booking::where('teacher_id', $this->teacher_id)
                ->where('class_date', $date)
                ->where('status', '!=', 'cancelled')
                ->where(function ($query) use ($slotStart, $slotEnd) {
                    $query->whereBetween('start_time', [$slotStart->format('H:i'), $slotEnd->format('H:i')])
                        ->orWhereBetween('end_time', [$slotStart->format('H:i'), $slotEnd->format('H:i')])
                        ->orWhere(function ($q) use ($slotStart, $slotEnd) {
                            $q->where('start_time', '<=', $slotStart->format('H:i'))
                                ->where('end_time', '>=', $slotEnd->format('H:i'));
                        });
                })
                ->exists();

            if (!$hasBooking) {
                $slots->push([
                    'start' => $slotStart->format('H:i'),
                    'end' => $slotEnd->format('H:i'),
                ]);
            }
        }

        return $slots;
    }

    /**
     * Scope pour les disponibilités actives
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
