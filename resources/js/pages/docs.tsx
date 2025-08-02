import { Head, usePage } from '@inertiajs/react';
import { BookOpen, Users, GraduationCap, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import { PageProps } from '@/types';

export default function Docs() {
    const { auth } = usePage<PageProps>().props;
    
    return (
        <PublicLayout auth={auth}>
            <Head title="Documentation - Timmi" />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <BookOpen className="h-16 w-16 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Documentation Timmi</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Guide complet pour utiliser notre plateforme de cours particuliers
                    </p>
                </div>

                {/* Quick Links */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Guide Parents
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Apprenez à rechercher des professeurs, réserver des cours et gérer vos réservations.
                            </p>
                            <Button variant="outline" className="w-full">
                                Lire le guide
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Guide Professeurs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Découvrez comment créer votre profil, gérer vos disponibilités et recevoir des réservations.
                            </p>
                            <Button variant="outline" className="w-full">
                                Lire le guide
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HelpCircle className="h-5 w-5" />
                                FAQ
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Questions fréquemment posées et leurs réponses.
                            </p>
                            <Button variant="outline" className="w-full">
                                Voir la FAQ
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Support */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">Besoin d'aide ?</h3>
                            <p className="text-muted-foreground mb-4">
                                Notre équipe support est là pour vous aider
                            </p>
                            <Button variant="default">
                                Contacter le support
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PublicLayout>
    );
} 