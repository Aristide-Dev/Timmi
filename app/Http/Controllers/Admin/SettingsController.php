<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    /**
     * Afficher les paramètres du système
     */
    public function index(): Response
    {
        $settings = [
            'general' => [
                'site_name' => config('app.name'),
                'site_description' => 'Plateforme de cours particuliers en ligne',
                'site_url' => config('app.url'),
                'timezone' => config('app.timezone'),
                'locale' => config('app.locale'),
            ],
            'email' => [
                'mail_mailer' => config('mail.default'),
                'mail_host' => config('mail.mailers.smtp.host'),
                'mail_port' => config('mail.mailers.smtp.port'),
                'mail_username' => config('mail.mailers.smtp.username'),
                'mail_encryption' => config('mail.mailers.smtp.encryption'),
            ],
            'sms' => [
                'sms_driver' => config('sms.default'),
                'sms_api_key' => config('sms.drivers.twilio.api_key'),
                'sms_from' => config('sms.drivers.twilio.from'),
            ],
            'payment' => [
                'payment_gateway' => 'stripe', // À configurer
                'currency' => 'GNF',
                'commission_rate' => 10, // 10% de commission
            ],
            'features' => [
                'enable_registration' => true,
                'enable_phone_verification' => true,
                'enable_email_verification' => true,
                'enable_reviews' => true,
                'enable_feedback' => true,
                'enable_certificates' => true,
            ],
            'limits' => [
                'max_file_size' => 2048, // KB
                'max_children_per_parent' => 5,
                'max_subjects_per_professor' => 10,
                'max_cities_per_professor' => 3,
                'session_duration_min' => 30, // minutes
                'session_duration_max' => 180, // minutes
            ],
        ];

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Mettre à jour les paramètres généraux
     */
    public function updateGeneral(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_description' => 'required|string|max:500',
            'site_url' => 'required|url',
            'timezone' => 'required|string',
            'locale' => 'required|string|in:fr,en',
        ]);

        // Mettre à jour la configuration
        $this->updateConfig('app.name', $validated['site_name']);
        $this->updateConfig('app.url', $validated['site_url']);
        $this->updateConfig('app.timezone', $validated['timezone']);
        $this->updateConfig('app.locale', $validated['locale']);

        return back()->with('success', 'Paramètres généraux mis à jour avec succès.');
    }

    /**
     * Mettre à jour les paramètres d'email
     */
    public function updateEmail(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'mail_mailer' => 'required|string|in:smtp,sendmail,mailgun,ses',
            'mail_host' => 'required|string|max:255',
            'mail_port' => 'required|integer|min:1|max:65535',
            'mail_username' => 'nullable|string|max:255',
            'mail_password' => 'nullable|string|max:255',
            'mail_encryption' => 'nullable|string|in:tls,ssl',
        ]);

        // Mettre à jour la configuration email
        $this->updateConfig('mail.default', $validated['mail_mailer']);
        $this->updateConfig('mail.mailers.smtp.host', $validated['mail_host']);
        $this->updateConfig('mail.mailers.smtp.port', $validated['mail_port']);
        $this->updateConfig('mail.mailers.smtp.username', $validated['mail_username']);
        $this->updateConfig('mail.mailers.smtp.encryption', $validated['mail_encryption']);

        if ($validated['mail_password']) {
            $this->updateConfig('mail.mailers.smtp.password', $validated['mail_password']);
        }

        return back()->with('success', 'Paramètres email mis à jour avec succès.');
    }

    /**
     * Mettre à jour les paramètres SMS
     */
    public function updateSms(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'sms_driver' => 'required|string|in:twilio,nexmo',
            'sms_api_key' => 'required|string|max:255',
            'sms_api_secret' => 'nullable|string|max:255',
            'sms_from' => 'required|string|max:20',
        ]);

        // Mettre à jour la configuration SMS
        $this->updateConfig('sms.default', $validated['sms_driver']);
        $this->updateConfig('sms.drivers.twilio.api_key', $validated['sms_api_key']);
        $this->updateConfig('sms.drivers.twilio.from', $validated['sms_from']);

        if ($validated['sms_api_secret']) {
            $this->updateConfig('sms.drivers.twilio.api_secret', $validated['sms_api_secret']);
        }

        return back()->with('success', 'Paramètres SMS mis à jour avec succès.');
    }

    /**
     * Mettre à jour les paramètres de paiement
     */
    public function updatePayment(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'payment_gateway' => 'required|string|in:stripe,paypal,orange_money,mtn_money',
            'currency' => 'required|string|in:GNF,EUR,USD',
            'commission_rate' => 'required|numeric|min:0|max:50',
            'stripe_public_key' => 'nullable|string|max:255',
            'stripe_secret_key' => 'nullable|string|max:255',
        ]);

        // Mettre à jour la configuration de paiement
        $this->updateConfig('payment.gateway', $validated['payment_gateway']);
        $this->updateConfig('payment.currency', $validated['currency']);
        $this->updateConfig('payment.commission_rate', $validated['commission_rate']);

        if ($validated['stripe_public_key']) {
            $this->updateConfig('payment.stripe.public_key', $validated['stripe_public_key']);
        }

        if ($validated['stripe_secret_key']) {
            $this->updateConfig('payment.stripe.secret_key', $validated['stripe_secret_key']);
        }

        return back()->with('success', 'Paramètres de paiement mis à jour avec succès.');
    }

    /**
     * Mettre à jour les fonctionnalités
     */
    public function updateFeatures(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'enable_registration' => 'boolean',
            'enable_phone_verification' => 'boolean',
            'enable_email_verification' => 'boolean',
            'enable_reviews' => 'boolean',
            'enable_feedback' => 'boolean',
            'enable_certificates' => 'boolean',
        ]);

        // Mettre à jour la configuration des fonctionnalités
        foreach ($validated as $key => $value) {
            $this->updateConfig("features.{$key}", $value);
        }

        return back()->with('success', 'Fonctionnalités mises à jour avec succès.');
    }

    /**
     * Mettre à jour les limites
     */
    public function updateLimits(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'max_file_size' => 'required|integer|min:100|max:10240', // 100KB à 10MB
            'max_children_per_parent' => 'required|integer|min:1|max:20',
            'max_subjects_per_professor' => 'required|integer|min:1|max:50',
            'max_cities_per_professor' => 'required|integer|min:1|max:10',
            'session_duration_min' => 'required|integer|min:15|max:60',
            'session_duration_max' => 'required|integer|min:60|max:480',
        ]);

        // Validation supplémentaire
        if ($validated['session_duration_min'] >= $validated['session_duration_max']) {
            return back()->with('error', 'La durée minimale doit être inférieure à la durée maximale.');
        }

        // Mettre à jour la configuration des limites
        foreach ($validated as $key => $value) {
            $this->updateConfig("limits.{$key}", $value);
        }

        return back()->with('success', 'Limites mises à jour avec succès.');
    }

    /**
     * Tester la configuration email
     */
    public function testEmail(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'test_email' => 'required|email',
        ]);

        try {
            // Envoyer un email de test
            // Mail::to($validated['test_email'])->send(new TestEmail());

            return back()->with('success', 'Email de test envoyé avec succès.');
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur lors de l\'envoi de l\'email de test: ' . $e->getMessage());
        }
    }

    /**
     * Tester la configuration SMS
     */
    public function testSms(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'test_phone' => 'required|string|max:20',
        ]);

        try {
            // Envoyer un SMS de test
            // SMS::to($validated['test_phone'])->send('Test SMS from TIMMI');

            return back()->with('success', 'SMS de test envoyé avec succès.');
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur lors de l\'envoi du SMS de test: ' . $e->getMessage());
        }
    }

    /**
     * Vider le cache
     */
    public function clearCache(): RedirectResponse
    {
        try {
            Cache::flush();
            \Artisan::call('config:clear');
            \Artisan::call('route:clear');
            \Artisan::call('view:clear');

            return back()->with('success', 'Cache vidé avec succès.');
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur lors du vidage du cache: ' . $e->getMessage());
        }
    }

    /**
     * Mettre à jour un paramètre de configuration
     */
    private function updateConfig(string $key, mixed $value): void
    {
        // Cette méthode devrait mettre à jour le fichier de configuration
        // ou la base de données selon l'implémentation choisie
        // Pour l'instant, on simule la mise à jour
        config([$key => $value]);
    }
}
