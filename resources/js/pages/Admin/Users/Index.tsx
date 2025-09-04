import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type AdminUser, type PaginatedData } from '@/types';
import { type PageProps } from '@inertiajs/react';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Search, UserPlus, Eye, Edit, Trash2, Shield, ShieldOff, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface UsersIndexProps extends PageProps {
    users: PaginatedData<AdminUser>;
    filters: {
        search?: string;
        role?: string;
        status?: string;
        verified?: boolean;
    };
}

export default function UsersIndex({ users, filters }: UsersIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [verifiedFilter, setVerifiedFilter] = useState(filters.verified);

    const handleSearch = () => {
        router.get(route('admin.users.index'), {
            search: search || undefined,
            role: roleFilter || undefined,
            status: statusFilter || undefined,
            verified: verifiedFilter,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleToggleVerification = (userId: number) => {
        router.post(route('admin.users.toggle-verification', userId), {}, {
            preserveScroll: true,
        });
    };

    const handleToggleStatus = (userId: number) => {
        router.post(route('admin.users.toggle-status', userId), {}, {
            preserveScroll: true,
        });
    };

    const getRoleBadgeVariant = (role: string) => {
        switch (role) {
            case 'admin':
            case 'super-admin':
                return 'destructive';
            case 'professor':
                return 'default';
            case 'parent':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    const getStatusBadgeVariant = (user: AdminUser) => {
        if (!user.email_verified_at) return 'destructive';
        if (!user.is_active) return 'secondary';
        return 'default';
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Utilisateurs', href: route('admin.users.index') },
            ]}
        >
            <Head title="Gestion des utilisateurs" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les utilisateurs de la plateforme
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.users.create')}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Nouvel utilisateur
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les utilisateurs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Input
                                placeholder="Rechercher par nom, email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                <option value="">Tous les rôles</option>
                                <option value="admin">Admin</option>
                                <option value="professor">Professeur</option>
                                <option value="parent">Parent</option>
                            </select>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Tous les statuts</option>
                                <option value="active">Actif</option>
                                <option value="inactive">Inactif</option>
                            </select>
                            <Button onClick={handleSearch} className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Users List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des utilisateurs ({users.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {users.data.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium">{user.name}</p>
                                                {user.is_verified && (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                )}
                                                {!user.is_active && (
                                                    <XCircle className="h-4 w-4 text-red-500" />
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                            <div className="flex items-center space-x-2">
                                                {user.roles?.map((role) => (
                                                    <Badge
                                                        key={role.id}
                                                        variant={getRoleBadgeVariant(role.slug)}
                                                    >
                                                        {role.name}
                                                    </Badge>
                                                ))}
                                                <Badge variant={getStatusBadgeVariant(user)}>
                                                    {user.email_verified_at ? 'Vérifié' : 'Non vérifié'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleToggleVerification(user.id)}
                                        >
                                            {user.is_verified ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.users.show', user.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Voir
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.users.edit', user.id)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Modifier
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleToggleStatus(user.id)}
                                                    className="text-orange-600"
                                                >
                                                    {user.is_active ? 'Suspendre' : 'Activer'}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
                                                            router.delete(route('admin.users.destroy', user.id));
                                                        }
                                                    }}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {users.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-muted-foreground">
                                    Affichage de {users.from} à {users.to} sur {users.total} résultats
                                </p>
                                <div className="flex space-x-2">
                                    {users.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? "default" : "outline"}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                        >
                                            {link.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
