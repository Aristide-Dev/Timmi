import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type AdminDashboard } from '@/types';
import { type PageProps } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';
import { Users, UserCheck, Calendar, DollarSign, TrendingUp, BarChart3, Eye, Download } from 'lucide-react';

interface AnalyticsIndexProps extends PageProps {
    dashboard?: AdminDashboard;
}

export default function AnalyticsIndex({ dashboard = {} as AdminDashboard }: AnalyticsIndexProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'GNF',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('fr-FR').format(num);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Analytics', href: route('admin.analytics.index') },
            ]}
        >
            <Head title="Analytics - Tableau de bord" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                        <p className="text-muted-foreground">
                            Vue d'ensemble des performances de la plateforme
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.analytics.detailed')}>
                                <Eye className="mr-2 h-4 w-4" />
                                Vue détaillée
                            </Link>
                        </Button>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Exporter
                        </Button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(dashboard.total_users || 0)}</div>
                            <p className="text-xs text-muted-foreground">
                                +{dashboard.user_growth?.[dashboard.user_growth.length - 1]?.users || 0} ce mois
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Professeurs</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(dashboard.total_professors || 0)}</div>
                            <p className="text-xs text-muted-foreground">
                                {Math.round(((dashboard.total_professors || 0) / (dashboard.total_users || 1)) * 100)}% du total
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Parents</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(dashboard.total_parents || 0)}</div>
                            <p className="text-xs text-muted-foreground">
                                {Math.round(((dashboard.total_parents || 0) / (dashboard.total_users || 1)) * 100)}% du total
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Réservations</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(dashboard.total_bookings || 0)}</div>
                            <p className="text-xs text-muted-foreground">
                                {dashboard.pending_bookings || 0} en attente
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Revenue and Sessions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenus</CardTitle>
                            <CardDescription>Chiffre d'affaires total</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{formatCurrency(dashboard.total_revenue || 0)}</div>
                            <div className="flex items-center space-x-2 mt-2">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-500">
                                    +{Math.round(((dashboard.monthly_revenue?.[dashboard.monthly_revenue.length - 1]?.revenue || 0) / (dashboard.monthly_revenue?.[dashboard.monthly_revenue.length - 2]?.revenue || 1)) * 100 - 100)}% ce mois
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Sessions Actives</CardTitle>
                            <CardDescription>Sessions en cours</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{formatNumber(dashboard.active_sessions || 0)}</div>
                            <div className="flex items-center space-x-2 mt-2">
                                <Calendar className="h-4 w-4 text-blue-500" />
                                <span className="text-sm text-muted-foreground">
                                    Sessions en cours
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Monthly Revenue Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenus Mensuels</CardTitle>
                            <CardDescription>Évolution des revenus par mois</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {(dashboard.monthly_revenue || []).map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-primary rounded-full" />
                                            <span className="text-sm font-medium">{item.month}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold">{formatCurrency(item.revenue)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Growth Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Croissance des Utilisateurs</CardTitle>
                            <CardDescription>Nouveaux utilisateurs par mois</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {(dashboard.user_growth || []).map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                                            <span className="text-sm font-medium">{item.month}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold">{formatNumber(item.users)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Users */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Utilisateurs Récents</CardTitle>
                            <CardDescription>Derniers utilisateurs inscrits</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {(dashboard.recent_users || []).map((user) => (
                                    <div key={user.id} className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                        <Badge variant="outline">
                                            {user.roles?.[0]?.name || 'Utilisateur'}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Bookings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Réservations Récentes</CardTitle>
                            <CardDescription>Dernières réservations créées</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {(dashboard.recent_bookings || []).map((booking) => (
                                    <div key={booking.id} className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                                            <Calendar className="h-4 w-4 text-blue-500" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">
                                                {booking.professor.name} → {booking.parent.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {booking.subject.name} - {booking.level.name}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-semibold">{formatCurrency(booking.total_price)}</div>
                                            <Badge variant="outline" className="text-xs">
                                                {booking.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle>Statistiques Rapides</CardTitle>
                        <CardDescription>Métriques clés de performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-500">
                                    {Math.round((dashboard.total_revenue / dashboard.total_bookings) || 0)}
                                </div>
                                <p className="text-sm text-muted-foreground">GNF/booking moyen</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-500">
                                    {Math.round((dashboard.total_bookings / dashboard.total_users) || 0)}
                                </div>
                                <p className="text-sm text-muted-foreground">Bookings/utilisateur</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-500">
                                    {Math.round((dashboard.active_sessions / dashboard.total_bookings) * 100 || 0)}%
                                </div>
                                <p className="text-sm text-muted-foreground">Taux d'activité</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-500">
                                    {Math.round((dashboard.pending_bookings / dashboard.total_bookings) * 100 || 0)}%
                                </div>
                                <p className="text-sm text-muted-foreground">En attente</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
