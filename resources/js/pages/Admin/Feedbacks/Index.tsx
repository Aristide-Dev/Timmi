import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type User, type PaginatedData } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Search, Eye, MessageSquare, Trash2, CheckCircle, XCircle, Reply } from 'lucide-react';
import { useState } from 'react';

interface Feedback {
    id: number;
    user_id: number;
    type: string;
    subject: string;
    message: string;
    status: string;
    priority: string;
    admin_response?: string;
    responded_at?: string;
    created_at: string;
    user: User;
}

interface FeedbacksIndexProps {
    feedbacks: PaginatedData<Feedback>;
    filters: {
        search?: string;
        type?: string;
        status?: string;
        priority?: string;
    };
}

export default function FeedbacksIndex({ feedbacks, filters }: FeedbacksIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [priorityFilter, setPriorityFilter] = useState(filters.priority || '');

    const handleSearch = () => {
        router.get(route('admin.feedbacks.index'), {
            search: search || undefined,
            type: typeFilter || undefined,
            status: statusFilter || undefined,
            priority: priorityFilter || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleStatusUpdate = (feedbackId: number, status: string) => {
        router.post(route('admin.feedbacks.update-status', feedbackId), {
            status: status,
        }, {
            preserveScroll: true,
        });
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'open':
                return 'secondary';
            case 'in_progress':
                return 'default';
            case 'resolved':
                return 'default';
            case 'closed':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'open':
                return 'Ouvert';
            case 'in_progress':
                return 'En cours';
            case 'resolved':
                return 'Résolu';
            case 'closed':
                return 'Fermé';
            default:
                return status;
        }
    };

    const getPriorityBadgeVariant = (priority: string) => {
        switch (priority) {
            case 'low':
                return 'outline';
            case 'medium':
                return 'secondary';
            case 'high':
                return 'destructive';
            case 'urgent':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'low':
                return 'Faible';
            case 'medium':
                return 'Moyenne';
            case 'high':
                return 'Élevée';
            case 'urgent':
                return 'Urgente';
            default:
                return priority;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'bug':
                return 'Bug';
            case 'feature':
                return 'Fonctionnalité';
            case 'improvement':
                return 'Amélioration';
            case 'complaint':
                return 'Plainte';
            case 'compliment':
                return 'Compliment';
            default:
                return type;
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Feedbacks', href: route('admin.feedbacks.index') },
            ]}
        >
            <Head title="Gestion des feedbacks" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Feedbacks</h1>
                        <p className="text-muted-foreground">
                            Gérez les retours et suggestions des utilisateurs
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.feedbacks.stats')}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Statistiques
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les feedbacks</CardDescription>
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
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="">Tous les types</option>
                                <option value="bug">Bug</option>
                                <option value="feature">Fonctionnalité</option>
                                <option value="improvement">Amélioration</option>
                                <option value="complaint">Plainte</option>
                                <option value="compliment">Compliment</option>
                            </select>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Tous les statuts</option>
                                <option value="open">Ouvert</option>
                                <option value="in_progress">En cours</option>
                                <option value="resolved">Résolu</option>
                                <option value="closed">Fermé</option>
                            </select>
                            <Button onClick={handleSearch} className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Feedbacks List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des feedbacks ({feedbacks.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {feedbacks.data.map((feedback) => (
                                <div
                                    key={feedback.id}
                                    className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={feedback.user.avatar} alt={feedback.user.name} />
                                        <AvatarFallback>
                                            {feedback.user.name.split(' ').map((n: string) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <p className="font-medium">{feedback.user.name}</p>
                                            <Badge variant={getStatusBadgeVariant(feedback.status)}>
                                                {getStatusLabel(feedback.status)}
                                            </Badge>
                                            <Badge variant={getPriorityBadgeVariant(feedback.priority)}>
                                                {getPriorityLabel(feedback.priority)}
                                            </Badge>
                                            <Badge variant="outline">
                                                {getTypeLabel(feedback.type)}
                                            </Badge>
                                        </div>
                                        <h4 className="font-medium text-sm">{feedback.subject}</h4>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {feedback.message}
                                        </p>
                                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                            <span>
                                                {new Date(feedback.created_at).toLocaleDateString('fr-FR')}
                                            </span>
                                            {feedback.responded_at && (
                                                <span>
                                                    Répondu le {new Date(feedback.responded_at).toLocaleDateString('fr-FR')}
                                                </span>
                                            )}
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
                                                    <Link href={route('admin.feedbacks.show', feedback.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Voir
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.feedbacks.reply', feedback.id)}>
                                                        <Reply className="mr-2 h-4 w-4" />
                                                        Répondre
                                                    </Link>
                                                </DropdownMenuItem>
                                                {feedback.status === 'open' && (
                                                    <DropdownMenuItem
                                                        onClick={() => handleStatusUpdate(feedback.id, 'in_progress')}
                                                        className="text-blue-600"
                                                    >
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Marquer en cours
                                                    </DropdownMenuItem>
                                                )}
                                                {feedback.status === 'in_progress' && (
                                                    <DropdownMenuItem
                                                        onClick={() => handleStatusUpdate(feedback.id, 'resolved')}
                                                        className="text-green-600"
                                                    >
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Marquer résolu
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusUpdate(feedback.id, 'closed')}
                                                    className="text-red-600"
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Fermer
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        if (confirm('Êtes-vous sûr de vouloir supprimer ce feedback ?')) {
                                                            router.delete(route('admin.feedbacks.destroy', feedback.id));
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
                        {feedbacks.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-muted-foreground">
                                    Affichage de {feedbacks.from} à {feedbacks.to} sur {feedbacks.total} résultats
                                </p>
                                <div className="flex space-x-2">
                                    {feedbacks.links.map((link: { active: boolean; url: string | null; label: string }, index: number) => (
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
