import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { type User } from '@/types/global';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Edit, Calendar, DollarSign, User as UserIcon, BookOpen, GraduationCap, Clock, CreditCard, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface BookingShowProps {
    booking: {
        id: number;
        professor: User;
        parent: User;
        child: { name: string; avatar?: string; age?: number; grade_level?: string };
        subject: { name: string };
        level: { name: string };
        total_price: number;
        status: string;
        payment_status?: string;
        transaction_id?: string;
        duration?: number;
        notes?: string;
        meeting_link?: string;
        created_at: string;
    };
    statusHistory: Array<{
        status: string;
        changed_at: string;
        changed_by: string;
    }>;
}

export default function BookingShow({ booking, statusHistory }: BookingShowProps) {
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const { data: statusData, setData: setStatusData, post: postStatus } = useForm({
        status: booking.status,
        notes: '',
    });

    const { data: paymentData, setData: setPaymentData, post: postPayment } = useForm({
        payment_status: booking.payment_status,
        transaction_id: booking.transaction_id || '',
        notes: '',
    });

    const handleStatusUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        postStatus(route('admin.bookings.update-status', booking.id), {
            onSuccess: () => setShowStatusModal(false),
        });
    };

    const handlePaymentUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        postPayment(route('admin.bookings.update-payment-status', booking.id), {
            onSuccess: () => setShowPaymentModal(false),
        });
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'pending':
                return 'secondary';
            case 'confirmed':
                return 'default';
            case 'completed':
                return 'default';
            case 'cancelled':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getPaymentStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'pending':
                return 'secondary';
            case 'paid':
                return 'default';
            case 'refunded':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'En attente';
            case 'confirmed':
                return 'Confirmée';
            case 'completed':
                return 'Terminée';
            case 'cancelled':
                return 'Annulée';
            default:
                return status;
        }
    };

    const getPaymentStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'En attente';
            case 'paid':
                return 'Payé';
            case 'refunded':
                return 'Remboursé';
            default:
                return status;
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Réservations', href: route('admin.bookings.index') },
                { title: `Réservation #${booking.id}`, href: route('admin.bookings.show', booking.id) },
            ]}
        >
            <Head title={`Réservation #${booking.id}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.bookings.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Réservation #{booking.id}
                            </h1>
                            <p className="text-muted-foreground">
                                {booking.professor.name} → {booking.parent.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowStatusModal(true)}
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier le statut
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setShowPaymentModal(true)}
                        >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Modifier le paiement
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Booking Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status and Payment */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Statut et Paiement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Statut</label>
                                        <div className="mt-1">
                                            <Badge variant={getStatusBadgeVariant(booking.status)}>
                                                {getStatusLabel(booking.status)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Paiement</label>
                                        <div className="mt-1">
                                            <Badge variant={getPaymentStatusBadgeVariant(booking.payment_status || 'pending')}>
                                                {getPaymentStatusLabel(booking.payment_status || 'pending')}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Participants */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Participants</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Professor */}
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={booking.professor.avatar} alt={booking.professor.name} />
                                        <AvatarFallback>
                                            {booking.professor.name.split(' ').map((n: string) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h4 className="font-medium">Professeur</h4>
                                        <p className="text-sm text-muted-foreground">{booking.professor.name}</p>
                                        <p className="text-sm text-muted-foreground">{booking.professor.email}</p>
                                    </div>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={route('admin.professors.show', booking.professor.id)}>
                                            Voir le profil
                                        </Link>
                                    </Button>
                                </div>

                                <Separator />

                                {/* Parent */}
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={booking.parent.avatar} alt={booking.parent.name} />
                                        <AvatarFallback>
                                            {booking.parent.name.split(' ').map((n: string) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h4 className="font-medium">Parent</h4>
                                        <p className="text-sm text-muted-foreground">{booking.parent.name}</p>
                                        <p className="text-sm text-muted-foreground">{booking.parent.email}</p>
                                    </div>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={route('admin.parents.show', booking.parent.id)}>
                                            Voir le profil
                                        </Link>
                                    </Button>
                                </div>

                                <Separator />

                                {/* Child */}
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={booking.child.avatar || ''} alt={booking.child.name} />
                                        <AvatarFallback>
                                            {booking.child.name.split(' ').map((n: string) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h4 className="font-medium">Enfant</h4>
                                        <p className="text-sm text-muted-foreground">{booking.child.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking.child.age ? `${booking.child.age} ans` : ''} {booking.child.grade_level ? `- ${booking.child.grade_level}` : ''}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Détails du cours</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Matière</label>
                                            <p className="font-medium">{booking.subject.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Niveau</label>
                                            <p className="font-medium">{booking.level.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Durée</label>
                                            <p className="font-medium">{booking.duration} minutes</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Prix</label>
                                            <p className="font-medium">{booking.total_price} GNF</p>
                                        </div>
                                    </div>
                                </div>

                                {booking.notes && (
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Notes</label>
                                        <p className="mt-1 text-sm">{booking.notes}</p>
                                    </div>
                                )}

                                {booking.meeting_link && (
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Lien de réunion</label>
                                        <a
                                            href={booking.meeting_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            {booking.meeting_link}
                                        </a>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Status History */}
                        {statusHistory.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Historique des statuts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {statusHistory.map((entry, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-primary rounded-full" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">{entry.status}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {entry.changed_by} - {new Date(entry.changed_at).toLocaleString('fr-FR')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions rapides</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={() => setShowStatusModal(true)}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Modifier le statut
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={() => setShowPaymentModal(true)}
                                >
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Modifier le paiement
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-red-600"
                                    onClick={() => {
                                        if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
                                            router.delete(route('admin.bookings.destroy', booking.id));
                                        }
                                    }}
                                >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Supprimer
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Booking Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Créée le</p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(booking.created_at).toLocaleString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">ID Réservation</p>
                                        <p className="text-xs text-muted-foreground">#{booking.id}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Status Update Modal */}
                {showStatusModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle>Modifier le statut</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleStatusUpdate} className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Nouveau statut</label>
                                        <select
                                            className="w-full mt-1 p-2 border rounded-md"
                                            value={statusData.status}
                                            onChange={(e) => setStatusData('status', e.target.value)}
                                        >
                                            <option value="pending">En attente</option>
                                            <option value="confirmed">Confirmée</option>
                                            <option value="completed">Terminée</option>
                                            <option value="cancelled">Annulée</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Notes (optionnel)</label>
                                        <textarea
                                            className="w-full mt-1 p-2 border rounded-md"
                                            rows={3}
                                            value={statusData.notes}
                                            onChange={(e) => setStatusData('notes', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowStatusModal(false)}
                                        >
                                            Annuler
                                        </Button>
                                        <Button type="submit">Mettre à jour</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Payment Update Modal */}
                {showPaymentModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle>Modifier le paiement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePaymentUpdate} className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Statut du paiement</label>
                                        <select
                                            className="w-full mt-1 p-2 border rounded-md"
                                            value={paymentData.payment_status}
                                            onChange={(e) => setPaymentData('payment_status', e.target.value)}
                                        >
                                            <option value="pending">En attente</option>
                                            <option value="paid">Payé</option>
                                            <option value="refunded">Remboursé</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">ID de transaction</label>
                                        <input
                                            type="text"
                                            className="w-full mt-1 p-2 border rounded-md"
                                            value={paymentData.transaction_id}
                                            onChange={(e) => setPaymentData('transaction_id', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Notes (optionnel)</label>
                                        <textarea
                                            className="w-full mt-1 p-2 border rounded-md"
                                            rows={3}
                                            value={paymentData.notes}
                                            onChange={(e) => setPaymentData('notes', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowPaymentModal(false)}
                                        >
                                            Annuler
                                        </Button>
                                        <Button type="submit">Mettre à jour</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
