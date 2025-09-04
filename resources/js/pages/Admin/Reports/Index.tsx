import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Head, Link, router } from '@inertiajs/react';
import { Download, Calendar, FileText, BarChart3, TrendingUp, Users, DollarSign, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface Report {
    id: number;
    name: string;
    description: string;
    type: string;
    status: string;
    generated_at?: string;
    file_path?: string;
    created_at: string;
}

interface ReportsIndexProps {
    reports: Report[];
    filters?: {
        search?: string;
        type?: string;
        status?: string;
        date_from?: string;
        date_to?: string;
    };
}

export default function ReportsIndex({ reports, filters = {} }: ReportsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [dateFrom] = useState(filters.date_from || '');
    const [dateTo] = useState(filters.date_to || '');

    const handleSearch = () => {
        router.get(route('admin.reports.index'), {
            search: search || undefined,
            type: typeFilter || undefined,
            status: statusFilter || undefined,
            date_from: dateFrom || undefined,
            date_to: dateTo || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleGenerateReport = (type: string) => {
        router.post(route('admin.reports.generate'), {
            type: type,
        }, {
            preserveScroll: true,
        });
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'pending':
                return 'secondary';
            case 'generating':
                return 'default';
            case 'completed':
                return 'default';
            case 'failed':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'En attente';
            case 'generating':
                return 'Génération en cours';
            case 'completed':
                return 'Terminé';
            case 'failed':
                return 'Échoué';
            default:
                return status;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'users':
                return Users;
            case 'bookings':
                return Calendar;
            case 'payments':
                return DollarSign;
            case 'analytics':
                return BarChart3;
            case 'education':
                return BookOpen;
            default:
                return FileText;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'users':
                return 'Utilisateurs';
            case 'bookings':
                return 'Réservations';
            case 'payments':
                return 'Paiements';
            case 'analytics':
                return 'Analytiques';
            case 'education':
                return 'Éducation';
            default:
                return type;
        }
    };

    const reportTypes = [
        { type: 'users', name: 'Rapport Utilisateurs', description: 'Statistiques des utilisateurs' },
        { type: 'bookings', name: 'Rapport Réservations', description: 'Statistiques des réservations' },
        { type: 'payments', name: 'Rapport Paiements', description: 'Statistiques des paiements' },
        { type: 'analytics', name: 'Rapport Analytiques', description: 'Métriques de performance' },
        { type: 'education', name: 'Rapport Éducation', description: 'Statistiques éducatives' },
    ];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Rapports', href: route('admin.reports.index') },
            ]}
        >
            <Head title="Gestion des rapports" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Rapports</h1>
                        <p className="text-muted-foreground">
                            Générez et gérez les rapports de la plateforme
                        </p>
                    </div>
                </div>

                {/* Report Types */}
                <Card>
                    <CardHeader>
                        <CardTitle>Types de rapports</CardTitle>
                        <CardDescription>Générez différents types de rapports</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {reportTypes.map((reportType) => {
                                const IconComponent = getTypeIcon(reportType.type);
                                return (
                                    <div
                                        key={reportType.type}
                                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                        onClick={() => handleGenerateReport(reportType.type)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                                                <IconComponent className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium">{reportType.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {reportType.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les rapports</CardDescription>
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
                                <option value="users">Utilisateurs</option>
                                <option value="bookings">Réservations</option>
                                <option value="payments">Paiements</option>
                                <option value="analytics">Analytiques</option>
                                <option value="education">Éducation</option>
                            </select>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Tous les statuts</option>
                                <option value="pending">En attente</option>
                                <option value="generating">Génération en cours</option>
                                <option value="completed">Terminé</option>
                                <option value="failed">Échoué</option>
                            </select>
                            <Button onClick={handleSearch} className="w-full">
                                <FileText className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Reports List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des rapports ({reports.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {reports.map((report) => {
                                const IconComponent = getTypeIcon(report.type);
                                return (
                                    <div
                                        key={report.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                                                <IconComponent className="h-6 w-6 text-blue-500" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <p className="font-medium">{report.name}</p>
                                                    <Badge variant={getStatusBadgeVariant(report.status)}>
                                                        {getStatusLabel(report.status)}
                                                    </Badge>
                                                    <Badge variant="outline">
                                                        {getTypeLabel(report.type)}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {report.description}
                                                </p>
                                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center space-x-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>
                                                            Créé le {new Date(report.created_at).toLocaleDateString('fr-FR')}
                                                        </span>
                                                    </div>
                                                    {report.generated_at && (
                                                        <div className="flex items-center space-x-1">
                                                            <TrendingUp className="h-4 w-4" />
                                                            <span>
                                                                Généré le {new Date(report.generated_at).toLocaleDateString('fr-FR')}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {report.status === 'completed' && report.file_path && (
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={route('admin.reports.download', report.id)}>
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Télécharger
                                                    </Link>
                                                </Button>
                                            )}
                                            {report.status === 'failed' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleGenerateReport(report.type)}
                                                >
                                                    <TrendingUp className="mr-2 h-4 w-4" />
                                                    Régénérer
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {reports.length === 0 && (
                            <div className="text-center py-8">
                                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">Aucun rapport trouvé</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
