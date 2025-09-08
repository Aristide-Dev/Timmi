import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, Calendar, User, ThumbsUp } from 'lucide-react';
import { Review, Professor } from '@/types/global';

interface ReviewWithRelations extends Review {
    professor: Professor;
}

interface ReviewIndexProps {
    reviews: {
        data: ReviewWithRelations[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
}

export default function ReviewIndex({ reviews }: ReviewIndexProps) {
    const getRatingStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${
                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
            />
        ));
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { label: 'En attente', variant: 'secondary' as const },
            approved: { label: 'Approuvé', variant: 'default' as const },
            rejected: { label: 'Rejeté', variant: 'destructive' as const },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    return (
        <AppLayout>
            <Head title="Mes Avis" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mes Avis</h1>
                        <p className="text-muted-foreground">
                            Gérez vos avis sur les professeurs
                        </p>
                    </div>
                </div>

                {reviews.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Aucun avis</h3>
                            <p className="text-muted-foreground text-center mb-4">
                                Vous n'avez pas encore donné d'avis sur les professeurs.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {reviews.data.map((review) => (
                            <Card key={review.id}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="flex items-center gap-2">
                                                <User className="h-5 w-5" />
                                                {review.professor.first_name} {review.professor.last_name}
                                            </CardTitle>
                                            <CardDescription>
                                                {review.title}
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(review.status)}
                                            <div className="flex items-center gap-1">
                                                {getRatingStars(review.rating)}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium mb-2">Avis :</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {review.comment}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {new Date(review.created_at).toLocaleDateString('fr-FR')}
                                                </span>
                                            </div>
                                            {review.would_recommend && (
                                                <div className="flex items-center gap-1 text-green-600">
                                                    <ThumbsUp className="h-4 w-4" />
                                                    <span className="text-sm">Recommandé</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Link href={route('student.reviews.edit', review.id)}>
                                                    Modifier
                                                </Link>
                                            </Button>
                                            <Button
                                                asChild
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
                                                        // Handle delete
                                                    }
                                                }}
                                            >
                                                <Link
                                                    href={route('student.reviews.destroy', review.id)}
                                                    method="delete"
                                                    as="button"
                                                >
                                                    Supprimer
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {reviews.meta && reviews.meta.last_page > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                        {reviews.links.map((link, index) => (
                            <Button
                                key={index}
                                asChild
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                disabled={!link.url}
                            >
                                <Link href={link.url || '#'}>
                                    {link.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
