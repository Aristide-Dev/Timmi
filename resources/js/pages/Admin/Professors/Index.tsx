import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type User, type PaginatedData } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Search, Eye, CheckCircle, XCircle, Star, MapPin, BookOpen, GraduationCap } from 'lucide-react';
import { useState } from 'react';

interface ProfessorsIndexProps {
    professors: PaginatedData<User>;
    filters: {
        search?: string;
        status?: string;
        verified?: boolean;
        available?: boolean;
        subject?: number;
        level?: number;
        city?: number;
    };
}

export default function ProfessorsIndex({ professors, filters }: ProfessorsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [verifiedFilter, setVerifiedFilter] = useState(filters.verified);
    const [availableFilter] = useState(filters.available);

    const handleSearch = () => {
        router.get(route('admin.professors.index'), {
            search: search || undefined,
            status: statusFilter || undefined,
            verified: verifiedFilter,
            available: availableFilter,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleApprove = (professorId: number) => {
        router.post(route('admin.professors.approve', professorId), {}, {
            preserveScroll: true,
        });
    };

    const handleReject = (professorId: number) => {
        router.post(route('admin.professors.reject', professorId), {}, {
            preserveScroll: true,
        });
    };

    const handleToggleStatus = (professorId: number) => {
        router.post(route('admin.professors.toggle-status', professorId), {}, {
            preserveScroll: true,
        });
    };

    const getStatusBadgeVariant = (professor: User) => {
        if (!professor.email_verified_at) return 'destructive';
        return 'default';
    };

    const getStatusLabel = (professor: User) => {
        if (!professor.email_verified_at) return 'Non vérifié';
        return 'Actif';
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Professeurs', href: route('admin.professors.index') },
            ]}
        >
            <Head title="Gestion des professeurs" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Professeurs</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les professeurs de la plateforme
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les professeurs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Input
                                placeholder="Rechercher par nom, email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Tous les statuts</option>
                                <option value="verified">Vérifiés</option>
                                <option value="unverified">Non vérifiés</option>
                                <option value="active">Actifs</option>
                                <option value="inactive">Inactifs</option>
                            </select>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="verified"
                                    checked={verifiedFilter || false}
                                    onChange={(e) => setVerifiedFilter(e.target.checked)}
                                />
                                <label htmlFor="verified" className="text-sm">Vérifiés uniquement</label>
                            </div>
                            <Button onClick={handleSearch} className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Professors List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des professeurs ({professors.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {professors.data.map((professor) => (
                                <div
                                    key={professor.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={professor.avatar} alt={professor.name} />
                                            <AvatarFallback>
                                                {professor.name.split(' ').map((n: string) => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium">{professor.name}</p>
                                                {professor.email_verified_at && (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{professor.email}</p>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <Star className="h-4 w-4" />
                                                    <span>{professor.rating && typeof professor.rating === 'number' ? professor.rating.toFixed(1) : 'N/A'}</span>
                                                    <span>({professor.total_reviews || 0})</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <BookOpen className="h-4 w-4" />
                                                    <span>0 matières</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <GraduationCap className="h-4 w-4" />
                                                    <span>0 niveaux</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>0 villes</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Badge variant={getStatusBadgeVariant(professor)}>
                                                    {getStatusLabel(professor)}
                                                </Badge>
                                                <Badge variant="outline">
                                                    0 GNF/h
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {!professor.email_verified_at && (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleApprove(professor.id)}
                                                    className="text-green-600"
                                                >
                                                    <CheckCircle className="mr-1 h-4 w-4" />
                                                    Approuver
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleReject(professor.id)}
                                                    className="text-red-600"
                                                >
                                                    <XCircle className="mr-1 h-4 w-4" />
                                                    Rejeter
                                                </Button>
                                            </>
                                        )}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.professors.show', professor.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Voir
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleToggleStatus(professor.id)}
                                                    className="text-orange-600"
                                                >
                                                    Suspendre/Activer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {professors.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-muted-foreground">
                                    Affichage de {professors.from} à {professors.to} sur {professors.total} résultats
                                </p>
                                <div className="flex space-x-2">
                                    {professors.links.map((link: { active: boolean; url: string | null; label: string }, index: number) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? "default" : "outline"}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                        >
                                            {link.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
