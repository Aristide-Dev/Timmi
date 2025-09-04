import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type User, type PaginatedData } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Search, Eye, Edit, Trash2, Calendar, Clock, BookOpen, GraduationCap, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

interface Session {
    id: number;
    booking_id: number;
    status: string;
    scheduled_at: string;
    duration: number;
    notes?: string;
    meeting_link?: string;
    professor: User;
    parent: User;
    subject: { name: string };
    level: { name: string };
    child: { name: string };
    created_at: string;
}

interface SessionsIndexProps {
    sessions: PaginatedData<Session>;
    filters: {
        search?: string;
        status?: string;
        professor?: number;
        parent?: number;
        date_from?: string;
        date_to?: string;
    };
}

export default function SessionsIndex({ sessions, filters }: SessionsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    const handleSearch = () => {
        router.get(route('admin.sessions.index'), {
            search: search || undefined,
            status: statusFilter || undefined,
            date_from: dateFrom || undefined,
            date_to: dateTo || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleStatusUpdate = (sessionId: number, status: string) => {
        router.post(route('admin.sessions.update-status', sessionId), {
            status: status,
        }, {
            preserveScroll: true,
        });
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'secondary';
            case 'in_progress':
                return 'default';
            case 'completed':
                return 'default';
            case 'cancelled':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'Programmée';
            case 'in_progress':
                return 'En cours';
            case 'completed':
                return 'Terminée';
            case 'cancelled':
                return 'Annulée';
            default:
                return status;
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Sessions', href: route('admin.sessions.index') },
            ]}
        >
            <Head title="Gestion des sessions" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
                        <p className="text-muted-foreground">
                            Gérez toutes les sessions de cours
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.sessions.stats')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Statistiques
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Input
                                placeholder="Rechercher..."
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
                                <option value="scheduled">Programmée</option>
                                <option value="in_progress">En cours</option>
                                <option value="completed">Terminée</option>
                                <option value="cancelled">Annulée</option>
                            </select>
                            <Input
                                type="date"
                                placeholder="Date de début"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                            />
                            <Button onClick={handleSearch} className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Sessions List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des sessions ({sessions.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {sessions.data.map((session) => (
                                <div
                                    key={session.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                                            <Calendar className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium">
                                                    {session.professor.name} → {session.parent.name}
                                                </p>
                                                <Badge variant={getStatusBadgeVariant(session.status)}>
                                                    {getStatusLabel(session.status)}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <BookOpen className="h-4 w-4" />
                                                    <span>{session.subject.name}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <GraduationCap className="h-4 w-4" />
                                                    <span>{session.level.name}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <UserIcon className="h-4 w-4" />
                                                    <span>{session.child.name}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{session.duration} min</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(session.scheduled_at).toLocaleString('fr-FR')}
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
                                                    <Link href={route('admin.sessions.show', session.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Voir
                                                    </Link>
                                                </DropdownMenuItem>
                                                {session.status === 'scheduled' && (
                                                    <DropdownMenuItem
                                                        onClick={() => handleStatusUpdate(session.id, 'in_progress')}
                                                    >
                                                        <Clock className="mr-2 h-4 w-4" />
                                                        Démarrer
                                                    </DropdownMenuItem>
                                                )}
                                                {session.status === 'in_progress' && (
                                                    <DropdownMenuItem
                                                        onClick={() => handleStatusUpdate(session.id, 'completed')}
                                                    >
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        Terminer
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        if (confirm('Êtes-vous sûr de vouloir supprimer cette session ?')) {
                                                            router.delete(route('admin.sessions.destroy', session.id));
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

                        {/* Pagination */}
                        {sessions.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-muted-foreground">
                                    Affichage de {sessions.from} à {sessions.to} sur {sessions.total} résultats
                                </p>
                                <div className="flex space-x-2">
                                    {sessions.links.map((link: { active: boolean; url: string | null; label: string }, index: number) => (
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
