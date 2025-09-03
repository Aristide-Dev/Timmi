import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type Booking } from '@/types/global';
import { Head, router } from '@inertiajs/react';
import { 
    ArrowLeft,
    Calendar, 
    Clock, 
    User, 
    BookOpen,
    Phone,
    Mail,
    MessageCircle,
    Edit,
    X,
    CheckCircle,
    AlertCircle,
    XCircle,
    CreditCard,
    FileText
} from 'lucide-react';

interface Props {
    booking: Booking;
}

export default function BookingShow({ booking }: Props) {
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
            day: 'numeric',
            weekday: 'long'
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
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'completed':
                return <CheckCircle className="h-5 w-5 text-blue-500" />;
            case 'cancelled':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <AlertCircle className="h-5 w-5 text-yellow-500" />;
        }
    };

    const getPaymentStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return <Badge variant="default" className="bg-green-600">Payé</Badge>;
            case 'pending':
                return <Badge variant="secondary">En attente</Badge>;
            case 'failed':
                return <Badge variant="destructive">Échoué</Badge>;
            case 'refunded':
                return <Badge variant="outline">Remboursé</Badge>;
            default:
                return <Badge variant="outline">Non payé</Badge>;
        }
    };

    return (
        <AppLayout>
            <Head title={`Réservation #${booking.id}`} />
            
            <div className="container py-8">
                {/* Bouton retour */}
                <div className="mb-6">
                    <Button 
                        variant="outline" 
                        onClick={() => router.get(route('parent.bookings.index'))}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour aux réservations
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne principale */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* En-tête de la réservation */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        {getStatusIcon(booking.status)}
                                        <div>
                                            <CardTitle className="text-xl">Réservation #{booking.id}</CardTitle>
                                            <p className="text-gray-600 mt-1">
                                                Créée le {formatDate(booking.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                    {getStatusBadge(booking.status, booking.payment_status)}
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Informations de la session */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Détails de la session
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">Réservation créée</p>
                                            <p className="text-sm text-gray-600">{formatDate(booking.created_at)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">
                                                {booking.duration} minutes
                                            </p>
                                            <p className="text-sm text-gray-600">Durée de la session</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">{booking.subject.name}</p>
                                            <p className="text-sm text-gray-600">Matière</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <User className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">{booking.level.name}</p>
                                            <p className="text-sm text-gray-600">Niveau</p>
                                        </div>
                                    </div>
                                </div>

                                {booking.notes && (
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-medium mb-2">Notes spéciales</h4>
                                        <p className="text-gray-700">{booking.notes}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Informations sur l'enfant */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Informations sur l'enfant
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-medium text-lg">
                                            {booking.child.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-lg">{booking.child.name}</h4>
                                        <p className="text-gray-600">
                                            {booking.child.age} ans • {booking.child.grade_level}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Colonne latérale */}
                    <div className="space-y-6">
                        {/* Informations du professeur */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Professeur
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        {booking.professor.avatar ? (
                                            <img 
                                                src={booking.professor.avatar} 
                                                alt={booking.professor.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                        ) : (
                                            <span className="text-green-600 font-medium text-lg">
                                                {booking.professor.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{booking.professor.name}</h4>
                                        <p className="text-sm text-gray-600">
                                            {booking.professor.experience_years} ans d'expérience
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span>{booking.professor.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <span>{booking.professor.phone}</span>
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Contacter le professeur
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Informations de paiement */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Paiement
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Montant total</span>
                                    <span className="text-lg font-bold text-green-600">
                                        {formatCurrency(booking.total_price)}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Statut</span>
                                    {getPaymentStatusBadge(booking.payment_status)}
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Méthode</span>
                                    <span className="text-sm font-medium capitalize">
                                        {booking.payment_method?.replace('_', ' ') || 'Non spécifiée'}
                                    </span>
                                </div>

                                {booking.payment_status === 'pending' && (
                                    <Button className="w-full">
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        Effectuer le paiement
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {booking.status === 'pending' && (
                                    <>
                                        <Button 
                                            variant="outline" 
                                            className="w-full"
                                            onClick={() => router.get(route('parent.bookings.edit', booking.id))}
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Modifier la réservation
                                        </Button>
                                        <Button 
                                            variant="destructive" 
                                            className="w-full"
                                            onClick={() => {
                                                if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
                                                    router.post(route('parent.bookings.cancel', booking.id));
                                                }
                                            }}
                                        >
                                            <X className="h-4 w-4 mr-2" />
                                            Annuler la réservation
                                        </Button>
                                    </>
                                )}

                                {booking.status === 'confirmed' && (
                                    <Button 
                                        variant="outline" 
                                        className="w-full"
                                        onClick={() => router.get(route('parent.sessions.join', booking.id))}
                                    >
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Rejoindre la session
                                    </Button>
                                )}

                                {booking.status === 'completed' && (
                                    <Button 
                                        variant="outline" 
                                        className="w-full"
                                        onClick={() => router.get(route('parent.feedback.index'))}
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        Laisser un avis
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
