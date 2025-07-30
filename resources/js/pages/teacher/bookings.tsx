import React from 'react';
import { Head, router } from '@inertiajs/react';
import { Calendar, Clock, User, MapPin, CheckCircle, XCircle, AlertCircle, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { useState } from 'react';

type Booking = {
    id: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    scheduled_at: string;
    duration: number;
    subject: {
        id: number;
        name: string;
        category: string;
    };
    child: {
        id: number;
        first_name: string;
        last_name: string;
        age: number;
    };
    parent: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    };
    payment: {
        id: number;
        status: 'pending' | 'completed' | 'failed';
        amount: number;
    };
    created_at: string;
};

interface TeacherBookingsProps extends PageProps {
    bookings: {
        data: Booking[];
        links: any[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            from: number;
            to: number;
        };
    };
    stats: {
        total_bookings: number;
        pending_bookings: number;
        confirmed_bookings: number;
        completed_bookings: number;
        total_earnings: number;
    };
}

export default function TeacherBookings({ bookings, stats }: TeacherBookingsProps) {
    // Fallback pour éviter les erreurs si les données ne sont pas encore chargées
    const safeStats = stats || {
        total_bookings: 0,
        pending_bookings: 0,
        confirmed_bookings: 0,
        completed_bookings: 0,
        total_earnings: 0,
    };

    const safeBookings = bookings || {
        data: [],
        links: [],
        meta: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
            from: 0,
            to: 0
        }
    };
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [bookingToConfirm, setBookingToConfirm] = useState<Booking | null>(null);

    const handleConfirmBooking = (booking: Booking) => {
        setBookingToConfirm(booking);
        setConfirmDialogOpen(true);
    };

    const confirmBooking = () => {
        if (bookingToConfirm) {
            router.post(route('teacher.bookings.confirm', bookingToConfirm.id), {}, {
                onSuccess: () => {
                    setConfirmDialogOpen(false);
                    setBookingToConfirm(null);
                },
            });
        }
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { variant: 'secondary', label: 'En attente', icon: AlertCircle },
            confirmed: { variant: 'default', label: 'Confirmée', icon: CheckCircle },
            completed: { variant: 'default', label: 'Terminée', icon: CheckCircle },
            cancelled: { variant: 'destructive', label: 'Annulée', icon: XCircle },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        const Icon = config.icon;

        return (
            <Badge variant={config.variant as any} className="flex items-center gap-1">
                <Icon className="h-3 w-3" />
                {config.label}
            </Badge>
        );
    };

    const getPaymentStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { variant: 'secondary', label: 'En attente' },
            completed: { variant: 'default', label: 'Payé' },
            failed: { variant: 'destructive', label: 'Échoué' },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

        return (
            <Badge variant={config.variant as any}>
                {config.label}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'GNF',
        }).format(amount);
    };

    const pendingBookings = safeBookings.data?.filter(booking => booking.status === 'pending') || [];
    const confirmedBookings = safeBookings.data?.filter(booking => booking.status === 'confirmed') || [];
    const completedBookings = safeBookings.data?.filter(booking => booking.status === 'completed') || [];

    return (
        <AppLayout>
            <Head title="Mes Réservations" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Mes Réservations</h1>
                    <p className="text-muted-foreground">
                        Gérez vos réservations et suivez vos cours
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{safeStats.total_bookings}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">En attente</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{safeStats.pending_bookings}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Confirmées</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{safeStats.confirmed_bookings}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{safeStats.completed_bookings}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(safeStats.total_earnings)}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="all">Toutes ({safeBookings.data?.length || 0})</TabsTrigger>
                        <TabsTrigger value="pending">En attente ({pendingBookings.length})</TabsTrigger>
                        <TabsTrigger value="confirmed">Confirmées ({confirmedBookings.length})</TabsTrigger>
                        <TabsTrigger value="completed">Terminées ({completedBookings.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        {!safeBookings.data || safeBookings.data.length === 0 ? (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Vous n'avez pas encore de réservations.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div className="grid gap-4">
                                {safeBookings.data.map((booking) => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        onConfirm={handleConfirmBooking}
                                        getStatusBadge={getStatusBadge}
                                        getPaymentStatusBadge={getPaymentStatusBadge}
                                        formatDate={formatDate}
                                        formatTime={formatTime}
                                        formatCurrency={formatCurrency}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="pending" className="space-y-4">
                        {pendingBookings.length === 0 ? (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Aucune réservation en attente.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div className="grid gap-4">
                                {pendingBookings.map((booking) => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        onConfirm={handleConfirmBooking}
                                        getStatusBadge={getStatusBadge}
                                        getPaymentStatusBadge={getPaymentStatusBadge}
                                        formatDate={formatDate}
                                        formatTime={formatTime}
                                        formatCurrency={formatCurrency}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="confirmed" className="space-y-4">
                        {confirmedBookings.length === 0 ? (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Aucune réservation confirmée.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div className="grid gap-4">
                                {confirmedBookings.map((booking) => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        onConfirm={handleConfirmBooking}
                                        getStatusBadge={getStatusBadge}
                                        getPaymentStatusBadge={getPaymentStatusBadge}
                                        formatDate={formatDate}
                                        formatTime={formatTime}
                                        formatCurrency={formatCurrency}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="completed" className="space-y-4">
                        {completedBookings.length === 0 ? (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Aucune réservation terminée.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div className="grid gap-4">
                                {completedBookings.map((booking) => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        onConfirm={handleConfirmBooking}
                                        getStatusBadge={getStatusBadge}
                                        getPaymentStatusBadge={getPaymentStatusBadge}
                                        formatDate={formatDate}
                                        formatTime={formatTime}
                                        formatCurrency={formatCurrency}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                {/* Pagination */}
                {safeBookings.meta?.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {safeBookings.links?.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(link.url)}
                                disabled={!link.url}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </div>
                )}

                {/* Confirm Dialog */}
                <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmer la réservation</DialogTitle>
                            <DialogDescription>
                                Êtes-vous sûr de vouloir confirmer cette réservation ? 
                                Le parent sera notifié de la confirmation.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
                                Annuler
                            </Button>
                            <Button onClick={confirmBooking}>
                                Confirmer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}

// Composant pour afficher une carte de réservation
function BookingCard({ 
    booking, 
    onConfirm, 
    getStatusBadge, 
    getPaymentStatusBadge, 
    formatDate, 
    formatTime, 
    formatCurrency 
}: {
    booking: Booking;
    onConfirm: (booking: Booking) => void;
    getStatusBadge: (status: string) => JSX.Element;
    getPaymentStatusBadge: (status: string) => JSX.Element;
    formatDate: (date: string) => string;
    formatTime: (date: string) => string;
    formatCurrency: (amount: number) => string;
}) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            {formatDate(booking.scheduled_at)}
                        </CardTitle>
                        <CardDescription>
                            {formatTime(booking.scheduled_at)} • {booking.duration} minutes
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        {getStatusBadge(booking.status)}
                        {getPaymentStatusBadge(booking.payment.status)}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Subject */}
                <div>
                    <h4 className="font-medium mb-2">Matière</h4>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">{booking.subject.name}</Badge>
                        <span className="text-sm text-muted-foreground">{booking.subject.category}</span>
                    </div>
                </div>

                {/* Student */}
                <div>
                    <h4 className="font-medium mb-2">Élève</h4>
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.child.first_name} {booking.child.last_name}</span>
                        <Badge variant="secondary">{booking.child.age} ans</Badge>
                    </div>
                </div>

                {/* Parent */}
                <div>
                    <h4 className="font-medium mb-2">Parent</h4>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.parent.first_name} {booking.parent.last_name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {booking.parent.email} • {booking.parent.phone}
                        </div>
                    </div>
                </div>

                {/* Payment */}
                <div>
                    <h4 className="font-medium mb-2">Paiement</h4>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Montant</span>
                        <span className="font-medium">{formatCurrency(booking.payment.amount)}</span>
                    </div>
                </div>

                {/* Actions */}
                {booking.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                        <Button onClick={() => onConfirm(booking)} className="flex-1">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirmer
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 