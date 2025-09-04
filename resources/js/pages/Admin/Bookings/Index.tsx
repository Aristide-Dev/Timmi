import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type User, type PaginatedData } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Search, Eye, Trash2, Calendar, DollarSign, User as UserIcon, BookOpen, GraduationCap } from 'lucide-react';
import { useState } from 'react';

interface BookingsIndexProps {
    bookings: PaginatedData<{
        id: number;
        professor: User;
        parent: User;
        child: { name: string };
        subject: { name: string };
        level: { name: string };
        total_price: number;
        status: string;
        payment_status?: string;
        created_at: string;
    }>;
    subjects: Array<{ id: number; name: string }>;
    levels: Array<{ id: number; name: string }>;
    professors: User[];
    parents: User[];
    filters: {
        search?: string;
        status?: string;
        payment_status?: string;
        subject?: number;
        level?: number;
        professor?: number;
        parent?: number;
        date_from?: string;
        date_to?: string;
        price_min?: number;
        price_max?: number;
    };
}

export default function BookingsIndex({ bookings, subjects, levels, filters }: BookingsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [paymentStatusFilter, setPaymentStatusFilter] = useState(filters.payment_status || '');
    const [subjectFilter, setSubjectFilter] = useState(filters.subject || '');
    const [levelFilter, setLevelFilter] = useState(filters.level || '');
    // const [professorFilter, setProfessorFilter] = useState(filters.professor || '');
    // const [parentFilter, setParentFilter] = useState(filters.parent || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');
    // const [priceMin, setPriceMin] = useState(filters.price_min || '');
    // const [priceMax, setPriceMax] = useState(filters.price_max || '');

    const handleSearch = () => {
        router.get(route('admin.bookings.index'), {
            search: search || undefined,
            status: statusFilter || undefined,
            payment_status: paymentStatusFilter || undefined,
            subject: subjectFilter || undefined,
            level: levelFilter || undefined,
            date_from: dateFrom || undefined,
            date_to: dateTo || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'pending':
                return 'secondary';
            case 'confirmed':
                return 'default';
            case 'completed':
                return 'default';
            case 'cancelled':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getPaymentStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'pending':
                return 'secondary';
            case 'paid':
                return 'default';
            case 'refunded':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'En attente';
            case 'confirmed':
                return 'Confirmée';
            case 'completed':
                return 'Terminée';
            case 'cancelled':
                return 'Annulée';
            default:
                return status;
        }
    };

    const getPaymentStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'En attente';
            case 'paid':
                return 'Payé';
            case 'refunded':
                return 'Remboursé';
            default:
                return status;
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Réservations', href: route('admin.bookings.index') },
            ]}
        >
            <Head title="Gestion des réservations" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Réservations</h1>
                        <p className="text-muted-foreground">
                            Gérez toutes les réservations de la plateforme
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.bookings.stats')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Statistiques
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={route('admin.bookings.export')}>
                                <DollarSign className="mr-2 h-4 w-4" />
                                Exporter
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les réservations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
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
                                <option value="pending">En attente</option>
                                <option value="confirmed">Confirmée</option>
                                <option value="completed">Terminée</option>
                                <option value="cancelled">Annulée</option>
                            </select>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={paymentStatusFilter}
                                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                            >
                                <option value="">Tous les paiements</option>
                                <option value="pending">En attente</option>
                                <option value="paid">Payé</option>
                                <option value="refunded">Remboursé</option>
                            </select>
                            <Button onClick={handleSearch} className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={subjectFilter}
                                onChange={(e) => setSubjectFilter(e.target.value)}
                            >
                                <option value="">Toutes les matières</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={levelFilter}
                                onChange={(e) => setLevelFilter(e.target.value)}
                            >
                                <option value="">Tous les niveaux</option>
                                {levels.map((level) => (
                                    <option key={level.id} value={level.id}>
                                        {level.name}
                                    </option>
                                ))}
                            </select>
                            <Input
                                type="date"
                                placeholder="Date de début"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                            />
                            <Input
                                type="date"
                                placeholder="Date de fin"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Bookings List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des réservations ({bookings.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {bookings.data.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium">
                                                    {booking.professor.name} → {booking.parent.name}
                                                </p>
                                                <Badge variant={getStatusBadgeVariant(booking.status)}>
                                                    {getStatusLabel(booking.status)}
                                                </Badge>
                                                <Badge variant={getPaymentStatusBadgeVariant(booking.payment_status || 'pending')}>
                                                    {getPaymentStatusLabel(booking.payment_status || 'pending')}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <BookOpen className="h-4 w-4" />
                                                    <span>{booking.subject.name}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <GraduationCap className="h-4 w-4" />
                                                    <span>{booking.level.name}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <UserIcon className="h-4 w-4" />
                                                    <span>{booking.child.name}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>{booking.total_price} GNF</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Créée le {new Date(booking.created_at).toLocaleDateString('fr-FR')}
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
                                                    <Link href={route('admin.bookings.show', booking.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Voir
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
                                                            router.delete(route('admin.bookings.destroy', booking.id));
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
                        {bookings.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-muted-foreground">
                                    Affichage de {bookings.from} à {bookings.to} sur {bookings.total} résultats
                                </p>
                                <div className="flex space-x-2">
                                    {bookings.links.map((link: { active: boolean; url: string | null; label: string }, index: number) => (
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
