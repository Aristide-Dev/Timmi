import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Plus, X, Check } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    student_levels: Array<{
        id: number;
        name: string;
    }>;
}

interface Level {
    id: number;
    name: string;
    slug: string;
    description?: string;
    grade_level?: number;
    cycle?: {
        id: number;
        name: string;
    };
}

interface LevelsProps {
    user: User;
    levels: Level[];
}

export default function StudentLevels({ user, levels }: LevelsProps) {
    const [selectedLevels, setSelectedLevels] = useState<number[]>(
        user.student_levels.map(l => l.id)
    );

    const handleToggleLevel = (levelId: number) => {
        if (selectedLevels.includes(levelId)) {
            // Supprimer le niveau
            router.delete(route('student.levels.destroy', levelId), {
                onSuccess: () => {
                    setSelectedLevels(prev => prev.filter(id => id !== levelId));
                }
            });
        } else {
            // Ajouter le niveau
            router.post(route('student.levels.store'), {
                level_id: levelId
            }, {
                onSuccess: () => {
                    setSelectedLevels(prev => [...prev, levelId]);
                }
            });
        }
    };

    const isSelected = (levelId: number) => selectedLevels.includes(levelId);

    // Grouper les niveaux par cycle
    const levelsByCycle = levels.reduce((acc, level) => {
        const cycleName = level.cycle?.name || 'Autres';
        if (!acc[cycleName]) {
            acc[cycleName] = [];
        }
        acc[cycleName].push(level);
        return acc;
    }, {} as Record<string, Level[]>);

    return (
        <AppLayout>
            <Head title="Mes niveaux - Étudiant" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mes niveaux</h1>
                        <p className="text-muted-foreground">
                            Gérez vos niveaux d'étude
                        </p>
                    </div>
                </div>

                {/* Niveaux sélectionnés */}
                {user.student_levels.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Niveaux sélectionnés</CardTitle>
                            <CardDescription>
                                Les niveaux que vous étudiez actuellement
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {user.student_levels.map((level) => (
                                    <Badge key={level.id} variant="secondary" className="text-sm">
                                        <GraduationCap className="h-3 w-3 mr-1" />
                                        {level.name}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-4 w-4 p-0 ml-2 hover:bg-destructive hover:text-destructive-foreground"
                                            onClick={() => handleToggleLevel(level.id)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Tous les niveaux disponibles par cycle */}
                {Object.entries(levelsByCycle).map(([cycleName, cycleLevels]) => (
                    <Card key={cycleName}>
                        <CardHeader>
                            <CardTitle>{cycleName}</CardTitle>
                            <CardDescription>
                                Cliquez sur un niveau pour l'ajouter ou le retirer de vos préférences
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {cycleLevels.map((level) => (
                                    <div
                                        key={level.id}
                                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                            isSelected(level.id)
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/50'
                                        }`}
                                        onClick={() => handleToggleLevel(level.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                    isSelected(level.id)
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-muted text-muted-foreground'
                                                }`}>
                                                    <GraduationCap className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">{level.name}</h3>
                                                    {level.description && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {level.description}
                                                        </p>
                                                    )}
                                                    {level.grade_level && (
                                                        <p className="text-xs text-muted-foreground">
                                                            Niveau {level.grade_level}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                {isSelected(level.id) ? (
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
                ))}

                {/* Message si aucun niveau sélectionné */}
                {user.student_levels.length === 0 && (
                    <Card>
                        <CardContent className="text-center py-12">
                            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Aucun niveau sélectionné</h3>
                            <p className="text-muted-foreground mb-4">
                                Sélectionnez vos niveaux d'étude pour personnaliser votre expérience.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
