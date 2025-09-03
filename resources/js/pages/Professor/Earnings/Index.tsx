import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    DollarSign, 
    TrendingUp,
    TrendingDown,
    Calendar,
    ArrowLeft,
    Download,
    Eye
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { PagePropsWithData } from '@/types/global';
import AppLayout from '@/layouts/app-layout';

interface WeeklyEarning {
    date: string;
    total: number;
    sessions: number;
}

interface MonthlyEarning {
    month: string;
    total: number;
    sessions: number;
}

interface Props extends PagePropsWithData {
    total_earnings: number;
    monthly_earnings: number;
    weekly_earnings: WeeklyEarning[];
    monthly_earnings_data: MonthlyEarning[];
    pending_earnings: number;
    completed_sessions: number;
    average_session_price: number;
}

export default function ProfessorEarnings({ 
    total_earnings = 0, 
    monthly_earnings = 0, 
    weekly_earnings = [], 
    monthly_earnings_data = [],
    pending_earnings = 0,
    completed_sessions = 0,
    average_session_price = 0
}: Props) {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'GNF',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Date non disponible';
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Date invalide';
        }
        
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
        }).format(date);
    };

    const formatMonth = (monthString: string) => {
        return new Intl.DateTimeFormat('fr-FR', {
            month: 'long',
            year: 'numeric',
        }).format(new Date(monthString + '-01'));
    };

    return (
        <AppLayout>
            <Head title="Mes Revenus - Professeur" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('professor.dashboard')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Mes Revenus</h1>
                            <p className="text-muted-foreground">
                                Suivez vos gains et performances financières
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Exporter
                        </Button>
                        <Button variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Détails
                        </Button>
                    </div>
                </div>

                {/* Statistiques principales */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <DollarSign className="h-8 w-8 text-green-600" />
                                <div className="ml-4">
                                    <p className="text-2xl font-bold">{formatPrice(total_earnings)}</p>
                                    <p className="text-sm text-muted-foreground">Total gagné</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <TrendingUp className="h-8 w-8 text-blue-600" />
                                <div className="ml-4">
                                    <p className="text-2xl font-bold">{formatPrice(monthly_earnings)}</p>
                                    <p className="text-sm text-muted-foreground">Ce mois</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <Calendar className="h-8 w-8 text-orange-600" />
                                <div className="ml-4">
                                    <p className="text-2xl font-bold">{completed_sessions}</p>
                                    <p className="text-sm text-muted-foreground">Sessions terminées</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <DollarSign className="h-8 w-8 text-purple-600" />
                                <div className="ml-4">
                                    <p className="text-2xl font-bold">{formatPrice(average_session_price)}</p>
                                    <p className="text-sm text-muted-foreground">Prix moyen/session</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Revenus en attente */}
                {pending_earnings > 0 && (
                    <Card className="border-orange-200 bg-orange-50">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                                        <TrendingDown className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-orange-900">Revenus en attente</p>
                                        <p className="text-sm text-orange-700">
                                            {formatPrice(pending_earnings)} en attente de paiement
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="border-orange-300 text-orange-700">
                                    En attente
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Revenus hebdomadaires */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Revenus de la semaine
                            </CardTitle>
                            <CardDescription>
                                Vos gains des 7 derniers jours
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {weekly_earnings.length > 0 ? (
                                <div className="space-y-3">
                                    {weekly_earnings.map((earning, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Calendar className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{formatDate(earning.date)}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {earning.sessions} session{earning.sessions > 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-green-600">
                                                {formatPrice(earning.total)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        Aucun revenu cette semaine
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Revenus mensuels */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Revenus mensuels
                            </CardTitle>
                            <CardDescription>
                                Évolution de vos gains par mois
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {monthly_earnings_data.length > 0 ? (
                                <div className="space-y-3">
                                    {monthly_earnings_data.slice(0, 6).map((earning, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <Calendar className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{formatMonth(earning.month)}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {earning.sessions} session{earning.sessions > 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-blue-600">
                                                {formatPrice(earning.total)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        Aucun revenu mensuel
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Graphique des revenus (placeholder) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Évolution des revenus</CardTitle>
                        <CardDescription>
                            Graphique de vos gains au fil du temps
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                            <div className="text-center">
                                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">
                                    Graphique des revenus
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    (À implémenter avec une bibliothèque de graphiques)
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
