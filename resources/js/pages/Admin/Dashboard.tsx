import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type AdminDashboard } from '@/types';
import { type PageProps } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';
import { Users, UserCheck, Calendar, DollarSign, TrendingUp, BarChart3, Eye, Download, AlertCircle, CheckCircle, Clock, Star } from 'lucide-react';

interface AdminDashboardProps extends PageProps {
    dashboard: AdminDashboard;
}

export default function AdminDashboard({ dashboard }: AdminDashboardProps) {
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
            ]}
        >
            <Head title="Tableau de bord Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
                        <p className="text-muted-foreground">
                            Vue d'ensemble de la plateforme TIMMI
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.analytics.index')}>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Analytics
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
                            <div className="text-2xl font-bold">{formatNumber(dashboard.total_users)}</div>
                            <p className="text-xs text-muted-foreground">
                                +{dashboard.user_growth[dashboard.user_growth.length - 1]?.users || 0} ce mois
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Professeurs</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(dashboard.total_professors)}</div>
                            <p className="text-xs text-muted-foreground">
                                {Math.round((dashboard.total_professors / dashboard.total_users) * 100)}% du total
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Parents</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(dashboard.total_parents)}</div>
                            <p className="text-xs text-muted-foreground">
                                {Math.round((dashboard.total_parents / dashboard.total_users) * 100)}% du total
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Réservations</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(dashboard.total_bookings)}</div>
                            <p className="text-xs text-muted-foreground">
                                {dashboard.pending_bookings} en attente
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Revenue and Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenus</CardTitle>
                            <CardDescription>Chiffre d'affaires total</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{formatCurrency(dashboard.total_revenue)}</div>
                            <div className="flex items-center space-x-2 mt-2">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-500">
                                    +{Math.round(((dashboard.monthly_revenue[dashboard.monthly_revenue.length - 1]?.revenue || 0) / (dashboard.monthly_revenue[dashboard.monthly_revenue.length - 2]?.revenue || 1)) * 100 - 100)}% ce mois
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
                            <div className="text-3xl font-bold">{formatNumber(dashboard.active_sessions)}</div>
                            <div className="flex items-center space-x-2 mt-2">
                                <Clock className="h-4 w-4 text-blue-500" />
                                <span className="text-sm text-muted-foreground">
                                    Sessions en cours
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Réservations en Attente</CardTitle>
                            <CardDescription>Nécessitent une action</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-orange-500">{formatNumber(dashboard.pending_bookings)}</div>
                            <div className="flex items-center space-x-2 mt-2">
                                <AlertCircle className="h-4 w-4 text-orange-500" />
                                <span className="text-sm text-muted-foreground">
                                    En attente de confirmation
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Actions Rapides</CardTitle>
                        <CardDescription>Accès rapide aux fonctionnalités principales</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button variant="outline" className="h-20 flex-col" asChild>
                                <Link href={route('admin.users.index')}>
                                    <Users className="h-6 w-6 mb-2" />
                                    Gérer les utilisateurs
                                </Link>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col" asChild>
                                <Link href={route('admin.professors.index')}>
                                    <UserCheck className="h-6 w-6 mb-2" />
                                    Gérer les professeurs
                                </Link>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col" asChild>
                                <Link href={route('admin.bookings.index')}>
                                    <Calendar className="h-6 w-6 mb-2" />
                                    Gérer les réservations
                                </Link>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col" asChild>
                                <Link href={route('admin.settings.index')}>
                                    <BarChart3 className="h-6 w-6 mb-2" />
                                    Paramètres
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

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
                                {dashboard.recent_users.map((user) => (
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
                            <div className="mt-4">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('admin.users.index')}>
                                        Voir tous les utilisateurs
                                    </Link>
                                </Button>
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
                                {dashboard.recent_bookings.map((booking) => (
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
                            <div className="mt-4">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('admin.bookings.index')}>
                                        Voir toutes les réservations
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* System Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>État du Système</CardTitle>
                        <CardDescription>Statut des services et fonctionnalités</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="text-sm font-medium">Base de données</p>
                                    <p className="text-xs text-muted-foreground">Opérationnelle</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="text-sm font-medium">Services de paiement</p>
                                    <p className="text-xs text-muted-foreground">Opérationnels</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="text-sm font-medium">Notifications</p>
                                    <p className="text-xs text-muted-foreground">Opérationnelles</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
