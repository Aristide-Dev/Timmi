<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\SmsService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PhoneVerificationNotificationController extends Controller
{
    /**
     * Envoie un nouveau code de vérification par SMS.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        // Vérifier que l'utilisateur a un téléphone
        if (!$user->phone) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        if ($user->hasVerifiedPhone()) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        $smsService = new SmsService();
        
        // Générer et stocker le code
        $code = $smsService->generateCode();
        $smsService->storeCode($user->phone, $code);

        // Envoyer le SMS
        $success = $smsService->sendVerificationCode($user->phone, $code);

        if ($success) {
            return redirect()->route('verification.phone.code')->with('status', 'Un nouveau code de vérification a été envoyé par SMS.');
        } else {
            return back()->withErrors(['sms' => 'Impossible d\'envoyer le SMS. Veuillez réessayer.']);
        }
    }
}
