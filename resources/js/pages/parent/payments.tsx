import { Head } from '@inertiajs/react';
import { CreditCard, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';

type Payment = {
    id: number;
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    payment_method: string;
    created_at: string;
    booking: {
        id: number;
        class_date: string;
        start_time: string;
        end_time: string;
        teacher: {
            name: string;
        };
        child: {
            name: string;
        };
        subject: {
            name: string;
        };
    };
};

interface ParentPaymentsProps extends PageProps {
    payments: {
        data: Payment[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    stats: {
        total_paid: number;
        pending_amount: number;
        total_transactions: number;
    };
}

export default function ParentPayments({ payments, stats }: ParentPaymentsProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <Badge variant="default" className="bg-green-100 text-green-800">Payé</Badge>;
            case 'pending':
                return <Badge variant="default" className="bg-yellow-100 text-yellow-800">En attente</Badge>;
            case 'failed':
                return <Badge variant="default" className="bg-red-100 text-red-800">Échoué</Badge>;
            case 'refunded':
                return <Badge variant="outline">Remboursé</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'failed':
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <CreditCard className="h-4 w-4 text-gray-500" />;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount: number) => {
        return `${amount.toLocaleString()} GNF`;
    };

    return (
        <AppLayout>
            <Head title="Mes Paiements" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Mes Paiements</h1>
                    <p className="text-muted-foreground">
                        Historique de tous vos paiements et transactions
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Payé
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatAmount(stats.total_paid)}</div>
                            <p className="text-xs text-muted-foreground">
                                Tous les paiements confirmés
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                En Attente
                            </CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatAmount(stats.pending_amount)}</div>
                            <p className="text-xs text-muted-foreground">
                                Paiements en cours de traitement
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Transactions
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_transactions}</div>
                            <p className="text-xs text-muted-foreground">
                                Nombre total de transactions
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Payments Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Historique des Paiements</CardTitle>
                        <CardDescription>
                            Détail de tous vos paiements et transactions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {payments.data.length === 0 ? (
                            <div className="text-center py-8">
                                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">Aucun paiement</h3>
                                <p className="text-muted-foreground">
                                    Vous n'avez pas encore effectué de paiements.
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Professeur</TableHead>
                                        <TableHead>Enfant</TableHead>
                                        <TableHead>Matière</TableHead>
                                        <TableHead>Montant</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.data.map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(payment.status)}
                                                    <span className="text-sm">
                                                        {formatDate(payment.created_at)}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">
                                                    {payment.booking.teacher.name}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm">
                                                    {payment.booking.child.name}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm">
                                                    {payment.booking.subject.name}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">
                                                    {formatAmount(payment.amount)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(payment.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm">
                                                        Détails
                                                    </Button>
                                                    {payment.status === 'pending' && (
                                                        <Button variant="outline" size="sm">
                                                            Annuler
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {payments.last_page > 1 && (
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="outline" 
                                disabled={payments.current_page === 1}
                            >
                                Précédent
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {payments.current_page} sur {payments.last_page}
                            </span>
                            <Button 
                                variant="outline" 
                                disabled={payments.current_page === payments.last_page}
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 