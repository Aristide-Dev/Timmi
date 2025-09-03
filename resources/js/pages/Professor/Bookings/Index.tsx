import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Calendar, 
    Clock,
    User,
    ArrowLeft,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Booking, PagePropsWithData } from '@/types/global';
import AppLayout from '@/layouts/app-layout';

interface Props extends PagePropsWithData {
    bookings: Booking[];
    upcoming_bookings: Booking[];
    recent_bookings: Booking[];
}

export default function ProfessorBookings({ 
    bookings = [], 
    upcoming_bookings = [], 
    recent_bookings = [] 
}: Props) {
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Date non disponible';
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Date invalide';
        }
        
        return new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    const formatTime = (dateString: string) => {
        if (!dateString) return 'Heure non disponible';
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Heure invalide';
        }
        
        return new Intl.DateTimeFormat('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'GNF',
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { label: 'En attente', variant: 'secondary' as const },
            confirmed: { label: 'Confirmée', variant: 'default' as const },
            completed: { label: 'Terminée', variant: 'default' as const },
            cancelled: { label: 'Annulée', variant: 'destructive' as const },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    return (
        <AppLayout>
            <Head title="Mes Réservations - Professeur" />
            
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
                            <h1 className="text-3xl font-bold tracking-tight">Mes Réservations</h1>
                            <p className="text-muted-foreground">
                                Gérez les réservations de vos étudiants
                            </p>
                        </div>
                    </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <Calendar className="h-8 w-8 text-primary" />
                                <div className="ml-4">
                                    <p className="text-2xl font-bold">{bookings.length}</p>
                                    <p className="text-sm text-muted-foreground">Total réservations</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <Clock className="h-8 w-8 text-blue-600" />
                                <div className="ml-4">
                                    <p className="text-2xl font-bold">{upcoming_bookings.length}</p>
                                    <p className="text-sm text-muted-foreground">À venir</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                                <div className="ml-4">
                                    <p className="text-2xl font-bold">
                                        {bookings.filter(b => b.status === 'completed').length}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Terminées</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <AlertCircle className="h-8 w-8 text-orange-600" />
                                <div className="ml-4">
                                    <p className="text-2xl font-bold">
                                        {bookings.filter(b => b.status === 'pending').length}
                                    </p>
                                    <p className="text-sm text-muted-foreground">En attente</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Prochaines réservations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Prochaines réservations
                            </CardTitle>
                            <CardDescription>
                                Vos cours à venir
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {upcoming_bookings.length > 0 ? (
                                <div className="space-y-4">
                                    {upcoming_bookings.slice(0, 5).map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <User className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{booking.child?.name || 'Étudiant'}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {formatDate(booking.scheduled_at)} à {formatTime(booking.scheduled_at)}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {booking.subject?.name} - {booking.level?.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {getStatusBadge(booking.status)}
                                                <p className="text-sm font-medium mt-1">
                                                    {formatPrice(booking.total_price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        Aucune réservation à venir
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Réservations récentes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Réservations récentes
                            </CardTitle>
                            <CardDescription>
                                Vos dernières réservations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recent_bookings.length > 0 ? (
                                <div className="space-y-4">
                                    {recent_bookings.slice(0, 5).map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                                    <User className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{booking.child?.name || 'Étudiant'}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {formatDate(booking.scheduled_at)} à {formatTime(booking.scheduled_at)}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {booking.subject?.name} - {booking.level?.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {getStatusBadge(booking.status)}
                                                <p className="text-sm font-medium mt-1">
                                                    {formatPrice(booking.total_price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        Aucune réservation récente
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Toutes les réservations */}
                <Card>
                    <CardHeader>
                        <CardTitle>Toutes les réservations</CardTitle>
                        <CardDescription>
                            Liste complète de vos réservations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {bookings.length > 0 ? (
                            <div className="space-y-4">
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-lg">{booking.child?.name || 'Étudiant'}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatDate(booking.scheduled_at)} à {formatTime(booking.scheduled_at)}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {booking.subject?.name} - {booking.level?.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Durée: {booking.duration} minutes
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {getStatusBadge(booking.status)}
                                            <p className="text-lg font-bold mt-2">
                                                {formatPrice(booking.total_price)}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Créée le {formatDate(booking.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground text-lg">
                                    Aucune réservation pour le moment
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Les réservations de vos étudiants apparaîtront ici
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
