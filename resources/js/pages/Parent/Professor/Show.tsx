import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type Professor } from '@/types/global';
import { Head, router } from '@inertiajs/react';
import { 
    Star, 
    MapPin, 
    DollarSign, 
    Award, 
    BookOpen,
    CheckCircle,
    Calendar,
    Phone,
    Mail,
    GraduationCap,
    FileText,
    MessageCircle,
    ArrowLeft,
    Clock as ClockIcon,
    Calendar as CalendarIcon
} from 'lucide-react';

interface Props {
    professor: Professor;
}

export default function ProfessorProfile({ professor }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'GNF'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getDayName = (dayNumber: number) => {
        const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        return days[dayNumber];
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available': return 'bg-green-100 text-green-800';
            case 'busy': return 'bg-red-100 text-red-800';
            case 'away': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout>
            <Head title={`Profil de ${professor.name}`} />
            
            <div className="container py-8">
                {/* Bouton retour */}
                <div className="mb-6">
                    <Button 
                        variant="outline" 
                        onClick={() => router.get(route('parent.search.professors'))}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour à la recherche
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne principale */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* En-tête du profil */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-6">
                                    {/* Photo de profil */}
                                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        {professor.avatar ? (
                                            <img src={professor.avatar} alt={professor.name} className="w-20 h-20 rounded-full" />
                                        ) : (
                                            <span className="text-blue-600 font-medium text-2xl">
                                                {professor.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Informations principales */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h1 className="text-2xl font-bold">{professor.name}</h1>
                                            {professor.is_verified && (
                                                <CheckCircle className="h-6 w-6 text-green-500" />
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                                                <span className="font-medium">{professor.rating}</span>
                                                <span className="text-gray-600">({professor.total_reviews} avis)</span>
                                            </div>
                                            <Badge className={getStatusColor(professor.is_available ? 'available' : 'busy')}>
                                                {professor.is_available ? 'Disponible' : 'Occupé'}
                                            </Badge>
                                        </div>

                                        <p className="text-gray-600 mb-4">{professor.bio}</p>

                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                <span>{professor.cities?.map(c => c.name).join(', ') || 'Non spécifié'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Award className="h-4 w-4" />
                                                <span>{professor.experience_years} ans d'expérience</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4" />
                                                <span>{formatCurrency(professor.hourly_rate)}/heure</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2">
                                        <Button 
                                            size="lg"
                                            onClick={() => router.get(route('parent.booking.create', { professor_id: professor.id }))}
                                        >
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Réserver un cours
                                        </Button>
                                        <Button variant="outline">
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            Contacter
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Onglets */}
                        <Tabs defaultValue="about" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="about">À propos</TabsTrigger>
                                <TabsTrigger value="subjects">Matières</TabsTrigger>
                                <TabsTrigger value="availability">Disponibilité</TabsTrigger>
                                <TabsTrigger value="reviews">Avis</TabsTrigger>
                            </TabsList>

                            {/* À propos */}
                            <TabsContent value="about" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <GraduationCap className="h-5 w-5" />
                                            Formation et expérience
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-medium mb-2">Formation</h4>
                                                <p className="text-gray-600">{professor.education}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">Spécialisations</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {professor.specializations?.map((spec, index) => (
                                                        <Badge key={index} variant="secondary">
                                                            {spec}
                                                        </Badge>
                                                    )) || <span className="text-gray-500">Non spécifié</span>}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">Langues parlées</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {professor.languages?.map((lang, index) => (
                                                        <Badge key={index} variant="outline">
                                                            {lang}
                                                        </Badge>
                                                    )) || <span className="text-gray-500">Non spécifié</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Certificats */}
                                {professor.certificates && professor.certificates.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <FileText className="h-5 w-5" />
                                                Certificats et diplômes
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                {professor.certificates.map((cert) => (
                                                    <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                        <div>
                                                            <p className="font-medium">{cert.name}</p>
                                                            <p className="text-sm text-gray-600">
                                                                Délivré par {cert.issuer}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-600">
                                                                {formatDate(cert.date_obtained)}
                                                            </p>
                                                            {cert.file_url && (
                                                                <Button variant="outline" size="sm">
                                                                    Voir
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </TabsContent>

                            {/* Matières */}
                            <TabsContent value="subjects" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <BookOpen className="h-5 w-5" />
                                            Matières enseignées
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {professor.subjects && professor.subjects.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {professor.subjects.map((subject) => (
                                                <div key={subject.id} className="p-4 border rounded-lg">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div 
                                                            className="w-8 h-8 rounded-full flex items-center justify-center"
                                                            style={{ backgroundColor: subject.color + '20' }}
                                                        >
                                                            <span 
                                                                className="text-sm font-medium"
                                                                style={{ color: subject.color }}
                                                            >
                                                                {subject.icon || '📚'}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium">{subject.name}</h4>
                                                            <p className="text-sm text-gray-600">
                                                                {professor.levels?.map(l => l.name).join(', ') || 'Non spécifié'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {subject.description && (
                                                        <p className="text-sm text-gray-600">{subject.description}</p>
                                                    )}
                                                </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600">Aucune matière spécifiée</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Disponibilité */}
                            <TabsContent value="availability" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <CalendarIcon className="h-5 w-5" />
                                            Disponibilité hebdomadaire
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {professor.availability && professor.availability.length > 0 ? (
                                            <div className="space-y-3">
                                                {professor.availability.map((slot) => (
                                                <div key={slot.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <ClockIcon className="h-4 w-4 text-gray-500" />
                                                        <span className="font-medium">{getDayName(slot.day_of_week)}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm">
                                                            {slot.start_time} - {slot.end_time}
                                                        </p>
                                                        <Badge 
                                                            variant={slot.is_available ? "default" : "secondary"}
                                                            className="text-xs"
                                                        >
                                                            {slot.is_available ? 'Disponible' : 'Indisponible'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600">Aucune disponibilité spécifiée</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Avis */}
                            <TabsContent value="reviews" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Star className="h-5 w-5" />
                                            Avis des parents ({professor.total_reviews})
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {professor.reviews && professor.reviews.length > 0 ? (
                                            <div className="space-y-4">
                                                {professor.reviews.map((review) => (
                                                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                                    <span className="text-sm font-medium">
                                                                        {review.parent_name.charAt(0)}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium">{review.parent_name}</p>
                                                                    <p className="text-sm text-gray-600">{review.subject}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                                <span className="font-medium">{review.rating}</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-600">{review.comment}</p>
                                                        <p className="text-xs text-gray-500 mt-2">{formatDate(review.date)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600">Aucun avis pour le moment</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Colonne latérale */}
                    <div className="space-y-6">
                        {/* Informations de contact */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{professor.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{professor.phone}</span>
                                </div>
                                <Separator />
                                <Button className="w-full" variant="outline">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Envoyer un message
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Statistiques */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistiques</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Note moyenne</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                        <span className="font-medium">{professor.rating}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Nombre d'avis</span>
                                    <span className="font-medium">{professor.total_reviews}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Expérience</span>
                                    <span className="font-medium">{professor.experience_years} ans</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Matières</span>
                                    <span className="font-medium">{professor.subjects?.length || 0}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Réservation rapide */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Réserver un cours</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-600">
                                        {formatCurrency(professor.hourly_rate)}
                                    </p>
                                    <p className="text-sm text-gray-600">par heure</p>
                                </div>
                                <Button 
                                    className="w-full"
                                    onClick={() => router.get(route('parent.booking.create', { professor_id: professor.id }))}
                                >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Réserver maintenant
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
