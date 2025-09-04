import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Search, Eye, Edit, Trash2, Plus, MapPin, Users, Building } from 'lucide-react';
import { useState } from 'react';

interface City {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    neighborhoods_count: number;
    professors_count: number;
    created_at: string;
}

interface Neighborhood {
    id: number;
    name: string;
    slug: string;
    city_id: number;
    is_active: boolean;
    professors_count: number;
    created_at: string;
    city: City;
}

interface LocationsIndexProps {
    cities: City[];
    neighborhoods: Neighborhood[];
    filters: {
        search?: string;
        type?: 'cities' | 'neighborhoods';
    };
}

export default function LocationsIndex({ cities, neighborhoods, filters }: LocationsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || 'cities');

    const handleSearch = () => {
        router.get(route('admin.locations.index'), {
            search: search || undefined,
            type: typeFilter,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleToggleStatus = (id: number, type: 'city' | 'neighborhood') => {
        const routeName = type === 'city' ? 'admin.cities.toggle-status' : 'admin.neighborhoods.toggle-status';
        router.post(route(routeName, id), {}, {
            preserveScroll: true,
        });
    };

    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(search.toLowerCase()) ||
        city.slug.toLowerCase().includes(search.toLowerCase())
    );

    const filteredNeighborhoods = neighborhoods.filter(neighborhood =>
        neighborhood.name.toLowerCase().includes(search.toLowerCase()) ||
        neighborhood.slug.toLowerCase().includes(search.toLowerCase()) ||
        neighborhood.city.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Localisations', href: route('admin.locations.index') },
            ]}
        >
            <Head title="Gestion des localisations" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Localisations</h1>
                        <p className="text-muted-foreground">
                            Gérez les villes et quartiers
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.cities.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Nouvelle ville
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('admin.neighborhoods.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Nouveau quartier
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les localisations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                                placeholder="Rechercher..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value as 'cities' | 'neighborhoods')}
                            >
                                <option value="cities">Villes</option>
                                <option value="neighborhoods">Quartiers</option>
                            </select>
                            <Button onClick={handleSearch} className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Cities List */}
                {typeFilter === 'cities' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Villes ({filteredCities.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {filteredCities.map((city) => (
                                    <div
                                        key={city.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                                                <Building className="h-6 w-6 text-blue-500" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <p className="font-medium">{city.name}</p>
                                                    <Badge variant={city.is_active ? "default" : "secondary"}>
                                                        {city.is_active ? 'Actif' : 'Inactif'}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center space-x-1">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{city.neighborhoods_count} quartier(s)</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Users className="h-4 w-4" />
                                                        <span>{city.professors_count} professeur(s)</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Créé le {new Date(city.created_at).toLocaleDateString('fr-FR')}
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
                                                        <Link href={route('admin.cities.show', city.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Voir
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.cities.edit', city.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Modifier
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleToggleStatus(city.id, 'city')}
                                                        className="text-orange-600"
                                                    >
                                                        {city.is_active ? 'Désactiver' : 'Activer'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            if (confirm('Êtes-vous sûr de vouloir supprimer cette ville ?')) {
                                                                router.delete(route('admin.cities.destroy', city.id));
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

                            {filteredCities.length === 0 && (
                                <div className="text-center py-8">
                                    <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">Aucune ville trouvée</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Neighborhoods List */}
                {typeFilter === 'neighborhoods' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Quartiers ({filteredNeighborhoods.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {filteredNeighborhoods.map((neighborhood) => (
                                    <div
                                        key={neighborhood.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                                                <MapPin className="h-6 w-6 text-green-500" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <p className="font-medium">{neighborhood.name}</p>
                                                    <Badge variant={neighborhood.is_active ? "default" : "secondary"}>
                                                        {neighborhood.is_active ? 'Actif' : 'Inactif'}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center space-x-1">
                                                        <Building className="h-4 w-4" />
                                                        <span>{neighborhood.city.name}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Users className="h-4 w-4" />
                                                        <span>{neighborhood.professors_count} professeur(s)</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Créé le {new Date(neighborhood.created_at).toLocaleDateString('fr-FR')}
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
                                                        <Link href={route('admin.neighborhoods.show', neighborhood.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Voir
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.neighborhoods.edit', neighborhood.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Modifier
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleToggleStatus(neighborhood.id, 'neighborhood')}
                                                        className="text-orange-600"
                                                    >
                                                        {neighborhood.is_active ? 'Désactiver' : 'Activer'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            if (confirm('Êtes-vous sûr de vouloir supprimer ce quartier ?')) {
                                                                router.delete(route('admin.neighborhoods.destroy', neighborhood.id));
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

                            {filteredNeighborhoods.length === 0 && (
                                <div className="text-center py-8">
                                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">Aucun quartier trouvé</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
