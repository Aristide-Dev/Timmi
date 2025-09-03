import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { 
    BookOpen, 
    Plus,
    Trash2,
    ArrowLeft
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Subject, PagePropsWithData } from '@/types/global';
import AppLayout from '@/layouts/app-layout';

interface Props extends PagePropsWithData {
    user_subjects: Subject[];
    available_subjects: Subject[];
}

export default function ProfessorSubjects({ user_subjects, available_subjects, errors }: Props) {
    const { delete: destroy, processing } = useForm();

    const handleAddSubject = (subjectId: number) => {
        console.log('Adding subject with ID:', subjectId);
        router.post(route('professor.subjects.store'), {
            subject_id: subjectId,
        });
    };

    const handleRemoveSubject = (subjectId: number) => {
        destroy(route('professor.subjects.destroy', subjectId));
    };

    return (
        <AppLayout>
            <Head title="Mes Matières - Professeur" />
            
            <div className="space-y-6">
                {/* Affichage des erreurs */}
                {errors && Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <h3 className="text-sm font-medium text-red-800 mb-2">Erreurs de validation :</h3>
                        <ul className="text-sm text-red-700 space-y-1">
                            {Object.entries(errors).map(([field, message]) => (
                                <li key={field}>• {message}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('professor.dashboard')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Mes Matières</h1>
                            <p className="text-muted-foreground">
                                Gérez les matières que vous enseignez
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Matières actuelles */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Mes matières actuelles
                            </CardTitle>
                            <CardDescription>
                                Les matières que vous enseignez actuellement
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user_subjects.length > 0 ? (
                                <div className="space-y-3">
                                    {user_subjects.map((subject) => (
                                        <div key={subject.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <BookOpen className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{subject.name}</p>
                                                    {subject.description && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {subject.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveSubject(subject.id)}
                                                disabled={processing}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        Aucune matière ajoutée
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Ajoutez des matières pour commencer à enseigner
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Matières disponibles */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                Matières disponibles
                            </CardTitle>
                            <CardDescription>
                                Ajoutez de nouvelles matières à votre profil
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {available_subjects.length > 0 ? (
                                <div className="space-y-3">
                                    {available_subjects.map((subject) => (
                                        <div key={subject.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{subject.name}</p>
                                                    {subject.description && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {subject.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleAddSubject(subject.id)}
                                                disabled={processing}
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Ajouter
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        Toutes les matières sont déjà ajoutées
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Statistiques */}
                <Card>
                    <CardHeader>
                        <CardTitle>Statistiques</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">{user_subjects.length}</p>
                                <p className="text-sm text-muted-foreground">Matières enseignées</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">{available_subjects.length}</p>
                                <p className="text-sm text-muted-foreground">Matières disponibles</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">
                                    {user_subjects.length + available_subjects.length}
                                </p>
                                <p className="text-sm text-muted-foreground">Total des matières</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
