import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, AlertCircle, CheckCircle, Clock, Star, User, Calendar, Mail } from 'lucide-react';
import { User as UserType } from '@/types/global';

interface Feedback {
  id: number;
  user: UserType;
  type: 'bug' | 'feature' | 'improvement' | 'complaint' | 'compliment';
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  admin_notes?: string;
  created_at: string;
  resolved_at?: string;
}

interface FeedbackShowProps {
  feedback: Feedback;
}

export default function FeedbackShow({ feedback }: FeedbackShowProps) {
  const [adminNotes, setAdminNotes] = useState(feedback.admin_notes || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    setIsUpdating(true);
    router.patch(`/admin/feedbacks/${feedback.id}/status`, {
      status: newStatus,
    }, {
      onFinish: () => setIsUpdating(false),
    });
  };

  const handleUpdateNotes = () => {
    setIsUpdating(true);
    router.patch(`/admin/feedbacks/${feedback.id}`, {
      admin_notes: adminNotes,
    }, {
      onFinish: () => setIsUpdating(false),
    });
  };

  const getTypeLabel = (type: string) => {
    const types = {
      bug: 'Bug',
      feature: 'Fonctionnalité',
      improvement: 'Amélioration',
      complaint: 'Plainte',
      compliment: 'Compliment',
    };
    return types[type as keyof typeof types] || type;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      bug: AlertCircle,
      feature: Star,
      improvement: CheckCircle,
      complaint: AlertCircle,
      compliment: Star,
    };
    const Icon = icons[type as keyof typeof icons] || MessageSquare;
    return <Icon className="h-5 w-5" />;
  };

  const getPriorityBadgeVariant = (priority: string) => {
    const variants = {
      low: 'secondary',
      medium: 'default',
      high: 'destructive',
      urgent: 'destructive',
    };
    return variants[priority as keyof typeof variants] || 'default';
  };

  const getStatusBadgeVariant = (status: string) => {
    const variants = {
      open: 'default',
      in_progress: 'secondary',
      resolved: 'default',
      closed: 'outline',
    };
    return variants[status as keyof typeof variants] || 'default';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      open: 'Ouvert',
      in_progress: 'En cours',
      resolved: 'Résolu',
      closed: 'Fermé',
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <AppLayout>
      <Head title={`Retour #${feedback.id}`} />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Link href="/admin/feedbacks">
                <Button variant="ghost" size="sm">
                  ← Retour à la liste
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Retour #{feedback.id}
            </h1>
            <p className="text-muted-foreground">
              {feedback.subject}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant={getPriorityBadgeVariant(feedback.priority)}>
              {feedback.priority}
            </Badge>
            <Badge variant={getStatusBadgeVariant(feedback.status)}>
              {getStatusLabel(feedback.status)}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Feedback Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getTypeIcon(feedback.type)}
                  <span>Détails du retour</span>
                </CardTitle>
                <CardDescription>
                  Type: {getTypeLabel(feedback.type)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Sujet</h4>
                  <p className="text-sm text-muted-foreground">{feedback.subject}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Message</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{feedback.message}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Créé le {new Date(feedback.created_at).toLocaleDateString()}</span>
                  </div>
                  {feedback.resolved_at && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4" />
                      <span>Résolu le {new Date(feedback.resolved_at).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Admin Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notes administrateur</CardTitle>
                <CardDescription>
                  Ajoutez des notes internes pour ce retour
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Ajoutez vos notes ici..."
                  rows={4}
                />
                <Button 
                  onClick={handleUpdateNotes} 
                  disabled={isUpdating}
                  size="sm"
                >
                  {isUpdating ? 'Mise à jour...' : 'Mettre à jour les notes'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Utilisateur</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={feedback.user.avatar} alt={feedback.user.name} />
                    <AvatarFallback>
                      {feedback.user.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{feedback.user.name}</h4>
                    <p className="text-sm text-muted-foreground">{feedback.user.email}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{feedback.user.email}</span>
                  </div>
                </div>
                
                <Link href={`/admin/users/${feedback.user.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Voir le profil
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>
                  Gérez le statut de ce retour
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {feedback.status === 'open' && (
                  <Button 
                    onClick={() => handleStatusChange('in_progress')}
                    disabled={isUpdating}
                    className="w-full"
                    variant="secondary"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Marquer en cours
                  </Button>
                )}
                
                {feedback.status === 'in_progress' && (
                  <Button 
                    onClick={() => handleStatusChange('resolved')}
                    disabled={isUpdating}
                    className="w-full"
                    variant="default"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Marquer résolu
                  </Button>
                )}
                
                {feedback.status !== 'closed' && (
                  <Button 
                    onClick={() => handleStatusChange('closed')}
                    disabled={isUpdating}
                    variant="outline"
                    className="w-full"
                  >
                    Fermer
                  </Button>
                )}
                
                {feedback.status === 'closed' && (
                  <Button 
                    onClick={() => handleStatusChange('open')}
                    disabled={isUpdating}
                    variant="outline"
                    className="w-full"
                  >
                    Rouvrir
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Status History */}
            <Card>
              <CardHeader>
                <CardTitle>Historique</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Créé le {new Date(feedback.created_at).toLocaleDateString()}</span>
                </div>
                {feedback.resolved_at && (
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Résolu le {new Date(feedback.resolved_at).toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
