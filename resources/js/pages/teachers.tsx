import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Search, Filter, MapPin, Star, Clock, BookOpen, ChevronDown, Award, Shield, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageProps } from '@/types';
import PublicLayout from '@/layouts/public-layout';

type Subject = {
    id: number;
    name: string;
    slug: string;
    category: string;
};

type TeacherProfile = {
    bio: string;
    hourly_rate: number;
    rating: number;
    total_reviews: number;
    total_hours: number;
    is_verified: boolean;
    created_at?: string;
};

type Teacher = {
    id: number;
    name: string;
    city: string;
    avatar?: string;
    teacherProfile?: TeacherProfile;
    subjects?: Subject[];
};

interface TeachersProps extends PageProps {
    teachers?: Teacher[];
    subjects?: Subject[];
    filters?: {
        search?: string;
        subject?: string;
        city?: string;
        min_rate?: number;
        max_rate?: number;
        min_rating?: number;
        sort?: string;
    };
}

export default function Teachers({ auth, teachers, subjects, filters }: TeachersProps) {
    const defaultFilters = {
        search: '',
        subject: '',
        city: '',
        min_rate: 0,
        max_rate: 20000,
        min_rating: 0,
        sort: 'rating'
    };

    const [searchTerm, setSearchTerm] = useState(filters?.search || defaultFilters.search);
    const [selectedSubject, setSelectedSubject] = useState(filters?.subject || defaultFilters.subject);
    const [selectedCity, setSelectedCity] = useState(filters?.city || defaultFilters.city);
    const [priceRange, setPriceRange] = useState([
        filters?.min_rate ?? defaultFilters.min_rate,
        filters?.max_rate ?? defaultFilters.max_rate
    ]);
    const [minRating, setMinRating] = useState(filters?.min_rating ?? defaultFilters.min_rating);
    const [sortBy, setSortBy] = useState(filters?.sort || defaultFilters.sort);
    const [showFilters, setShowFilters] = useState(false);

    const cities = [...new Set((teachers || []).map(t => t.city))].sort();
    
    const sortOptions = [
        { value: 'rating', label: 'Mieux notés' },
        { value: 'price_asc', label: 'Prix croissant' },
        { value: 'price_desc', label: 'Prix décroissant' },
        { value: 'experience', label: 'Plus expérimentés' },
        { value: 'reviews', label: 'Plus d\'avis' },
    ];

    const calculateExperience = (createdAt?: string) => {
        if (!createdAt) return 0;
        const created = new Date(createdAt);
        const now = new Date();
        return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 365));
    };

    const quickStats = [
        { icon: Award, label: 'Professeurs vérifiés', value: (teachers || []).filter(t => t.teacherProfile?.is_verified).length },
        { icon: TrendingUp, label: 'Moy. expérience', value: '3+ ans' },
        { icon: Star, label: 'Note moyenne', value: '4.8/5' },
        { icon: BookOpen, label: 'Matières', value: (subjects || []).length },
    ];

    const filteredTeachers = (teachers || []).filter(teacher => {
        // Ne pas filtrer les professeurs sans teacherProfile ou subjects
        // Mais afficher un avertissement dans la console
        if (!teacher.teacherProfile) {
            // Au lieu de retourner false, on continue avec des valeurs par défaut
            teacher.teacherProfile = {
                bio: "Profil en cours de complétion",
                hourly_rate: 5000,
                rating: 4.0,
                total_reviews: 0,
                total_hours: 0,
                is_verified: false,
                created_at: undefined // Pas de date de création par défaut
            };
        }

        if (!teacher.subjects) {
            // Au lieu de retourner false, on continue avec un tableau vide
            teacher.subjects = [];
        }

        const matchesSearch = !searchTerm || 
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (teacher.teacherProfile.bio && teacher.teacherProfile.bio.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesSubject = !selectedSubject || 
            (teacher.subjects.length > 0 && teacher.subjects.some(s => s.slug === selectedSubject));
        
        const matchesCity = !selectedCity || teacher.city === selectedCity;
        
        const matchesPrice = teacher.teacherProfile.hourly_rate >= priceRange[0] && 
            teacher.teacherProfile.hourly_rate <= priceRange[1];
        
        const matchesRating = teacher.teacherProfile.rating >= minRating;

        return matchesSearch && matchesSubject && matchesCity && matchesPrice && matchesRating;
    }).sort((a, b) => {
        if (!a.teacherProfile || !b.teacherProfile) return 0;

        switch(sortBy) {
            case 'price_asc':
                return a.teacherProfile.hourly_rate - b.teacherProfile.hourly_rate;
            case 'price_desc':
                return b.teacherProfile.hourly_rate - a.teacherProfile.hourly_rate;
            case 'experience':
                return calculateExperience(b.teacherProfile.created_at) - calculateExperience(a.teacherProfile.created_at);
            case 'reviews':
                return b.teacherProfile.total_reviews - a.teacherProfile.total_reviews;
            case 'rating':
            default:
                return b.teacherProfile.rating - a.teacherProfile.rating;
        }
    });

    const breadcrumbs = [
        { href: '/', title: 'Accueil' },
        { href: '/teachers', title: 'Professeurs' },
    ];

    return (
        <PublicLayout 
            auth={auth} 
            title="Nos Professeurs" 
            description="Découvrez notre communauté de professeurs qualifiés et trouvez celui qui correspond parfaitement aux besoins de votre enfant."
            breadcrumbs={breadcrumbs}
        >
            {/* Hero Section Amélioré */}
            <section className="py-16 bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--accent-50)] relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--primary-200)]/20 to-[var(--accent-200)]/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[var(--secondary-200)]/20 to-[var(--primary-200)]/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 fadeInUp">
                            <Badge variant="secondary" className="mb-4 bg-[var(--primary-100)] text-[var(--primary-700)] border-0">
                                🎓 {(teachers || []).length} professeurs qualifiés
                            </Badge>
                            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                                Trouvez votre 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)]"> professeur idéal</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-600 mb-8">
                                Parcourez notre sélection de professeurs experts, tous vérifiés et évalués par notre communauté
                            </p>
                        </div>
                        
                        {/* Search Bar Améliorée */}
                        <div className="max-w-2xl mx-auto mb-8 fadeInUp" style={{ animationDelay: '0.1s' }}>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Rechercher par nom, matière ou spécialité..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 pr-4 py-4 text-lg border-2 border-[var(--primary-200)] focus:border-[var(--primary-500)] rounded-xl shadow-lg"
                                />
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fadeInUp" style={{ animationDelay: '0.2s' }}>
                            {quickStats.map((stat, index) => (
                                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                                    <div className="flex items-center justify-center mb-2">
                                        <stat.icon className="h-6 w-6 text-[var(--primary-600)]" />
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters Améliorés */}
            <section className="py-6 border-b bg-white/80 backdrop-blur-sm sticky top-16 z-40 shadow-sm">
                <div className="container px-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex flex-wrap gap-3 items-center">
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:hidden border-[var(--primary-200)] text-[var(--primary-700)] hover:bg-[var(--primary-50)]"
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Filtres
                                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                            </Button>
                            
                            <div className={`flex flex-wrap gap-3 ${showFilters ? 'block' : 'hidden md:flex'}`}>
                                {/* Subject Filter */}
                                <select
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    className="px-3 py-2 border-2 border-[var(--primary-200)] rounded-lg text-sm focus:border-[var(--primary-500)] focus:outline-none"
                                >
                                    <option value="">Toutes les matières</option>
                                    {(subjects || []).map(subject => (
                                        <option key={subject.id} value={subject.slug}>
                                            {subject.name}
                                        </option>
                                    ))}
                                </select>

                                {/* City Filter */}
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="px-3 py-2 border-2 border-[var(--primary-200)] rounded-lg text-sm focus:border-[var(--primary-500)] focus:outline-none"
                                >
                                    <option value="">Toutes les villes</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>

                                {/* Rating Filter */}
                                <select
                                    value={minRating}
                                    onChange={(e) => setMinRating(Number(e.target.value))}
                                    className="px-3 py-2 border-2 border-[var(--primary-200)] rounded-lg text-sm focus:border-[var(--primary-500)] focus:outline-none"
                                >
                                    <option value={0}>Toutes les notes</option>
                                    <option value={4}>4+ étoiles</option>
                                    <option value={4.5}>4.5+ étoiles</option>
                                    <option value={4.8}>4.8+ étoiles</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="bg-[var(--accent-100)] text-[var(--accent-700)] border-0">
                                {filteredTeachers.length} professeur{filteredTeachers.length > 1 ? 's' : ''}
                            </Badge>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border-2 border-[var(--primary-200)] rounded-lg text-sm focus:border-[var(--primary-500)] focus:outline-none"
                            >
                                {sortOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Teachers Grid Améliorée */}
            <section className="py-12 bg-gradient-to-b from-white to-gray-50">
                <div className="container px-4">
                    {filteredTeachers.length === 0 ? (
                        <div className="text-center py-16 fadeInUp">
                            <div className="max-w-md mx-auto">
                                <div className="w-24 h-24 bg-[var(--primary-100)] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BookOpen className="h-12 w-12 text-[var(--primary-600)]" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Aucun professeur trouvé
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Essayez de modifier vos critères de recherche ou explorez d'autres options
                                </p>
                                <Button 
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedSubject('');
                                        setSelectedCity('');
                                        setMinRating(0);
                                        setPriceRange([0, 20000]);
                                    }}
                                    className="btn-primary"
                                >
                                    Réinitialiser les filtres
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredTeachers.map((teacher, index) => (
                                <Link key={teacher.id} href={`/teachers/${teacher.id}`}>
                                    <Card className="hover-lift cursor-pointer border-0 shadow-lg bg-white fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center space-x-3 mb-4">
                                                <div className="relative">
                                                    <div className="h-16 w-16 bg-gradient-to-br from-[var(--primary-100)] to-[var(--accent-100)] rounded-full flex items-center justify-center overflow-hidden">
                                                        {teacher.avatar ? (
                                                            <img 
                                                                src={teacher.avatar} 
                                                                alt={teacher.name}
                                                                className="h-16 w-16 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-xl font-bold text-[var(--primary-700)]">
                                                                {teacher.name.charAt(0)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {teacher.teacherProfile?.is_verified && (
                                                        <div className="absolute -bottom-1 -right-1 bg-[var(--success-500)] text-white p-1 rounded-full">
                                                            <Shield className="h-3 w-3" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <CardTitle className="text-lg">{teacher.name}</CardTitle>
                                                        {teacher.teacherProfile?.is_verified && (
                                                            <Badge variant="secondary" className="text-xs bg-[var(--success-100)] text-[var(--success-700)] border-0">
                                                                Vérifié
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600 mb-1">
                                                        <MapPin className="h-3 w-3 mr-1" />
                                                        {teacher.city}
                                                    </div>
                                                    <div className="text-xs text-[var(--accent-600)]">
                                                        {calculateExperience(teacher.teacherProfile?.created_at) || 'Nouveau'} {calculateExperience(teacher.teacherProfile?.created_at) ? 'ans d\'expérience' : 'professeur'}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-sm font-medium">
                                                        {teacher.teacherProfile?.rating.toFixed(1)}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        ({teacher.teacherProfile?.total_reviews})
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {teacher.teacherProfile?.total_hours}h
                                                </div>
                                            </div>
                                        </CardHeader>
                                        
                                        <CardContent className="pt-0">
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                {teacher.teacherProfile?.bio}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {teacher.subjects?.slice(0, 3).map((subject) => (
                                                    <Badge key={subject.id} variant="secondary" className="text-xs bg-[var(--primary-50)] text-[var(--primary-700)] border-0">
                                                        {subject.name}
                                                    </Badge>
                                                ))}
                                                {(teacher.subjects?.length || 0) > 3 && (
                                                    <Badge variant="secondary" className="text-xs bg-[var(--accent-50)] text-[var(--accent-700)] border-0">
                                                        +{(teacher.subjects?.length || 0) - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-[var(--primary-600)]">
                                                        {teacher.teacherProfile?.hourly_rate.toLocaleString()} GNF
                                                    </div>
                                                    <div className="text-xs text-gray-500">par heure</div>
                                                </div>
                                                <Button size="sm" className="btn-primary">
                                                    Voir profil
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-[var(--primary-600)] to-[var(--secondary-600)] relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                <div className="container px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center fadeInUp">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            Vous êtes professeur ?
                        </h2>
                        <p className="text-lg text-white/90 mb-8">
                            Rejoignez notre communauté d'enseignants et partagez votre passion tout en générant des revenus.
                        </p>
                        <Link href="/become-teacher">
                            <Button size="lg" variant="secondary" className="bg-white text-[var(--primary-700)] hover:bg-gray-100">
                                Devenir professeur
                                <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
} 