import { Head, Link } from '@inertiajs/react';
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Stats = {
    total_users: number;
    total_parents: number;
    total_teachers: number;
    verified_teachers: number;
    pending_teachers: number;
};

type BookingStats = {
    total_bookings: number;
    bookings_this_month: number;
    completed_classes: number;
    upcoming_classes: number;
};

type FinancialStats = {
    total_revenue: number;
    revenue_this_month: number;
    total_commissions: number;
    pending_payouts: number;
};

type RevenueChart = {
    month: string;
    revenue: number;
};

type RecentUser = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
    teacherProfile?: {
        is_verified: boolean;
    };
};

type PendingTeacher = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    teacherProfile?: {
        hourly_rate: number;
    };
};

interface AdminDashboardProps extends PageProps {
    stats: Stats;
    bookingStats: BookingStats;
    financialStats: FinancialStats;
    revenueChart: RevenueChart[];
    recentUsers: RecentUser[];
    pendingTeachers: PendingTeacher[];
}

export default function AdminDashboard({ 
    stats,
    bookingStats,
    financialStats,
    revenueChart,
    recentUsers,
    pendingTeachers
}: AdminDashboardProps) {
    const mainStats = [
        {
            title: 'Total Utilisateurs',
            value: stats.total_users,
            icon: Users,
            description: `${stats.total_parents} parents, ${stats.total_teachers} professeurs`,
        },
        {
            title: 'Professeurs Vérifiés',
            value: `${stats.verified_teachers}/${stats.total_teachers}`,
            icon: GraduationCap,
            description: `${stats.pending_teachers} en attente`,
            alert: stats.pending_teachers > 0,
        },
        {
            title: 'Réservations',
            value: bookingStats.total_bookings,
            icon: BookOpen,
            description: `${bookingStats.bookings_this_month} ce mois-ci`,
        },
        {
            title: 'Revenus Totaux',
            value: `${financialStats.total_revenue.toLocaleString()} FCFA`,
            icon: DollarSign,
            description: `${financialStats.revenue_this_month.toLocaleString()} FCFA ce mois`,
        },
    ];

    return (
        <AppLayout>
            <Head title="Tableau de bord Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Tableau de bord Administrateur</h1>
                    <p className="text-muted-foreground">
                        Vue d'ensemble de la plateforme Timmi
                    </p>
                </div>

                {/* Alerts */}
                {stats.pending_teachers > 0 && (
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Vous avez {stats.pending_teachers} professeur{stats.pending_teachers > 1 ? 's' : ''} en attente de validation.{' '}
                            <Link href={route('admin.users')} className="font-medium underline">
                                Voir les demandes
                            </Link>
                        </AlertDescription>
                    </Alert>
                )}

                {financialStats.pending_payouts > 0 && (
                    <Alert>
                        <DollarSign className="h-4 w-4" />
                        <AlertDescription>
                            {financialStats.pending_payouts.toLocaleString()} FCFA en attente de paiement aux professeurs.{' '}
                            <Link href={route('admin.payouts')} className="font-medium underline">
                                Gérer les paiements
                            </Link>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Main Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {mainStats.map((stat, index) => (
                        <Card key={index} className={stat.alert ? 'border-orange-200' : ''}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.alert ? 'text-orange-500' : 'text-muted-foreground'}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Revenue Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Évolution des Revenus</CardTitle>
                        <CardDescription>
                            Revenus mensuels des 6 derniers mois
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueChart}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip 
                                    formatter={(value: number) => `${value.toLocaleString()} FCFA`}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#8884d8" 
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Pending Teachers */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Professeurs en Attente</CardTitle>
                                    <CardDescription>
                                        À valider par l'administrateur
                                    </CardDescription>
                                </div>
                                <Link href={route('admin.users', { role: 'teacher', status: 'pending' })}>
                                    <Button variant="outline" size="sm">
                                        Voir tout
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {pendingTeachers.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    Aucun professeur en attente
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {pendingTeachers.map((teacher) => (
                                        <div key={teacher.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{teacher.name}</p>
                                                <p className="text-sm text-muted-foreground">{teacher.email}</p>
                                            </div>
                                            <Button 
                                                size="sm"
                                                onClick={() => window.location.href = route('admin.users.approve', teacher.id)}
                                            >
                                                Valider
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Users */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Dernières Inscriptions</CardTitle>
                                    <CardDescription>
                                        Nouveaux utilisateurs récents
                                    </CardDescription>
                                </div>
                                <Link href={route('admin.users')}>
                                    <Button variant="outline" size="sm">
                                        Voir tout
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={user.role === 'teacher' ? 'default' : 'secondary'}>
                                                {user.role === 'parent' ? 'Parent' : 'Professeur'}
                                            </Badge>
                                            {user.role === 'teacher' && user.teacherProfile?.is_verified && (
                                                <Badge variant="outline" className="text-green-600">
                                                    Vérifié
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Statistiques Réservations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Complétées</span>
                                <span className="font-medium">{bookingStats.completed_classes}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">À venir</span>
                                <span className="font-medium">{bookingStats.upcoming_classes}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Taux de complétion</span>
                                <span className="font-medium">
                                    {bookingStats.total_bookings > 0 
                                        ? Math.round((bookingStats.completed_classes / bookingStats.total_bookings) * 100)
                                        : 0}%
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Statistiques Financières</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Commissions totales</span>
                                <span className="font-medium">{financialStats.total_commissions.toLocaleString()} FCFA</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">À payer aux profs</span>
                                <span className="font-medium">{financialStats.pending_payouts.toLocaleString()} FCFA</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Commission moyenne</span>
                                <span className="font-medium">20%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Actions Rapides</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href={route('admin.users')} className="block">
                                <Button variant="outline" className="w-full justify-start">
                                    <Users className="mr-2 h-4 w-4" />
                                    Gérer les utilisateurs
                                </Button>
                            </Link>
                            <Link href={route('admin.bookings')} className="block">
                                <Button variant="outline" className="w-full justify-start">
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Voir les réservations
                                </Button>
                            </Link>
                            <Link href={route('admin.reports')} className="block">
                                <Button variant="outline" className="w-full justify-start">
                                    <TrendingUp className="mr-2 h-4 w-4" />
                                    Rapports détaillés
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
} 