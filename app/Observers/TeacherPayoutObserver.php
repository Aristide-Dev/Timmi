<?php

namespace App\Observers;

use App\Models\TeacherPayout;
use App\Mail\TeacherPayoutProcessed;
use Illuminate\Support\Facades\Mail;

class TeacherPayoutObserver
{
    /**
     * Handle the TeacherPayout "created" event.
     */
    public function created(TeacherPayout $payout): void
    {
        // Envoyer l'email si le paiement est déjà complété
        if ($payout->status === 'completed') {
            Mail::to($payout->teacher->email)->send(new TeacherPayoutProcessed($payout));
        }
    }

    /**
     * Handle the TeacherPayout "updated" event.
     */
    public function updated(TeacherPayout $payout): void
    {
        // Si le statut vient de passer à "completed"
        if ($payout->wasChanged('status') && $payout->status === 'completed') {
            Mail::to($payout->teacher->email)->send(new TeacherPayoutProcessed($payout));
        }
    }

    /**
     * Handle the TeacherPayout "deleted" event.
     */
    public function deleted(TeacherPayout $payout): void
    {
        //
    }

    /**
     * Handle the TeacherPayout "restored" event.
     */
    public function restored(TeacherPayout $payout): void
    {
        //
    }

    /**
     * Handle the TeacherPayout "force deleted" event.
     */
    public function forceDeleted(TeacherPayout $payout): void
    {
        //
    }
} 