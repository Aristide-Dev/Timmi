import { Head, Link } from '@inertiajs/react';
import { CalendarDays, Clock, DollarSign, Users, Star, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type Child = {
    id: number;
    name: string;
    grade: string;
};

type Parent = {
    id: number;
    name: string;
    phone: string;
};

type Subject = {
    id: number;
    name: string;
};

type Booking = {
    id: number;
    booking_number: string;
    class_date: string;
    start_time: string;
    end_time: string;
    duration: number;
    status: string;
    teaching_mode: 'presentiel' | 'en_ligne';
    location?: string;
    online_link?: string;
    parent: Parent;
    child: Child;
    subject: Subject;
};

type MonthStats = {
    total_hours: number;
    total_earnings: number;
    completed_classes: number;
    pending_confirmations: number;
};

type GlobalStats = {
    total_hours_all_time: number;
    total_students: number;
    average_rating: number;
    total_reviews: number;
};

type TeacherProfile = {
    is_verified: boolean;
    bio?: string;
};

interface TeacherDashboardProps extends PageProps {
    todayClasses: Booking[];
    upcomingClasses: Booking[];
    monthStats: MonthStats;
    globalStats: GlobalStats;
    profile: TeacherProfile;
    isProfileComplete: boolean;
}

export default function TeacherDashboard({ 
    auth, 
    todayClasses, 
    upcomingClasses,
    monthStats,
    globalStats,
    profile,
    isProfileComplete
}: TeacherDashboardProps) {
    const monthStatsCards = [
        {
            title: 'Heures ce mois',
            value: `${monthStats.total_hours}h`,
            icon: Clock,
            description: 'Heures de cours données',
        },
        {
            title: 'Revenus du mois',
            value: `${monthStats.total_earnings.toLocaleString()} FCFA`,
            icon: DollarSign,
            description: 'Gains de ce mois',
        },
        {
            title: 'Cours terminés',
            value: monthStats.completed_classes,
            icon: CheckCircle,
            description: 'Ce mois-ci',
        },
        {
            title: 'À confirmer',
            value: monthStats.pending_confirmations,
            icon: AlertCircle,
            description: 'En attente de confirmation',
            alert: monthStats.pending_confirmations > 0,
        },
    ];

    const globalStatsCards = [
        {
            label: 'Total d\'heures',
            value: `${globalStats.total_hours_all_time}h`,
            icon: Clock,
        },
        {
            label: 'Élèves',
            value: globalStats.total_students,
            icon: Users,
        },
        {
            label: 'Note moyenne',
            value: globalStats.average_rating.toFixed(1),
            icon: Star,
        },
        {
            label: 'Avis reçus',
            value: globalStats.total_reviews,
            icon: Star,
        },
    ];

    return (
        <AppLayout>
            <Head title="Tableau de bord" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Bonjour {auth.user?.name} 👋</h1>
                    <p className="text-muted-foreground">
                        Voici votre activité d'enseignement
                    </p>
                </div>

                {/* Alerts */}
                {!isProfileComplete && (
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Votre profil est incomplet. <Link href={route('teacher.profile')} className="font-medium underline">Complétez-le</Link> pour recevoir des réservations.
                        </AlertDescription>
                    </Alert>
                )}

                {monthStats.pending_confirmations > 0 && (
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Vous avez {monthStats.pending_confirmations} cours à confirmer. <Link href={route('teacher.bookings')} className="font-medium underline">Voir les cours</Link>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Month Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {monthStatsCards.map((stat, index) => (
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

                {/* Global Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle>Statistiques globales</CardTitle>
                        <CardDescription>Depuis votre inscription sur Timmi</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {globalStatsCards.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Today's Classes */}
                {todayClasses.length > 0 && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Cours d'aujourd'hui</CardTitle>
                                    <CardDescription>
                                        {todayClasses.length} cours programmé{todayClasses.length > 1 ? 's' : ''}
                                    </CardDescription>
                                </div>
                                <Badge variant="default">
                                    {format(new Date(), 'EEEE d MMMM', { locale: fr })}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {todayClasses.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg bg-blue-50/50">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{booking.subject.name}</p>
                                                <Badge variant="outline">
                                                    {booking.teaching_mode === 'presentiel' ? 'Présentiel' : 'En ligne'}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Élève: {booking.child.name} ({booking.child.grade})
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Parent: {booking.parent.name}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {booking.start_time} - {booking.end_time}
                                                </span>
                                                {booking.teaching_mode === 'presentiel' && booking.location && (
                                                    <span className="text-muted-foreground">
                                                        📍 {booking.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Button size="sm" variant="outline">
                                                Voir détails
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Upcoming Classes */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Prochains cours</CardTitle>
                                <CardDescription>
                                    Vos prochaines séances programmées
                                </CardDescription>
                            </div>
                            <Link href={route('teacher.calendar')}>
                                <Button variant="outline" size="sm">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Voir calendrier
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {upcomingClasses.length === 0 ? (
                            <div className="text-center py-8">
                                <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">Aucun cours programmé</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {upcomingClasses.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{booking.subject.name}</p>
                                                <Badge variant="secondary">
                                                    {format(new Date(booking.class_date), 'EEEE d MMM', { locale: fr })}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {booking.child.name} • {booking.start_time} - {booking.end_time}
                                            </p>
                                            <Badge variant="outline" className="text-xs">
                                                {booking.teaching_mode === 'presentiel' ? 'Présentiel' : 'En ligne'}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href={route('teacher.availabilities')}>
                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <p className="font-medium">Mes disponibilités</p>
                                    <p className="text-sm text-muted-foreground">Gérer vos créneaux</p>
                                </div>
                                <Clock className="h-8 w-8 text-muted-foreground" />
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href={route('teacher.earnings')}>
                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <p className="font-medium">Mes revenus</p>
                                    <p className="text-sm text-muted-foreground">Voir mes gains</p>
                                </div>
                                <DollarSign className="h-8 w-8 text-muted-foreground" />
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href={route('teacher.profile')}>
                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <p className="font-medium">Mon profil</p>
                                    <p className="text-sm text-muted-foreground">Mettre à jour</p>
                                </div>
                                <Users className="h-8 w-8 text-muted-foreground" />
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
} 