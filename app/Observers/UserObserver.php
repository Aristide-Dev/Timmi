<?php

namespace App\Observers;

use App\Models\User;
use App\Mail\TeacherApproved;
use Illuminate\Support\Facades\Mail;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        //
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        // Si le statut d'un professeur vient de passer à "active"
        if ($user->role === 'teacher' && 
            $user->wasChanged('status') && 
            $user->status === 'active') {
            Mail::to($user->email)->send(new TeacherApproved($user));
        }
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
} 