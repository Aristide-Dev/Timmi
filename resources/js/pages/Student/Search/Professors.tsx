import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MapPin, Search, Filter, User } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Professor {
    id: number;
    name: string;
    email: string;
    bio?: string;
    hourly_rate: number;
    rating: number;
    total_reviews: number;
    profile_photo?: string;
    subjects: Array<{
        id: number;
        name: string;
    }>;
    levels: Array<{
        id: number;
        name: string;
    }>;
    cities: Array<{
        id: number;
        name: string;
    }>;
}

interface ProfessorsProps {
    professors: {
        data: Professor[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            next_page_url: string | null;
            path: string;
            per_page: number;
            prev_page_url: string | null;
            to: number;
            total: number;
        };
    };
    filters: {
        subject_id?: string;
        level_id?: string;
        city_id?: string;
        min_rating?: string;
        max_hourly_rate?: string;
        search?: string;
        sort_by?: string;
        sort_order?: string;
    };
    subjects: Array<{
        id: number;
        name: string;
    }>;
    levels: Array<{
        id: number;
        name: string;
    }>;
    cities: Array<{
        id: number;
        name: string;
    }>;
}

export default function SearchProfessors({ professors, filters, subjects, levels, cities }: ProfessorsProps) {
    const [searchParams, setSearchParams] = useState(filters);
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = () => {
        router.get(route('student.search.professors'), searchParams, {
            preserveState: true,
            replace: true,
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        setSearchParams(prev => ({
            ...prev,
            [key]: value || undefined,
        }));
    };

    const clearFilters = () => {
        setSearchParams({});
        router.get(route('student.search.professors'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Rechercher un professeur" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Rechercher un professeur</h1>
                        <p className="text-muted-foreground">
                            Trouvez le professeur parfait pour vos besoins
                        </p>
                    </div>
                </div>

                {/* Barre de recherche et filtres */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Recherche et filtres</CardTitle>
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                {showFilters ? 'Masquer' : 'Afficher'} les filtres
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Barre de recherche */}
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Rechercher par nom, spécialisation..."
                                        value={searchParams.search || ''}
                                        onChange={(e) => handleFilterChange('search', e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                                <Button onClick={handleSearch}>
                                    <Search className="h-4 w-4 mr-2" />
                                    Rechercher
                                </Button>
                            </div>

                            {/* Filtres */}
                            {showFilters && (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <div>
                                        <Label htmlFor="subject">Matière</Label>
                                        <Select
                                            value={searchParams.subject_id || ''}
                                            onValueChange={(value) => handleFilterChange('subject_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Toutes les matières" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">Toutes les matières</SelectItem>
                                                {subjects.map((subject) => (
                                                    <SelectItem key={subject.id} value={subject.id.toString()}>
                                                        {subject.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="level">Niveau</Label>
                                        <Select
                                            value={searchParams.level_id || ''}
                                            onValueChange={(value) => handleFilterChange('level_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Tous les niveaux" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">Tous les niveaux</SelectItem>
                                                {levels.map((level) => (
                                                    <SelectItem key={level.id} value={level.id.toString()}>
                                                        {level.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="city">Ville</Label>
                                        <Select
                                            value={searchParams.city_id || ''}
                                            onValueChange={(value) => handleFilterChange('city_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Toutes les villes" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">Toutes les villes</SelectItem>
                                                {cities.map((city) => (
                                                    <SelectItem key={city.id} value={city.id.toString()}>
                                                        {city.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="sort">Trier par</Label>
                                        <Select
                                            value={searchParams.sort_by || 'rating'}
                                            onValueChange={(value) => handleFilterChange('sort_by', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="rating">Note</SelectItem>
                                                <SelectItem value="price">Prix</SelectItem>
                                                <SelectItem value="name">Nom</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button onClick={handleSearch}>
                                    Appliquer les filtres
                                </Button>
                                <Button variant="outline" onClick={clearFilters}>
                                    Effacer
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Résultats */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            {professors.meta?.total || 0} professeur(s) trouvé(s)
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {professors.data?.map((professor) => (
                            <Card key={professor.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg">{professor.name}</CardTitle>
                                            <CardDescription>
                                                {professor.bio?.substring(0, 100)}...
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Note et prix */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium">
                                                    {professor.rating}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    ({professor.total_reviews} avis)
                                                </span>
                                            </div>
                                            <div className="text-lg font-bold">
                                                {professor.hourly_rate}€/h
                                            </div>
                                        </div>

                                        {/* Matières */}
                                        <div>
                                            <p className="text-sm font-medium mb-2">Matières :</p>
                                            <div className="flex flex-wrap gap-1">
                                                {professor.subjects.slice(0, 3).map((subject) => (
                                                    <Badge key={subject.id} variant="secondary">
                                                        {subject.name}
                                                    </Badge>
                                                ))}
                                                {professor.subjects.length > 3 && (
                                                    <Badge variant="outline">
                                                        +{professor.subjects.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {/* Niveaux */}
                                        <div>
                                            <p className="text-sm font-medium mb-2">Niveaux :</p>
                                            <div className="flex flex-wrap gap-1">
                                                {professor.levels.slice(0, 3).map((level) => (
                                                    <Badge key={level.id} variant="outline">
                                                        {level.name}
                                                    </Badge>
                                                ))}
                                                {professor.levels.length > 3 && (
                                                    <Badge variant="outline">
                                                        +{professor.levels.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {/* Villes */}
                                        <div>
                                            <p className="text-sm font-medium mb-2">Zones :</p>
                                            <div className="flex flex-wrap gap-1">
                                                {professor.cities.slice(0, 2).map((city) => (
                                                    <Badge key={city.id} variant="outline">
                                                        <MapPin className="h-3 w-3 mr-1" />
                                                        {city.name}
                                                    </Badge>
                                                ))}
                                                {professor.cities.length > 2 && (
                                                    <Badge variant="outline">
                                                        +{professor.cities.length - 2}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-4">
                                            <Button asChild className="flex-1">
                                                <Link href={route('student.professors.show', professor.id)}>
                                                    Voir le profil
                                                </Link>
                                            </Button>
                                            <Button asChild variant="outline">
                                                <Link href={route('student.booking.create', { professor_id: professor.id })}>
                                                    Réserver
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {professors.links && professors.links.length > 3 && (
                        <div className="flex justify-center">
                            <div className="flex space-x-1">
                                {professors.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        asChild
                                        variant={link.active ? "default" : "outline"}
                                        size="sm"
                                        disabled={!link.url}
                                    >
                                        <Link href={link.url || '#'}>
                                            {link.label}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
