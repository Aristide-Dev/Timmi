<?php

namespace App\Contracts\Auth;

interface MustVerifyPhone
{
    /**
     * Determine if the user has verified their phone number.
     */
    public function hasVerifiedPhone(): bool;

    /**
     * Mark the given user's phone as verified.
     */
    public function markPhoneAsVerified(): bool;

    /**
     * Send the phone verification notification.
     */
    public function sendPhoneVerificationNotification(): void;
}
