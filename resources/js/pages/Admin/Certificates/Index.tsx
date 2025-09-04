import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type User, type PaginatedData } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Search, Eye, Edit, Trash2, Download, Award, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Certificate {
    id: number;
    professor_id: number;
    name: string;
    description: string;
    issuer: string;
    issued_at: string;
    expires_at?: string;
    file_path?: string;
    status: string;
    created_at: string;
    professor: User;
}

interface CertificatesIndexProps {
    certificates: PaginatedData<Certificate>;
    filters: {
        search?: string;
        status?: string;
        professor?: number;
        issuer?: string;
    };
}

export default function CertificatesIndex({ certificates, filters }: CertificatesIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [issuerFilter, setIssuerFilter] = useState(filters.issuer || '');

    const handleSearch = () => {
        router.get(route('admin.certificates.index'), {
            search: search || undefined,
            status: statusFilter || undefined,
            issuer: issuerFilter || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleStatusUpdate = (certificateId: number, status: string) => {
        router.post(route('admin.certificates.update-status', certificateId), {
            status: status,
        }, {
            preserveScroll: true,
        });
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'pending':
                return 'secondary';
            case 'verified':
                return 'default';
            case 'rejected':
                return 'destructive';
            case 'expired':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'En attente';
            case 'verified':
                return 'Vérifié';
            case 'rejected':
                return 'Rejeté';
            case 'expired':
                return 'Expiré';
            default:
                return status;
        }
    };

    const isExpired = (expiresAt?: string) => {
        if (!expiresAt) return false;
        return new Date(expiresAt) < new Date();
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Certificats', href: route('admin.certificates.index') },
            ]}
        >
            <Head title="Gestion des certificats" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Certificats</h1>
                        <p className="text-muted-foreground">
                            Gérez les certificats des professeurs
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.certificates.stats')}>
                                <Award className="mr-2 h-4 w-4" />
                                Statistiques
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les certificats</CardDescription>
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
                                <option value="pending">En attente</option>
                                <option value="verified">Vérifié</option>
                                <option value="rejected">Rejeté</option>
                                <option value="expired">Expiré</option>
                            </select>
                            <Input
                                placeholder="Émetteur..."
                                value={issuerFilter}
                                onChange={(e) => setIssuerFilter(e.target.value)}
                            />
                            <Button onClick={handleSearch} className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Certificates List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des certificats ({certificates.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {certificates.data.map((certificate) => (
                                <div
                                    key={certificate.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                                            <Award className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium">{certificate.name}</p>
                                                <Badge variant={getStatusBadgeVariant(certificate.status)}>
                                                    {getStatusLabel(certificate.status)}
                                                </Badge>
                                                {isExpired(certificate.expires_at) && (
                                                    <Badge variant="destructive">
                                                        Expiré
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>Émis le {new Date(certificate.issued_at).toLocaleDateString('fr-FR')}</span>
                                                </div>
                                                {certificate.expires_at && (
                                                    <div className="flex items-center space-x-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>Expire le {new Date(certificate.expires_at).toLocaleDateString('fr-FR')}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center space-x-1">
                                                    <Award className="h-4 w-4" />
                                                    <span>{certificate.issuer}</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Professeur: {certificate.professor.name}
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
                                                    <Link href={route('admin.certificates.show', certificate.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Voir
                                                    </Link>
                                                </DropdownMenuItem>
                                                {certificate.file_path && (
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.certificates.download', certificate.id)}>
                                                            <Download className="mr-2 h-4 w-4" />
                                                            Télécharger
                                                        </Link>
                                                    </DropdownMenuItem>
                                                )}
                                                {certificate.status === 'pending' && (
                                                    <>
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusUpdate(certificate.id, 'verified')}
                                                            className="text-green-600"
                                                        >
                                                            <CheckCircle className="mr-2 h-4 w-4" />
                                                            Vérifier
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusUpdate(certificate.id, 'rejected')}
                                                            className="text-red-600"
                                                        >
                                                            <XCircle className="mr-2 h-4 w-4" />
                                                            Rejeter
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.certificates.edit', certificate.id)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Modifier
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        if (confirm('Êtes-vous sûr de vouloir supprimer ce certificat ?')) {
                                                            router.delete(route('admin.certificates.destroy', certificate.id));
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
                        {certificates.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-muted-foreground">
                                    Affichage de {certificates.from} à {certificates.to} sur {certificates.total} résultats
                                </p>
                                <div className="flex space-x-2">
                                    {certificates.links.map((link: { active: boolean; url: string | null; label: string }, index: number) => (
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
