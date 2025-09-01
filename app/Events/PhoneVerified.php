<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PhoneVerified
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * L'utilisateur dont le téléphone a été vérifié.
     */
    public User $user;

    /**
     * Créer une nouvelle instance d'événement.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
