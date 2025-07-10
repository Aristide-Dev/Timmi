import { Link } from '@inertiajs/react';
import { Star, Users, Shield, Clock, MapPin, ChevronRight, Award, TrendingUp, BookOpen, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageProps } from '@/types';
import PublicLayout from '@/layouts/public-layout';

type Subject = {
    id: number;
    name: string;
    slug: string;
    category: string;
    icon: string;
};

type TeacherProfile = {
    bio: string;
    hourly_rate: number;
    rating: number;
    total_reviews: number;
    total_hours: number;
};

type Teacher = {
    id: number;
    name: string;
    city: string;
    teacherProfile: TeacherProfile;
    subjects: Subject[];
};

interface WelcomeProps extends PageProps {
    subjects: Subject[];
    featuredTeachers: Teacher[];
}

export default function Welcome({ auth, subjects, featuredTeachers }: WelcomeProps) {
    const features = [
        {
            icon: Users,
            title: 'Professeurs Qualifiés',
            description: 'Tous nos professeurs sont vérifiés et évalués par les parents.',
            color: 'bg-[var(--primary-50)] text-[var(--primary-700)]',
        },
        {
            icon: Shield,
            title: 'Paiement Sécurisé',
            description: 'Payez en toute sécurité avec Orange Money ou carte bancaire.',
            color: 'bg-[var(--success-50)] text-[var(--success-700)]',
        },
        {
            icon: Clock,
            title: 'Réservation Facile',
            description: 'Réservez vos cours en quelques clics selon vos disponibilités.',
            color: 'bg-[var(--accent-50)] text-[var(--accent-700)]',
        },
        {
            icon: MapPin,
            title: 'Près de Chez Vous',
            description: 'Trouvez des professeurs dans votre quartier ou optez pour les cours en ligne.',
            color: 'bg-[var(--secondary-50)] text-[var(--secondary-700)]',
        },
    ];

    const stats = [
        { value: '2500+', label: 'Élèves satisfaits', icon: TrendingUp },
        { value: '350+', label: 'Professeurs experts', icon: Award },
        { value: '15+', label: 'Matières enseignées', icon: BookOpen },
        { value: '98%', label: 'Satisfaction garantie', icon: Star },
    ];

    const testimonials = [
        {
            name: 'Aminata Diallo',
            role: 'Mère de famille',
            content: 'Timmi a transformé l\'éducation de mon fils. Les professeurs sont exceptionnels et très pédagogues.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
        },
        {
            name: 'Ibrahim Koné',
            role: 'Parent d\'élève',
            content: 'Interface simple, professeurs qualifiés, résultats garantis. Je recommande vivement Timmi !',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        {
            name: 'Fatoumata Traoré',
            role: 'Maman de 3 enfants',
            content: 'Mes enfants adorent leurs cours avec Timmi. Leurs notes se sont considérablement améliorées.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
        },
    ];

    const categories = {
        'Sciences': ['bg-blue-50', 'text-blue-700', 'border-blue-200'],
        'Langues': ['bg-green-50', 'text-green-700', 'border-green-200'],
        'Sciences humaines': ['bg-purple-50', 'text-purple-700', 'border-purple-200'],
        'Autres': ['bg-orange-50', 'text-orange-700', 'border-orange-200'],
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${
                    i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
            />
        ));
    };

    return (
        <PublicLayout auth={auth} title="Accueil">
            
            {/* Hero Section Amélioré */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--accent-50)]">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--primary-200)]/30 to-[var(--accent-200)]/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[var(--secondary-200)]/30 to-[var(--primary-200)]/30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container px-4 py-24 mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="fadeInUp">
                            <Badge variant="secondary" className="mb-6 bg-[var(--primary-100)] text-[var(--primary-700)] border-0">
                                🚀 Plateforme N°1 en Guinée
                            </Badge>
                            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                                Trouvez le 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)]"> professeur idéal </span>
                                pour votre enfant
                        </h1>
                            <p className="text-lg lg:text-xl leading-8 text-gray-600 mb-8">
                            Timmi connecte les parents avec des professeurs qualifiés pour des cours particuliers à domicile ou en ligne. 
                            Simple, sécurisé et efficace.
                        </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            {auth.user ? (
                                auth.user.role === 'parent' ? (
                                    <Link href={route('parent.search')}>
                                            <Button size="lg" className="btn-primary">
                                            Chercher un professeur
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={route('dashboard')}>
                                            <Button size="lg" className="btn-primary">
                                                Tableau de bord
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                )
                            ) : (
                                <>
                                    <Link href={route('register')}>
                                            <Button size="lg" className="btn-primary">
                                            Commencer maintenant
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                        <Link href={route('login')}>
                                            <Button size="lg" variant="outline" className="border-[var(--primary-200)] text-[var(--primary-700)] hover:bg-[var(--primary-50)]">
                                                Se connecter
                                            </Button>
                                    </Link>
                                </>
                            )}
                            </div>
                            
                            {/* Stats Mini */}
                            <div className="grid grid-cols-3 gap-4">
                                {stats.slice(0, 3).map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl font-bold text-[var(--primary-700)]">{stat.value}</div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <div className="relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                                    alt="Élèves en cours" 
                                    className="rounded-2xl shadow-2xl w-full h-auto"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {renderStars(5)}
                                        </div>
                                        <span className="text-sm font-medium">4.9/5 (2,500+ avis)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary-50)] text-[var(--primary-600)] mb-4`}>
                                    <stat.icon className="h-8 w-8" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Améliorées */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--accent-100)] text-[var(--accent-700)] border-0">
                            ✨ Pourquoi nous choisir
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Votre succès, notre priorité</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez les avantages qui font de Timmi la plateforme de référence pour l'éducation personnalisée.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="text-center hover-lift fadeInUp border-0 shadow-lg" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardHeader className="pb-3">
                                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color} mb-4`}>
                                        <feature.icon className="h-8 w-8" />
                                </div>
                                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                                    <CardDescription className="text-sm">{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subjects Améliorées */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Toutes les matières à votre portée</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Du primaire au supérieur, nos professeurs couvrent un large éventail de disciplines.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {subjects.slice(0, 8).map((subject, index) => {
                            const [bgColor, textColor, borderColor] = categories[subject.category as keyof typeof categories] || categories['Autres'];
                            return (
                                <Link key={subject.id} href={`/teachers?subject=${subject.slug}`}>
                                    <Card className={`cursor-pointer hover-lift transition-all duration-300 ${bgColor} ${borderColor} border-2 fadeInUp`} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <CardHeader className="pb-3">
                                        <CardTitle className={`text-lg ${textColor}`}>{subject.name}</CardTitle>
                                        <Badge variant="secondary" className={`w-fit ${bgColor} ${textColor} border-0`}>
                                            {subject.category}
                                        </Badge>
                                    </CardHeader>
                                </Card>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="text-center fadeInUp">
                        <Link href="/subjects">
                            <Button variant="outline" size="lg" className="border-[var(--primary-200)] text-[var(--primary-700)] hover:bg-[var(--primary-50)]">
                                Voir toutes les matières
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Teachers Améliorée */}
            {featuredTeachers.length > 0 && (
                <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container px-4">
                        <div className="text-center mb-12 fadeInUp">
                            <Badge variant="secondary" className="mb-4 bg-[var(--secondary-100)] text-[var(--secondary-700)] border-0">
                                ⭐ Nos stars
                            </Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nos meilleurs professeurs</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Découvrez les professeurs les mieux notés par notre communauté de parents.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredTeachers.slice(0, 3).map((teacher, index) => (
                                <Link key={teacher.id} href={`/teachers/${teacher.id}`}>
                                    <Card className="hover-lift cursor-pointer border-0 shadow-lg fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <CardHeader>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="h-16 w-16 bg-gradient-to-br from-[var(--primary-100)] to-[var(--accent-100)] rounded-full flex items-center justify-center">
                                                    <span className="text-xl font-bold text-[var(--primary-700)]">
                                                        {teacher.name.charAt(0)}
                                                    </span>
                                                </div>
                                            <div>
                                                <CardTitle className="text-lg">{teacher.name}</CardTitle>
                                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                                        <MapPin className="h-3 w-3" />
                                                        {teacher.city}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium">{teacher.teacherProfile.rating.toFixed(1)}</span>
                                                <span className="text-sm text-muted-foreground">({teacher.teacherProfile.total_reviews})</span>
                                            </div>
                                                <Badge variant="secondary" className="bg-[var(--success-100)] text-[var(--success-700)] border-0">
                                                    {teacher.teacherProfile.total_hours}h données
                                                </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                            {teacher.teacherProfile.bio}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {teacher.subjects.slice(0, 3).map((subject) => (
                                                    <Badge key={subject.id} variant="secondary" className="text-xs">
                                                    {subject.name}
                                                </Badge>
                                            ))}
                                            {teacher.subjects.length > 3 && (
                                                    <Badge variant="secondary" className="text-xs">+{teacher.subjects.length - 3}</Badge>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center">
                                                <span className="text-xl font-bold text-[var(--primary-600)]">
                                                    {teacher.teacherProfile.hourly_rate.toLocaleString()} GNF/h
                                                </span>
                                                <Button size="sm" variant="outline" className="border-[var(--primary-200)] text-[var(--primary-700)]">
                                                    Voir profil
                                                </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-8 fadeInUp">
                            <Link href="/teachers">
                                <Button size="lg" className="btn-primary">
                                    Voir tous les professeurs
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--warning-100)] text-[var(--warning-700)] border-0">
                            💝 Témoignages
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ce que disent nos parents</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Des milliers de familles nous font confiance. Découvrez leurs histoires de réussite.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-0 shadow-lg fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-1 mb-4">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={testimonial.avatar} 
                                            alt={testimonial.name}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900">{testimonial.name}</div>
                                            <div className="text-sm text-gray-600">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section Améliorée */}
            <section className="py-24 bg-gradient-to-br from-[var(--primary-600)] via-[var(--primary-700)] to-[var(--secondary-600)] relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                            </div>

                <div className="container px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center fadeInUp">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                            Transformez l'avenir de votre enfant
                        </h2>
                        <p className="text-lg lg:text-xl text-white/90 mb-8">
                            Rejoignez des milliers de parents qui font confiance à Timmi pour l'éducation de leurs enfants. 
                            L'excellence pédagogique n'attend plus !
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            {!auth.user && (
                                <>
                                    <Link href={route('register')}>
                                        <Button size="lg" variant="secondary" className="bg-white text-[var(--primary-700)] hover:bg-gray-100 px-8">
                                            Créer un compte gratuitement
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href="/how-it-works">
                                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--primary-700)]">
                                            Comment ça marche ?
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="flex items-center justify-center gap-8 text-white/80">
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                <span className="text-sm">100% Sécurisé</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle className="h-5 w-5" />
                                <span className="text-sm">Support 24/7</span>
                        </div>
                            <div className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                <span className="text-sm">Satisfaction Garantie</span>
                        </div>
                        </div>
                    </div>
                </div>
            </section>

        </PublicLayout>
    );
}
