<?php

namespace App\Observers;

use App\Models\Payment;
use App\Mail\PaymentReceived;
use App\Mail\TeacherPayoutProcessed;
use Illuminate\Support\Facades\Mail;

class PaymentObserver
{
    /**
     * Handle the Payment "created" event.
     */
    public function created(Payment $payment): void
    {
        // Envoyer l'email de confirmation de paiement au parent
        Mail::to($payment->parent->email)
            ->send(new PaymentReceived($payment));
    }

    /**
     * Handle the Payment "updated" event.
     */
    public function updated(Payment $payment): void
    {
        // Si le paiement vient d'être marqué comme complété
        if ($payment->wasChanged('status') && $payment->status === 'completed') {
            Mail::to($payment->parent->email)
                ->send(new PaymentReceived($payment));
        }

        // Si le paiement vient d'être remboursé
        if ($payment->wasChanged('status') && $payment->status === 'refunded') {
            // Envoyer une notification de remboursement
            // TODO: Implémenter RefundProcessed
        }
    }

    /**
     * Handle the Payment "deleted" event.
     */
    public function deleted(Payment $payment): void
    {
        //
    }

    /**
     * Handle the Payment "restored" event.
     */
    public function restored(Payment $payment): void
    {
        //
    }

    /**
     * Handle the Payment "force deleted" event.
     */
    public function forceDeleted(Payment $payment): void
    {
        //
    }
} 