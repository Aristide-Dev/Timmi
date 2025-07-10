<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Mail;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\TeacherPayout;
use App\Models\User;
use App\Observers\BookingObserver;
use App\Observers\PaymentObserver;
use App\Observers\TeacherPayoutObserver;
use App\Observers\UserObserver;
use App\Mail\BookingConfirmed;
use App\Mail\TeacherApproved;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Enregistrer les observers
        Booking::observe(BookingObserver::class);
        Payment::observe(PaymentObserver::class);
        TeacherPayout::observe(TeacherPayoutObserver::class);
        User::observe(UserObserver::class);

        // Envoyer un email quand une réservation est confirmée
        Booking::created(function ($booking) {
            if ($booking->status === 'confirmed') {
                Mail::to($booking->parent->email)
                    ->send(new BookingConfirmed($booking));
            }
        });

        // Envoyer un email quand un professeur est validé
        User::updated(function ($user) {
            if ($user->isDirty('status') && 
                $user->status === 'active' && 
                $user->role === 'teacher') {
                Mail::to($user->email)
                    ->send(new TeacherApproved($user));
            }
        });
    }
}
