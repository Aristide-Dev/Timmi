import { Head, Link } from '@inertiajs/react';
import { Building, MapPin, Home, Edit, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface City {
    id: number;
    name: string;
    code: string;
    is_active: boolean;
    communes_count: number;
    neighborhoods_count: number;
}

interface Props {
    cities: City[];
}

export default function LocationsIndex({ cities }: Props) {
    return (
        <AppLayout>
            <Head title="Gestion des Localités" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Localités</h1>
                        <p className="text-muted-foreground">
                            Gérez les villes, communes et quartiers de votre plateforme
                        </p>
                    </div>
                </div>

                {/* Statistiques */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Villes</CardTitle>
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{cities.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Villes actives sur la plateforme
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Communes</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {cities.reduce((sum, city) => sum + city.communes_count, 0)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Communes réparties par ville
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Quartiers</CardTitle>
                            <Home className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {cities.reduce((sum, city) => sum + city.neighborhoods_count, 0)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Quartiers disponibles
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Actions rapides */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Link href={route('admin.locations.cities')}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5" />
                                    Gérer les Villes
                                </CardTitle>
                                <CardDescription>
                                    Ajouter, modifier ou supprimer des villes
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>

                    <Link href={route('admin.locations.communes')}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Gérer les Communes
                                </CardTitle>
                                <CardDescription>
                                    Gérer les communes par ville
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>

                    <Link href={route('admin.locations.neighborhoods')}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Home className="h-5 w-5" />
                                    Gérer les Quartiers
                                </CardTitle>
                                <CardDescription>
                                    Gérer les quartiers par commune
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>

                {/* Tableau des villes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Villes et leurs statistiques</CardTitle>
                        <CardDescription>
                            Vue d'ensemble de toutes les villes avec leurs communes et quartiers
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ville</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Communes</TableHead>
                                    <TableHead>Quartiers</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cities.map((city) => (
                                    <TableRow key={city.id}>
                                        <TableCell className="font-medium">{city.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{city.code}</Badge>
                                        </TableCell>
                                        <TableCell>{city.communes_count}</TableCell>
                                        <TableCell>{city.neighborhoods_count}</TableCell>
                                        <TableCell>
                                            <Badge variant={city.is_active ? "default" : "destructive"}>
                                                {city.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Link href={route('admin.locations.cities')}>
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('admin.locations.cities')}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
