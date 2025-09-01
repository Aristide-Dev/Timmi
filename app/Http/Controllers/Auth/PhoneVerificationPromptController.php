<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PhoneVerificationPromptController extends Controller
{
    /**
     * Affiche la page de vérification du téléphone.
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
        $user = $request->user();
        
        // Si l'utilisateur n'a pas de téléphone, rediriger vers le dashboard
        if (!$user->phone) {
            return redirect()->intended(route('dashboard', absolute: false));
        }
        
        if ($user->hasVerifiedPhone()) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        // Envoyer automatiquement un SMS si aucun code n'a été envoyé récemment
        $smsService = new \App\Services\SmsService();
        $cacheKey = "phone_verification_{$user->phone}";
        
        if (!\Illuminate\Support\Facades\Cache::has($cacheKey)) {
            $code = $smsService->generateCode();
            $smsService->storeCode($user->phone, $code);
            $smsService->sendVerificationCode($user->phone, $code);
        }
        
        return Inertia::render('auth/verify-phone-code', ['status' => $request->session()->get('status')]);
    }
}
