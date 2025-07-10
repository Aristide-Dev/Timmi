import { Head } from '@inertiajs/react';
import { Clock, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';

export default function TeacherPending({ auth }: PageProps) {
    const steps = [
        {
            icon: FileText,
            title: 'Inscription complétée',
            description: 'Votre compte a été créé avec succès',
            completed: true,
        },
        {
            icon: Clock,
            title: 'Vérification en cours',
            description: 'Notre équipe vérifie vos informations',
            completed: false,
            current: true,
        },
        {
            icon: CheckCircle,
            title: 'Compte approuvé',
            description: 'Vous pourrez recevoir des réservations',
            completed: false,
        },
    ];

    return (
        <AppLayout>
            <Head title="Compte en attente" />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Compte en attente de validation</h1>
                    <p className="text-muted-foreground mt-2">
                        Bienvenue {auth.user?.name} ! Votre compte est en cours de vérification.
                    </p>
                </div>

                {/* Alert */}
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Validation requise</AlertTitle>
                    <AlertDescription>
                        Votre compte professeur doit être validé par un administrateur avant que vous puissiez recevoir des réservations. 
                        Ce processus prend généralement 24 à 48 heures.
                    </AlertDescription>
                </Alert>

                {/* Progress Steps */}
                <Card>
                    <CardHeader>
                        <CardTitle>Étapes de validation</CardTitle>
                        <CardDescription>
                            Suivez le processus de validation de votre compte
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                                        step.completed 
                                            ? 'bg-green-100 text-green-600'
                                            : step.current
                                            ? 'bg-blue-100 text-blue-600 animate-pulse'
                                            : 'bg-gray-100 text-gray-400'
                                    }`}>
                                        <step.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-medium ${
                                            step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'
                                        }`}>
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </div>
                                    {step.completed && (
                                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Que se passe-t-il maintenant ?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                Notre équipe vérifie actuellement :
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                <li>Vos informations personnelles</li>
                                <li>Votre expérience d'enseignement</li>
                                <li>Vos diplômes et qualifications</li>
                                <li>Les matières que vous souhaitez enseigner</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Après la validation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                Une fois votre compte approuvé :
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                <li>Vous recevrez un email de confirmation</li>
                                <li>Votre profil sera visible aux parents</li>
                                <li>Vous pourrez recevoir des réservations</li>
                                <li>Vous accéderez à toutes les fonctionnalités</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Tips */}
                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-lg">💡 Conseils en attendant</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-sm">
                            Pendant que nous validons votre compte, vous pouvez :
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Préparer une photo de profil professionnelle</li>
                            <li>Rédiger une biographie accrocheuse</li>
                            <li>Rassembler vos diplômes et certificats</li>
                            <li>Réfléchir à vos disponibilités hebdomadaires</li>
                            <li>Définir vos tarifs horaires par matière</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                    <CardContent className="text-center py-8">
                        <p className="text-muted-foreground mb-2">
                            Des questions sur le processus de validation ?
                        </p>
                        <p className="font-medium">
                            Contactez-nous à support@timmi.com
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 