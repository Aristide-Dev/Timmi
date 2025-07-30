import { Head, Link } from '@inertiajs/react';
import { Star, MapPin, Clock, Calendar, Award, BookOpen, Users, CheckCircle, Globe, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type Subject = {
    id: number;
    name: string;
    category: string;
    pivot: {
        specialties: string[];
        hourly_rate: number;
    };
};

type TeacherProfile = {
    bio: string;
    photo?: string;
    diplomas?: any[];
    experiences?: any[];
    levels: string[];
    zones: string[];
    teaching_mode: 'presentiel' | 'en_ligne' | 'both';
    hourly_rate: number;
    total_hours: number;
    total_students: number;
    rating: number;
    total_reviews: number;
    is_verified: boolean;
};

type Availability = {
    id: number;
    day_of_week: number;
    start_time: string;
    end_time: string;
    is_recurring: boolean;
};

type Review = {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    parent: {
        name: string;
    };
};

type Teacher = {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    created_at: string;
    teacherProfile: TeacherProfile;
    subjects: Subject[];
    availabilities: Availability[];
    reviewsReceived: Review[];
};

interface ViewTeacherProps extends PageProps {
    teacher: Teacher;
}

export default function ViewTeacher({ auth, teacher }: ViewTeacherProps) {
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`h-4 w-4 ${
                    index < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                }`}
            />
        ));
    };

    return (
        <AppLayout>
            <Head title={`Profil de ${teacher.name}`} />

            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <Avatar className="h-32 w-32">
                                <AvatarImage src={teacher.teacherProfile?.photo} alt={teacher.name} />
                                <AvatarFallback className="text-2xl">
                                    {getInitials(teacher.name)}
                                </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 space-y-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-3xl font-bold">{teacher.name}</h1>
                                        {teacher.teacherProfile?.is_verified && (
                                            <Badge variant="default" className="bg-green-500">
                                                <CheckCircle className="mr-1 h-3 w-3" />
                                                Vérifié
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        {teacher.city || 'Ville non spécifiée'}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-6">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{(teacher.teacherProfile?.rating || 0).toFixed(1)}</p>
                                        <div className="flex">{renderStars(teacher.teacherProfile?.rating || 0)}</div>
                                        <p className="text-sm text-muted-foreground">{teacher.teacherProfile?.total_reviews || 0} avis</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{teacher.teacherProfile?.total_hours || 0}h</p>
                                        <p className="text-sm text-muted-foreground">Heures données</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{teacher.teacherProfile?.total_students || 0}</p>
                                        <p className="text-sm text-muted-foreground">Élèves</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{(teacher.teacherProfile?.hourly_rate || 0).toLocaleString()} GNF</p>
                                        <p className="text-sm text-muted-foreground">Tarif horaire</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Badge variant="outline" className="flex items-center gap-1">
                                        {teacher.teacherProfile?.teaching_mode === 'presentiel' ? (
                                            <Home className="h-3 w-3" />
                                        ) : teacher.teacherProfile?.teaching_mode === 'en_ligne' ? (
                                            <Globe className="h-3 w-3" />
                                        ) : (
                                            <>
                                                <Home className="h-3 w-3" />
                                                <Globe className="h-3 w-3" />
                                            </>
                                        )}
                                        {teacher.teacherProfile?.teaching_mode === 'both' 
                                            ? 'Présentiel & En ligne'
                                            : teacher.teacherProfile?.teaching_mode === 'presentiel'
                                            ? 'Présentiel'
                                            : 'En ligne'
                                        }
                                    </Badge>
                                    <Badge variant="outline">
                                        Membre depuis {format(new Date(teacher.created_at), 'MMMM yyyy', { locale: fr })}
                                    </Badge>
                                </div>
                            </div>

                            <div className="text-right">
                                <Link href={route('parent.booking.create', teacher.id)}>
                                    <Button size="lg" className="w-full md:w-auto">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Réserver un cours
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="about" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="about">À propos</TabsTrigger>
                        <TabsTrigger value="subjects">Matières</TabsTrigger>
                        <TabsTrigger value="availability">Disponibilités</TabsTrigger>
                                                                <TabsTrigger value="reviews">Avis ({teacher.teacherProfile?.total_reviews || 0})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="about" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Présentation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-line">{teacher.teacherProfile?.bio || 'Aucune description disponible'}</p>
                            </CardContent>
                        </Card>

                        {teacher.teacherProfile?.experiences && Array.isArray(teacher.teacherProfile.experiences) && teacher.teacherProfile.experiences.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Expériences</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {teacher.teacherProfile.experiences.map((exp: any, index: number) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
                                                <div>
                                                    <p className="font-medium">{exp.title}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {exp.institution} • {exp.years}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {teacher.teacherProfile?.diplomas && Array.isArray(teacher.teacherProfile.diplomas) && teacher.teacherProfile.diplomas.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Diplômes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {teacher.teacherProfile.diplomas.map((diploma: any, index: number) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
                                                <div>
                                                    <p className="font-medium">{diploma.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {diploma.institution} • {diploma.year}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Niveaux enseignés</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {teacher.teacherProfile?.levels?.map((level) => (
                                            <Badge key={level} variant="secondary">
                                                {level}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Zones desservies</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {teacher.teacherProfile?.zones?.map((zone) => (
                                            <Badge key={zone} variant="outline">
                                                <MapPin className="mr-1 h-3 w-3" />
                                                {zone}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="subjects" className="space-y-4">
                        {teacher.subjects?.map((subject) => (
                            <Card key={subject.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                                        <Badge variant="outline">
                                            {subject.pivot?.hourly_rate 
                                                ? `${subject.pivot.hourly_rate.toLocaleString()} GNF/h`
                                                : `${(teacher.teacherProfile?.hourly_rate || 0).toLocaleString()} GNF/h`
                                            }
                                        </Badge>
                                    </div>
                                    <CardDescription>{subject.category}</CardDescription>
                                </CardHeader>
                                {subject.pivot?.specialties && Array.isArray(subject.pivot.specialties) && subject.pivot.specialties.length > 0 && (
                                    <CardContent>
                                        <p className="text-sm font-medium mb-2">Spécialités :</p>
                                        <div className="flex flex-wrap gap-2">
                                            {subject.pivot.specialties.map((specialty, index) => (
                                                <Badge key={index} variant="secondary">
                                                    {specialty}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                )}
                            </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="availability" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Créneaux disponibles</CardTitle>
                                <CardDescription>
                                    Horaires récurrents du professeur
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {daysOfWeek.map((day, index) => {
                                        const dayAvailabilities = teacher.availabilities?.filter(
                                            (a) => a.day_of_week === index
                                        ) || [];

                                        return (
                                            <div key={index} className="border rounded-lg p-4">
                                                <h4 className="font-medium mb-2">{day}</h4>
                                                {dayAvailabilities.length === 0 ? (
                                                    <p className="text-sm text-muted-foreground">Non disponible</p>
                                                ) : (
                                                    <div className="space-y-1">
                                                        {dayAvailabilities.map((availability) => (
                                                            <div key={availability.id} className="flex items-center gap-2 text-sm">
                                                                <Clock className="h-3 w-3 text-muted-foreground" />
                                                                <span>
                                                                    {availability.start_time} - {availability.end_time}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews" className="space-y-4">
                        {!teacher.reviewsReceived || teacher.reviewsReceived.length === 0 ? (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Aucun avis pour le moment</h3>
                                    <p className="text-muted-foreground">
                                        Ce professeur n'a pas encore reçu d'avis.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Note moyenne</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <p className="text-4xl font-bold">{(teacher.teacherProfile?.rating || 0).toFixed(1)}</p>
                                                <div className="flex mt-1">{renderStars(teacher.teacherProfile?.rating || 0)}</div>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                <p>Basé sur {teacher.teacherProfile?.total_reviews || 0} avis</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="space-y-4">
                                    {teacher.reviewsReceived?.map((review) => (
                                        <Card key={review.id}>
                                            <CardContent className="pt-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <p className="font-medium">{review.parent.name}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className="flex">{renderStars(review.rating)}</div>
                                                            <span className="text-sm text-muted-foreground">
                                                                {format(new Date(review.created_at), 'dd MMMM yyyy', { locale: fr })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">{review.comment}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
} 