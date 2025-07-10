import { Link } from '@inertiajs/react';
import { 
    Star, 
    MapPin, 
    Clock, 
    Award, 
    CheckCircle, 
    Calendar,
    Phone,
    Mail,
    MessageCircle,
    Heart,
    Share2,
    BookOpen,
    Users,
    Shield,
    TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageProps } from '@/types';
import PublicLayout from '@/layouts/public-layout';

type Subject = {
    id: number;
    name: string;
    slug: string;
    category: string;
};

type Review = {
    id: number;
    rating: number;
    comment: string;
    parent_name: string;
    student_name: string;
    created_at: string;
    subject: string;
};

type Availability = {
    day: string;
    time_slots?: string[];
};

type TeacherProfile = {
    bio: string;
    hourly_rate: number;
    rating: number;
    total_reviews: number;
    total_hours: number;
    is_verified: boolean;
    created_at?: string;
    education: string;
    certifications: string[];
    teaching_method: string;
    languages: string[];
};

type Teacher = {
    id: number;
    name: string;
    city: string;
    avatar?: string;
    phone?: string;
    email?: string;
    teacherProfile?: TeacherProfile;
    subjects?: Subject[];
    reviewsReceived?: Review[];
    availabilities?: Availability[];
};

interface TeacherDetailProps extends PageProps {
    teacher: Teacher;
}

export default function TeacherDetail({ auth, teacher }: TeacherDetailProps) {
    // S'assurer que les objets requis existent
    if (!teacher.teacherProfile) {
        teacher.teacherProfile = {
            bio: "Profil en cours de complétion",
            hourly_rate: 5000,
            rating: 4.0,
            total_reviews: 0,
            total_hours: 0,
            is_verified: false,
            created_at: undefined,
            education: "Information non disponible",
            certifications: [],
            teaching_method: "Information non disponible",
            languages: ["Français"]
        };
    }

    if (!teacher.subjects) {
        teacher.subjects = [];
    }

    if (!teacher.reviewsReceived) {
        teacher.reviewsReceived = [];
    }

    if (!teacher.availabilities) {
        teacher.availabilities = [];
    }

    const breadcrumbs = [
        { href: '/', title: 'Accueil' },
        { href: '/teachers', title: 'Professeurs' },
        { href: `/teachers/${teacher.id}`, title: teacher.name },
    ];

    const calculateExperience = (createdAt?: string) => {
        if (!createdAt) return 0;
        const created = new Date(createdAt);
        const now = new Date();
        return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 365));
    };

    // Calculer l'expérience à partir de created_at
    const experienceYears = calculateExperience(teacher.teacherProfile.created_at);

    const teacherStats = [
        { 
            icon: TrendingUp, 
            label: 'Expérience', 
            value: `${experienceYears} ans`,
            color: 'text-[var(--primary-600)]'
        },
        { 
            icon: Clock, 
            label: 'Heures données', 
            value: `${teacher.teacherProfile.total_hours}h`,
            color: 'text-[var(--accent-600)]'
        },
        { 
            icon: Users, 
            label: 'Avis reçus', 
            value: teacher.teacherProfile.total_reviews,
            color: 'text-[var(--secondary-600)]'
        },
        { 
            icon: Award, 
            label: 'Note moyenne', 
            value: `${teacher.teacherProfile.rating.toFixed(1)}/5`,
            color: 'text-yellow-600'
        },
    ];

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${
                    i < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : i < rating
                        ? 'fill-yellow-200 text-yellow-400'
                        : 'text-gray-300'
                }`}
            />
        ));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <PublicLayout 
            auth={auth} 
            title={`${teacher.name} - Professeur`}
            description={`Découvrez le profil de ${teacher.name}, professeur qualifié proposant des cours de ${teacher.subjects && teacher.subjects.length > 0 ? teacher.subjects.map(s => s.name).join(', ') : 'diverses matières'}.`}
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
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            {/* Avatar et infos principales */}
                            <div className="lg:col-span-2 fadeInUp">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className="h-32 w-32 bg-gradient-to-br from-[var(--primary-100)] to-[var(--accent-100)] rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
                                                {teacher.avatar ? (
                                                    <img 
                                                        src={teacher.avatar} 
                                                        alt={teacher.name}
                                                        className="h-32 w-32 rounded-2xl object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-4xl font-bold text-[var(--primary-700)]">
                                                        {teacher.name.charAt(0)}
                                                    </span>
                                                )}
                                            </div>
                                            {teacher.teacherProfile.is_verified && (
                                                <div className="absolute -bottom-2 -right-2 bg-[var(--success-500)] text-white p-2 rounded-full shadow-lg">
                                                    <CheckCircle className="h-5 w-5" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Informations du professeur */}
                                    <div className="flex-1">
                                        <div className="mb-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                                                    {teacher.name}
                                                </h1>
                                                {teacher.teacherProfile.is_verified && (
                                                    <Badge className="bg-[var(--success-100)] text-[var(--success-700)] border-0">
                                                        <Shield className="h-3 w-3 mr-1" />
                                                        Vérifié
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center text-gray-600 mb-3">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                <span className="font-medium">{teacher.city}</span>
                                            </div>
                                        </div>

                                        {/* Rating et prix */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1">
                                                    {renderStars(teacher.teacherProfile.rating)}
                                                    <span className="ml-2 font-semibold text-lg">
                                                        {teacher.teacherProfile.rating.toFixed(1)}
                                                    </span>
                                                </div>
                                                <span className="text-gray-600">
                                                    ({teacher.teacherProfile.total_reviews} avis)
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-[var(--primary-600)]">
                                                    {teacher.teacherProfile.hourly_rate.toLocaleString()} GNF
                                                </div>
                                                <div className="text-sm text-gray-600">par heure</div>
                                            </div>
                                        </div>

                                        {/* Matières enseignées */}
                                        <div className="mb-6">
                                            <h3 className="text-sm font-medium text-gray-500 mb-2">Matières enseignées</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {(teacher.subjects || []).map((subject) => (
                                                    <Badge key={subject.id} variant="secondary" className="bg-[var(--primary-50)] text-[var(--primary-700)] border-0">
                                                        {subject.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions sociales */}
                                        <div className="flex items-center gap-3">
                                            <Button variant="outline" size="sm" className="border-[var(--primary-200)] text-[var(--primary-700)] hover:bg-[var(--primary-50)]">
                                                <Heart className="h-4 w-4 mr-2" />
                                                Favoris
                                            </Button>
                                            <Button variant="outline" size="sm" className="border-[var(--primary-200)] text-[var(--primary-700)] hover:bg-[var(--primary-50)]">
                                                <Share2 className="h-4 w-4 mr-2" />
                                                Partager
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Panel Actions */}
                            <div className="fadeInUp" style={{ animationDelay: '0.2s' }}>
                                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                                    <CardHeader className="text-center pb-4">
                                        <CardTitle className="text-xl text-[var(--primary-700)]">
                                            Réserver un cours
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {auth.user ? (
                                            <div className="space-y-3">
                                                <Button size="lg" className="w-full btn-primary">
                                                    <Calendar className="mr-2 h-5 w-5" />
                                                    Réserver maintenant
                                                </Button>
                                                <Button variant="outline" size="lg" className="w-full border-[var(--primary-200)] text-[var(--primary-700)] hover:bg-[var(--primary-50)]">
                                                    <MessageCircle className="mr-2 h-5 w-5" />
                                                    Envoyer un message
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <p className="text-sm text-gray-600 text-center">
                                                    Connectez-vous pour réserver un cours
                                                </p>
                                                <div className="space-y-2">
                                                    <Link href={route('login')}>
                                                        <Button size="lg" className="w-full btn-primary">
                                                            Se connecter
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('register')}>
                                                        <Button variant="outline" size="lg" className="w-full border-[var(--primary-200)] text-[var(--primary-700)]">
                                                            S'inscrire
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Stats du professeur */}
                        <div className="mt-12 fadeInUp" style={{ animationDelay: '0.3s' }}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {teacherStats.map((stat, index) => (
                                    <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                                        <div className="flex items-center justify-center mb-2">
                                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                        </div>
                                        <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contenu détaillé Amélioré */}
            <section className="py-12 bg-gradient-to-b from-white to-gray-50">
                <div className="container px-4">
                    <div className="max-w-6xl mx-auto">
                        <Tabs defaultValue="about" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white shadow-lg rounded-xl border-0">
                                <TabsTrigger value="about" className="data-[state=active]:bg-[var(--primary-500)] data-[state=active]:text-white">À propos</TabsTrigger>
                                <TabsTrigger value="reviews" className="data-[state=active]:bg-[var(--primary-500)] data-[state=active]:text-white">
                                    Avis ({teacher.reviewsReceived?.length || 0})
                                </TabsTrigger>
                                <TabsTrigger value="availability" className="data-[state=active]:bg-[var(--primary-500)] data-[state=active]:text-white">Disponibilités</TabsTrigger>
                                <TabsTrigger value="contact" className="data-[state=active]:bg-[var(--primary-500)] data-[state=active]:text-white">Contact</TabsTrigger>
                            </TabsList>

                            <TabsContent value="about" className="mt-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-6">
                                        <Card className="border-0 shadow-lg">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-[var(--primary-700)]">
                                                    <BookOpen className="h-5 w-5" />
                                                    Présentation
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-700 leading-relaxed text-lg">
                                                    {teacher.teacherProfile.bio}
                                                </p>
                                            </CardContent>
                                        </Card>

                                        <Card className="border-0 shadow-lg">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-[var(--primary-700)]">
                                                    <Award className="h-5 w-5" />
                                                    Méthode d'enseignement
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-700 leading-relaxed">
                                                    {teacher.teacherProfile.teaching_method}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="space-y-6">
                                        <Card className="border-0 shadow-lg">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-[var(--secondary-700)]">
                                                    <Award className="h-5 w-5" />
                                                    Formation
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-700">
                                                    {teacher.teacherProfile.education}
                                                </p>
                                            </CardContent>
                                        </Card>

                                        <Card className="border-0 shadow-lg">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-[var(--accent-700)]">
                                                    <CheckCircle className="h-5 w-5" />
                                                    Certifications
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-3">
                                                    {(teacher.teacherProfile.certifications || []).map((cert, index) => (
                                                        <li key={index} className="flex items-center text-sm bg-[var(--success-50)] p-3 rounded-lg">
                                                            <CheckCircle className="h-4 w-4 text-[var(--success-600)] mr-3 flex-shrink-0" />
                                                            <span className="text-gray-700">{cert}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>

                                        <Card className="border-0 shadow-lg">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-[var(--primary-700)]">
                                                    <Users className="h-5 w-5" />
                                                    Langues parlées
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-wrap gap-2">
                                                    {(teacher.teacherProfile.languages || []).map((lang, index) => (
                                                        <Badge key={index} variant="outline" className="border-[var(--primary-200)] text-[var(--primary-700)]">
                                                            {lang}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="reviews" className="mt-6">
                                <div className="space-y-6">
                                    {!teacher.reviewsReceived || teacher.reviewsReceived.length === 0 ? (
                                        <div className="text-center py-16">
                                            <div className="w-24 h-24 bg-[var(--primary-100)] rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Star className="h-12 w-12 text-[var(--primary-600)]" />
                                            </div>
                                            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun avis pour le moment</h3>
                                            <p className="text-gray-600">Soyez le premier à laisser un avis après un cours !</p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-6">
                                            {teacher.reviewsReceived.map((review: Review, index) => (
                                                <Card key={review.id} className="border-0 shadow-lg fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                                    <CardContent className="pt-6">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div>
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <div className="h-12 w-12 bg-gradient-to-br from-[var(--primary-100)] to-[var(--accent-100)] rounded-full flex items-center justify-center">
                                                                        <span className="font-medium text-[var(--primary-700)]">
                                                                            {review.parent_name.charAt(0)}
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="font-medium text-gray-900">{review.parent_name}</span>
                                                                        <Badge variant="outline" className="ml-2 text-xs border-[var(--accent-200)] text-[var(--accent-700)]">
                                                                            {review.subject}
                                                                        </Badge>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex">
                                                                        {renderStars(review.rating)}
                                                                    </div>
                                                                    <span className="text-sm text-gray-600">
                                                                        Élève: {review.student_name}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <span className="text-sm text-gray-500">
                                                                {formatDate(review.created_at)}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg italic">
                                                            "{review.comment}"
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="availability" className="mt-6">
                                <Card className="border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-[var(--primary-700)]">
                                            <Calendar className="h-5 w-5" />
                                            Créneaux disponibles
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {!teacher.availabilities || teacher.availabilities.length === 0 ? (
                                            <div className="text-center py-8">
                                                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600">Aucune disponibilité configurée pour le moment</p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {teacher.availabilities.map((availability, index) => (
                                                    <div key={index} className="border-2 border-[var(--primary-200)] rounded-xl p-4 hover:border-[var(--primary-400)] transition-colors">
                                                        <h4 className="font-semibold text-[var(--primary-700)] mb-4 text-center">
                                                            {availability.day}
                                                        </h4>
                                                        <div className="space-y-3">
                                                            {(availability.time_slots || []).map((slot, slotIndex) => (
                                                                <div key={slotIndex} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                                                    <span className="text-sm font-medium">{slot}</span>
                                                                    <Button size="sm" className="btn-primary">
                                                                        Réserver
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="contact" className="mt-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-[var(--primary-700)]">
                                                <Phone className="h-5 w-5" />
                                                Informations de contact
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {teacher.phone && (
                                                    <div className="flex items-center p-3 bg-[var(--primary-50)] rounded-lg">
                                                        <Phone className="h-5 w-5 text-[var(--primary-600)] mr-3" />
                                                        <span className="font-medium">{teacher.phone}</span>
                                                    </div>
                                                )}
                                                {teacher.email && (
                                                    <div className="flex items-center p-3 bg-[var(--accent-50)] rounded-lg">
                                                        <Mail className="h-5 w-5 text-[var(--accent-600)] mr-3" />
                                                        <span className="font-medium">{teacher.email}</span>
                                                    </div>
                                                )}
                                                <div className="pt-4 border-t">
                                                    <Button className="w-full btn-primary">
                                                        <MessageCircle className="mr-2 h-4 w-4" />
                                                        Envoyer un message privé
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-0 shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-[var(--secondary-700)]">
                                                <Shield className="h-5 w-5" />
                                                Conseils de sécurité
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-3 text-sm">
                                                <li className="flex items-start">
                                                    <CheckCircle className="h-4 w-4 text-[var(--success-600)] mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>Utilisez toujours la messagerie Timmi pour communiquer</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircle className="h-4 w-4 text-[var(--success-600)] mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>Effectuez vos paiements via notre plateforme sécurisée</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircle className="h-4 w-4 text-[var(--success-600)] mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>Signalez tout comportement inapproprié à notre équipe</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircle className="h-4 w-4 text-[var(--success-600)] mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>Consultez les avis d'autres parents avant de réserver</span>
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
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
                            Prêt à commencer vos cours ?
                        </h2>
                        <p className="text-lg text-white/90 mb-8">
                            Réservez dès maintenant votre premier cours avec {teacher.name} et découvrez une nouvelle façon d'apprendre.
                        </p>
                        {auth.user ? (
                            <Button size="lg" variant="secondary" className="bg-white text-[var(--primary-700)] hover:bg-gray-100">
                                <Calendar className="mr-2 h-5 w-5" />
                                Réserver un cours maintenant
                            </Button>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href={route('register')}>
                                    <Button size="lg" variant="secondary" className="bg-white text-[var(--primary-700)] hover:bg-gray-100">
                                        Créer un compte
                                    </Button>
                                </Link>
                                <Link href="/teachers">
                                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--primary-700)]">
                                        Voir d'autres professeurs
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
} 