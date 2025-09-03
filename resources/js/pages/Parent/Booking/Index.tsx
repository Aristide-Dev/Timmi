import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type Booking } from '@/types/global';
import { Head, router } from '@inertiajs/react';
import { 
    Calendar, 
    Clock, 
    DollarSign, 
    User, 
    BookOpen,
    Plus,
    Eye,
    Edit,
    X,
    CheckCircle,
    AlertCircle,
    XCircle
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    bookings: {
        pending: Booking[];
        confirmed: Booking[];
        completed: Booking[];
        cancelled: Booking[];
    };
}

export default function BookingIndex({ bookings }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'GNF'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString: string) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string, paymentStatus: string) => {
        if (status === 'cancelled') {
            return <Badge variant="destructive">Annulée</Badge>;
        }
        if (status === 'completed') {
            return <Badge variant="default" className="bg-green-600">Terminée</Badge>;
        }
        if (status === 'confirmed') {
            return paymentStatus === 'paid' 
                ? <Badge variant="default" className="bg-blue-600">Confirmée</Badge>
                : <Badge variant="secondary">En attente de paiement</Badge>;
        }
        return <Badge variant="outline">En attente</Badge>;
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'completed':
                return <CheckCircle className="h-4 w-4 text-blue-500" />;
            case 'cancelled':
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <AlertCircle className="h-4 w-4 text-yellow-500" />;
        }
    };

    const renderBookingCard = (booking: Booking) => (
        <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        {getStatusIcon(booking.status)}
                        <div>
                            <CardTitle className="text-lg">{booking.professor.name}</CardTitle>
                            <p className="text-sm text-gray-600">{booking.subject.name} - {booking.level.name}</p>
                        </div>
                    </div>
                    {getStatusBadge(booking.status, booking.payment_status)}
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {/* Informations de la session */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>Créée le {formatDate(booking.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>Durée: {booking.duration} minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span>{booking.child.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{formatCurrency(booking.total_price)}</span>
                        </div>
                    </div>

                    {/* Notes */}
                    {booking.notes && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                                <strong>Notes :</strong> {booking.notes}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-3 border-t">
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => router.get(route('parent.bookings.show', booking.id))}
                        >
                            <Eye className="h-4 w-4 mr-1" />
                            Voir détails
                        </Button>
                        
                        {booking.status === 'pending' && (
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => router.get(route('parent.bookings.edit', booking.id))}
                            >
                                <Edit className="h-4 w-4 mr-1" />
                                Modifier
                            </Button>
                        )}
                        
                        {booking.status === 'pending' && (
                            <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => {
                                    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
                                        router.post(route('parent.bookings.cancel', booking.id));
                                    }
                                }}
                            >
                                <X className="h-4 w-4 mr-1" />
                                Annuler
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const totalBookings = bookings.pending.length + bookings.confirmed.length + bookings.completed.length + bookings.cancelled.length;

    return (
        <AppLayout>
            <Head title="Mes Réservations" />
            
            <div className="container py-8">
                {/* En-tête */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Mes Réservations</h1>
                        <p className="text-gray-600 mt-2">
                            {totalBookings} réservation{totalBookings > 1 ? 's' : ''} au total
                        </p>
                    </div>
                    <Button onClick={() => router.get(route('parent.search.professors'))}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvelle réservation
                    </Button>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <AlertCircle className="h-8 w-8 text-yellow-500" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">En attente</p>
                                    <p className="text-2xl font-bold">{bookings.pending.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <CheckCircle className="h-8 w-8 text-green-500" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Confirmées</p>
                                    <p className="text-2xl font-bold">{bookings.confirmed.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <BookOpen className="h-8 w-8 text-blue-500" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Terminées</p>
                                    <p className="text-2xl font-bold">{bookings.completed.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <XCircle className="h-8 w-8 text-red-500" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Annulées</p>
                                    <p className="text-2xl font-bold">{bookings.cancelled.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Liste des réservations */}
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="all">Toutes ({totalBookings})</TabsTrigger>
                        <TabsTrigger value="pending">En attente ({bookings.pending.length})</TabsTrigger>
                        <TabsTrigger value="confirmed">Confirmées ({bookings.confirmed.length})</TabsTrigger>
                        <TabsTrigger value="completed">Terminées ({bookings.completed.length})</TabsTrigger>
                        <TabsTrigger value="cancelled">Annulées ({bookings.cancelled.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        {totalBookings > 0 ? (
                            <div className="space-y-4">
                                {[...bookings.pending, ...bookings.confirmed, ...bookings.completed, ...bookings.cancelled]
                                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                                    .map(renderBookingCard)}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation</h3>
                                    <p className="text-gray-600 mb-4">Vous n'avez pas encore de réservations.</p>
                                    <Button onClick={() => router.get(route('parent.search.professors'))}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Créer une réservation
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="pending" className="space-y-4">
                        {bookings.pending.length > 0 ? (
                            <div className="space-y-4">
                                {bookings.pending.map(renderBookingCard)}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation en attente</h3>
                                    <p className="text-gray-600">Toutes vos réservations ont été traitées.</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="confirmed" className="space-y-4">
                        {bookings.confirmed.length > 0 ? (
                            <div className="space-y-4">
                                {bookings.confirmed.map(renderBookingCard)}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation confirmée</h3>
                                    <p className="text-gray-600">Vos réservations confirmées apparaîtront ici.</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="completed" className="space-y-4">
                        {bookings.completed.length > 0 ? (
                            <div className="space-y-4">
                                {bookings.completed.map(renderBookingCard)}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune session terminée</h3>
                                    <p className="text-gray-600">Vos sessions terminées apparaîtront ici.</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="cancelled" className="space-y-4">
                        {bookings.cancelled.length > 0 ? (
                            <div className="space-y-4">
                                {bookings.cancelled.map(renderBookingCard)}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation annulée</h3>
                                    <p className="text-gray-600">Vos réservations annulées apparaîtront ici.</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
