<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Events\PhoneVerified;
use App\Services\SmsService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VerifyPhoneController extends Controller
{
    /**
     * Marque le numéro de téléphone de l'utilisateur authentifié comme vérifié.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $user = $request->user();
        
        // Vérifier que l'utilisateur a un téléphone
        if (!$user->phone) {
            return redirect()->intended(route('dashboard', absolute: false));
        }
        
        $phone = $user->phone;
        $code = $request->code;

        $smsService = new SmsService();

        // Vérifier le code SMS
        if (!$smsService->verifyCode($phone, $code)) {
            return back()->withErrors(['code' => 'Le code de vérification est incorrect.']);
        }

        if ($user->hasVerifiedPhone()) {
            return redirect()->intended(route('dashboard', absolute: false).'?phone_verified=1');
        }

        if ($user->markPhoneAsVerified()) {
            event(new PhoneVerified($user));
            
            // Supprimer le code du cache
            $smsService->removeCode($phone);
        }

        return redirect()->intended(route('dashboard', absolute: false).'?phone_verified=1');
    }
}
