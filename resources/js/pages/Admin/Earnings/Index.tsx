import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type User, type PaginatedData } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { Search, DollarSign, Download, Calendar, TrendingUp, User as UserIcon, BookOpen, GraduationCap } from 'lucide-react';
import { useState } from 'react';

interface Earning {
    id: number;
    professor_id: number;
    amount: number;
    currency: string;
    period: string;
    total_sessions: number;
    total_hours: number;
    created_at: string;
    professor: User;
}

interface EarningsIndexProps {
    earnings: PaginatedData<Earning>;
    filters: {
        search?: string;
        professor?: number;
        period?: string;
        date_from?: string;
        date_to?: string;
    };
    totalEarnings: number;
    totalSessions: number;
    totalHours: number;
}

export default function EarningsIndex({ earnings, filters, totalEarnings, totalSessions, totalHours }: EarningsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [professorFilter, setProfessorFilter] = useState(filters.professor || '');
    const [periodFilter, setPeriodFilter] = useState(filters.period || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    const handleSearch = () => {
        router.get(route('admin.earnings.index'), {
            search: search || undefined,
            professor: professorFilter || undefined,
            period: periodFilter || undefined,
            date_from: dateFrom || undefined,
            date_to: dateTo || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('fr-FR').format(num);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Revenus', href: route('admin.earnings.index') },
            ]}
        >
            <Head title="Gestion des revenus" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Revenus</h1>
                        <p className="text-muted-foreground">
                            Gérez les revenus des professeurs
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.earnings.export')}>
                                <Download className="mr-2 h-4 w-4" />
                                Exporter
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenus</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(totalEarnings, 'GNF')}</div>
                            <p className="text-xs text-muted-foreground">
                                Tous les professeurs confondus
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(totalSessions)}</div>
                            <p className="text-xs text-muted-foreground">
                                Sessions terminées
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Heures</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(totalHours)}h</div>
                            <p className="text-xs text-muted-foreground">
                                Heures de cours
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les revenus</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Input
                                placeholder="Rechercher par professeur..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={periodFilter}
                                onChange={(e) => setPeriodFilter(e.target.value)}
                            >
                                <option value="">Toutes les périodes</option>
                                <option value="daily">Quotidien</option>
                                <option value="weekly">Hebdomadaire</option>
                                <option value="monthly">Mensuel</option>
                                <option value="yearly">Annuel</option>
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

                {/* Earnings List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des revenus ({earnings.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {earnings.data.map((earning) => (
                                <div
                                    key={earning.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={earning.professor.avatar} alt={earning.professor.name} />
                                            <AvatarFallback>
                                                {earning.professor.name.split(' ').map((n: string) => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium">{earning.professor.name}</p>
                                                <Badge variant="outline">
                                                    {earning.period}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span className="font-semibold text-lg">
                                                        {formatCurrency(earning.amount, earning.currency)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <BookOpen className="h-4 w-4" />
                                                    <span>{earning.total_sessions} sessions</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{earning.total_hours}h</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(earning.created_at).toLocaleDateString('fr-FR')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('admin.earnings.professor', earning.professor_id)}>
                                                <UserIcon className="mr-1 h-4 w-4" />
                                                Voir détails
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {earnings.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-muted-foreground">
                                    Affichage de {earnings.from} à {earnings.to} sur {earnings.total} résultats
                                </p>
                                <div className="flex space-x-2">
                                    {earnings.links.map((link: { active: boolean; url: string | null; label: string }, index: number) => (
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
