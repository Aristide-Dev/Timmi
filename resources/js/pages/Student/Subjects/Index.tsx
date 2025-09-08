import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, X, Check } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    student_subjects: Array<{
        id: number;
        name: string;
    }>;
}

interface Subject {
    id: number;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    color?: string;
}

interface SubjectsProps {
    user: User;
    subjects: Subject[];
}

export default function StudentSubjects({ user, subjects }: SubjectsProps) {
    const [selectedSubjects, setSelectedSubjects] = useState<number[]>(
        user.student_subjects.map(s => s.id)
    );

    const handleToggleSubject = (subjectId: number) => {
        if (selectedSubjects.includes(subjectId)) {
            // Supprimer la matière
            router.delete(route('student.subjects.destroy', subjectId), {
                onSuccess: () => {
                    setSelectedSubjects(prev => prev.filter(id => id !== subjectId));
                }
            });
        } else {
            // Ajouter la matière
            router.post(route('student.subjects.store'), {
                subject_id: subjectId
            }, {
                onSuccess: () => {
                    setSelectedSubjects(prev => [...prev, subjectId]);
                }
            });
        }
    };

    const isSelected = (subjectId: number) => selectedSubjects.includes(subjectId);

    return (
        <AppLayout>
            <Head title="Mes matières - Étudiant" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mes matières</h1>
                        <p className="text-muted-foreground">
                            Gérez vos matières d'intérêt
                        </p>
                    </div>
                </div>

                {/* Matières sélectionnées */}
                {user.student_subjects.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Matières sélectionnées</CardTitle>
                            <CardDescription>
                                Les matières que vous étudiez actuellement
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {user.student_subjects.map((subject) => (
                                    <Badge key={subject.id} variant="secondary" className="text-sm">
                                        <BookOpen className="h-3 w-3 mr-1" />
                                        {subject.name}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-4 w-4 p-0 ml-2 hover:bg-destructive hover:text-destructive-foreground"
                                            onClick={() => handleToggleSubject(subject.id)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Toutes les matières disponibles */}
                <Card>
                    <CardHeader>
                        <CardTitle>Toutes les matières</CardTitle>
                        <CardDescription>
                            Cliquez sur une matière pour l'ajouter ou la retirer de vos préférences
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {subjects.map((subject) => (
                                <div
                                    key={subject.id}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                        isSelected(subject.id)
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50'
                                    }`}
                                    onClick={() => handleToggleSubject(subject.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                isSelected(subject.id)
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted text-muted-foreground'
                                            }`}>
                                                <BookOpen className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{subject.name}</h3>
                                                {subject.description && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {subject.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {isSelected(subject.id) ? (
                                                <Check className="h-5 w-5 text-primary" />
                                            ) : (
                                                <Plus className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Message si aucune matière sélectionnée */}
                {user.student_subjects.length === 0 && (
                    <Card>
                        <CardContent className="text-center py-12">
                            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Aucune matière sélectionnée</h3>
                            <p className="text-muted-foreground mb-4">
                                Sélectionnez vos matières d'intérêt pour personnaliser votre expérience.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
