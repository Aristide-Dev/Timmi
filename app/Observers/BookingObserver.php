<?php

namespace App\Observers;

use App\Models\Booking;
use App\Mail\BookingConfirmed;
use App\Mail\BookingCancelled;
use Illuminate\Support\Facades\Mail;

class BookingObserver
{
    /**
     * Handle the Booking "created" event.
     */
    public function created(Booking $booking): void
    {
        // Envoyer l'email de confirmation au parent
        Mail::to($booking->parent->email)
            ->send(new BookingConfirmed($booking));

        // Envoyer une copie au professeur
        Mail::to($booking->teacher->email)
            ->send(new BookingConfirmed($booking));
    }

    /**
     * Handle the Booking "updated" event.
     */
    public function updated(Booking $booking): void
    {
        // Si la réservation vient d'être annulée
        if ($booking->wasChanged('status') && $booking->status === 'cancelled') {
            // Envoyer l'email d'annulation au parent
            Mail::to($booking->parent->email)
                ->send(new BookingCancelled($booking));

            // Envoyer une copie au professeur
            Mail::to($booking->teacher->email)
                ->send(new BookingCancelled($booking));
        }
    }

    /**
     * Handle the Booking "deleted" event.
     */
    public function deleted(Booking $booking): void
    {
        //
    }

    /**
     * Handle the Booking "restored" event.
     */
    public function restored(Booking $booking): void
    {
        //
    }

    /**
     * Handle the Booking "force deleted" event.
     */
    public function forceDeleted(Booking $booking): void
    {
        //
    }
} 