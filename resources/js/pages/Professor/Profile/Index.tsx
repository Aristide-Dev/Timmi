import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    User, 
    Star, 
    GraduationCap,
    MapPin,
    BookOpen,
    Award,
    Edit,
    Phone,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { User as UserType, PagePropsWithData } from '@/types/global';
import AppLayout from '@/layouts/app-layout';

interface ProfessorProfileStats {
    total_hours_taught: number;
    total_students: number;
    average_rating: number;
    total_reviews: number;
}

interface Props extends PagePropsWithData {
    user: UserType;
    stats: ProfessorProfileStats;
}

export default function ProfessorProfile({ user, stats }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'GNF',
        }).format(amount);
    };

    const formatRating = (rating: number) => {
        return rating.toFixed(1);
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
        }

        return stars;
    };

    return (
        <AppLayout>
            <Head title="Mon Profil - Professeur" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mon Profil</h1>
                        <p className="text-muted-foreground">
                            Gérez vos informations personnelles et professionnelles
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('professor.profile.edit')}>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier le profil
                        </Link>
                    </Button>
                </div>

                {/* Informations principales */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Photo et informations de base */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Informations personnelles
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={user.avatar || '/images/default-avatar.png'}
                                    alt={user.name}
                                    className="h-24 w-24 rounded-full object-cover mb-4"
                                />
                                <h3 className="text-xl font-semibold">{user.name}</h3>
                                <p className="text-muted-foreground">{user.email}</p>
                                {user.phone && (
                                    <p className="text-muted-foreground flex items-center gap-1">
                                        <Phone className="h-3 w-3" />
                                        {user.phone}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Tarif horaire</span>
                                    <span className="text-sm">
                                        {user.hourly_rate ? formatCurrency(user.hourly_rate) : 'Non défini'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Années d'expérience</span>
                                    <span className="text-sm">
                                        {user.experience_years || 0} ans
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Statut</span>
                                    <Badge variant={user.is_verified ? 'default' : 'secondary'}>
                                        {user.is_verified ? 'Vérifié' : 'En attente'}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Statistiques */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Statistiques
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Heures enseignées</span>
                                        <span className="text-sm font-semibold">
                                            {stats.total_hours_taught.toFixed(1)}h
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Élèves formés</span>
                                        <span className="text-sm font-semibold">
                                            {stats.total_students}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Note moyenne</span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-semibold">
                                                {formatRating(stats.average_rating)}
                                            </span>
                                            <div className="flex">
                                                {renderStars(stats.average_rating)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Avis reçus</span>
                                        <span className="text-sm font-semibold">
                                            {stats.total_reviews}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Biographie */}
                {user.bio && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Biographie
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                {user.bio}
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Matières enseignées */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Matières enseignées
                        </CardTitle>
                        <CardDescription>
                            Les matières que vous enseignez
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user.subjects && user.subjects.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {user.subjects.map((subject) => (
                                    <Badge key={subject.id} variant="outline">
                                        {subject.name}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                Aucune matière définie
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Niveaux enseignés */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            Niveaux enseignés
                        </CardTitle>
                        <CardDescription>
                            Les niveaux scolaires que vous couvrez
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user.levels && user.levels.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {user.levels.map((level) => (
                                    <Badge key={level.id} variant="outline">
                                        {level.name}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                Aucun niveau défini
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Zones géographiques */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Zones géographiques
                        </CardTitle>
                        <CardDescription>
                            Les villes où vous donnez des cours
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user.cities && user.cities.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {user.cities.map((city) => (
                                    <Badge key={city.id} variant="outline">
                                        {city.name}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                Aucune zone définie
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Informations supplémentaires */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Éducation et spécialisations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Formation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {user.education && (
                                <div>
                                    <p className="text-sm font-medium">Formation</p>
                                    <p className="text-sm text-muted-foreground">{user.education}</p>
                                </div>
                            )}
                            {user.specializations && user.specializations.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium">Spécialisations</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {user.specializations.map((spec, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {spec}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {user.languages && user.languages.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium">Langues</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {user.languages.map((lang, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {lang}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Certificats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Certificats
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {user.certificates && user.certificates.length > 0 ? (
                                <div className="space-y-2">
                                    {user.certificates.slice(0, 3).map((certificate) => (
                                        <div key={certificate.id} className="flex items-center justify-between p-2 border rounded">
                                            <div>
                                                <p className="text-sm font-medium">{certificate.name}</p>
                                                <p className="text-xs text-muted-foreground">{certificate.issuer}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {user.certificates.length > 3 && (
                                        <p className="text-xs text-muted-foreground">
                                            +{user.certificates.length - 3} autres certificats
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-sm">
                                    Aucun certificat ajouté
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
