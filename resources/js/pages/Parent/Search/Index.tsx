import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { type ProfessorSearchResult, type ProfessorSearchFilters, type Subject, type Level, type City } from '@/types/global';
import { Head, router } from '@inertiajs/react';
import { 
    Search, 
    Filter, 
    Star, 
    MapPin, 
    BookOpen,
    CheckCircle,
    Award,
    Languages
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    searchResult: ProfessorSearchResult;
    subjects: Subject[];
    levels: Level[];
    cities: City[];
}

export default function ProfessorSearch({ searchResult, subjects, levels, cities }: Props) {
    const [filters, setFilters] = useState<ProfessorSearchFilters>(searchResult.filters);
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'GNF'
        }).format(amount);
    };

    const handleFilterChange = (key: keyof ProfessorSearchFilters, value: unknown) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        
        // Mise à jour de l'URL avec les nouveaux filtres
        router.get(route('parent.search.professors'), newFilters, {
            preserveState: true,
            replace: true
        });
    };

    const handleSearch = () => {
        router.get(route('parent.search.professors'), { 
            ...filters, 
            search: searchQuery 
        }, {
            preserveState: true,
            replace: true
        });
    };

    const clearFilters = () => {
        const clearedFilters: ProfessorSearchFilters = {};
        setFilters(clearedFilters);
        router.get(route('parent.search.professors'), {}, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <AppLayout>
            <Head title="Rechercher un Professeur" />
            
            <div className="container py-8">
                {/* En-tête */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Rechercher un Professeur</h1>
                    <p className="text-gray-600 mt-2">Trouvez le professeur idéal pour votre enfant</p>
                </div>

                {/* Barre de recherche */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Rechercher par nom, matière, spécialité..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <Button onClick={handleSearch}>
                                <Search className="h-4 w-4 mr-2" />
                                Rechercher
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Filtres
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Filtres */}
                {showFilters && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Filtres avancés</span>
                                <Button variant="outline" size="sm" onClick={clearFilters}>
                                    Effacer les filtres
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Matières */}
                                <div>
                                    <Label>Matières</Label>
                                    <Select 
                                        value={filters.subjects?.join(',') || ''} 
                                        onValueChange={(value) => handleFilterChange('subjects', value ? value.split(',').map(Number) : undefined)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Toutes les matières" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjects.map((subject) => (
                                                <SelectItem key={subject.id} value={subject.id.toString()}>
                                                    {subject.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Niveaux */}
                                <div>
                                    <Label>Niveaux</Label>
                                    <Select 
                                        value={filters.levels?.join(',') || ''} 
                                        onValueChange={(value) => handleFilterChange('levels', value ? value.split(',').map(Number) : undefined)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Tous les niveaux" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {levels.map((level) => (
                                                <SelectItem key={level.id} value={level.id.toString()}>
                                                    {level.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Villes */}
                                <div>
                                    <Label>Villes</Label>
                                    <Select 
                                        value={filters.cities?.join(',') || ''} 
                                        onValueChange={(value) => handleFilterChange('cities', value ? value.split(',').map(Number) : undefined)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Toutes les villes" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cities.map((city) => (
                                                <SelectItem key={city.id} value={city.id.toString()}>
                                                    {city.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Note minimum */}
                                <div>
                                    <Label>Note minimum</Label>
                                    <Select 
                                        value={filters.rating_min?.toString() || ''} 
                                        onValueChange={(value) => handleFilterChange('rating_min', value ? Number(value) : undefined)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Toutes les notes" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="4">4+ étoiles</SelectItem>
                                            <SelectItem value="4.5">4.5+ étoiles</SelectItem>
                                            <SelectItem value="5">5 étoiles</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Prix */}
                                <div>
                                    <Label>Prix maximum par heure</Label>
                                    <Input
                                        type="number"
                                        placeholder="Prix max"
                                        value={filters.price_max || ''}
                                        onChange={(e) => handleFilterChange('price_max', e.target.value ? Number(e.target.value) : undefined)}
                                    />
                                </div>

                                {/* Professeurs vérifiés */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id="verified_only"
                                        checked={filters.verified_only || false}
                                        onCheckedChange={(checked) => handleFilterChange('verified_only', checked)}
                                    />
                                    <Label htmlFor="verified_only">Professeurs vérifiés uniquement</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Résultats */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">
                            {searchResult.total} professeur{searchResult.total > 1 ? 's' : ''} trouvé{searchResult.total > 1 ? 's' : ''}
                        </p>
                        <div className="flex items-center gap-2">
                            <Label>Trier par:</Label>
                            <Select>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Pertinence" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="relevance">Pertinence</SelectItem>
                                    <SelectItem value="rating">Note</SelectItem>
                                    <SelectItem value="price_low">Prix croissant</SelectItem>
                                    <SelectItem value="price_high">Prix décroissant</SelectItem>
                                    <SelectItem value="experience">Expérience</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Liste des professeurs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResult.professors.map((professor) => (
                        <Card key={professor.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            {professor.avatar ? (
                                                <img src={professor.avatar} alt={professor.name} className="w-10 h-10 rounded-full" />
                                            ) : (
                                                <span className="text-blue-600 font-medium text-lg">
                                                    {professor.name.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{professor.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                    <span className="text-sm font-medium">{professor.rating || 0}</span>
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    ({professor.total_reviews || 0} avis)
                                                </span>
                                                {professor.is_verified && (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {/* Bio */}
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {professor.bio}
                                    </p>

                                    {/* Spécialités */}
                                    <div>
                                        <p className="text-sm font-medium mb-2">Spécialités:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {professor.subjects?.slice(0, 3).map((subject) => (
                                                <Badge key={subject.id} variant="secondary" className="text-xs">
                                                    {subject.name}
                                                </Badge>
                                            ))}
                                            {professor.subjects && professor.subjects.length > 3 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{professor.subjects.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Informations */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="h-4 w-4" />
                                            <span>{professor.cities?.map(c => c.name).join(', ') || 'Non spécifié'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Award className="h-4 w-4" />
                                            <span>{professor.experience_years || 0} ans d'expérience</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Languages className="h-4 w-4" />
                                            <span>{professor.languages?.join(', ') || 'Non spécifié'}</span>
                                        </div>
                                    </div>

                                    {/* Prix et disponibilité */}
                                    <div className="flex items-center justify-between pt-3 border-t">
                                        <div>
                                            <p className="text-lg font-bold text-green-600">
                                                {formatCurrency(professor.hourly_rate || 0)}
                                            </p>
                                            <p className="text-xs text-gray-600">par heure</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => router.get(route('parent.professors.show', professor.id))}
                                            >
                                                <BookOpen className="h-4 w-4 mr-1" />
                                                Voir profil
                                            </Button>
                                            <Button 
                                                size="sm"
                                                onClick={() => router.get(route('parent.booking.create', { professor_id: professor.id }))}
                                            >
                                                Réserver
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                {searchResult.last_page > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="outline" 
                                disabled={searchResult.current_page === 1}
                                onClick={() => router.get(route('parent.search.professors'), { 
                                    ...filters, 
                                    page: searchResult.current_page - 1 
                                })}
                            >
                                Précédent
                            </Button>
                            
                            <span className="px-4 py-2 text-sm">
                                Page {searchResult.current_page} sur {searchResult.last_page}
                            </span>
                            
                            <Button 
                                variant="outline" 
                                disabled={searchResult.current_page === searchResult.last_page}
                                onClick={() => router.get(route('parent.search.professors'), { 
                                    ...filters, 
                                    page: searchResult.current_page + 1 
                                })}
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
