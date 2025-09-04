import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Head, Link, router } from '@inertiajs/react';
import { Database, RefreshCw, Download, Trash2, AlertTriangle, CheckCircle, Clock, HardDrive } from 'lucide-react';
import { useState } from 'react';

interface DatabaseStats {
    total_size: string;
    table_count: number;
    connection_count: number;
    last_backup?: string;
    backup_size?: string;
    tables: {
        name: string;
        rows: number;
        size: string;
        engine: string;
    }[];
}

interface DatabaseIndexProps {
    stats: DatabaseStats;
    backups: {
        id: number;
        name: string;
        size: string;
        created_at: string;
        status: string;
    }[];
}

export default function DatabaseIndex({ stats, backups }: DatabaseIndexProps) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.get(route('admin.database.index'), {}, {
            preserveState: true,
            onFinish: () => setIsRefreshing(false),
        });
    };

    const handleBackup = () => {
        router.post(route('admin.database.backup'), {}, {
            preserveScroll: true,
        });
    };

    const handleRestore = (backupId: number) => {
        if (confirm('Êtes-vous sûr de vouloir restaurer cette sauvegarde ? Cette action est irréversible.')) {
            router.post(route('admin.database.restore', backupId), {}, {
                preserveScroll: true,
            });
        }
    };

    const handleDeleteBackup = (backupId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette sauvegarde ?')) {
            router.delete(route('admin.database.backups.destroy', backupId), {
                preserveScroll: true,
            });
        }
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'completed':
                return 'default';
            case 'in_progress':
                return 'secondary';
            case 'failed':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Terminé';
            case 'in_progress':
                return 'En cours';
            case 'failed':
                return 'Échoué';
            default:
                return status;
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Base de données', href: route('admin.database.index') },
            ]}
        >
            <Head title="Gestion de la base de données" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Base de données</h1>
                        <p className="text-muted-foreground">
                            Gérez et surveillez la base de données
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                        >
                            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Actualiser
                        </Button>
                        <Button onClick={handleBackup}>
                            <Database className="mr-2 h-4 w-4" />
                            Nouvelle sauvegarde
                        </Button>
                    </div>
                </div>

                {/* Database Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Taille totale</CardTitle>
                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_size}</div>
                            <p className="text-xs text-muted-foreground">
                                Toutes les tables confondues
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Nombre de tables</CardTitle>
                            <Database className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.table_count}</div>
                            <p className="text-xs text-muted-foreground">
                                Tables dans la base
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Connexions actives</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.connection_count}</div>
                            <p className="text-xs text-muted-foreground">
                                Connexions en cours
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Dernière sauvegarde</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.last_backup ? new Date(stats.last_backup).toLocaleDateString('fr-FR') : 'N/A'}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {stats.backup_size && `Taille: ${stats.backup_size}`}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tables List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tables de la base de données</CardTitle>
                        <CardDescription>Détails des tables et de leur utilisation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.tables.map((table) => (
                                <div
                                    key={table.name}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                                            <Database className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium">{table.name}</p>
                                                <Badge variant="outline">
                                                    {table.engine}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <span>{table.rows.toLocaleString('fr-FR')} lignes</span>
                                                <span>Taille: {table.size}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Backups List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sauvegardes ({backups.length})</CardTitle>
                        <CardDescription>Gérez les sauvegardes de la base de données</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {backups.map((backup) => (
                                <div
                                    key={backup.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                                            <Database className="h-5 w-5 text-green-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium">{backup.name}</p>
                                                <Badge variant={getStatusBadgeVariant(backup.status)}>
                                                    {getStatusLabel(backup.status)}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <span>Taille: {backup.size}</span>
                                                <span>Créé le {new Date(backup.created_at).toLocaleString('fr-FR')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {backup.status === 'completed' && (
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={route('admin.database.backups.download', backup.id)}>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Télécharger
                                                </Link>
                                            </Button>
                                        )}
                                        {backup.status === 'completed' && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleRestore(backup.id)}
                                                className="text-orange-600"
                                            >
                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                Restaurer
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDeleteBackup(backup.id)}
                                            className="text-red-600"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Supprimer
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {backups.length === 0 && (
                            <div className="text-center py-8">
                                <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">Aucune sauvegarde trouvée</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Warning */}
                <Card className="border-orange-200 bg-orange-50">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-orange-800">
                            <AlertTriangle className="h-5 w-5" />
                            <span>Attention</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-orange-700">
                            Les opérations sur la base de données sont critiques. Assurez-vous de créer une sauvegarde 
                            avant toute modification importante. La restauration d'une sauvegarde remplacera complètement 
                            la base de données actuelle.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
