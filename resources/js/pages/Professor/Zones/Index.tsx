import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { 
    MapPin, 
    Plus,
    Trash2,
    ArrowLeft
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { City, PagePropsWithData } from '@/types/global';
import AppLayout from '@/layouts/app-layout';

interface Props extends PagePropsWithData {
    user_cities: City[];
    available_cities: City[];
}

export default function ProfessorZones({ user_cities, available_cities, errors }: Props) {
    const { delete: destroy, processing } = useForm();

    const handleAddCity = (cityId: number) => {
        router.post(route('professor.zones.store'), {
            city_id: cityId,
        });
    };

    const handleRemoveCity = (cityId: number) => {
        destroy(route('professor.zones.destroy', cityId));
    };

    return (
        <AppLayout>
            <Head title="Mes Zones - Professeur" />
            
            <div className="space-y-6">
                {/* Affichage des erreurs */}
                {errors && Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <h3 className="text-sm font-medium text-red-800 mb-2">Erreurs de validation :</h3>
                        <ul className="text-sm text-red-700 space-y-1">
                            {Object.entries(errors).map(([field, message]) => (
                                <li key={field}>• {message}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('professor.dashboard')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Mes Zones</h1>
                            <p className="text-muted-foreground">
                                Gérez les villes où vous donnez des cours
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Villes actuelles */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Mes villes actuelles
                            </CardTitle>
                            <CardDescription>
                                Les villes où vous donnez des cours actuellement
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user_cities.length > 0 ? (
                                <div className="space-y-3">
                                    {user_cities.map((city) => (
                                        <div key={city.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <MapPin className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{city.name}</p>
                                                    {city.code && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {city.code}
                                                        </Badge>
                                                    )}
                                                    {city.description && (
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {city.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveCity(city.id)}
                                                disabled={processing}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        Aucune ville ajoutée
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Ajoutez des villes pour définir votre zone d'intervention
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Villes disponibles */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                Villes disponibles
                            </CardTitle>
                            <CardDescription>
                                Ajoutez de nouvelles villes à votre zone d'intervention
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {available_cities.length > 0 ? (
                                <div className="space-y-3">
                                    {available_cities.map((city) => (
                                        <div key={city.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                                    <MapPin className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{city.name}</p>
                                                    {city.code && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {city.code}
                                                        </Badge>
                                                    )}
                                                    {city.description && (
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {city.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleAddCity(city.id)}
                                                disabled={processing}
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Ajouter
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        Toutes les villes sont déjà ajoutées
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Statistiques */}
                <Card>
                    <CardHeader>
                        <CardTitle>Statistiques</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">{user_cities.length}</p>
                                <p className="text-sm text-muted-foreground">Villes couvertes</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">{available_cities.length}</p>
                                <p className="text-sm text-muted-foreground">Villes disponibles</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">
                                    {user_cities.length + available_cities.length}
                                </p>
                                <p className="text-sm text-muted-foreground">Total des villes</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
