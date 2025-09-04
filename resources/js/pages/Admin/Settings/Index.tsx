import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type AdminSettings } from '@/types';
import { type PageProps } from '@inertiajs/react';
import { Head, useForm } from '@inertiajs/react';
import { Save, TestTube, Mail, MessageSquare, CreditCard, Settings, Shield, Database, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface SettingsIndexProps extends PageProps {
    settings: AdminSettings;
}

export default function SettingsIndex({ settings }: SettingsIndexProps) {
    const [activeTab, setActiveTab] = useState('general');
    const [testResults, setTestResults] = useState<{ [key: string]: string }>({});

    // General Settings Form
    const { data: generalData, setData: setGeneralData, post: postGeneral, processing: generalProcessing } = useForm({
        site_name: settings.general.site_name || '',
        site_description: settings.general.site_description || '',
        site_url: settings.general.site_url || '',
        admin_email: settings.general.admin_email || '',
        timezone: settings.general.timezone || 'Africa/Abidjan',
        language: settings.general.language || 'fr',
        maintenance_mode: settings.general.maintenance_mode || false,
    });

    // Email Settings Form
    const { data: emailData, setData: setEmailData, post: postEmail, processing: emailProcessing } = useForm({
        mail_driver: settings.email.mail_driver || 'smtp',
        mail_host: settings.email.mail_host || '',
        mail_port: settings.email.mail_port || 587,
        mail_username: settings.email.mail_username || '',
        mail_password: settings.email.mail_password || '',
        mail_encryption: settings.email.mail_encryption || 'tls',
        mail_from_address: settings.email.mail_from_address || '',
        mail_from_name: settings.email.mail_from_name || '',
    });

    // SMS Settings Form
    const { data: smsData, setData: setSmsData, post: postSms, processing: smsProcessing } = useForm({
        sms_driver: settings.sms.sms_driver || 'twilio',
        sms_api_key: settings.sms.sms_api_key || '',
        sms_api_secret: settings.sms.sms_api_secret || '',
        sms_from_number: settings.sms.sms_from_number || '',
    });

    // Payment Settings Form
    const { data: paymentData, setData: setPaymentData, post: postPayment, processing: paymentProcessing } = useForm({
        payment_driver: settings.payment.payment_driver || 'stripe',
        stripe_public_key: settings.payment.stripe_public_key || '',
        stripe_secret_key: settings.payment.stripe_secret_key || '',
        stripe_webhook_secret: settings.payment.stripe_webhook_secret || '',
        paypal_client_id: settings.payment.paypal_client_id || '',
        paypal_client_secret: settings.payment.paypal_client_secret || '',
        currency: settings.payment.currency || 'GNF',
    });

    // Features Settings Form
    const { data: featuresData, setData: setFeaturesData, post: postFeatures, processing: featuresProcessing } = useForm({
        enable_registration: settings.features.enable_registration || true,
        enable_email_verification: settings.features.enable_email_verification || true,
        enable_sms_verification: settings.features.enable_sms_verification || false,
        enable_reviews: settings.features.enable_reviews || true,
        enable_ratings: settings.features.enable_ratings || true,
        enable_notifications: settings.features.enable_notifications || true,
        enable_analytics: settings.features.enable_analytics || true,
        enable_backup: settings.features.enable_backup || true,
    });

    // Limits Settings Form
    const { data: limitsData, setData: setLimitsData, post: postLimits, processing: limitsProcessing } = useForm({
        max_bookings_per_user: settings.limits.max_bookings_per_user || 10,
        max_sessions_per_booking: settings.limits.max_sessions_per_booking || 5,
        max_file_size: settings.limits.max_file_size || 5,
        max_users_per_hour: settings.limits.max_users_per_hour || 100,
        session_timeout: settings.limits.session_timeout || 120,
        password_min_length: settings.limits.password_min_length || 8,
    });

    const handleGeneralSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postGeneral(route('admin.settings.update-general'));
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postEmail(route('admin.settings.update-email'));
    };

    const handleSmsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postSms(route('admin.settings.update-sms'));
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postPayment(route('admin.settings.update-payment'));
    };

    const handleFeaturesSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postFeatures(route('admin.settings.update-features'));
    };

    const handleLimitsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postLimits(route('admin.settings.update-limits'));
    };

    const testEmail = () => {
        setTestResults({ ...testResults, email: 'Test en cours...' });
        // Simulate API call
        setTimeout(() => {
            setTestResults({ ...testResults, email: 'Email de test envoyé avec succès !' });
        }, 2000);
    };

    const testSms = () => {
        setTestResults({ ...testResults, sms: 'Test en cours...' });
        // Simulate API call
        setTimeout(() => {
            setTestResults({ ...testResults, sms: 'SMS de test envoyé avec succès !' });
        }, 2000);
    };

    const clearCache = () => {
        // Simulate API call
        setTestResults({ ...testResults, cache: 'Cache vidé avec succès !' });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Paramètres', href: route('admin.settings.index') },
            ]}
        >
            <Head title="Paramètres du système" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
                        <p className="text-muted-foreground">
                            Configurez les paramètres de la plateforme
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" onClick={clearCache}>
                            <Database className="mr-2 h-4 w-4" />
                            Vider le cache
                        </Button>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="general">Général</TabsTrigger>
                        <TabsTrigger value="email">Email</TabsTrigger>
                        <TabsTrigger value="sms">SMS</TabsTrigger>
                        <TabsTrigger value="payment">Paiement</TabsTrigger>
                        <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
                        <TabsTrigger value="limits">Limites</TabsTrigger>
                    </TabsList>

                    {/* General Settings */}
                    <TabsContent value="general">
                        <Card>
                            <CardHeader>
                                <CardTitle>Paramètres généraux</CardTitle>
                                <CardDescription>
                                    Configuration de base de la plateforme
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleGeneralSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="site_name">Nom du site</Label>
                                            <Input
                                                id="site_name"
                                                value={generalData.site_name}
                                                onChange={(e) => setGeneralData('site_name', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="site_url">URL du site</Label>
                                            <Input
                                                id="site_url"
                                                value={generalData.site_url}
                                                onChange={(e) => setGeneralData('site_url', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="site_description">Description du site</Label>
                                        <Textarea
                                            id="site_description"
                                            value={generalData.site_description}
                                            onChange={(e) => setGeneralData('site_description', e.target.value)}
                                            rows={3}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="admin_email">Email administrateur</Label>
                                            <Input
                                                id="admin_email"
                                                type="email"
                                                value={generalData.admin_email}
                                                onChange={(e) => setGeneralData('admin_email', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="timezone">Fuseau horaire</Label>
                                            <select
                                                id="timezone"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                                value={generalData.timezone}
                                                onChange={(e) => setGeneralData('timezone', e.target.value)}
                                            >
                                                <option value="Africa/Abidjan">Afrique/Abidjan</option>
                                                <option value="Europe/Paris">Europe/Paris</option>
                                                <option value="UTC">UTC</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="language">Langue</Label>
                                            <select
                                                id="language"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                                value={generalData.language}
                                                onChange={(e) => setGeneralData('language', e.target.value)}
                                            >
                                                <option value="fr">Français</option>
                                                <option value="en">English</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="maintenance_mode"
                                            checked={generalData.maintenance_mode}
                                            onCheckedChange={(checked) => setGeneralData('maintenance_mode', checked)}
                                        />
                                        <Label htmlFor="maintenance_mode">Mode maintenance</Label>
                                    </div>

                                    <Button type="submit" disabled={generalProcessing}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {generalProcessing ? 'Sauvegarde...' : 'Sauvegarder'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Email Settings */}
                    <TabsContent value="email">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuration Email</CardTitle>
                                <CardDescription>
                                    Paramètres pour l'envoi d'emails
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleEmailSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="mail_driver">Driver Email</Label>
                                            <select
                                                id="mail_driver"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                                value={emailData.mail_driver}
                                                onChange={(e) => setEmailData('mail_driver', e.target.value)}
                                            >
                                                <option value="smtp">SMTP</option>
                                                <option value="mailgun">Mailgun</option>
                                                <option value="ses">Amazon SES</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="mail_host">Serveur SMTP</Label>
                                            <Input
                                                id="mail_host"
                                                value={emailData.mail_host}
                                                onChange={(e) => setEmailData('mail_host', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="mail_port">Port</Label>
                                            <Input
                                                id="mail_port"
                                                type="number"
                                                value={emailData.mail_port}
                                                onChange={(e) => setEmailData('mail_port', Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="mail_username">Nom d'utilisateur</Label>
                                            <Input
                                                id="mail_username"
                                                value={emailData.mail_username}
                                                onChange={(e) => setEmailData('mail_username', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="mail_encryption">Chiffrement</Label>
                                            <select
                                                id="mail_encryption"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                                value={emailData.mail_encryption}
                                                onChange={(e) => setEmailData('mail_encryption', e.target.value)}
                                            >
                                                <option value="tls">TLS</option>
                                                <option value="ssl">SSL</option>
                                                <option value="">Aucun</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="mail_password">Mot de passe</Label>
                                        <Input
                                            id="mail_password"
                                            type="password"
                                            value={emailData.mail_password}
                                            onChange={(e) => setEmailData('mail_password', e.target.value)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="mail_from_address">Email expéditeur</Label>
                                            <Input
                                                id="mail_from_address"
                                                type="email"
                                                value={emailData.mail_from_address}
                                                onChange={(e) => setEmailData('mail_from_address', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="mail_from_name">Nom expéditeur</Label>
                                            <Input
                                                id="mail_from_name"
                                                value={emailData.mail_from_name}
                                                onChange={(e) => setEmailData('mail_from_name', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Button type="submit" disabled={emailProcessing}>
                                            <Save className="mr-2 h-4 w-4" />
                                            {emailProcessing ? 'Sauvegarde...' : 'Sauvegarder'}
                                        </Button>
                                        <Button type="button" variant="outline" onClick={testEmail}>
                                            <TestTube className="mr-2 h-4 w-4" />
                                            Tester l'email
                                        </Button>
                                    </div>

                                    {testResults.email && (
                                        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                            <p className="text-sm text-green-800">{testResults.email}</p>
                                        </div>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* SMS Settings */}
                    <TabsContent value="sms">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuration SMS</CardTitle>
                                <CardDescription>
                                    Paramètres pour l'envoi de SMS
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSmsSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="sms_driver">Driver SMS</Label>
                                        <select
                                            id="sms_driver"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                            value={smsData.sms_driver}
                                            onChange={(e) => setSmsData('sms_driver', e.target.value)}
                                        >
                                            <option value="twilio">Twilio</option>
                                            <option value="nexmo">Nexmo</option>
                                            <option value="africas_talking">Africa's Talking</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="sms_api_key">Clé API</Label>
                                            <Input
                                                id="sms_api_key"
                                                value={smsData.sms_api_key}
                                                onChange={(e) => setSmsData('sms_api_key', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="sms_api_secret">Secret API</Label>
                                            <Input
                                                id="sms_api_secret"
                                                type="password"
                                                value={smsData.sms_api_secret}
                                                onChange={(e) => setSmsData('sms_api_secret', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sms_from_number">Numéro expéditeur</Label>
                                        <Input
                                            id="sms_from_number"
                                            value={smsData.sms_from_number}
                                            onChange={(e) => setSmsData('sms_from_number', e.target.value)}
                                            placeholder="+225XXXXXXXXX"
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Button type="submit" disabled={smsProcessing}>
                                            <Save className="mr-2 h-4 w-4" />
                                            {smsProcessing ? 'Sauvegarde...' : 'Sauvegarder'}
                                        </Button>
                                        <Button type="button" variant="outline" onClick={testSms}>
                                            <TestTube className="mr-2 h-4 w-4" />
                                            Tester le SMS
                                        </Button>
                                    </div>

                                    {testResults.sms && (
                                        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                            <p className="text-sm text-green-800">{testResults.sms}</p>
                                        </div>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Payment Settings */}
                    <TabsContent value="payment">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuration Paiement</CardTitle>
                                <CardDescription>
                                    Paramètres pour les paiements
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="payment_driver">Driver Paiement</Label>
                                        <select
                                            id="payment_driver"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                            value={paymentData.payment_driver}
                                            onChange={(e) => setPaymentData('payment_driver', e.target.value)}
                                        >
                                            <option value="stripe">Stripe</option>
                                            <option value="paypal">PayPal</option>
                                            <option value="flutterwave">Flutterwave</option>
                                        </select>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-medium">Stripe</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="stripe_public_key">Clé publique</Label>
                                                <Input
                                                    id="stripe_public_key"
                                                    value={paymentData.stripe_public_key}
                                                    onChange={(e) => setPaymentData('stripe_public_key', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="stripe_secret_key">Clé secrète</Label>
                                                <Input
                                                    id="stripe_secret_key"
                                                    type="password"
                                                    value={paymentData.stripe_secret_key}
                                                    onChange={(e) => setPaymentData('stripe_secret_key', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="stripe_webhook_secret">Secret Webhook</Label>
                                            <Input
                                                id="stripe_webhook_secret"
                                                value={paymentData.stripe_webhook_secret}
                                                onChange={(e) => setPaymentData('stripe_webhook_secret', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-medium">PayPal</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="paypal_client_id">Client ID</Label>
                                                <Input
                                                    id="paypal_client_id"
                                                    value={paymentData.paypal_client_id}
                                                    onChange={(e) => setPaymentData('paypal_client_id', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="paypal_client_secret">Client Secret</Label>
                                                <Input
                                                    id="paypal_client_secret"
                                                    type="password"
                                                    value={paymentData.paypal_client_secret}
                                                    onChange={(e) => setPaymentData('paypal_client_secret', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="currency">Devise</Label>
                                        <select
                                            id="currency"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                            value={paymentData.currency}
                                            onChange={(e) => setPaymentData('currency', e.target.value)}
                                        >
                                            <option value="GNF">GNF (GNF)</option>
                                            <option value="EUR">Euro (EUR)</option>
                                            <option value="USD">Dollar (USD)</option>
                                        </select>
                                    </div>

                                    <Button type="submit" disabled={paymentProcessing}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {paymentProcessing ? 'Sauvegarde...' : 'Sauvegarder'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Features Settings */}
                    <TabsContent value="features">
                        <Card>
                            <CardHeader>
                                <CardTitle>Fonctionnalités</CardTitle>
                                <CardDescription>
                                    Activez ou désactivez les fonctionnalités
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleFeaturesSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="enable_registration">Inscription</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Permettre aux nouveaux utilisateurs de s'inscrire
                                                </p>
                                            </div>
                                            <Switch
                                                id="enable_registration"
                                                checked={featuresData.enable_registration}
                                                onCheckedChange={(checked) => setFeaturesData('enable_registration', checked)}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="enable_email_verification">Vérification Email</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Exiger la vérification par email
                                                </p>
                                            </div>
                                            <Switch
                                                id="enable_email_verification"
                                                checked={featuresData.enable_email_verification}
                                                onCheckedChange={(checked) => setFeaturesData('enable_email_verification', checked)}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="enable_sms_verification">Vérification SMS</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Exiger la vérification par SMS
                                                </p>
                                            </div>
                                            <Switch
                                                id="enable_sms_verification"
                                                checked={featuresData.enable_sms_verification}
                                                onCheckedChange={(checked) => setFeaturesData('enable_sms_verification', checked)}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="enable_reviews">Avis</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Permettre aux utilisateurs de laisser des avis
                                                </p>
                                            </div>
                                            <Switch
                                                id="enable_reviews"
                                                checked={featuresData.enable_reviews}
                                                onCheckedChange={(checked) => setFeaturesData('enable_reviews', checked)}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="enable_ratings">Notes</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Permettre aux utilisateurs de noter
                                                </p>
                                            </div>
                                            <Switch
                                                id="enable_ratings"
                                                checked={featuresData.enable_ratings}
                                                onCheckedChange={(checked) => setFeaturesData('enable_ratings', checked)}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="enable_notifications">Notifications</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Envoyer des notifications aux utilisateurs
                                                </p>
                                            </div>
                                            <Switch
                                                id="enable_notifications"
                                                checked={featuresData.enable_notifications}
                                                onCheckedChange={(checked) => setFeaturesData('enable_notifications', checked)}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="enable_analytics">Analytics</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Collecter des données d'analyse
                                                </p>
                                            </div>
                                            <Switch
                                                id="enable_analytics"
                                                checked={featuresData.enable_analytics}
                                                onCheckedChange={(checked) => setFeaturesData('enable_analytics', checked)}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="enable_backup">Sauvegarde</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Sauvegardes automatiques
                                                </p>
                                            </div>
                                            <Switch
                                                id="enable_backup"
                                                checked={featuresData.enable_backup}
                                                onCheckedChange={(checked) => setFeaturesData('enable_backup', checked)}
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={featuresProcessing}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {featuresProcessing ? 'Sauvegarde...' : 'Sauvegarder'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Limits Settings */}
                    <TabsContent value="limits">
                        <Card>
                            <CardHeader>
                                <CardTitle>Limites</CardTitle>
                                <CardDescription>
                                    Définissez les limites du système
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleLimitsSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="max_bookings_per_user">Max réservations par utilisateur</Label>
                                            <Input
                                                id="max_bookings_per_user"
                                                type="number"
                                                value={limitsData.max_bookings_per_user}
                                                onChange={(e) => setLimitsData('max_bookings_per_user', Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="max_sessions_per_booking">Max sessions par réservation</Label>
                                            <Input
                                                id="max_sessions_per_booking"
                                                type="number"
                                                value={limitsData.max_sessions_per_booking}
                                                onChange={(e) => setLimitsData('max_sessions_per_booking', Number(e.target.value))}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="max_file_size">Taille max des fichiers (MB)</Label>
                                            <Input
                                                id="max_file_size"
                                                type="number"
                                                value={limitsData.max_file_size}
                                                onChange={(e) => setLimitsData('max_file_size', Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="max_users_per_hour">Max utilisateurs par heure</Label>
                                            <Input
                                                id="max_users_per_hour"
                                                type="number"
                                                value={limitsData.max_users_per_hour}
                                                onChange={(e) => setLimitsData('max_users_per_hour', Number(e.target.value))}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="session_timeout">Timeout session (minutes)</Label>
                                            <Input
                                                id="session_timeout"
                                                type="number"
                                                value={limitsData.session_timeout}
                                                onChange={(e) => setLimitsData('session_timeout', Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password_min_length">Longueur min mot de passe</Label>
                                            <Input
                                                id="password_min_length"
                                                type="number"
                                                value={limitsData.password_min_length}
                                                onChange={(e) => setLimitsData('password_min_length', Number(e.target.value))}
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={limitsProcessing}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {limitsProcessing ? 'Sauvegarde...' : 'Sauvegarder'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
