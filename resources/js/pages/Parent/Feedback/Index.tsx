import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type Session, type Feedback } from '@/types/global';
import { Head, router } from '@inertiajs/react';
import { 
    Star, 
    Calendar, 
    Clock, 
    BookOpen, 
    MessageCircle,
    CheckCircle,
    XCircle,
    Play,
    Users,
    ArrowLeft
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    sessions: Session[];
    feedbacks: Feedback[];
}

export default function ParentFeedback({ sessions, feedbacks }: Props) {
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [feedbackData, setFeedbackData] = useState({
        rating: 5,
        comment: '',
        categories: {
            teaching_quality: 5,
            punctuality: 5,
            communication: 5,
            patience: 5,
        }
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'scheduled': return <Calendar className="h-4 w-4" />;
            case 'in_progress': return <Play className="h-4 w-4" />;
            case 'completed': return <CheckCircle className="h-4 w-4" />;
            case 'cancelled': return <XCircle className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    const handleFeedbackSubmit = (sessionId: number) => {
        router.post(route('parent.feedback.store'), {
            session_id: sessionId,
            ...feedbackData
        }, {
            onSuccess: () => {
                setSelectedSession(null);
                setFeedbackData({
                    rating: 5,
                    comment: '',
                    categories: {
                        teaching_quality: 5,
                        punctuality: 5,
                        communication: 5,
                        patience: 5,
                    }
                });
            }
        });
    };

    const renderStars = (rating: number, onChange?: (rating: number) => void) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange && onChange(star)}
                        className="focus:outline-none"
                    >
                        <Star 
                            className={`h-5 w-5 ${
                                star <= rating 
                                    ? 'text-yellow-500 fill-current' 
                                    : 'text-gray-300'
                            }`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    return (
        <AppLayout>
            <Head title="Suivi et Feedback" />
            
            <div className="container py-8">
                {/* En-tête */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Button 
                            variant="outline" 
                            onClick={() => router.get(route('parent.dashboard'))}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour au tableau de bord
                        </Button>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Suivi et Feedback</h1>
                    <p className="text-gray-600 mt-2">Suivez les progrès de vos enfants et donnez votre avis</p>
                </div>

                <Tabs defaultValue="sessions" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="sessions">Sessions ({sessions.length})</TabsTrigger>
                        <TabsTrigger value="feedback">Mes avis ({feedbacks.length})</TabsTrigger>
                    </TabsList>

                    {/* Sessions */}
                    <TabsContent value="sessions" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sessions.map((session) => (
                                <Card key={session.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(session.status)}
                                                <Badge className={getStatusColor(session.status)}>
                                                    {session.status === 'scheduled' && 'Programmée'}
                                                    {session.status === 'in_progress' && 'En cours'}
                                                    {session.status === 'completed' && 'Terminée'}
                                                    {session.status === 'cancelled' && 'Annulée'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Informations du cours */}
                                            <div>
                                                <h3 className="font-semibold text-lg mb-2">
                                                    {session.booking.subject.name}
                                                </h3>
                                                <div className="space-y-2 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <Users className="h-4 w-4" />
                                                        <span>{session.booking.professor.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="h-4 w-4" />
                                                        <span>{session.booking.child.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>Session du {formatDate(session.created_at)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        <span>Durée: {session.booking.duration} minutes</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="space-y-2">
                                                {session.status === 'scheduled' && (
                                                    <div className="flex gap-2">
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm" 
                                                            className="flex-1"
                                                            onClick={() => router.get(route('parent.sessions.join', session.id))}
                                                        >
                                                            <Play className="h-4 w-4 mr-1" />
                                                            Rejoindre
                                                        </Button>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            onClick={() => router.post(route('parent.sessions.cancel', session.id))}
                                                        >
                                                            Annuler
                                                        </Button>
                                                    </div>
                                                )}

                                                {session.status === 'in_progress' && (
                                                    <Button 
                                                        className="w-full" 
                                                        size="sm"
                                                        onClick={() => router.get(route('parent.sessions.join', session.id))}
                                                    >
                                                        <Play className="h-4 w-4 mr-1" />
                                                        Rejoindre le cours
                                                    </Button>
                                                )}

                                                {session.status === 'completed' && !session.feedback && (
                                                    <Button 
                                                        className="w-full" 
                                                        size="sm"
                                                        onClick={() => setSelectedSession(session)}
                                                    >
                                                        <MessageCircle className="h-4 w-4 mr-1" />
                                                        Donner un avis
                                                    </Button>
                                                )}

                                                {session.status === 'completed' && session.feedback && (
                                                    <div className="text-center">
                                                        <div className="flex items-center justify-center gap-1 mb-2">
                                                            {renderStars(session.feedback.rating)}
                                                        </div>
                                                        <p className="text-sm text-gray-600">Avis donné</p>
                                                    </div>
                                                )}

                                                {session.notes && (
                                                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                                        <p className="text-sm text-gray-700">
                                                            <strong>Notes :</strong> {session.notes}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {sessions.length === 0 && (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune session</h3>
                                    <p className="text-gray-600 mb-4">
                                        Vous n'avez pas encore de sessions programmées.
                                    </p>
                                    <Button onClick={() => router.get(route('parent.search.professors'))}>
                                        Rechercher un professeur
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    {/* Feedback */}
                    <TabsContent value="feedback" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {feedbacks.map((feedback) => (
                                <Card key={feedback.id}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold">
                                                {feedback.session.booking.subject.name}
                                            </h3>
                                            <div className="flex items-center gap-1">
                                                {renderStars(feedback.rating)}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="text-sm text-gray-600">
                                                <p><strong>Professeur :</strong> {feedback.session.booking.professor.name}</p>
                                                <p><strong>Enfant :</strong> {feedback.session.booking.child.name}</p>
                                                {/* <p><strong>Date :</strong> {formatDate(feedback.session.date)}</p> */}
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-700">{feedback.comment}</p>
                                            </div>

                                            <Separator />

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Qualité d'enseignement</span>
                                                    <div className="flex items-center gap-1">
                                                        {renderStars(feedback.categories.teaching_quality)}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Ponctualité</span>
                                                    <div className="flex items-center gap-1">
                                                        {renderStars(feedback.categories.punctuality)}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Communication</span>
                                                    <div className="flex items-center gap-1">
                                                        {renderStars(feedback.categories.communication)}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Patience</span>
                                                    <div className="flex items-center gap-1">
                                                        {renderStars(feedback.categories.patience)}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-xs text-gray-500">
                                                {formatDate(feedback.created_at)}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {feedbacks.length === 0 && (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun avis</h3>
                                    <p className="text-gray-600">
                                        Vous n'avez pas encore donné d'avis sur vos sessions.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>

                {/* Modal de feedback */}
                {selectedSession && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <Card className="w-full max-w-2xl mx-4">
                            <CardHeader>
                                <CardTitle>Donner un avis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Session avec {selectedSession.booking.professor.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {selectedSession.booking.subject.name} • {selectedSession.booking.child.name}
                                        </p>
                                    </div>

                                    <div>
                                        <Label>Note globale</Label>
                                        <div className="mt-2">
                                            {renderStars(feedbackData.rating, (rating) => 
                                                setFeedbackData(prev => ({ ...prev, rating }))
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label>Qualité d'enseignement</Label>
                                            <div className="mt-2">
                                                {renderStars(feedbackData.categories.teaching_quality, (rating) => 
                                                    setFeedbackData(prev => ({ 
                                                        ...prev, 
                                                        categories: { ...prev.categories, teaching_quality: rating }
                                                    }))
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Ponctualité</Label>
                                            <div className="mt-2">
                                                {renderStars(feedbackData.categories.punctuality, (rating) => 
                                                    setFeedbackData(prev => ({ 
                                                        ...prev, 
                                                        categories: { ...prev.categories, punctuality: rating }
                                                    }))
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Communication</Label>
                                            <div className="mt-2">
                                                {renderStars(feedbackData.categories.communication, (rating) => 
                                                    setFeedbackData(prev => ({ 
                                                        ...prev, 
                                                        categories: { ...prev.categories, communication: rating }
                                                    }))
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Patience</Label>
                                            <div className="mt-2">
                                                {renderStars(feedbackData.categories.patience, (rating) => 
                                                    setFeedbackData(prev => ({ 
                                                        ...prev, 
                                                        categories: { ...prev.categories, patience: rating }
                                                    }))
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="comment">Commentaire</Label>
                                        <Textarea
                                            id="comment"
                                            value={feedbackData.comment}
                                            onChange={(e) => setFeedbackData(prev => ({ ...prev, comment: e.target.value }))}
                                            placeholder="Partagez votre expérience..."
                                            rows={4}
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline" 
                                            onClick={() => setSelectedSession(null)}
                                            className="flex-1"
                                        >
                                            Annuler
                                        </Button>
                                        <Button 
                                            onClick={() => handleFeedbackSubmit(selectedSession.id)}
                                            className="flex-1"
                                        >
                                            Envoyer l'avis
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
