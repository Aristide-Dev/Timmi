import { Head } from '@inertiajs/react';
import { CalendarDays, Clock, BookOpen, CreditCard, Users, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type Child = {
    id: number;
    name: string;
    grade: string;
    level: string;
};

type Subject = {
    id: number;
    name: string;
    category: string;
};

type Teacher = {
    id: number;
    name: string;
    phone: string;
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
    teacher: Teacher;
    child: Child;
    subject: Subject;
    review?: {
        id: number;
        rating: number;
    };
};

type Stats = {
    total_bookings: number;
    completed_classes: number;
    upcoming_classes: number;
    total_spent: number;
};

interface ParentDashboardProps extends PageProps {
    upcomingBookings: Booking[];
    recentBookings: Booking[];
    stats: Stats;
    children: Child[];
}

export default function ParentDashboard({ 
    auth, 
    upcomingBookings, 
    recentBookings, 
    stats, 
    children 
}: ParentDashboardProps) {
    const statsCards = [
        {
            title: 'Total des réservations',
            value: stats.total_bookings,
            icon: BookOpen,
            description: 'Depuis votre inscription',
        },
        {
            title: 'Cours terminés',
            value: stats.completed_classes,
            icon: Clock,
            description: 'Cours effectués avec succès',
        },
        {
            title: 'Cours à venir',
            value: stats.upcoming_classes,
            icon: CalendarDays,
            description: 'Prochainement programmés',
        },
        {
            title: 'Total dépensé',
            value: `${stats.total_spent.toLocaleString()} GNF`,
            icon: CreditCard,
            description: 'Montant total des paiements',
        },
    ];

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { label: 'En attente', variant: 'secondary' as const },
            confirmed: { label: 'Confirmé', variant: 'default' as const },
            completed: { label: 'Terminé', variant: 'success' as const },
            cancelled: { label: 'Annulé', variant: 'destructive' as const },
        };
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    return (
        <AppLayout>
            <Head title="Tableau de bord" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Bonjour {auth.user?.name} 👋</h1>
                    <p className="text-muted-foreground">
                        Voici un aperçu de l'activité scolaire de vos enfants
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statsCards.map((stat, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
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

                {/* Children */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Mes enfants</CardTitle>
                                <CardDescription>
                                    {children.length} enfant{children.length > 1 ? 's' : ''} enregistré{children.length > 1 ? 's' : ''}
                                </CardDescription>
                            </div>
                            <Button variant="outline" size="sm">
                                <Users className="mr-2 h-4 w-4" />
                                Gérer
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {children.map((child) => (
                                <div key={child.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                                    <div>
                                        <p className="font-medium">{child.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {child.grade} - {child.level}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Bookings */}
                {upcomingBookings.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Prochains cours</CardTitle>
                            <CardDescription>
                                Cours programmés dans les prochains jours
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingBookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{booking.subject.name}</p>
                                                {getStatusBadge(booking.status)}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Avec {booking.teacher.name} • Pour {booking.child.name}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <CalendarDays className="h-3 w-3" />
                                                    {format(new Date(booking.class_date), 'EEEE d MMMM', { locale: fr })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {booking.start_time} - {booking.end_time}
                                                </span>
                                            </div>
                                            <Badge variant="outline" className="w-fit">
                                                {booking.teaching_mode === 'presentiel' ? 'Présentiel' : 'En ligne'}
                                            </Badge>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Voir détails
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Recent Bookings */}
                {recentBookings.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Cours récents</CardTitle>
                            <CardDescription>
                                Historique des derniers cours
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentBookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{booking.subject.name}</p>
                                                {getStatusBadge(booking.status)}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Avec {booking.teacher.name} • Pour {booking.child.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {format(new Date(booking.class_date), 'EEEE d MMMM yyyy', { locale: fr })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            {booking.status === 'completed' && !booking.review && (
                                                <Button variant="outline" size="sm">
                                                    <Star className="mr-2 h-4 w-4" />
                                                    Laisser un avis
                                                </Button>
                                            )}
                                            {booking.review && (
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${
                                                                i < booking.review.rating
                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                    : 'text-gray-300'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {upcomingBookings.length === 0 && recentBookings.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Aucun cours réservé</h3>
                            <p className="text-muted-foreground mb-4">
                                Commencez par rechercher un professeur pour vos enfants
                            </p>
                            <Button>
                                Chercher un professeur
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
} 