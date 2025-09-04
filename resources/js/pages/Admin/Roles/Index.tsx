import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Search, Eye, Edit, Trash2, Plus, Shield, Users } from 'lucide-react';
import { useState } from 'react';

interface Role {
    id: number;
    name: string;
    slug: string;
    description?: string;
    permissions: string[];
    users_count: number;
    created_at: string;
}

interface RolesIndexProps {
    roles: Role[];
    filters: {
        search?: string;
    };
}

export default function RolesIndex({ roles, filters }: RolesIndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = () => {
        router.get(route('admin.roles.index'), {
            search: search || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const getRoleBadgeVariant = (slug: string) => {
        switch (slug) {
            case 'super-admin':
                return 'destructive';
            case 'admin':
                return 'default';
            case 'professor':
                return 'secondary';
            case 'parent':
                return 'outline';
            default:
                return 'outline';
        }
    };

    const getRoleLabel = (slug: string) => {
        switch (slug) {
            case 'super-admin':
                return 'Super Admin';
            case 'admin':
                return 'Admin';
            case 'professor':
                return 'Professeur';
            case 'parent':
                return 'Parent';
            default:
                return slug;
        }
    };

    const filteredRoles = roles.filter(role =>
        role.name.toLowerCase().includes(search.toLowerCase()) ||
        role.slug.toLowerCase().includes(search.toLowerCase()) ||
        (role.description && role.description.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Rôles', href: route('admin.roles.index') },
            ]}
        >
            <Head title="Gestion des rôles" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Rôles</h1>
                        <p className="text-muted-foreground">
                            Gérez les rôles et permissions des utilisateurs
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button asChild>
                            <Link href={route('admin.roles.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Nouveau rôle
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les rôles</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-4">
                            <Input
                                placeholder="Rechercher un rôle..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                className="flex-1"
                            />
                            <Button onClick={handleSearch}>
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Roles List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des rôles ({filteredRoles.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredRoles.map((role) => (
                                <div
                                    key={role.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                                            <Shield className="h-6 w-6 text-purple-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium">{role.name}</p>
                                                <Badge variant={getRoleBadgeVariant(role.slug)}>
                                                    {getRoleLabel(role.slug)}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {role.description || 'Aucune description'}
                                            </p>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <Users className="h-4 w-4" />
                                                    <span>{role.users_count} utilisateur(s)</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Shield className="h-4 w-4" />
                                                    <span>{role.permissions.length} permission(s)</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Créé le {new Date(role.created_at).toLocaleDateString('fr-FR')}
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
                                                    <Link href={route('admin.roles.show', role.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Voir
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.roles.edit', role.id)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Modifier
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.roles.permissions', role.id)}>
                                                        <Shield className="mr-2 h-4 w-4" />
                                                        Permissions
                                                    </Link>
                                                </DropdownMenuItem>
                                                {role.slug !== 'super-admin' && (
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            if (confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
                                                                router.delete(route('admin.roles.destroy', role.id));
                                                            }
                                                        }}
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Supprimer
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredRoles.length === 0 && (
                            <div className="text-center py-8">
                                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">Aucun rôle trouvé</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}