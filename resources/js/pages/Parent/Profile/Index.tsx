import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type User } from '@/types/global';
import { Head, router } from '@inertiajs/react';
import { 
    User as UserIcon,
    Mail,
    Phone,
    Calendar,
    Edit,
    Shield,
    CheckCircle,
    Clock
} from 'lucide-react';

interface Props {
    user: User;
    stats: {
        total_bookings: number;
        active_bookings: number;
        completed_sessions: number;
        total_spent: number;
    };
}

export default function ProfileIndex({ user, stats }: Props) {
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

    return (
        <AppLayout>
            <Head title="Mon Profil" />
            
            <div className="container py-8">
                {/* En-tête */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
                        <p className="text-gray-600 mt-2">Gérez vos informations personnelles</p>
                    </div>
                    <Button onClick={() => router.get(route('parent.profile.edit'))}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier le profil
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne principale */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Informations personnelles */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <UserIcon className="h-5 w-5" />
                                    Informations personnelles
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start gap-6">
                                    {/* Photo de profil */}
                                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        {user.avatar ? (
                                            <img 
                                                src={user.avatar} 
                                                alt={user.name}
                                                className="w-20 h-20 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-blue-600 font-medium text-2xl">
                                                {user.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Informations */}
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h3 className="text-xl font-semibold">{user.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="default" className="bg-blue-600">
                                                    Parent
                                                </Badge>
                                                {user.email_verified_at && (
                                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Email vérifié
                                                    </Badge>
                                                )}
                                                {user.phone_verified_at && (
                                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Téléphone vérifié
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-500" />
                                                <span>{user.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-gray-500" />
                                                <span>{user.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <span>Membre depuis {formatDate(user.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Statistiques */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Statistiques
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">{stats.total_bookings}</div>
                                        <div className="text-sm text-gray-600">Réservations totales</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">{stats.active_bookings}</div>
                                        <div className="text-sm text-gray-600">Sessions actives</div>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <div className="text-2xl font-bold text-purple-600">{stats.completed_sessions}</div>
                                        <div className="text-sm text-gray-600">Sessions terminées</div>
                                    </div>
                                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                        <div className="text-2xl font-bold text-yellow-600">
                                            {formatCurrency(stats.total_spent)}
                                        </div>
                                        <div className="text-sm text-gray-600">Total dépensé</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Colonne latérale */}
                    <div className="space-y-6">
                        {/* Actions rapides */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions rapides</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-start"
                                    onClick={() => router.get(route('parent.children.index'))}
                                >
                                    <UserIcon className="h-4 w-4 mr-2" />
                                    Gérer mes enfants
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-start"
                                    onClick={() => router.get(route('parent.bookings.index'))}
                                >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Mes réservations
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-start"
                                    onClick={() => router.get(route('parent.search.professors'))}
                                >
                                    <Shield className="h-4 w-4 mr-2" />
                                    Rechercher un professeur
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Sécurité du compte */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Sécurité
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Email vérifié</span>
                                        {user.email_verified_at ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Clock className="h-4 w-4 text-yellow-500" />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Téléphone vérifié</span>
                                        {user.phone_verified_at ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Clock className="h-4 w-4 text-yellow-500" />
                                        )}
                                    </div>
                                </div>

                                <Separator />

                                <Button variant="outline" className="w-full">
                                    Changer le mot de passe
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Informations du compte */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations du compte</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">ID utilisateur</span>
                                    <span className="font-mono">#{user.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Créé le</span>
                                    <span>{formatDate(user.created_at)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Dernière mise à jour</span>
                                    <span>{formatDate(user.updated_at)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
