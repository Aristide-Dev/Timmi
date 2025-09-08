import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen, Star, User, Search, Plus } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface DashboardProps {
    stats: {
        total_bookings: number;
        upcoming_sessions: number;
        completed_sessions: number;
        favorite_subjects: number;
    };
    recent_bookings: Array<{
        id: number;
        date: string;
        start_time: string;
        status: string;
        professor: {
            name: string;
            profile_photo?: string;
        };
        subject: {
            name: string;
        };
        level: {
            name: string;
        };
    }>;
    favorite_professors: Array<{
        id: number;
        name: string;
        profile_photo?: string;
        rating: number;
        hourly_rate: number;
    }>;
    upcoming_sessions: Array<{
        id: number;
        date: string;
        start_time: string;
        professor: {
            name: string;
            profile_photo?: string;
        };
        subject: {
            name: string;
        };
    }>;
}

export default function StudentDashboard({ stats, recent_bookings, favorite_professors, upcoming_sessions }: DashboardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'Confirmée';
            case 'pending':
                return 'En attente';
            case 'cancelled':
                return 'Annulée';
            case 'completed':
                return 'Terminée';
            default:
                return status;
        }
    };

    return (
        <AppLayout>
            <Head title="Tableau de bord - Étudiant" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
                        <p className="text-muted-foreground">
                            Gérez vos cours et suivez vos progrès
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link href={route('student.search.professors')}>
                                <Search className="h-4 w-4 mr-2" />
                                Rechercher un professeur
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('student.booking.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Nouvelle réservation
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Statistiques */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total des réservations
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_bookings}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sessions à venir
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.upcoming_sessions}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sessions terminées
                            </CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.completed_sessions}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Matières préférées
                            </CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.favorite_subjects}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Prochaines sessions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Prochaines sessions</CardTitle>
                            <CardDescription>
                                Vos cours à venir
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {upcoming_sessions.length > 0 ? (
                                <div className="space-y-4">
                                    {upcoming_sessions.map((session) => (
                                        <div key={session.id} className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {session.professor.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {session.subject.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(session.date).toLocaleDateString('fr-FR')} à {session.start_time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Aucune session à venir
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Professeurs favoris */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Professeurs favoris</CardTitle>
                            <CardDescription>
                                Vos professeurs les plus réservés
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {favorite_professors.length > 0 ? (
                                <div className="space-y-4">
                                    {favorite_professors.map((professor) => (
                                        <div key={professor.id} className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {professor.name}
                                                </p>
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex items-center">
                                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs text-muted-foreground ml-1">
                                                            {professor.rating}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {professor.hourly_rate}€/h
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Aucun professeur favori
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Réservations récentes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Réservations récentes</CardTitle>
                        <CardDescription>
                            Vos dernières réservations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recent_bookings.length > 0 ? (
                            <div className="space-y-4">
                                {recent_bookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {booking.professor.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {booking.subject.name} - {booking.level.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(booking.date).toLocaleDateString('fr-FR')} à {booking.start_time}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getStatusColor(booking.status)}>
                                                {getStatusText(booking.status)}
                                            </Badge>
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={route('student.bookings.show', booking.id)}>
                                                    Voir
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-sm text-muted-foreground mb-4">
                                    Aucune réservation récente
                                </p>
                                <Button asChild>
                                    <Link href={route('student.search.professors')}>
                                        Rechercher un professeur
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
