import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Search, Eye, Edit, Trash2, Plus, BookOpen, GraduationCap, Users, Calendar } from 'lucide-react';
import { useState } from 'react';

interface Subject {
    id: number;
    name: string;
    slug: string;
    description?: string;
    is_active: boolean;
    professors_count: number;
    created_at: string;
}

interface Level {
    id: number;
    name: string;
    slug: string;
    description?: string;
    is_active: boolean;
    professors_count: number;
    created_at: string;
}

interface Cycle {
    id: number;
    name: string;
    slug: string;
    description?: string;
    is_active: boolean;
    levels_count: number;
    created_at: string;
}

interface EducationIndexProps {
    subjects: Subject[];
    levels: Level[];
    cycles: Cycle[];
    filters: {
        search?: string;
        type?: 'subjects' | 'levels' | 'cycles';
    };
}

export default function EducationIndex({ subjects, levels, cycles, filters }: EducationIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || 'subjects');

    const handleSearch = () => {
        router.get(route('admin.education.index'), {
            search: search || undefined,
            type: typeFilter,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleToggleStatus = (id: number, type: 'subject' | 'level' | 'cycle') => {
        const routeName = `admin.${type}s.toggle-status`;
        router.post(route(routeName, id), {}, {
            preserveScroll: true,
        });
    };

    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(search.toLowerCase()) ||
        subject.slug.toLowerCase().includes(search.toLowerCase()) ||
        (subject.description && subject.description.toLowerCase().includes(search.toLowerCase()))
    );

    const filteredLevels = levels.filter(level =>
        level.name.toLowerCase().includes(search.toLowerCase()) ||
        level.slug.toLowerCase().includes(search.toLowerCase()) ||
        (level.description && level.description.toLowerCase().includes(search.toLowerCase()))
    );

    const filteredCycles = cycles.filter(cycle =>
        cycle.name.toLowerCase().includes(search.toLowerCase()) ||
        cycle.slug.toLowerCase().includes(search.toLowerCase()) ||
        (cycle.description && cycle.description.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Éducation', href: route('admin.education.index') },
            ]}
        >
            <Head title="Gestion de l'éducation" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Éducation</h1>
                        <p className="text-muted-foreground">
                            Gérez les matières, niveaux et cycles
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.subjects.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Nouvelle matière
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={route('admin.levels.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Nouveau niveau
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('admin.cycles.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Nouveau cycle
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les éléments éducatifs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                                placeholder="Rechercher..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value as 'subjects' | 'levels' | 'cycles')}
                            >
                                <option value="subjects">Matières</option>
                                <option value="levels">Niveaux</option>
                                <option value="cycles">Cycles</option>
                            </select>
                            <Button onClick={handleSearch} className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Subjects List */}
                {typeFilter === 'subjects' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Matières ({filteredSubjects.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {filteredSubjects.map((subject) => (
                                    <div
                                        key={subject.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                                                <BookOpen className="h-6 w-6 text-blue-500" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <p className="font-medium">{subject.name}</p>
                                                    <Badge variant={subject.is_active ? "default" : "secondary"}>
                                                        {subject.is_active ? 'Actif' : 'Inactif'}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {subject.description || 'Aucune description'}
                                                </p>
                                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center space-x-1">
                                                        <Users className="h-4 w-4" />
                                                        <span>{subject.professors_count} professeur(s)</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Créé le {new Date(subject.created_at).toLocaleDateString('fr-FR')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.subjects.show', subject.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Voir
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.subjects.edit', subject.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Modifier
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleToggleStatus(subject.id, 'subject')}
                                                        className="text-orange-600"
                                                    >
                                                        {subject.is_active ? 'Désactiver' : 'Activer'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            if (confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
                                                                router.delete(route('admin.subjects.destroy', subject.id));
                                                            }
                                                        }}
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredSubjects.length === 0 && (
                                <div className="text-center py-8">
                                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">Aucune matière trouvée</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Levels List */}
                {typeFilter === 'levels' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Niveaux ({filteredLevels.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {filteredLevels.map((level) => (
                                    <div
                                        key={level.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                                                <GraduationCap className="h-6 w-6 text-green-500" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <p className="font-medium">{level.name}</p>
                                                    <Badge variant={level.is_active ? "default" : "secondary"}>
                                                        {level.is_active ? 'Actif' : 'Inactif'}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {level.description || 'Aucune description'}
                                                </p>
                                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center space-x-1">
                                                        <Users className="h-4 w-4" />
                                                        <span>{level.professors_count} professeur(s)</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Créé le {new Date(level.created_at).toLocaleDateString('fr-FR')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.levels.show', level.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Voir
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.levels.edit', level.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Modifier
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleToggleStatus(level.id, 'level')}
                                                        className="text-orange-600"
                                                    >
                                                        {level.is_active ? 'Désactiver' : 'Activer'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            if (confirm('Êtes-vous sûr de vouloir supprimer ce niveau ?')) {
                                                                router.delete(route('admin.levels.destroy', level.id));
                                                            }
                                                        }}
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredLevels.length === 0 && (
                                <div className="text-center py-8">
                                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">Aucun niveau trouvé</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Cycles List */}
                {typeFilter === 'cycles' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Cycles ({filteredCycles.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {filteredCycles.map((cycle) => (
                                    <div
                                        key={cycle.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                                                <Calendar className="h-6 w-6 text-purple-500" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <p className="font-medium">{cycle.name}</p>
                                                    <Badge variant={cycle.is_active ? "default" : "secondary"}>
                                                        {cycle.is_active ? 'Actif' : 'Inactif'}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {cycle.description || 'Aucune description'}
                                                </p>
                                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center space-x-1">
                                                        <GraduationCap className="h-4 w-4" />
                                                        <span>{cycle.levels_count} niveau(x)</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Créé le {new Date(cycle.created_at).toLocaleDateString('fr-FR')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.cycles.show', cycle.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Voir
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.cycles.edit', cycle.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Modifier
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleToggleStatus(cycle.id, 'cycle')}
                                                        className="text-orange-600"
                                                    >
                                                        {cycle.is_active ? 'Désactiver' : 'Activer'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            if (confirm('Êtes-vous sûr de vouloir supprimer ce cycle ?')) {
                                                                router.delete(route('admin.cycles.destroy', cycle.id));
                                                            }
                                                        }}
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredCycles.length === 0 && (
                                <div className="text-center py-8">
                                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">Aucun cycle trouvé</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
