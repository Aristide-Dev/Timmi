<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class SmsService
{
    /**
     * Envoie un SMS avec le code de vérification.
     */
    public function sendVerificationCode(string $phone, string $code): bool
    {
        $driver = config('sms.default', 'log');
        
        switch ($driver) {
            case 'twilio':
                return $this->sendViaTwilio($phone, $code);
            case 'vonage':
                return $this->sendViaVonage($phone, $code);
            case 'log':
            default:
                return $this->sendViaLog($phone, $code);
        }
    }

    /**
     * Envoie un SMS via Twilio.
     */
    private function sendViaTwilio(string $phone, string $code): bool
    {
        try {
            // TODO: Implémenter l'envoi via Twilio
            // $twilio = new Client(config('sms.drivers.twilio.sid'), config('sms.drivers.twilio.token'));
            // $twilio->messages->create($phone, [
            //     'from' => config('sms.drivers.twilio.from'),
            //     'body' => "Votre code de vérification TIMMI est: {$code}"
            // ]);
            
            Log::info("SMS Twilio envoyé à {$phone}: {$code}");
            return true;
        } catch (\Exception $e) {
            Log::error("Erreur envoi SMS Twilio: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Envoie un SMS via Vonage.
     */
    private function sendViaVonage(string $phone, string $code): bool
    {
        try {
            // TODO: Implémenter l'envoi via Vonage
            // $vonage = new \Vonage\Client(new \Vonage\Client\Credentials\Basic(
            //     config('sms.drivers.vonage.key'),
            //     config('sms.drivers.vonage.secret')
            // ));
            // $vonage->message()->send([
            //     'to' => $phone,
            //     'from' => config('sms.drivers.vonage.from'),
            //     'text' => "Votre code de vérification TIMMI est: {$code}"
            // ]);
            
            Log::info("SMS Vonage envoyé à {$phone}: {$code}");
            return true;
        } catch (\Exception $e) {
            Log::error("Erreur envoi SMS Vonage: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Simule l'envoi via les logs (pour le développement).
     */
    private function sendViaLog(string $phone, string $code): bool
    {
        Log::info("SMS simulé envoyé à {$phone}: {$code}");
        return true;
    }

    /**
     * Génère un code de vérification.
     */
    public function generateCode(): string
    {
        return str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    }

    /**
     * Stocke le code en cache.
     */
    public function storeCode(string $phone, string $code): void
    {
        $cacheKey = "phone_verification_{$phone}";
        $expiresIn = config('sms.verification.expires_in_minutes', 10);
        
        Cache::put($cacheKey, $code, now()->addMinutes($expiresIn));
    }

    /**
     * Vérifie si le code est valide.
     */
    public function verifyCode(string $phone, string $code): bool
    {
        $cacheKey = "phone_verification_{$phone}";
        $storedCode = Cache::get($cacheKey);
        
        return $storedCode === $code;
    }

    /**
     * Supprime le code du cache.
     */
    public function removeCode(string $phone): void
    {
        $cacheKey = "phone_verification_{$phone}";
        Cache::forget($cacheKey);
    }
}
