import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type ParentDashboard } from '@/types/global';
import { Head } from '@inertiajs/react';
import { 
    Users, 
    Calendar, 
    Clock, 
    DollarSign, 
    BookOpen, 
    Star,
    Plus,
    Search,
    TrendingUp,
    Award
} from 'lucide-react';

interface Props {
    dashboard: ParentDashboard;
}

export default function ParentDashboard({ dashboard }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'GNF'
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout>
            <Head title="Tableau de Bord - Parent" />
            
            <div className="container py-8">
                {/* En-tête */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
                    <p className="text-gray-600 mt-2">Bienvenue ! Suivez les progrès de vos enfants</p>
                </div>

                {/* Statistiques principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Enfants</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dashboard.total_children}</div>
                            <p className="text-xs text-muted-foreground">
                                Enfants inscrits
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Réservations actives</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dashboard.active_bookings}</div>
                            <p className="text-xs text-muted-foreground">
                                Sessions programmées
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sessions terminées</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dashboard.completed_sessions}</div>
                            <p className="text-xs text-muted-foreground">
                                Cours complétés
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total dépensé</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(dashboard.total_spent)}</div>
                            <p className="text-xs text-muted-foreground">
                                Investissement total
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Prochaines sessions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Prochaines sessions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {dashboard.upcoming_sessions.length > 0 ? (
                                <div className="space-y-4">
                                    {dashboard.upcoming_sessions.slice(0, 5).map((session) => (
                                        <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <BookOpen className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{session.booking.subject.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {session.booking.professor.name} • {session.booking.child.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium">Session programmée</p>
                                                <p className="text-xs text-gray-600">Statut: {session.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600">Aucune session programmée</p>
                                    <Button className="mt-4" variant="outline">
                                        <Search className="h-4 w-4 mr-2" />
                                        Rechercher un professeur
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Enfants */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Mes enfants
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {dashboard.children.map((child) => (
                                    <div key={child.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                {child.avatar ? (
                                                    <img src={child.avatar} alt={child.name} className="w-8 h-8 rounded-full" />
                                                ) : (
                                                    <span className="text-green-600 font-medium">
                                                        {child.name.charAt(0)}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium">{child.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {child.age} ans • {child.grade_level}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">{child.subjects?.length || 0} matières</p>
                                            <Button size="sm" variant="outline">
                                                <Plus className="h-3 w-3 mr-1" />
                                                Cours
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Réservations récentes */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Réservations récentes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4">Professeur</th>
                                        <th className="text-left py-3 px-4">Enfant</th>
                                        <th className="text-left py-3 px-4">Matière</th>
                                        <th className="text-left py-3 px-4">Date</th>
                                        <th className="text-left py-3 px-4">Statut</th>
                                        <th className="text-left py-3 px-4">Prix</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboard.recent_bookings.map((booking) => (
                                        <tr key={booking.id} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <span className="text-blue-600 font-medium text-sm">
                                                            {booking.professor.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{booking.professor.name}</p>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                                            <span className="text-xs text-gray-600">
                                                                {booking.professor.rating} ({booking.professor.total_reviews})
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">{booking.child.name}</td>
                                            <td className="py-3 px-4">{booking.subject.name}</td>
                                            <td className="py-3 px-4">{new Date(booking.created_at).toLocaleDateString('fr-FR')}</td>
                                            <td className="py-3 px-4">
                                                <Badge className={getStatusColor(booking.status)}>
                                                    {booking.status}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4 font-medium">
                                                {formatCurrency(booking.total_price)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
