import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    Calendar, 
    Clock, 
    DollarSign, 
    TrendingUp, 
    Users, 
    BookOpen,
    AlertCircle
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { User, Booking, PagePropsWithData } from '@/types/global';
import AppLayout from '@/layouts/app-layout';


interface ProfessorDashboardStats {
    total_bookings: number;
    pending_bookings: number;
    completed_bookings: number;
    total_earnings: number;
    monthly_earnings: number;
}

interface Props extends PagePropsWithData {
    user: User;
    stats: ProfessorDashboardStats;
    recent_bookings: Booking[];
    upcoming_sessions: Booking[];
}

export default function ProfessorDashboard({ 
    user, 
    stats, 
    recent_bookings = [], 
    upcoming_sessions = [] 
}: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'GNF',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Date non disponible';
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Date invalide';
        }
        
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { label: 'En attente', variant: 'secondary' as const },
            confirmed: { label: 'Confirmée', variant: 'default' as const },
            completed: { label: 'Terminée', variant: 'success' as const },
            cancelled: { label: 'Annulée', variant: 'destructive' as const },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    return (
        <AppLayout>
            <Head title="Tableau de bord - Professeur" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Bonjour, {user.name} !</h1>
                        <p className="text-muted-foreground">
                            Voici un aperçu de votre activité de professeur
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <img
                            src={user.avatar || '/images/default-avatar.png'}
                            alt={user.name}
                            className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {user.hourly_rate ? formatCurrency(user.hourly_rate) : 'N/A'}/h
                            </p>
                        </div>
                    </div>
                </div>

                {/* Statistiques */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total des réservations
                            </CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_bookings}</div>
                            <p className="text-xs text-muted-foreground">
                                Toutes les réservations
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                En attente
                            </CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pending_bookings}</div>
                            <p className="text-xs text-muted-foreground">
                                Réservations en attente
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Revenus totaux
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(stats.total_earnings)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Depuis le début
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Revenus du mois
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(stats.monthly_earnings)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Ce mois-ci
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Prochaines sessions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Prochaines sessions
                            </CardTitle>
                            <CardDescription>
                                Vos prochaines sessions programmées
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {upcoming_sessions.length > 0 ? (
                                <div className="space-y-4">
                                    {upcoming_sessions.map((session) => (
                                        <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="space-y-1">
                                                <p className="font-medium">
                                                    {session.child?.name || 'Étudiant'} - {session.subject?.name || 'Matière'}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {session.level?.name || 'Niveau'}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatDate(session.created_at)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                {getStatusBadge(session.status)}
                                                <p className="text-sm font-medium mt-1">
                                                    {formatCurrency(session.total_price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-4">
                                    Aucune session programmée
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Réservations récentes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Réservations récentes
                            </CardTitle>
                            <CardDescription>
                                Dernières réservations reçues
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recent_bookings.length > 0 ? (
                                <div className="space-y-4">
                                    {recent_bookings.map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="space-y-1">
                                                <p className="font-medium">
                                                    {booking.child?.name || 'Étudiant'}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {booking.subject?.name || 'Matière'} - {booking.level?.name || 'Niveau'}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatDate(booking.created_at)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                {getStatusBadge(booking.status)}
                                                <p className="text-sm font-medium mt-1">
                                                    {formatCurrency(booking.total_price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-4">
                                    Aucune réservation récente
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Actions rapides */}
                <Card>
                    <CardHeader>
                        <CardTitle>Actions rapides</CardTitle>
                        <CardDescription>
                            Accédez rapidement aux fonctionnalités principales
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Button asChild variant="outline" className="h-auto p-4">
                                <Link href={route('professor.schedule.index')}>
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <div className="text-left">
                                        <div className="font-medium">Mon agenda</div>
                                        <div className="text-sm text-muted-foreground">
                                            Gérer mes disponibilités
                                        </div>
                                    </div>
                                </Link>
                            </Button>

                            <Button asChild variant="outline" className="h-auto p-4">
                                <Link href={route('professor.bookings.index')}>
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    <div className="text-left">
                                        <div className="font-medium">Mes réservations</div>
                                        <div className="text-sm text-muted-foreground">
                                            Voir toutes les réservations
                                        </div>
                                    </div>
                                </Link>
                            </Button>

                            <Button asChild variant="outline" className="h-auto p-4">
                                <Link href={route('professor.earnings.index')}>
                                    <DollarSign className="h-4 w-4 mr-2" />
                                    <div className="text-left">
                                        <div className="font-medium">Mes revenus</div>
                                        <div className="text-sm text-muted-foreground">
                                            Consulter mes gains
                                        </div>
                                    </div>
                                </Link>
                            </Button>

                            <Button asChild variant="outline" className="h-auto p-4">
                                <Link href={route('professor.profile.edit')}>
                                    <Users className="h-4 w-4 mr-2" />
                                    <div className="text-left">
                                        <div className="font-medium">Mon profil</div>
                                        <div className="text-sm text-muted-foreground">
                                            Modifier mes informations
                                        </div>
                                    </div>
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
