import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, BookOpen, GraduationCap, Plus, Search, Eye, Edit, X } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Booking {
    id: number;
    date: string;
    start_time: string;
    end_time: string;
    duration: number;
    total_price: number;
    status: string;
    payment_status: string;
    notes?: string;
    professor: {
        id: number;
        name: string;
        profile_photo?: string;
    };
    subject: {
        id: number;
        name: string;
    };
    level: {
        id: number;
        name: string;
    };
    sessions: Array<{
        id: number;
        status: string;
        meeting_link?: string;
    }>;
}

interface BookingsProps {
    bookings: {
        data: Booking[];
        links: any[];
        meta: any;
    };
}

export default function StudentBookings({ bookings }: BookingsProps) {
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

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentStatusText = (status: string) => {
        switch (status) {
            case 'paid':
                return 'Payé';
            case 'pending':
                return 'En attente';
            case 'failed':
                return 'Échec';
            default:
                return status;
        }
    };

    const canCancel = (booking: Booking) => {
        return ['pending', 'confirmed'].includes(booking.status);
    };

    const canEdit = (booking: Booking) => {
        return booking.status === 'pending';
    };

    return (
        <AppLayout>
            <Head title="Mes réservations - Étudiant" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mes réservations</h1>
                        <p className="text-muted-foreground">
                            Gérez vos cours et sessions
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={route('student.search.professors')}>
                                <Search className="h-4 w-4 mr-2" />
                                Rechercher un professeur
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('student.booking.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Nouvelle réservation
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{bookings.meta?.total || 0}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">En attente</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {bookings.data?.filter(b => b.status === 'pending').length || 0}
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Confirmées</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {bookings.data?.filter(b => b.status === 'confirmed').length || 0}
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {bookings.data?.filter(b => b.status === 'completed').length || 0}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Liste des réservations */}
                <div className="space-y-4">
                    {bookings.data && bookings.data.length > 0 ? (
                        bookings.data.map((booking) => (
                            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 space-y-4">
                                            {/* En-tête de la réservation */}
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <User className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold">
                                                        {booking.professor.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                        <div className="flex items-center">
                                                            <BookOpen className="h-4 w-4 mr-1" />
                                                            {booking.subject.name}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <GraduationCap className="h-4 w-4 mr-1" />
                                                            {booking.level.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Détails de la réservation */}
                                            <div className="grid gap-4 md:grid-cols-3">
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            {new Date(booking.date).toLocaleDateString('fr-FR')}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {booking.start_time} - {booking.end_time}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            {booking.duration} minutes
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Durée
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-lg font-bold">
                                                        {booking.total_price.toFixed(2)}GNF
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Total
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Notes */}
                                            {booking.notes && (
                                                <div className="bg-muted/50 p-3 rounded-lg">
                                                    <p className="text-sm text-muted-foreground">
                                                        <strong>Notes :</strong> {booking.notes}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Sessions */}
                                            {booking.sessions.length > 0 && (
                                                <div>
                                                    <p className="text-sm font-medium mb-2">Sessions :</p>
                                                    <div className="space-y-2">
                                                        {booking.sessions.map((session) => (
                                                            <div key={session.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                                                                <span className="text-sm">
                                                                    Session #{session.id}
                                                                </span>
                                                                <Badge variant="outline">
                                                                    {session.status}
                                                                </Badge>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions et statuts */}
                                        <div className="flex flex-col items-end space-y-2">
                                            <div className="flex space-x-2">
                                                <Badge className={getStatusColor(booking.status)}>
                                                    {getStatusText(booking.status)}
                                                </Badge>
                                                <Badge className={getPaymentStatusColor(booking.payment_status)}>
                                                    {getPaymentStatusText(booking.payment_status)}
                                                </Badge>
                                            </div>

                                            <div className="flex space-x-2">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route('student.bookings.show', booking.id)}>
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        Voir
                                                    </Link>
                                                </Button>

                                                {canEdit(booking) && (
                                                    <Button asChild variant="outline" size="sm">
                                                        <Link href={route('student.bookings.edit', booking.id)}>
                                                            <Edit className="h-4 w-4 mr-1" />
                                                            Modifier
                                                        </Link>
                                                    </Button>
                                                )}

                                                {canCancel(booking) && (
                                                    <Button asChild variant="destructive" size="sm">
                                                        <Link href={route('student.bookings.cancel', booking.id)}>
                                                            <X className="h-4 w-4 mr-1" />
                                                            Annuler
                                                        </Link>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card>
                            <CardContent className="text-center py-12">
                                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Aucune réservation</h3>
                                <p className="text-muted-foreground mb-4">
                                    Vous n'avez pas encore de réservations. Commencez par rechercher un professeur.
                                </p>
                                <Button asChild>
                                    <Link href={route('student.search.professors')}>
                                        <Search className="h-4 w-4 mr-2" />
                                        Rechercher un professeur
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Pagination */}
                {bookings.links && bookings.links.length > 3 && (
                    <div className="flex justify-center">
                        <div className="flex space-x-1">
                            {bookings.links.map((link, index) => (
                                <Button
                                    key={index}
                                    asChild
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    disabled={!link.url}
                                >
                                    <Link href={link.url || '#'}>
                                        {link.label}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
