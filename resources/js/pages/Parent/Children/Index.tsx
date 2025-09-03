import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type Child } from '@/types/global';
import { Head, router } from '@inertiajs/react';
import { 
    Plus,
    Edit,
    Trash2,
    User,
    Calendar,
    BookOpen,
    Award
} from 'lucide-react';

interface Props {
    children: Child[];
}

export default function ChildrenIndex({ children }: Props) {
    const handleDelete = (childId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce profil d\'enfant ? Cette action est irréversible.')) {
            router.delete(route('parent.children.destroy', childId));
        }
    };

    return (
        <AppLayout>
            <Head title="Mes Enfants" />
            
            <div className="container py-8">
                {/* En-tête */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Mes Enfants</h1>
                        <p className="text-gray-600 mt-2">
                            Gérez les profils de vos enfants pour faciliter les réservations
                        </p>
                    </div>
                    <Button onClick={() => router.get(route('parent.children.create'))}>
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un enfant
                    </Button>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <User className="h-8 w-8 text-blue-500" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total enfants</p>
                                    <p className="text-2xl font-bold">{children.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <Calendar className="h-8 w-8 text-green-500" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Sessions actives</p>
                                    <p className="text-2xl font-bold">
                                        {children.reduce((total, child) => total + (child.active_sessions || 0), 0)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <Award className="h-8 w-8 text-yellow-500" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Sessions terminées</p>
                                    <p className="text-2xl font-bold">
                                        {children.reduce((total, child) => total + (child.completed_sessions || 0), 0)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Liste des enfants */}
                {children.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {children.map((child) => (
                            <Card key={child.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                            {child.avatar ? (
                                                <img 
                                                    src={child.avatar} 
                                                    alt={child.name}
                                                    className="w-14 h-14 rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-blue-600 font-medium text-xl">
                                                    {child.name.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg">{child.name}</CardTitle>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline">{child.age} ans</Badge>
                                                <Badge variant="secondary">{child.grade_level}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {/* Statistiques de l'enfant */}
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <span>{child.active_sessions || 0} sessions actives</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="h-4 w-4 text-gray-500" />
                                                <span>{child.completed_sessions || 0} terminées</span>
                                            </div>
                                        </div>

                                        {/* Statut */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Statut</span>
                                            <Badge 
                                                variant={child.is_active ? "default" : "secondary"}
                                                className={child.is_active ? "bg-green-600" : ""}
                                            >
                                                {child.is_active ? 'Actif' : 'Inactif'}
                                            </Badge>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-3 border-t">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => router.get(route('parent.children.edit', child.id))}
                                            >
                                                <Edit className="h-4 w-4 mr-1" />
                                                Modifier
                                            </Button>
                                            <Button 
                                                variant="destructive" 
                                                size="sm"
                                                onClick={() => handleDelete(child.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="text-center py-12">
                            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun enfant enregistré</h3>
                            <p className="text-gray-600 mb-4">
                                Ajoutez le profil de vos enfants pour faciliter les réservations de cours.
                            </p>
                            <Button onClick={() => router.get(route('parent.children.create'))}>
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter un enfant
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
