import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type User, type PaginatedData } from '@/types/global';
// import { type InertiaPage } from '@inertiajs/react';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Search, Eye, Users, DollarSign, Calendar, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ParentsIndexProps {
    parents: PaginatedData<User>;
    filters: {
        search?: string;
        status?: string;
        verified?: boolean;
    };
}

export default function ParentsIndex({ parents, filters }: ParentsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [verifiedFilter, setVerifiedFilter] = useState(filters.verified);

    const handleSearch = () => {
        router.get(route('admin.parents.index'), {
            search: search || undefined,
            status: statusFilter || undefined,
            verified: verifiedFilter,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleToggleStatus = (parentId: number) => {
        router.post(route('admin.parents.toggle-status', parentId), {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = (parentId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce parent ?')) {
            router.delete(route('admin.parents.destroy', parentId));
        }
    };

    const getStatusBadgeVariant = (parent: User) => {
        if (!parent.email_verified_at) return 'destructive';
        return 'default';
    };

    const getStatusLabel = (parent: User) => {
        if (!parent.email_verified_at) return 'Non vérifié';
        return 'Actif';
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Parents', href: route('admin.parents.index') },
            ]}
        >
            <Head title="Gestion des parents" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Parents</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les parents de la plateforme
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les parents</CardDescription>
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
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Tous les statuts</option>
                                <option value="verified">Vérifiés</option>
                                <option value="unverified">Non vérifiés</option>
                                <option value="active">Actifs</option>
                                <option value="inactive">Inactifs</option>
                            </select>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="verified"
                                    checked={verifiedFilter || false}
                                    onChange={(e) => setVerifiedFilter(e.target.checked)}
                                />
                                <label htmlFor="verified" className="text-sm">Vérifiés uniquement</label>
                            </div>
                            <Button onClick={handleSearch} className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Parents List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des parents ({parents.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {parents.data.map((parent) => (
                                <div
                                    key={parent.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={parent.avatar} alt={parent.name} />
                                            <AvatarFallback>
                                                {parent.name.split(' ').map((n: string) => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium">{parent.name}</p>
                                                <Badge variant={getStatusBadgeVariant(parent)}>
                                                    {getStatusLabel(parent)}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{parent.email}</p>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <Users className="h-4 w-4" />
                                                    <span>0 enfants</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>0 réservations</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>0 GNF dépensés</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Inscrit le {new Date(parent.created_at).toLocaleDateString('fr-FR')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.parents.show', parent.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Voir
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.parents.children', parent.id)}>
                                                        <Users className="mr-2 h-4 w-4" />
                                                        Voir les enfants
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.parents.bookings', parent.id)}>
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        Voir les réservations
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleToggleStatus(parent.id)}
                                                    className="text-orange-600"
                                                >
                                                    Suspendre/Activer
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(parent.id)}
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
                        {parents.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-muted-foreground">
                                    Affichage de {parents.from} à {parents.to} sur {parents.total} résultats
                                </p>
                                <div className="flex space-x-2">
                                    {parents.links.map((link: { active: boolean; url: string | null; label: string }, index: number) => (
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
