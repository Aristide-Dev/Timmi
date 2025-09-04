import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type User, type PaginatedData } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Search, Eye, Star, MessageSquare, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Review {
    id: number;
    professor_id: number;
    parent_id: number;
    rating: number;
    comment: string;
    is_verified: boolean;
    is_featured: boolean;
    status: string;
    created_at: string;
    professor: User;
    parent: User;
}

interface ReviewsIndexProps {
    reviews: PaginatedData<Review>;
    filters: {
        search?: string;
        status?: string;
        rating?: number;
        verified?: boolean;
        featured?: boolean;
    };
}

export default function ReviewsIndex({ reviews, filters }: ReviewsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [ratingFilter, setRatingFilter] = useState(filters.rating || '');
    const [verifiedFilter, setVerifiedFilter] = useState(filters.verified);
    const [featuredFilter, setFeaturedFilter] = useState(filters.featured);

    const handleSearch = () => {
        router.get(route('admin.reviews.index'), {
            search: search || undefined,
            status: statusFilter || undefined,
            rating: ratingFilter || undefined,
            verified: verifiedFilter,
            featured: featuredFilter,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleModerate = (reviewId: number, status: string) => {
        router.post(route('admin.reviews.moderate', reviewId), {
            status: status,
        }, {
            preserveScroll: true,
        });
    };

    const handleToggleVerification = (reviewId: number) => {
        router.post(route('admin.reviews.toggle-verification', reviewId), {}, {
            preserveScroll: true,
        });
    };

    const handleToggleFeatured = (reviewId: number) => {
        router.post(route('admin.reviews.toggle-featured', reviewId), {}, {
            preserveScroll: true,
        });
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'pending':
                return 'secondary';
            case 'approved':
                return 'default';
            case 'rejected':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'En attente';
            case 'approved':
                return 'Approuvé';
            case 'rejected':
                return 'Rejeté';
            default:
                return status;
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${
                    i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                }`}
            />
        ));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Avis', href: route('admin.reviews.index') },
            ]}
        >
            <Head title="Gestion des avis" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Avis</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les avis et commentaires
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.reviews.stats')}>
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
                        <CardDescription>Recherchez et filtrez les avis</CardDescription>
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
                                <option value="approved">Approuvé</option>
                                <option value="rejected">Rejeté</option>
                            </select>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={ratingFilter}
                                onChange={(e) => setRatingFilter(e.target.value)}
                            >
                                <option value="">Toutes les notes</option>
                                <option value="5">5 étoiles</option>
                                <option value="4">4 étoiles</option>
                                <option value="3">3 étoiles</option>
                                <option value="2">2 étoiles</option>
                                <option value="1">1 étoile</option>
                            </select>
                            <Button onClick={handleSearch} className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Rechercher
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Reviews List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des avis ({reviews.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {reviews.data.map((review) => (
                                <div
                                    key={review.id}
                                    className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={review.parent.avatar} alt={review.parent.name} />
                                        <AvatarFallback>
                                            {review.parent.name.split(' ').map((n: string) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <p className="font-medium">{review.parent.name}</p>
                                            <span className="text-sm text-muted-foreground">→</span>
                                            <p className="font-medium">{review.professor.name}</p>
                                            <Badge variant={getStatusBadgeVariant(review.status)}>
                                                {getStatusLabel(review.status)}
                                            </Badge>
                                            {review.is_verified && (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            )}
                                            {review.is_featured && (
                                                <Star className="h-4 w-4 text-yellow-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center space-x-1">
                                                {renderStars(review.rating)}
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(review.created_at).toLocaleDateString('fr-FR')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{review.comment}</p>
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
                                                    <Link href={route('admin.reviews.show', review.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Voir
                                                    </Link>
                                                </DropdownMenuItem>
                                                {review.status === 'pending' && (
                                                    <>
                                                        <DropdownMenuItem
                                                            onClick={() => handleModerate(review.id, 'approved')}
                                                            className="text-green-600"
                                                        >
                                                            <CheckCircle className="mr-2 h-4 w-4" />
                                                            Approuver
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleModerate(review.id, 'rejected')}
                                                            className="text-red-600"
                                                        >
                                                            <XCircle className="mr-2 h-4 w-4" />
                                                            Rejeter
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                                <DropdownMenuItem
                                                    onClick={() => handleToggleVerification(review.id)}
                                                    className="text-blue-600"
                                                >
                                                    {review.is_verified ? 'Désactiver' : 'Activer'} la vérification
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleToggleFeatured(review.id)}
                                                    className="text-yellow-600"
                                                >
                                                    {review.is_featured ? 'Retirer' : 'Mettre en'} vedette
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
                                                            router.delete(route('admin.reviews.destroy', review.id));
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
                        {reviews.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-muted-foreground">
                                    Affichage de {reviews.from} à {reviews.to} sur {reviews.total} résultats
                                </p>
                                <div className="flex space-x-2">
                                    {reviews.links.map((link: { active: boolean; url: string | null; label: string }, index: number) => (
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
