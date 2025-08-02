import { Head } from '@inertiajs/react';
import { Calendar, Clock, MapPin, User, BookOpen, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type Booking = {
    id: number;
    class_date: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    total_amount: number;
    created_at: string;
    teacher: {
        id: number;
        name: string;
        city: string;
    };
    child: {
        id: number;
        name: string;
    };
    subject: {
        id: number;
        name: string;
    };
    payment?: {
        id: number;
        status: 'pending' | 'completed' | 'failed';
    };
    review?: {
        id: number;
        rating: number;
        comment: string;
    };
};

interface ParentBookingsProps extends PageProps {
    bookings: {
        data: Booking[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function ParentBookings({ bookings }: ParentBookingsProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="default" className="bg-yellow-100 text-yellow-800">En attente</Badge>;
            case 'confirmed':
                return <Badge variant="default" className="bg-blue-100 text-blue-800">Confirmé</Badge>;
            case 'completed':
                return <Badge variant="default" className="bg-green-100 text-green-800">Terminé</Badge>;
            case 'cancelled':
                return <Badge variant="default" className="bg-red-100 text-red-800">Annulé</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            case 'confirmed':
                return <CheckCircle className="h-4 w-4 text-blue-500" />;
            case 'completed':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'cancelled':
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Calendar className="h-4 w-4 text-gray-500" />;
        }
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    };

    const formatTime = (timeString: string) => {
        return timeString.substring(0, 5); // Format HH:MM
    };

    const formatAmount = (amount: number) => {
        return `${amount.toLocaleString()} GNF`;
    };

    const canCancel = (booking: Booking) => {
        const bookingDate = new Date(booking.class_date);
        const now = new Date();
        const diffInHours = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        return booking.status === 'pending' && diffInHours > 24;
    };

    const canReview = (booking: Booking) => {
        return booking.status === 'completed' && !booking.review;
    };

    return (
        <AppLayout>
            <Head title="Mes Réservations" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Mes Réservations</h1>
                    <p className="text-muted-foreground">
                        Historique de tous vos cours réservés
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Réservations
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{bookings.total}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                En Attente
                            </CardTitle>
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {bookings.data.filter(b => b.status === 'pending').length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Confirmés
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {bookings.data.filter(b => b.status === 'confirmed').length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Terminés
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {bookings.data.filter(b => b.status === 'completed').length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bookings Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Historique des Réservations</CardTitle>
                        <CardDescription>
                            Détail de tous vos cours réservés
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {bookings.data.length === 0 ? (
                            <div className="text-center py-8">
                                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">Aucune réservation</h3>
                                <p className="text-muted-foreground">
                                    Vous n'avez pas encore réservé de cours.
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Professeur</TableHead>
                                        <TableHead>Enfant</TableHead>
                                        <TableHead>Matière</TableHead>
                                        <TableHead>Montant</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookings.data.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(booking.status)}
                                                    <div>
                                                        <div className="font-medium">
                                                            {formatDate(booking.class_date)}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{booking.teacher.name}</div>
                                                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {booking.teacher.city}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">{booking.child.name}</span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                    <span>{booking.subject.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">
                                                    {formatAmount(booking.total_amount)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(booking.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm">
                                                        Détails
                                                    </Button>
                                                    {canCancel(booking) && (
                                                        <Button variant="outline" size="sm">
                                                            Annuler
                                                        </Button>
                                                    )}
                                                    {canReview(booking) && (
                                                        <Button variant="outline" size="sm">
                                                            Noter
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {bookings.last_page > 1 && (
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="outline" 
                                disabled={bookings.current_page === 1}
                            >
                                Précédent
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {bookings.current_page} sur {bookings.last_page}
                            </span>
                            <Button 
                                variant="outline" 
                                disabled={bookings.current_page === bookings.last_page}
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}