import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type User, type PaginatedData } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Search, Eye, CreditCard, DollarSign, Download, Calendar } from 'lucide-react';
import { useState } from 'react';

interface Payment {
    id: number;
    booking_id: number;
    amount: number;
    currency: string;
    status: string;
    payment_method: string;
    transaction_id?: string;
    paid_at?: string;
    created_at: string;
    professor: User;
    parent: User;
    booking: {
        subject: { name: string };
        level: { name: string };
        child: { name: string };
    };
}

interface PaymentsIndexProps {
    payments: PaginatedData<Payment>;
    filters: {
        search?: string;
        status?: string;
        payment_method?: string;
        date_from?: string;
        date_to?: string;
        amount_min?: number;
        amount_max?: number;
    };
}

export default function PaymentsIndex({ payments, filters }: PaymentsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [paymentMethodFilter, setPaymentMethodFilter] = useState(filters.payment_method || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    const handleSearch = () => {
        router.get(route('admin.payments.index'), {
            search: search || undefined,
            status: statusFilter || undefined,
            payment_method: paymentMethodFilter || undefined,
            date_from: dateFrom || undefined,
            date_to: dateTo || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleStatusUpdate = (paymentId: number, status: string) => {
        router.post(route('admin.payments.update-status', paymentId), {
            status: status,
        }, {
            preserveScroll: true,
        });
    };

    const handleRefund = (paymentId: number) => {
        if (confirm('Êtes-vous sûr de vouloir rembourser ce paiement ?')) {
            router.post(route('admin.payments.refund', paymentId), {}, {
                preserveScroll: true,
            });
        }
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'pending':
                return 'secondary';
            case 'paid':
                return 'default';
            case 'refunded':
                return 'destructive';
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
            case 'paid':
                return 'Payé';
            case 'refunded':
                return 'Remboursé';
            case 'failed':
                return 'Échoué';
            default:
                return status;
        }
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Paiements', href: route('admin.payments.index') },
            ]}
        >
            <Head title="Gestion des paiements" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Paiements</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les paiements de la plateforme
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.payments.stats')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Statistiques
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={route('admin.payments.export')}>
                                <Download className="mr-2 h-4 w-4" />
                                Exporter
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                        <CardDescription>Recherchez et filtrez les paiements</CardDescription>
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
                                <option value="paid">Payé</option>
                                <option value="refunded">Remboursé</option>
                                <option value="failed">Échoué</option>
                            </select>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={paymentMethodFilter}
                                onChange={(e) => setPaymentMethodFilter(e.target.value)}
                            >
                                <option value="">Toutes les méthodes</option>
                                <option value="stripe">Stripe</option>
                                <option value="paypal">PayPal</option>
                                <option value="flutterwave">Flutterwave</option>
                            </select>
                            <Button onClick={handleSearch} className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Payments List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des paiements ({payments.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {payments.data.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                                            <CreditCard className="h-6 w-6 text-green-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-medium">
                                                    {payment.professor.name} → {payment.parent.name}
                                                </p>
                                                <Badge variant={getStatusBadgeVariant(payment.status)}>
                                                    {getStatusLabel(payment.status)}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>{formatCurrency(payment.amount, payment.currency)}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <CreditCard className="h-4 w-4" />
                                                    <span>{payment.payment_method}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{payment.booking.subject.name} - {payment.booking.level.name}</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {payment.transaction_id && `Transaction: ${payment.transaction_id}`}
                                                {payment.paid_at && ` • Payé le ${new Date(payment.paid_at).toLocaleDateString('fr-FR')}`}
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
                                                    <Link href={route('admin.payments.show', payment.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Voir
                                                    </Link>
                                                </DropdownMenuItem>
                                                {payment.status === 'paid' && (
                                                    <DropdownMenuItem
                                                        onClick={() => handleRefund(payment.id)}
                                                        className="text-orange-600"
                                                    >
                                                        <DollarSign className="mr-2 h-4 w-4" />
                                                        Rembourser
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
                                                            router.delete(route('admin.payments.destroy', payment.id));
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
                        {payments.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-muted-foreground">
                                    Affichage de {payments.from} à {payments.to} sur {payments.total} résultats
                                </p>
                                <div className="flex space-x-2">
                                    {payments.links.map((link: { active: boolean; url: string | null; label: string }, index: number) => (
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
