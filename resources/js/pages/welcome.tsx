import { Link } from '@inertiajs/react';
import { Star, Users, Shield, Clock, MapPin, Award, TrendingUp, BookOpen, MessageCircle, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageProps } from '@/types';
import PublicLayout from '@/layouts/public-layout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

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
    const [activeTab, setActiveTab] = useState("primaire");
    const [animateCount, setAnimateCount] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setAnimateCount(true);
            }
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('#stats-section');
        if (statsSection) observer.observe(statsSection);

        return () => {
            if (statsSection) observer.unobserve(statsSection);
        };
    }, []);

    const features = [
        {
            icon: Users,
            title: 'Professeurs Qualifiés',
            description: 'Nos professeurs sont rigoureusement sélectionnés et évalués pour garantir une excellente qualité d\'enseignement.',
            color: 'bg-gradient-to-br from-[var(--primary-50)] to-[var(--primary-100)] text-[var(--primary-700)]',
        },
        {
            icon: Shield,
            title: 'Paiement Sécurisé',
            description: 'Transactions sécurisées avec Orange Money ou carte bancaire pour une expérience sans souci.',
            color: 'bg-gradient-to-br from-[var(--success-50)] to-[var(--success-100)] text-[var(--success-700)]',
        },
        {
            icon: Clock,
            title: 'Réservation Flexible',
            description: 'Planifiez les cours selon votre agenda grâce à notre système de réservation intelligent et adaptatif.',
            color: 'bg-gradient-to-br from-[var(--accent-50)] to-[var(--accent-100)] text-[var(--accent-700)]',
        },
        {
            icon: MapPin,
            title: 'Près de Chez Vous',
            description: 'Options d\'enseignement à domicile ou en ligne pour s\'adapter parfaitement à vos besoins.',
            color: 'bg-gradient-to-br from-[var(--secondary-50)] to-[var(--secondary-100)] text-[var(--secondary-700)]',
        },
    ];

    const stats = [
        { value: 2500, label: 'Élèves satisfaits', icon: TrendingUp },
        { value: 350, label: 'Professeurs experts', icon: Award },
        { value: 15, label: 'Matières enseignées', icon: BookOpen },
        { value: 98, label: 'Satisfaction garantie', icon: Star, suffix: '%' },
    ];

    const testimonials = [
        {
            name: 'Aminata Diallo',
            role: 'Mère de famille',
            content: 'Timmi a transformé l\'éducation de mon fils. Les professeurs sont exceptionnels et très pédagogues. Grâce aux cours réguliers, ses notes ont progressé de façon remarquable.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
        },
        {
            name: 'Ibrahim Koné',
            role: 'Parent d\'élève',
            content: 'Interface simple, professeurs qualifiés, résultats garantis. Je recommande vivement Timmi ! C\'est un investissement qui vaut vraiment la peine pour l\'avenir de nos enfants.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        {
            name: 'Fatoumata Traoré',
            role: 'Maman de 3 enfants',
            content: 'Mes enfants adorent leurs cours avec Timmi. Leurs notes se sont considérablement améliorées et ils ont retrouvé la motivation pour apprendre. L\'équipe est vraiment à l\'écoute.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
        },
    ];

    const categories = {
        'Sciences': ['bg-gradient-to-br from-blue-50 to-blue-100', 'text-blue-700', 'border-blue-200', 'hover:shadow-blue-100/50'],
        'Langues': ['bg-gradient-to-br from-green-50 to-green-100', 'text-green-700', 'border-green-200', 'hover:shadow-green-100/50'],
        'Sciences humaines': ['bg-gradient-to-br from-purple-50 to-purple-100', 'text-purple-700', 'border-purple-200', 'hover:shadow-purple-100/50'],
        'Autres': ['bg-gradient-to-br from-orange-50 to-orange-100', 'text-orange-700', 'border-orange-200', 'hover:shadow-orange-100/50'],
    };

    const levelCategories = {
        "primaire": "Pour les élèves du primaire (CP au CM2)",
        "college": "Pour les élèves du collège (6e à la 3e)",
        "lycee": "Pour les élèves du lycée (2nde à la Terminale)",
        "superieur": "Pour les étudiants du supérieur"
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
            />
        ));
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const CountingNumber = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (animateCount) {
                let start = 0;
                const end = value;
                const duration = 2000;
                const frameDuration = 1000 / 60;
                const totalFrames = Math.round(duration / frameDuration);
                const increment = end / totalFrames;

                const counter = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(counter);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, frameDuration);

                return () => clearInterval(counter);
            }
        }, [value]);

        return (
            <span>
                {animateCount ? count : 0}{suffix}
            </span>
        );
    };

    return (
        <PublicLayout auth={auth} title="Accueil">

            {/* Hero Section Modernisé */}
            <section className="relative overflow-hidden bg-gradient-to-r from-[var(--primary-50)] via-white to-[var(--accent-50)]">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-gradient-to-br from-[var(--primary-200)]/40 to-[var(--accent-200)]/40 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[25rem] h-[25rem] bg-gradient-to-tr from-[var(--secondary-200)]/40 to-[var(--primary-200)]/40 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>

                    {/* Decorative elements */}
                    <div className="absolute top-[20%] right-[15%] w-12 h-12 rounded-full bg-[var(--accent-100)] opacity-20"></div>
                    <div className="absolute top-[40%] right-[25%] w-8 h-8 rounded-full bg-[var(--primary-100)] opacity-30"></div>
                    <div className="absolute top-[60%] left-[10%] w-16 h-16 rounded-full bg-[var(--secondary-100)] opacity-20"></div>
                </div>

                <div className="container px-4 sm:px-6 py-20 md:py-28 lg:py-32 mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-20 items-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="max-w-xl"
                        >
                            <motion.div variants={fadeIn}>
                                <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-[var(--primary-100)] to-[var(--accent-100)] text-[var(--primary-700)] border-0 px-4 py-1.5 shadow-sm">
                                    <Sparkles className="h-4 w-4 mr-1.5 inline" /> Plateforme N°1 en Guinée
                                </Badge>
                            </motion.div>

                            <motion.h1 variants={fadeIn} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight">
                                <span className="block">L'excellence</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)]">pédagogique</span>
                                <span className="block">pour votre enfant</span>
                            </motion.h1>

                            <motion.p variants={fadeIn} className="text-lg lg:text-xl leading-relaxed text-gray-600 mb-8">
                                Connectez-vous avec les meilleurs professeurs qualifiés pour des cours à domicile ou en ligne, dans un environnement sécurisé et adapté.
                            </motion.p>

                            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mb-10">
                                {auth.user ? (
                                    auth.user.role === 'parent' ? (
                                        <Link href={route('parent.search')}>
                                            <Button size="lg" className="bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)] hover:from-[var(--primary-700)] hover:to-[var(--accent-700)] text-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                                                Chercher un professeur
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link href={route('dashboard')}>
                                            <Button size="lg" className="bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)] hover:from-[var(--primary-700)] hover:to-[var(--accent-700)] text-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                                                Tableau de bord
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    )
                                ) : (
                                    <>
                                        <Link href={route('register')}>
                                            <Button size="lg" className="bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)] hover:from-[var(--primary-700)] hover:to-[var(--accent-700)] text-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                                                Commencer maintenant
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Link href={route('login')}>
                                            <Button size="lg" variant="outline" className="bg-white/80 backdrop-blur-sm border-[var(--primary-200)] text-[var(--primary-700)] hover:bg-[var(--primary-50)] rounded-xl transition-all duration-300">
                                                Se connecter
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </motion.div>

                            {/* Trust badges */}
                            <motion.div variants={fadeIn} className="flex flex-wrap gap-4 items-center">
                                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                                    <div className="flex">
                                        {renderStars(5)}
                                    </div>
                                    <span className="text-sm font-medium">4.9/5</span>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-[var(--success-600)]" />
                                    <span className="text-sm font-medium">Vérifié & Sécurisé</span>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-[var(--primary-600)]" />
                                    <span className="text-sm font-medium">Garantie qualité</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-500)] to-[var(--accent-500)] rounded-[2rem] rotate-[-6deg] scale-95 -z-10 blur-[5px] opacity-20"></div>

                                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                                    <img
                                        src="/img/heros/home01.jpg"
                                        alt="Élèves en cours"
                                        className="w-full h-auto"
                                    />
                                </div>

                                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl">
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {renderStars(5)}
                                        </div>
                                        <span className="text-sm font-medium">4.9/5 (2,500+ avis)</span>
                                    </div>
                                </div>

                                <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-xl">
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary-100)]">
                                            <Award className="h-6 w-6 text-[var(--primary-600)]" />
                                        </span>
                                        <span className="text-sm font-medium">Certifié<br />Excellence</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section avec animations */}
            <section id="stats-section" className="py-16 md:py-20 bg-white">
                <div className="container px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 lg:gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                key={index}
                                className="text-center relative"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-100)] to-[var(--accent-100)] rounded-full blur-xl opacity-30"></div>
                                    <div className={`relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary-50)] to-white shadow-lg mb-5 z-10`}>
                                        <stat.icon className="h-9 w-9 text-[var(--primary-600)]" />
                                    </div>
                                </div>
                                <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-700)] to-[var(--accent-700)]">
                                    <CountingNumber value={stat.value} suffix={stat.suffix || ""} />
                                </div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features modernes avec design asymétrique */}
            <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 relative">
                <div className="container px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-[var(--accent-100)] to-[var(--secondary-100)] text-[var(--accent-700)] border-0 px-4 py-1.5 shadow-sm">
                            <Sparkles className="h-4 w-4 mr-1.5 inline" /> Pourquoi nous choisir
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">Votre succès, notre priorité</h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez comment notre approche innovante révolutionne l'éducation personnalisée en Guinée.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                key={index}
                            >
                                <Card className="group hover:scale-105 transition-all duration-300 h-full border-0 shadow-lg hover:shadow-xl overflow-hidden">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[var(--primary-600)]/5 to-[var(--accent-600)]/5 transition-opacity duration-300"></div>
                                    <CardHeader>
                                        <div className={`relative mx-auto flex h-20 w-20 items-center justify-center rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className="h-10 w-10" />
                                            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <CardTitle className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subjects avec design ludique et interactif */}
            <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
                {/* Éléments décoratifs d'arrière-plan */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-16 h-16 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-20 h-20 bg-green-100 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-purple-100 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-yellow-100 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.7s' }}></div>
                </div>

                <div className="container px-4 sm:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 sm:mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-left"
                        >
                            <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-[var(--primary-100)] to-[var(--secondary-100)] text-[var(--primary-700)] border-0 px-4 py-1.5 shadow-sm">
                                <BookOpen className="h-4 w-4 mr-1.5 inline" /> Découvrez nos matières
                            </Badge>
                                                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-purple-600">
                                La bibliothèque du savoir
                            </h2>
                                                            <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
                                Comme des livres colorés qui s'empilent, nos matières s'adaptent à tous les niveaux. Nos professeurs passionnés transforment chaque page du savoir en une aventure captivante pour votre enfant.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex justify-center"
                        >
                            <div className="relative">
                                {/* Effet de halo derrière l'image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-red-200 to-purple-200 rounded-3xl blur-2xl opacity-70 scale-95"></div>

                                {/* Image des livres */}
                                <img
                                    src="/img/heros/home02.jpg"
                                    alt="Livres colorés représentant différentes matières"
                                    className="relative z-10 max-w-full w-auto h-auto max-h-[400px] rounded-2xl shadow-xl"
                                />
                            </div>
                        </motion.div>
                    </div>

                    <div className="mb-12">
                        {/* Navigation par niveau scolaire - style ludique */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-gray-50 p-1.5 rounded-full shadow-inner flex gap-1 sm:gap-2 overflow-x-auto max-w-full">
                                {Object.keys(levelCategories).map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setActiveTab(level)}
                                        className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2
                                            ${activeTab === level
                                                ? 'bg-gradient-to-r from-[var(--primary-500)] to-[var(--accent-500)] text-white shadow-lg scale-105'
                                                : 'bg-white text-gray-600 hover:bg-gray-100 shadow'
                                            }`}
                                    >
                                        {level === 'primaire' && <BookOpen className="h-3.5 w-3.5" />}
                                        {level === 'college' && <Users className="h-3.5 w-3.5" />}
                                        {level === 'lycee' && <Award className="h-3.5 w-3.5" />}
                                        {level === 'superieur' && <TrendingUp className="h-3.5 w-3.5" />}
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <p className="text-center text-gray-500 mb-6 italic">
                                        {levelCategories[activeTab as keyof typeof levelCategories]}
                                    </p>

                                    {/* Grille de matières avec style ludique */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                                        {subjects
                                            .filter((_, index) => index < 8)
                                            .map((subject, index) => {
                                                const [bgColor, textColor, borderColor] = categories[subject.category as keyof typeof categories] || categories['Autres'];

                                                return (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{
                                                            duration: 0.4,
                                                            delay: index * 0.05,
                                                            type: "spring",
                                                            stiffness: 100
                                                        }}
                                                        key={`${activeTab}-${subject.id}`}
                                                        whileHover={{
                                                            scale: 1.05,
                                                            y: -5,
                                                            transition: { duration: 0.3 }
                                                        }}
                                                    >
                                                        <Link href={`/teachers?subject=${subject.slug}&level=${activeTab}`}>
                                                            <div className={`relative group h-full rounded-2xl overflow-hidden bg-[url('/img/books/02.png')] bg-contain bg-right bg-no-repeat border-2 ${borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}>
                                                                {/* Effet de livre avec tranche colorée */}
                                                                <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-b from-[var(--primary-500)] via-[var(--accent-500)] to-[var(--secondary-500)]"></div>

                                                                {/* Effet de pages de livre */}
                                                                {/* <div className="absolute top-3 right-3 bottom-3 w-2 bg-gray-100 rounded-r-sm"></div> */}

                                                                <div className="p-5 pl-7 flex flex-col items-start text-left h-full">
                                                                    {/* Titre de matière comme titre de livre */}
                                                                    <h3 className={`font-bold text-base sm:text-lg mb-2 ${textColor}`}>
                                                                        {subject.name}
                                                                    </h3>

                                                                    {/* Catégorie comme sous-titre */}
                                                                    <Badge variant="secondary" className={`mb-3 ${bgColor} ${textColor} border-0`}>
                                                                        {subject.category}
                                                                    </Badge>

                                                                    {/* Icône de matière */}
                                                                    <div className="mt-auto flex justify-between items-center w-full">
                                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${bgColor} ${textColor}`}>
                                                                            {subject.category === 'Sciences' && <Star className="h-5 w-5" />}
                                                                            {subject.category === 'Langues' && <MessageCircle className="h-5 w-5" />}
                                                                            {subject.category === 'Sciences humaines' && <Users className="h-5 w-5" />}
                                                                            {subject.category === 'Autres' && <BookOpen className="h-5 w-5" />}
                                                                        </div>

                                                                        {/* Flèche de découverte */}
                                                                        <ArrowRight className={`h-4 w-4 ${textColor} opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300`} />
                                                                    </div>

                                                                    {/* Effet de brillance sur hover */}
                                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 transition-opacity duration-700 pointer-events-none"></div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </motion.div>
                                                );
                                            })}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <Link href="/subjects">
                                                            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] px-8">
                                Explorer notre bibliothèque
                                <BookOpen className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Teachers avec design moderne */}
            {featuredTeachers.length > 0 && (
                <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container px-4 sm:px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-[var(--secondary-100)] to-[var(--warning-100)] text-[var(--secondary-700)] border-0 px-4 py-1.5 shadow-sm">
                                <Star className="h-4 w-4 mr-1.5 inline fill-yellow-400" /> Nos experts
                            </Badge>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                                Nos professeurs d'exception
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                                Découvrez les enseignants les mieux notés qui transforment l'apprentissage en une expérience enrichissante et passionnante.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
                            {featuredTeachers.slice(0, 3).map((teacher, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    key={teacher.id}
                                >
                                    <Link href={`/teachers/${teacher.id}`}>
                                        <Card className="group relative h-full overflow-hidden border-0 hover:shadow-2xl transition-all duration-500 bg-white">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-600)]/0 to-[var(--accent-600)]/0 group-hover:from-[var(--primary-600)]/5 group-hover:to-[var(--accent-600)]/5 transition-colors duration-500"></div>

                                            <CardHeader className="pb-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-16 w-16 bg-gradient-to-br from-[var(--primary-100)] to-[var(--accent-100)] rounded-xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                                            <span className="text-xl font-bold text-[var(--primary-700)]">
                                                                {teacher.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <CardTitle className="text-lg sm:text-xl font-bold">{teacher.name}</CardTitle>
                                                            <div className="flex items-center gap-1 text-sm text-gray-600 mt-0.5">
                                                                <MapPin className="h-3 w-3" />
                                                                {teacher.city}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Badge variant="secondary" className="bg-gradient-to-r from-[var(--success-50)] to-[var(--success-100)] text-[var(--success-700)] border-0 shadow-sm">
                                                        <Clock className="h-3 w-3 mr-1 inline" />
                                                        {teacher.teacherProfile.total_hours}h
                                                    </Badge>
                                                </div>

                                                <div className="flex items-center justify-between border-t border-b border-gray-100 py-2 mb-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="flex">
                                                            {renderStars(teacher.teacherProfile.rating)}
                                                        </div>
                                                        <span className="text-sm font-medium">{teacher.teacherProfile.rating.toFixed(1)}</span>
                                                        <span className="text-sm text-muted-foreground">({teacher.teacherProfile.total_reviews} avis)</span>
                                                    </div>
                                                    <span className="text-lg font-bold text-[var(--primary-600)]">
                                                        {teacher.teacherProfile.hourly_rate.toLocaleString()} GNF
                                                        <span className="text-xs text-gray-500 font-normal">/h</span>
                                                    </span>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="pb-4">
                                                <p className="text-gray-600 mb-4 line-clamp-2 h-12">
                                                    {teacher.teacherProfile.bio}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {teacher.subjects.slice(0, 3).map((subject) => {
                                                        const [bgColor, textColor] = categories[subject.category as keyof typeof categories] || categories['Autres'];
                                                        return (
                                                            <Badge key={subject.id} variant="secondary" className={`${bgColor} ${textColor} border-0`}>
                                                                {subject.name}
                                                            </Badge>
                                                        );
                                                    })}
                                                    {teacher.subjects.length > 3 && (
                                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                            +{teacher.subjects.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </CardContent>

                                            <CardFooter className="pt-0">
                                                <Button className="w-full bg-gradient-to-r from-[var(--primary-50)] to-[var(--accent-50)] hover:from-[var(--primary-100)] hover:to-[var(--accent-100)] text-[var(--primary-700)] group-hover:from-[var(--primary-600)] group-hover:to-[var(--accent-600)] group-hover:text-white transition-all duration-300 border border-[var(--primary-200)] group-hover:border-transparent shadow-sm group-hover:shadow-md">
                                                    Voir le profil
                                                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mt-12"
                        >
                            <Link href="/teachers">
                                <Button size="lg" className="bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)] hover:from-[var(--primary-700)] hover:to-[var(--accent-700)] text-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                                    Découvrir tous nos professeurs
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Témoignages avec design moderne */}
            <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 right-0 w-[15rem] sm:w-[20rem] h-[15rem] sm:h-[20rem] bg-gradient-to-br from-[var(--warning-100)]/30 to-[var(--primary-100)]/30 rounded-full blur-[80px] sm:blur-[100px] transform translate-x-1/2"></div>
                    <div className="absolute bottom-1/4 left-0 w-[10rem] sm:w-[15rem] h-[10rem] sm:h-[15rem] bg-gradient-to-tr from-[var(--accent-100)]/30 to-[var(--success-100)]/30 rounded-full blur-[80px] sm:blur-[100px] transform -translate-x-1/2"></div>
                </div>

                <div className="container px-4 sm:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-[var(--warning-100)] to-[var(--success-100)] text-[var(--warning-700)] border-0 px-4 py-1.5 shadow-sm">
                            <MessageCircle className="h-4 w-4 mr-1.5 inline" /> Témoignages
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                            Ce que disent nos parents
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                            Des milliers de familles nous font confiance et partagent leurs expériences positives avec notre plateforme éducative.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                key={index}
                                className="h-full"
                            >
                                <Card className="relative h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white">
                                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--primary-500)] to-[var(--accent-500)]"></div>
                                    <CardContent className="pt-8 h-full flex flex-col">
                                        <div className="absolute top-4 right-4">
                                            <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
                                                <path d="M0 20L10 0H20L15 20H10V40H0V20ZM25 20L35 0H45L40 20H35V40H25V20Z" fill="currentColor" />
                                            </svg>
                                        </div>

                                        <div className="flex items-center gap-1 mb-6">
                                            {renderStars(testimonial.rating)}
                                        </div>

                                        <p className="text-gray-700 mb-8 text-base sm:text-lg italic leading-relaxed flex-grow">
                                            "{testimonial.content}"
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--primary-300)] to-[var(--accent-300)] blur-sm"></div>
                                                <img
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    className="relative h-14 w-14 rounded-full object-cover ring-2 ring-white"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 text-base sm:text-lg">{testimonial.name}</div>
                                                <div className="text-sm text-[var(--primary-600)]">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section Ultra-Moderne */}
            <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-[var(--primary-800)] via-[var(--primary-700)] to-[var(--accent-800)]">
                {/* Background Elements avancés */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Gradient blobs */}
                    <div className="absolute top-0 right-0 w-[20rem] sm:w-[30rem] md:w-[40rem] h-[20rem] sm:h-[30rem] md:h-[40rem] bg-white/5 rounded-full blur-[80px] sm:blur-[100px] transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[15rem] sm:w-[20rem] md:w-[30rem] h-[15rem] sm:h-[20rem] md:h-[30rem] bg-white/5 rounded-full blur-[80px] sm:blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>

                    {/* Mesh pattern */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                    }}></div>

                    {/* Decorative circles */}
                    <div className="absolute top-1/4 right-1/4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white opacity-20"></div>
                    <div className="absolute top-3/4 left-1/4 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white opacity-10"></div>
                    <div className="absolute top-1/2 right-1/3 w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white opacity-5"></div>
                </div>

                <div className="container px-4 sm:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl">
                            <div className="text-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-0 px-4 py-1.5 backdrop-blur-sm">
                                        <Sparkles className="h-4 w-4 mr-1.5 inline" /> Démarrez aujourd'hui
                                    </Badge>

                                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                                        Un avenir brillant commence ici
                                    </h2>

                                    <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
                                        Rejoignez notre communauté de parents et professeurs dédiés à l'excellence éducative.
                                        La réussite de votre enfant est à portée de main.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 sm:mb-10"
                                >
                                    {!auth.user && (
                                        <>
                                            <Link href={route('register')}>
                                                <Button size="lg" className="bg-white hover:bg-gray-50 text-[var(--primary-700)] hover:text-[var(--primary-800)] w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                                    Créer un compte gratuitement
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </Button>
                                            </Link>
                                            <Link href="/how-it-works">
                                                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg rounded-xl backdrop-blur-sm transition-all duration-300">
                                                    Comment ça marche ?
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/80 text-sm sm:text-base"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 backdrop-blur-sm">
                                            <Shield className="h-5 w-5" />
                                        </div>
                                        <span>100% Sécurisé</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 backdrop-blur-sm">
                                            <MessageCircle className="h-5 w-5" />
                                        </div>
                                        <span>Support 24/7</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 backdrop-blur-sm">
                                            <Award className="h-5 w-5" />
                                        </div>
                                        <span>Satisfaction Garantie</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </PublicLayout>
    );
}
