import { Head, useForm, router } from '@inertiajs/react';
import { Search, MapPin, BookOpen, Clock, Star, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';

type Subject = {
    id: number;
    name: string;
    slug: string;
    category: string;
};

type TeacherProfile = {
    bio: string;
    hourly_rate: number;
    rating: number;
    total_reviews: number;
    total_hours: number;
    is_verified: boolean;
    teaching_mode: 'presentiel' | 'en_ligne' | 'both';
    zones: string[];
    levels: string[];
};

type Teacher = {
    id: number;
    name: string;
    city: string;
    teacherProfile: TeacherProfile;
    subjects: Subject[];
    reviewsReceived: any[];
};

type Filters = {
    subject_id?: string;
    level?: string;
    zone?: string;
    teaching_mode?: string;
};

interface SearchTeachersProps extends PageProps {
    teachers: {
        data: Teacher[];
        links: any[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            from: number;
            to: number;
        };
    };
    subjects: Subject[];
    filters: Filters;
}

export default function SearchTeachers({ auth, teachers, subjects, filters }: SearchTeachersProps) {
    // Fallback pour éviter les erreurs si les données ne sont pas encore chargées
    const safeTeachers = teachers || {
        data: [],
        links: [],
        meta: {
            current_page: 1,
            last_page: 1,
            per_page: 12,
            total: 0,
            from: 0,
            to: 0
        }
    };
    const { data, setData } = useForm<Filters>({
        subject_id: filters.subject_id || '',
        level: filters.level || '',
        zone: filters.zone || '',
        teaching_mode: filters.teaching_mode || '',
    });

    const levels = ['Primaire', 'Collège', 'Lycée'];
    const zones = ['Plateau', 'Almadies', 'Mermoz', 'Sacré-Cœur', 'Point E', 'Fann', 'Médina', 'Liberté'];

    const handleSearch = () => {
        router.get(route('parent.search'), data, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setData({
            subject_id: '',
            level: '',
            zone: '',
            teaching_mode: '',
        });
        router.get(route('parent.search'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Rechercher un professeur" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Trouver un professeur</h1>
                    <p className="text-muted-foreground">
                        Recherchez parmi nos professeurs vérifiés et qualifiés
                    </p>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filtres de recherche
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="subject">Matière</Label>
                                <select
                                    id="subject"
                                    value={data.subject_id}
                                    onChange={(e) => setData('subject_id', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Toutes les matières</option>
                                    {subjects.map((subject) => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="level">Niveau</Label>
                                <select
                                    id="level"
                                    value={data.level}
                                    onChange={(e) => setData('level', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Tous les niveaux</option>
                                    {levels.map((level) => (
                                        <option key={level} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="zone">Zone</Label>
                                <select
                                    id="zone"
                                    value={data.zone}
                                    onChange={(e) => setData('zone', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Toutes les zones</option>
                                    {zones.map((zone) => (
                                        <option key={zone} value={zone}>
                                            {zone}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="teaching_mode">Mode d'enseignement</Label>
                                <select
                                    id="teaching_mode"
                                    value={data.teaching_mode}
                                    onChange={(e) => setData('teaching_mode', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Tous les modes</option>
                                    <option value="presentiel">Présentiel</option>
                                    <option value="en_ligne">En ligne</option>
                                    <option value="both">Les deux</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <Button onClick={handleSearch}>
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                            <Button variant="outline" onClick={clearFilters}>
                                Effacer les filtres
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        {safeTeachers.meta?.total || 0} professeur{(safeTeachers.meta?.total || 0) > 1 ? 's' : ''} trouvé{(safeTeachers.meta?.total || 0) > 1 ? 's' : ''}
                    </p>

                    {!safeTeachers.data || safeTeachers.data.length === 0 ? (
                        <Card className="text-center py-12">
                            <CardContent>
                                <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Aucun professeur trouvé</h3>
                                <p className="text-muted-foreground">
                                    Essayez de modifier vos critères de recherche
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {safeTeachers.data?.map((teacher) => (
                                <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">{teacher.name}</CardTitle>
                                                <CardDescription>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {teacher.city || 'Ville non spécifiée'}
                                                    </span>
                                                </CardDescription>
                                            </div>
                                            {teacher.teacherProfile?.is_verified && (
                                                <Badge variant="default" className="bg-green-500">
                                                    Vérifié
                                                </Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {teacher.teacherProfile?.bio || 'Aucune description disponible'}
                                        </p>

                                        {/* Subjects */}
                                        <div className="flex flex-wrap gap-2">
                                            {teacher.subjects?.map((subject) => (
                                                <Badge key={subject.id} variant="secondary">
                                                    {subject.name}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <div>
                                                <p className="text-2xl font-bold">{teacher.teacherProfile?.total_hours || 0}</p>
                                                <p className="text-xs text-muted-foreground">Heures données</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold flex items-center justify-center gap-1">
                                                    {(teacher.teacherProfile?.rating || 0).toFixed(1)}
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                </p>
                                                <p className="text-xs text-muted-foreground">Note moyenne</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold">{teacher.teacherProfile?.total_reviews || 0}</p>
                                                <p className="text-xs text-muted-foreground">Avis</p>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Tarif horaire</span>
                                                <span className="font-semibold">{(teacher.teacherProfile?.hourly_rate || 0).toLocaleString()} GNF</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Mode</span>
                                                <Badge variant="outline">
                                                    {teacher.teacherProfile?.teaching_mode === 'both' 
                                                        ? 'Présentiel & En ligne'
                                                        : teacher.teacherProfile?.teaching_mode === 'presentiel'
                                                        ? 'Présentiel'
                                                        : 'En ligne'
                                                    }
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Levels */}
                                        <div className="flex flex-wrap gap-1">
                                            {teacher.teacherProfile?.levels?.map((level) => (
                                                <Badge key={level} variant="outline" className="text-xs">
                                                    {level}
                                                </Badge>
                                            ))}
                                        </div>

                                        <Button className="w-full" onClick={() => router.visit(route('parent.teacher.view', teacher.id))}>
                                            Voir le profil
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {safeTeachers.meta?.last_page > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {safeTeachers.links?.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
} 