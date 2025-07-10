import { Head, Link } from '@inertiajs/react';
import { BookOpen, Star, Users, Shield, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageProps } from '@/types';

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
        },
        {
            icon: Shield,
            title: 'Paiement Sécurisé',
            description: 'Payez en toute sécurité avec Orange Money ou carte bancaire.',
        },
        {
            icon: Clock,
            title: 'Réservation Facile',
            description: 'Réservez vos cours en quelques clics selon vos disponibilités.',
        },
        {
            icon: MapPin,
            title: 'Près de Chez Vous',
            description: 'Trouvez des professeurs dans votre quartier ou optez pour les cours en ligne.',
        },
    ];

    const categories = {
        'Sciences': ['bg-blue-50', 'text-blue-700', 'border-blue-200'],
        'Langues': ['bg-green-50', 'text-green-700', 'border-green-200'],
        'Sciences humaines': ['bg-purple-50', 'text-purple-700', 'border-purple-200'],
        'Autres': ['bg-orange-50', 'text-orange-700', 'border-orange-200'],
    };

    return (
        <>
            <Head title="Accueil" />
            
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center">
                    <div className="mr-4 flex">
                        <Link href="/" className="mr-4 flex items-center space-x-2">
                            <BookOpen className="h-6 w-6" />
                            <span className="font-bold text-xl">Timmi</span>
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            {auth.user ? (
                                <>
                                    <Link href={route('dashboard')} className="transition-colors hover:text-foreground/80 text-foreground">
                                        Tableau de bord
                                    </Link>
                                    <span className="text-muted-foreground">
                                        {auth.user.name}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')} className="transition-colors hover:text-foreground/80 text-foreground/60">
                                        Se connecter
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button size="sm">S'inscrire</Button>
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-4 py-24 mx-auto relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Trouvez le professeur idéal pour votre enfant
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Timmi connecte les parents avec des professeurs qualifiés pour des cours particuliers à domicile ou en ligne. 
                            Simple, sécurisé et efficace.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {auth.user ? (
                                auth.user.role === 'parent' ? (
                                    <Link href={route('parent.search')}>
                                        <Button size="lg">
                                            Chercher un professeur
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={route('dashboard')}>
                                        <Button size="lg">
                                            Accéder au tableau de bord
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                )
                            ) : (
                                <>
                                    <Link href={route('register')}>
                                        <Button size="lg">
                                            Commencer maintenant
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={route('login')} className="text-sm font-semibold leading-6 text-gray-900">
                                        Se connecter <span aria-hidden="true">→</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-gray-50">
                <div className="container px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir Timmi ?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subjects */}
            <section className="py-16">
                <div className="container px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Matières Disponibles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {subjects.map((subject) => {
                            const [bgColor, textColor, borderColor] = categories[subject.category as keyof typeof categories] || categories['Autres'];
                            return (
                                <Card key={subject.id} className={`cursor-pointer hover:shadow-lg transition-shadow ${bgColor} ${borderColor} border`}>
                                    <CardHeader className="pb-3">
                                        <CardTitle className={`text-lg ${textColor}`}>{subject.name}</CardTitle>
                                        <Badge variant="secondary" className={`w-fit ${bgColor} ${textColor} border-0`}>
                                            {subject.category}
                                        </Badge>
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Teachers */}
            {featuredTeachers.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Nos Meilleurs Professeurs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredTeachers.map((teacher) => (
                                <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">{teacher.name}</CardTitle>
                                                <CardDescription>{teacher.city}</CardDescription>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium">{teacher.teacherProfile.rating.toFixed(1)}</span>
                                                <span className="text-sm text-muted-foreground">({teacher.teacherProfile.total_reviews})</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                            {teacher.teacherProfile.bio}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {teacher.subjects.slice(0, 3).map((subject) => (
                                                <Badge key={subject.id} variant="secondary">
                                                    {subject.name}
                                                </Badge>
                                            ))}
                                            {teacher.subjects.length > 3 && (
                                                <Badge variant="secondary">+{teacher.subjects.length - 3}</Badge>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold">{teacher.teacherProfile.hourly_rate.toLocaleString()} FCFA/h</span>
                                            <span className="text-sm text-muted-foreground">{teacher.teacherProfile.total_hours}h données</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-24 bg-primary">
                <div className="container px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Prêt à commencer ?
                        </h2>
                        <p className="text-lg text-white/90 mb-8">
                            Rejoignez des milliers de parents qui font confiance à Timmi pour l'éducation de leurs enfants.
                        </p>
                        {!auth.user && (
                            <Link href={route('register')}>
                                <Button size="lg" variant="secondary">
                                    Créer un compte gratuitement
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300">
                <div className="container px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <BookOpen className="h-6 w-6 text-white" />
                                <span className="font-bold text-xl text-white">Timmi</span>
                            </div>
                            <p className="text-sm">
                                La plateforme de confiance pour trouver des professeurs particuliers qualifiés.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-4">Pour les Parents</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Comment ça marche</a></li>
                                <li><a href="#" className="hover:text-white">Trouver un professeur</a></li>
                                <li><a href="#" className="hover:text-white">Tarifs</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-4">Pour les Professeurs</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Devenir professeur</a></li>
                                <li><a href="#" className="hover:text-white">Comment ça marche</a></li>
                                <li><a href="#" className="hover:text-white">Avantages</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-4">Support</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">FAQ</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                                <li><a href="#" className="hover:text-white">Conditions d'utilisation</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} Timmi. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
