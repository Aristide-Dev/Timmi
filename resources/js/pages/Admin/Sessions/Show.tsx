import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { type User } from '@/types/global';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, User as UserIcon, BookOpen, GraduationCap, MessageSquare, ExternalLink, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Session {
    id: number;
    booking_id: number;
    status: string;
    scheduled_at: string;
    duration: number;
    notes?: string;
    meeting_link?: string;
    professor: User;
    parent: User;
    subject: { name: string };
    level: { name: string };
    child: { name: string };
    created_at: string;
}

interface SessionShowProps {
    session: Session;
}

export default function SessionShow({ session }: SessionShowProps) {
    const [showNotesModal, setShowNotesModal] = useState(false);

    const { data: notesData, setData: setNotesData, post: postNotes } = useForm({
        notes: session.notes || '',
    });

    const handleStatusUpdate = (status: string) => {
        router.post(route('admin.sessions.update-status', session.id), {
            status: status,
        }, {
            preserveScroll: true,
        });
    };

    const handleAddNotes = (e: React.FormEvent) => {
        e.preventDefault();
        postNotes(route('admin.sessions.add-notes', session.id), {
            onSuccess: () => setShowNotesModal(false),
        });
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'secondary';
            case 'in_progress':
                return 'default';
            case 'completed':
                return 'default';
            case 'cancelled':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'Programmée';
            case 'in_progress':
                return 'En cours';
            case 'completed':
                return 'Terminée';
            case 'cancelled':
                return 'Annulée';
            default:
                return status;
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Sessions', href: route('admin.sessions.index') },
                { title: `Session #${session.id}`, href: route('admin.sessions.show', session.id) },
            ]}
        >
            <Head title={`Session #${session.id}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.sessions.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Session #{session.id}
                            </h1>
                            <p className="text-muted-foreground">
                                {session.professor.name} → {session.parent.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowNotesModal(true)}
                        >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Ajouter des notes
                        </Button>
                        {session.status === 'scheduled' && (
                            <Button
                                onClick={() => handleStatusUpdate('in_progress')}
                            >
                                <Clock className="mr-2 h-4 w-4" />
                                Démarrer la session
                            </Button>
                        )}
                        {session.status === 'in_progress' && (
                            <Button
                                onClick={() => handleStatusUpdate('completed')}
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                Terminer la session
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Session Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status and Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations de la session</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Statut</label>
                                        <div className="mt-1">
                                            <Badge variant={getStatusBadgeVariant(session.status)}>
                                                {getStatusLabel(session.status)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Durée</label>
                                        <div className="mt-1">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{session.duration} minutes</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Date programmée</label>
                                        <div className="mt-1">
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">
                                                    {new Date(session.scheduled_at).toLocaleString('fr-FR')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">ID Réservation</label>
                                        <div className="mt-1">
                                            <span className="font-medium">#{session.booking_id}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Participants */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Participants</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Professor */}
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={session.professor.avatar} alt={session.professor.name} />
                                        <AvatarFallback>
                                            {session.professor.name.split(' ').map((n: string) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h4 className="font-medium">Professeur</h4>
                                        <p className="text-sm text-muted-foreground">{session.professor.name}</p>
                                        <p className="text-sm text-muted-foreground">{session.professor.email}</p>
                                    </div>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={route('admin.professors.show', session.professor.id)}>
                                            Voir le profil
                                        </Link>
                                    </Button>
                                </div>

                                <Separator />

                                {/* Parent */}
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={session.parent.avatar} alt={session.parent.name} />
                                        <AvatarFallback>
                                            {session.parent.name.split(' ').map((n: string) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h4 className="font-medium">Parent</h4>
                                        <p className="text-sm text-muted-foreground">{session.parent.name}</p>
                                        <p className="text-sm text-muted-foreground">{session.parent.email}</p>
                                    </div>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={route('admin.parents.show', session.parent.id)}>
                                            Voir le profil
                                        </Link>
                                    </Button>
                                </div>

                                <Separator />

                                {/* Child */}
                                <div className="flex items-center space-x-4">
                                                                            <Avatar className="h-12 w-12">
                                            <AvatarImage src="" alt={session.child.name} />
                                            <AvatarFallback>
                                                {session.child.name.split(' ').map((n: string) => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                    <div className="flex-1">
                                        <h4 className="font-medium">Enfant</h4>
                                        <p className="text-sm text-muted-foreground">{session.child.name}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Détails du cours</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Matière</label>
                                            <p className="font-medium">{session.subject.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Niveau</label>
                                            <p className="font-medium">{session.level.name}</p>
                                        </div>
                                    </div>
                                </div>

                                {session.notes && (
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Notes</label>
                                        <p className="mt-1 text-sm">{session.notes}</p>
                                    </div>
                                )}

                                {session.meeting_link && (
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Lien de réunion</label>
                                        <div className="mt-1">
                                            <a
                                                href={session.meeting_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline text-sm flex items-center space-x-1"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                <span>{session.meeting_link}</span>
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions rapides</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {session.status === 'scheduled' && (
                                    <Button
                                        className="w-full justify-start"
                                        onClick={() => handleStatusUpdate('in_progress')}
                                    >
                                        <Clock className="mr-2 h-4 w-4" />
                                        Démarrer la session
                                    </Button>
                                )}
                                {session.status === 'in_progress' && (
                                    <Button
                                        className="w-full justify-start"
                                        onClick={() => handleStatusUpdate('completed')}
                                    >
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Terminer la session
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={() => setShowNotesModal(true)}
                                >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Ajouter des notes
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-red-600"
                                    onClick={() => {
                                        if (confirm('Êtes-vous sûr de vouloir supprimer cette session ?')) {
                                            router.delete(route('admin.sessions.destroy', session.id));
                                        }
                                    }}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Supprimer
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Session Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Créée le</p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(session.created_at).toLocaleString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">ID Session</p>
                                        <p className="text-xs text-muted-foreground">#{session.id}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Notes Modal */}
                {showNotesModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle>Ajouter des notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleAddNotes} className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Notes</label>
                                        <textarea
                                            className="w-full mt-1 p-2 border rounded-md"
                                            rows={4}
                                            value={notesData.notes}
                                            onChange={(e) => setNotesData('notes', e.target.value)}
                                            placeholder="Ajoutez des notes sur cette session..."
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowNotesModal(false)}
                                        >
                                            Annuler
                                        </Button>
                                        <Button type="submit">Sauvegarder</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
