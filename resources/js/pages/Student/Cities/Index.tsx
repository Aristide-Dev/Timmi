import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, X, Check } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    student_cities: Array<{
        id: number;
        name: string;
    }>;
}

interface City {
    id: number;
    name: string;
    slug: string;
    description?: string;
    code?: string;
}

interface CitiesProps {
    user: User;
    cities: City[];
}

export default function StudentCities({ user, cities }: CitiesProps) {
    const [selectedCities, setSelectedCities] = useState<number[]>(
        user.student_cities.map(c => c.id)
    );

    const handleToggleCity = (cityId: number) => {
        if (selectedCities.includes(cityId)) {
            // Supprimer la ville
            router.delete(route('student.cities.destroy', cityId), {
                onSuccess: () => {
                    setSelectedCities(prev => prev.filter(id => id !== cityId));
                }
            });
        } else {
            // Ajouter la ville
            router.post(route('student.cities.store'), {
                city_id: cityId
            }, {
                onSuccess: () => {
                    setSelectedCities(prev => [...prev, cityId]);
                }
            });
        }
    };

    const isSelected = (cityId: number) => selectedCities.includes(cityId);

    return (
        <AppLayout>
            <Head title="Mes villes - Étudiant" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mes villes</h1>
                        <p className="text-muted-foreground">
                            Gérez vos zones géographiques préférées
                        </p>
                    </div>
                </div>

                {/* Villes sélectionnées */}
                {user.student_cities.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Villes sélectionnées</CardTitle>
                            <CardDescription>
                                Les villes où vous souhaitez prendre des cours
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {user.student_cities.map((city) => (
                                    <Badge key={city.id} variant="secondary" className="text-sm">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {city.name}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-4 w-4 p-0 ml-2 hover:bg-destructive hover:text-destructive-foreground"
                                            onClick={() => handleToggleCity(city.id)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Toutes les villes disponibles */}
                <Card>
                    <CardHeader>
                        <CardTitle>Toutes les villes</CardTitle>
                        <CardDescription>
                            Cliquez sur une ville pour l'ajouter ou la retirer de vos préférences
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {cities.map((city) => (
                                <div
                                    key={city.id}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                        isSelected(city.id)
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50'
                                    }`}
                                    onClick={() => handleToggleCity(city.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                isSelected(city.id)
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted text-muted-foreground'
                                            }`}>
                                                <MapPin className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{city.name}</h3>
                                                {city.description && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {city.description}
                                                    </p>
                                                )}
                                                {city.code && (
                                                    <p className="text-xs text-muted-foreground">
                                                        Code: {city.code}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {isSelected(city.id) ? (
                                                <Check className="h-5 w-5 text-primary" />
                                            ) : (
                                                <Plus className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Message si aucune ville sélectionnée */}
                {user.student_cities.length === 0 && (
                    <Card>
                        <CardContent className="text-center py-12">
                            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Aucune ville sélectionnée</h3>
                            <p className="text-muted-foreground mb-4">
                                Sélectionnez vos villes préférées pour trouver des professeurs près de chez vous.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
