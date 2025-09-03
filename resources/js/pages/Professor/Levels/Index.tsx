import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    GraduationCap, 
    Plus,
    Trash2,
    ArrowLeft
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Level, PagePropsWithData } from '@/types/global';
import AppLayout from '@/layouts/app-layout';

interface Props extends PagePropsWithData {
    user_levels: Level[];
    available_levels: Level[];
}

export default function ProfessorLevels({ user_levels, available_levels, errors }: Props) {
    const { delete: destroy, processing } = useForm();

    const handleAddLevel = (levelId: number) => {
        router.post(route('professor.levels.store'), {
            level_id: levelId,
        });
    };

    const handleRemoveLevel = (levelId: number) => {
        destroy(route('professor.levels.destroy', levelId));
    };

    return (
        <AppLayout>
            <Head title="Mes Niveaux - Professeur" />
            
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
                            <h1 className="text-3xl font-bold tracking-tight">Mes Niveaux</h1>
                            <p className="text-muted-foreground">
                                Gérez les niveaux scolaires que vous enseignez
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Niveaux actuels */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Mes niveaux actuels
                            </CardTitle>
                            <CardDescription>
                                Les niveaux scolaires que vous enseignez actuellement
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user_levels.length > 0 ? (
                                <div className="space-y-3">
                                    {user_levels.map((level) => (
                                        <div key={level.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <GraduationCap className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{level.name}</p>
                                                    {level.cycle && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {level.cycle.name}
                                                        </Badge>
                                                    )}
                                                    {level.description && (
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {level.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveLevel(level.id)}
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
                                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        Aucun niveau ajouté
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Ajoutez des niveaux pour définir votre champ d'enseignement
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Niveaux disponibles */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                Niveaux disponibles
                            </CardTitle>
                            <CardDescription>
                                Ajoutez de nouveaux niveaux à votre profil
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {available_levels.length > 0 ? (
                                <div className="space-y-3">
                                    {available_levels.map((level) => (
                                        <div key={level.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{level.name}</p>
                                                    {level.cycle && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {level.cycle.name}
                                                        </Badge>
                                                    )}
                                                    {level.description && (
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {level.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleAddLevel(level.id)}
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
                                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        Tous les niveaux sont déjà ajoutés
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
                                <p className="text-2xl font-bold text-primary">{user_levels.length}</p>
                                <p className="text-sm text-muted-foreground">Niveaux enseignés</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">{available_levels.length}</p>
                                <p className="text-sm text-muted-foreground">Niveaux disponibles</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">
                                    {user_levels.length + available_levels.length}
                                </p>
                                <p className="text-sm text-muted-foreground">Total des niveaux</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
