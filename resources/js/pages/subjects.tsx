import { Link } from '@inertiajs/react';
import { Search, BookOpen, Calculator, Globe, Microscope, Palette, Music, TrendingUp, Users, Star, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { PageProps } from '@/types';
import PublicLayout from '@/layouts/public-layout';
import { useState } from 'react';

type Subject = {
    id: number;
    name: string;
    slug: string;
    category: string;
    description?: string;
    teacher_count: number;
    icon?: string;
};

interface SubjectsProps extends PageProps {
    subjects: Subject[];
}

export default function Subjects({ auth, subjects }: SubjectsProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const categoryIcons = {
        'Sciences': Microscope,
        'Mathématiques': Calculator,
        'Langues': Globe,
        'Sciences humaines': BookOpen,
        'Arts': Palette,
        'Musique': Music,
        'Autres': BookOpen,
    };

    const categoryColors = {
        'Sciences': 'bg-[var(--primary-50)] border-[var(--primary-200)] text-[var(--primary-700)]',
        'Mathématiques': 'bg-[var(--secondary-50)] border-[var(--secondary-200)] text-[var(--secondary-700)]',
        'Langues': 'bg-[var(--success-50)] border-[var(--success-200)] text-[var(--success-700)]',
        'Sciences humaines': 'bg-[var(--accent-50)] border-[var(--accent-200)] text-[var(--accent-700)]',
        'Arts': 'bg-[var(--warning-50)] border-[var(--warning-200)] text-[var(--warning-700)]',
        'Musique': 'bg-[var(--info-50)] border-[var(--info-200)] text-[var(--info-700)]',
        'Autres': 'bg-gray-50 border-gray-200 text-gray-700',
    };

    // Filtrer les matières par recherche
    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Grouper par catégorie
    const subjectsByCategory = filteredSubjects.reduce((acc, subject) => {
        if (!acc[subject.category]) {
            acc[subject.category] = [];
        }
        acc[subject.category].push(subject);
        return acc;
    }, {} as Record<string, Subject[]>);

    const quickStats = [
        { icon: BookOpen, label: 'Matières', value: subjects.length, color: 'text-[var(--primary-600)]' },
        { icon: Users, label: 'Professeurs', value: subjects.reduce((sum, subject) => sum + subject.teacher_count, 0), color: 'text-[var(--accent-600)]' },
        { icon: TrendingUp, label: 'Catégories', value: Object.keys(subjectsByCategory).length, color: 'text-[var(--secondary-600)]' },
        { icon: Star, label: 'Satisfaction', value: '4.9/5', color: 'text-yellow-600' },
    ];

    // Statistiques générales
    const categories = Object.keys(subjectsByCategory);

    const popularSubjects = subjects
        .sort((a, b) => b.teacher_count - a.teacher_count)
        .slice(0, 6);

    const breadcrumbs = [
        { href: '/', title: 'Accueil' },
        { href: '/subjects', title: 'Matières' },
    ];

    return (
        <PublicLayout 
            auth={auth} 
            title="Matières Enseignées" 
            description="Découvrez toutes les matières disponibles sur Timmi et trouvez le professeur idéal pour chaque discipline."
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
                                📚 Catalogue complet
                            </Badge>
                            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                                Toutes nos 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)]"> matières</span>
                            </h1>
                            <p className="text-lg lg:text-xl leading-8 text-gray-600 mb-8">
                                Du primaire au supérieur, découvrez notre large catalogue de matières 
                                enseignées par des professeurs qualifiés et passionnés.
                            </p>
                        </div>
                        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fadeInUp" style={{ animationDelay: '0.1s' }}>
                            {quickStats.map((stat, index) => (
                                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                                    <div className="flex items-center justify-center mb-2">
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="max-w-xl mx-auto fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Rechercher une matière ou catégorie..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 pr-4 py-4 text-lg border-2 border-[var(--primary-200)] focus:border-[var(--primary-500)] rounded-xl shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Subjects Section */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--accent-100)] text-[var(--accent-700)] border-0">
                            🔥 Les plus demandées
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Matières populaires</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez les matières qui attirent le plus d'élèves et de professeurs sur notre plateforme.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {popularSubjects.map((subject, index) => {
                            const IconComponent = categoryIcons[subject.category as keyof typeof categoryIcons] || BookOpen;
                            const colorClasses = categoryColors[subject.category as keyof typeof categoryColors] || categoryColors['Autres'];
                            
                            return (
                                <Link 
                                    key={subject.id} 
                                    href={`/teachers?subject=${subject.slug}`}
                                >
                                    <Card className="hover-lift cursor-pointer border-0 shadow-lg bg-white fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <CardHeader>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`p-3 rounded-2xl ${colorClasses}`}>
                                                    <IconComponent className="h-8 w-8" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl">{subject.name}</CardTitle>
                                                    <Badge variant="secondary" className={`mt-1 ${colorClasses} border-0`}>
                                                        {subject.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="text-right">
                                                    <div className="text-3xl font-bold text-[var(--primary-600)]">
                                                        {subject.teacher_count}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        professeur{subject.teacher_count > 1 ? 's' : ''} disponible{subject.teacher_count > 1 ? 's' : ''}
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <TrendingUp className="h-5 w-5 text-[var(--success-600)] mr-1" />
                                                    <span className="text-sm font-medium text-[var(--success-600)]">Populaire</span>
                                                </div>
                                            </div>
                                            {subject.description && (
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {subject.description}
                                                </p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Subjects by Category */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Toutes les matières par catégorie</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Explorez notre catalogue complet organisé par domaines d'expertise.
                        </p>
                    </div>

                    {categories.length === 0 ? (
                        <div className="text-center py-16 fadeInUp">
                            <div className="w-24 h-24 bg-[var(--primary-100)] rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="h-12 w-12 text-[var(--primary-600)]" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-4">
                                Aucune matière trouvée
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Essayez avec un autre terme de recherche
                            </p>
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="btn-primary px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Voir toutes les matières
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {categories.map((category, categoryIndex) => {
                                const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || BookOpen;
                                const colorClasses = categoryColors[category as keyof typeof categoryColors] || categoryColors['Autres'];
                                const categorySubjects = subjectsByCategory[category];
                                
                                return (
                                    <div key={category} className="fadeInUp" style={{ animationDelay: `${categoryIndex * 0.2}s` }}>
                                        {/* Category Header */}
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className={`p-4 rounded-2xl ${colorClasses} shadow-lg`}>
                                                <IconComponent className="h-8 w-8" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{category}</h3>
                                                <p className="text-gray-600 mt-1">
                                                    {categorySubjects.length} matière{categorySubjects.length > 1 ? 's' : ''} • {' '}
                                                    {categorySubjects.reduce((sum, s) => sum + s.teacher_count, 0)} professeur{categorySubjects.reduce((sum, s) => sum + s.teacher_count, 0) > 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Subjects Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {categorySubjects.map((subject, index) => (
                                                <Link 
                                                    key={subject.id} 
                                                    href={`/teachers?subject=${subject.slug}`}
                                                >
                                                    <Card className={`hover-lift cursor-pointer border-2 ${colorClasses} hover:shadow-xl transition-all duration-300 fadeInUp`} style={{ animationDelay: `${(categoryIndex * 0.2) + (index * 0.1)}s` }}>
                                                        <CardHeader className="pb-3">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <CardTitle className="text-lg">{subject.name}</CardTitle>
                                                                <Badge variant="secondary" className={`text-xs ${colorClasses} border-0`}>
                                                                    {subject.teacher_count} prof{subject.teacher_count > 1 ? 's' : ''}
                                                                </Badge>
                                                            </div>
                                                        </CardHeader>
                                                        {subject.description && (
                                                            <CardContent>
                                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                                    {subject.description}
                                                                </p>
                                                            </CardContent>
                                                        )}
                                                    </Card>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Study Tips Section */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--secondary-100)] text-[var(--secondary-700)] border-0">
                            💡 Conseils d'apprentissage
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Maximisez votre réussite</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Nos experts partagent leurs conseils pour optimiser l'apprentissage dans chaque matière.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="border-0 shadow-lg fadeInUp" style={{ animationDelay: '0.1s' }}>
                            <CardHeader>
                                <div className="w-12 h-12 bg-[var(--primary-100)] rounded-xl flex items-center justify-center mb-4">
                                    <BookOpen className="h-6 w-6 text-[var(--primary-600)]" />
                                </div>
                                <CardTitle className="text-xl">Personnalisation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Chaque élève est unique. Nos professeurs adaptent leur méthode d'enseignement 
                                    au style d'apprentissage de votre enfant pour des résultats optimaux.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <CardHeader>
                                <div className="w-12 h-12 bg-[var(--accent-100)] rounded-xl flex items-center justify-center mb-4">
                                    <TrendingUp className="h-6 w-6 text-[var(--accent-600)]" />
                                </div>
                                <CardTitle className="text-xl">Suivi des progrès</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Suivez l'évolution de votre enfant en temps réel grâce à nos outils de suivi 
                                    et aux rapports détaillés de nos professeurs.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg fadeInUp" style={{ animationDelay: '0.3s' }}>
                            <CardHeader>
                                <div className="w-12 h-12 bg-[var(--success-100)] rounded-xl flex items-center justify-center mb-4">
                                    <Award className="h-6 w-6 text-[var(--success-600)]" />
                                </div>
                                <CardTitle className="text-xl">Excellence garantie</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Tous nos professeurs sont sélectionnés et formés selon nos standards 
                                    d'excellence pour garantir la qualité de l'enseignement.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-[var(--primary-600)] to-[var(--secondary-600)] relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center fadeInUp">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                            Vous ne trouvez pas votre matière ?
                        </h2>
                        <p className="text-lg lg:text-xl text-white/90 mb-8">
                            Contactez-nous ! Nous élargissons constamment notre offre de matières 
                            selon les besoins de nos élèves et travaillons avec des professeurs experts dans tous les domaines.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <button className="bg-white text-[var(--primary-700)] hover:bg-gray-100 px-8 py-4 rounded-xl font-medium transition-colors shadow-lg">
                                    Nous contacter
                                </button>
                            </Link>
                            <Link href="/become-teacher">
                                <button className="border-2 border-white text-white hover:bg-white hover:text-[var(--primary-700)] px-8 py-4 rounded-xl font-medium transition-colors">
                                    Enseigner une matière
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
} 