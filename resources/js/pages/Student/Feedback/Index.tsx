import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, Calendar, User } from 'lucide-react';
import { Feedback, Professor, Booking } from '@/types/global';

interface FeedbackWithRelations extends Feedback {
    professor: Professor;
    booking: Booking;
}

interface FeedbackIndexProps {
    feedbacks: {
        data: FeedbackWithRelations[];
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

export default function FeedbackIndex({ feedbacks }: FeedbackIndexProps) {
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
            <Head title="Mes Feedbacks" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mes Feedbacks</h1>
                        <p className="text-muted-foreground">
                            Gérez vos retours sur les sessions avec vos professeurs
                        </p>
                    </div>
                </div>

                {feedbacks.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Aucun feedback</h3>
                            <p className="text-muted-foreground text-center mb-4">
                                Vous n'avez pas encore donné de feedback pour vos sessions.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {feedbacks.data.map((feedback) => (
                            <Card key={feedback.id}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="flex items-center gap-2">
                                                <User className="h-5 w-5" />
                                                {feedback.professor.first_name} {feedback.professor.last_name}
                                            </CardTitle>
                                            <CardDescription>
                                                Session du {new Date(feedback.booking.start_time).toLocaleDateString('fr-FR')}
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(feedback.status)}
                                            <div className="flex items-center gap-1">
                                                {getRatingStars(feedback.rating)}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {feedback.comment && (
                                            <div>
                                                <h4 className="font-medium mb-2">Commentaire :</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {feedback.comment}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {new Date(feedback.created_at).toLocaleDateString('fr-FR')}
                                                </span>
                                            </div>
                                            {feedback.would_recommend && (
                                                <Badge variant="outline" className="text-green-600 border-green-600">
                                                    Recommandé
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Link href={route('student.feedback.edit', feedback.id)}>
                                                    Modifier
                                                </Link>
                                            </Button>
                                            <Button
                                                asChild
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm('Êtes-vous sûr de vouloir supprimer ce feedback ?')) {
                                                        // Handle delete
                                                    }
                                                }}
                                            >
                                                <Link
                                                    href={route('student.feedback.destroy', feedback.id)}
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
                {feedbacks.meta && feedbacks.meta.last_page > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                        {feedbacks.links.map((link, index) => (
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
