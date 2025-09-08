import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Calendar, GraduationCap, MapPin, BookOpen, Edit, School, Target } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    age?: number;
    grade_level?: string;
    school?: string;
    learning_goals?: string;
    student_subjects: Array<{
        id: number;
        name: string;
    }>;
    student_levels: Array<{
        id: number;
        name: string;
    }>;
    student_cities: Array<{
        id: number;
        name: string;
    }>;
    parent?: {
        id: number;
        name: string;
        email: string;
    };
}

interface ProfileProps {
    user: User;
    subjects: Array<{
        id: number;
        name: string;
    }>;
    levels: Array<{
        id: number;
        name: string;
    }>;
    cities: Array<{
        id: number;
        name: string;
    }>;
}

export default function StudentProfile({ user, subjects, levels, cities }: ProfileProps) {
    return (
        <AppLayout>
            <Head title="Mon profil - Étudiant" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mon profil</h1>
                        <p className="text-muted-foreground">
                            Gérez vos informations personnelles et préférences
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('student.profile.edit')}>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Informations personnelles */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations personnelles</CardTitle>
                            <CardDescription>
                                Vos données de base
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Nom complet</p>
                                    <p className="text-sm text-muted-foreground">{user.name}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                            
                            {user.phone && (
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Téléphone</p>
                                        <p className="text-sm text-muted-foreground">{user.phone}</p>
                                    </div>
                                </div>
                            )}
                            
                            {user.age && (
                                <div className="flex items-center space-x-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Âge</p>
                                        <p className="text-sm text-muted-foreground">{user.age} ans</p>
                                    </div>
                                </div>
                            )}
                            
                            {user.grade_level && (
                                <div className="flex items-center space-x-3">
                                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Niveau scolaire</p>
                                        <p className="text-sm text-muted-foreground">{user.grade_level}</p>
                                    </div>
                                </div>
                            )}
                            
                            {user.school && (
                                <div className="flex items-center space-x-3">
                                    <School className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">École</p>
                                        <p className="text-sm text-muted-foreground">{user.school}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Objectifs d'apprentissage */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Objectifs d'apprentissage</CardTitle>
                            <CardDescription>
                                Vos objectifs et motivations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user.learning_goals ? (
                                <div className="flex items-start space-x-3">
                                    <Target className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <p className="text-sm text-muted-foreground">{user.learning_goals}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">
                                    Aucun objectif défini
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Matières préférées */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Matières préférées</CardTitle>
                            <CardDescription>
                                Les matières qui vous intéressent
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user.student_subjects.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {user.student_subjects.map((subject) => (
                                        <Badge key={subject.id} variant="secondary">
                                            <BookOpen className="h-3 w-3 mr-1" />
                                            {subject.name}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">
                                    Aucune matière sélectionnée
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Niveaux préférés */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Niveaux préférés</CardTitle>
                            <CardDescription>
                                Les niveaux que vous souhaitez étudier
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user.student_levels.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {user.student_levels.map((level) => (
                                        <Badge key={level.id} variant="outline">
                                            <GraduationCap className="h-3 w-3 mr-1" />
                                            {level.name}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">
                                    Aucun niveau sélectionné
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Villes préférées */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Zones géographiques</CardTitle>
                            <CardDescription>
                                Les villes où vous souhaitez prendre des cours
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user.student_cities.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {user.student_cities.map((city) => (
                                        <Badge key={city.id} variant="outline">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {city.name}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">
                                    Aucune ville sélectionnée
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Parent associé */}
                    {user.parent && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Parent associé</CardTitle>
                                <CardDescription>
                                    Votre parent de référence
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">{user.parent.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.parent.email}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
