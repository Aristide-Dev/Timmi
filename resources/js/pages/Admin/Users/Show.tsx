import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { type User } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Shield, ShieldOff, CheckCircle, Mail, Calendar } from 'lucide-react';

interface UserShowProps {
    user: User;
}

export default function UserShow({ user }: UserShowProps) {
    const handleToggleVerification = () => {
        router.post(route('admin.users.toggle-verification', user.id), {}, {
            preserveScroll: true,
        });
    };

    // const handleToggleStatus = () => {
    //     router.post(route('admin.users.toggle-status', user.id), {}, {
    //         preserveScroll: true,
    //     });
    // };

    // const getRoleBadgeVariant = (role: any) => {
    //     switch (role) {
    //         case 'admin':
    //         case 'super-admin':
    //             return 'destructive';
    //         case 'professor':
    //             return 'default';
    //         case 'parent':
    //             return 'secondary';
    //         default:
    //             return 'outline';
    //     }
    // };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Utilisateurs', href: route('admin.users.index') },
                { title: user.name, href: route('admin.users.show', user.id) },
            ]}
        >
            <Head title={`Utilisateur - ${user.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.users.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            onClick={handleToggleVerification}
                        >
                            {user.is_verified ? <ShieldOff className="mr-2 h-4 w-4" /> : <Shield className="mr-2 h-4 w-4" />}
                            {user.is_verified ? 'Désactiver' : 'Activer'} la vérification
                        </Button>
                        <Button asChild>
                            <Link href={route('admin.users.edit', user.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Info */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profil</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center space-y-4">
                                                                            <Avatar className="h-24 w-24">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className="text-lg">
                                                {user.name.split(' ').map((n: string) => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                    <div className="text-center">
                                        <h3 className="font-semibold">{user.name}</h3>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                        <div className="flex items-center justify-center space-x-2 mt-2">
                                            {user.email_verified_at && (
                                                <Badge variant="default" className="bg-green-500">
                                                    <CheckCircle className="mr-1 h-3 w-3" />
                                                    Vérifié
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{user.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            Inscrit le {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="font-medium mb-2">Rôles</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline">
                                            Utilisateur
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Statistics */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistiques</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">0</p>
                                        <p className="text-sm text-muted-foreground">Réservations</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">0 GNF</p>
                                        <p className="text-sm text-muted-foreground">Dépensé</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">0</p>
                                        <p className="text-sm text-muted-foreground">Enfants</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">0</p>
                                        <p className="text-sm text-muted-foreground">Certificats</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
