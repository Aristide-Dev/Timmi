import React from 'react';
import { Head } from '@inertiajs/react';
import { TrendingUp, DollarSign, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';

type MonthlyEarning = {
    month: string;
    amount: number;
};

type Payout = {
    id: number;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    created_at: string;
    processed_at?: string;
};

interface TeacherEarningsProps extends PageProps {
    monthlyEarnings: MonthlyEarning[];
    payouts: {
        data: Payout[];
        links: any[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            from: number;
            to: number;
        };
    };
    pendingAmount: number;
}

export default function TeacherEarnings({ monthlyEarnings, payouts, pendingAmount }: TeacherEarningsProps) {
    // Fallback pour éviter les erreurs si les données ne sont pas encore chargées
    const safeMonthlyEarnings = monthlyEarnings || [];
    const safePayouts = payouts || {
        data: [],
        links: [],
        meta: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
            from: 0,
            to: 0
        }
    };
    const safePendingAmount = pendingAmount || 0;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'GNF',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { variant: 'secondary', label: 'En attente' },
            completed: { variant: 'default', label: 'Complété' },
            failed: { variant: 'destructive', label: 'Échoué' },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

        return (
            <Badge variant={config.variant as any}>
                {config.label}
            </Badge>
        );
    };

    // Calcul des statistiques
    const totalEarnings = safeMonthlyEarnings.reduce((sum, earning) => sum + earning.amount, 0);
    const averageMonthlyEarnings = safeMonthlyEarnings.length > 0 ? totalEarnings / safeMonthlyEarnings.length : 0;
    const completedPayouts = safePayouts.data.filter(payout => payout.status === 'completed');
    const totalPayouts = completedPayouts.reduce((sum, payout) => sum + payout.amount, 0);

    return (
        <AppLayout>
            <Head title="Mes Revenus" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Mes Revenus</h1>
                    <p className="text-muted-foreground">
                        Suivez vos revenus et gérez vos paiements
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(totalEarnings)}</div>
                            <p className="text-xs text-muted-foreground">
                                Sur les 12 derniers mois
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Moyenne mensuelle</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(averageMonthlyEarnings)}</div>
                            <p className="text-xs text-muted-foreground">
                                Par mois
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">En attente</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(safePendingAmount)}</div>
                            <p className="text-xs text-muted-foreground">
                                Montant à recevoir
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Paiements reçus</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(totalPayouts)}</div>
                            <p className="text-xs text-muted-foreground">
                                Total reçu
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Monthly Earnings Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Évolution des revenus</CardTitle>
                        <CardDescription>
                            Vos revenus mensuels sur les 12 derniers mois
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {safeMonthlyEarnings.length === 0 ? (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Aucune donnée de revenus disponible pour le moment.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div className="space-y-4">
                                {safeMonthlyEarnings.map((earning, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <span className="font-medium">{earning.month}</span>
                                        </div>
                                        <span className="font-bold">{formatCurrency(earning.amount)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Payouts History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Historique des paiements</CardTitle>
                        <CardDescription>
                            Vos paiements reçus et en cours
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {safePayouts.data.length === 0 ? (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Aucun paiement pour le moment.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div className="space-y-4">
                                {safePayouts.data.map((payout) => (
                                    <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">
                                                    Paiement #{payout.id}
                                                </span>
                                                {getStatusBadge(payout.status)}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {formatDate(payout.created_at)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold">{formatCurrency(payout.amount)}</div>
                                            {payout.processed_at && (
                                                <p className="text-xs text-muted-foreground">
                                                    Traité le {formatDate(payout.processed_at)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {safePayouts.meta?.last_page > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
                                {safePayouts.links?.map((link, index) => (
                                    <Button
                                        key={index}
                                        variant={link.active ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => window.location.href = link.url}
                                        disabled={!link.url}
                                    >
                                        {link.label}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pending Amount Alert */}
                {safePendingAmount > 0 && (
                    <Alert>
                        <DollarSign className="h-4 w-4" />
                        <AlertDescription>
                            Vous avez <strong>{formatCurrency(safePendingAmount)}</strong> en attente de paiement. 
                            Les paiements sont traités automatiquement une fois par semaine.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </AppLayout>
    );
} 