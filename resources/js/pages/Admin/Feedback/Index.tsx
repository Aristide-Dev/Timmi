import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Filter, MoreHorizontal, MessageSquare, AlertCircle, CheckCircle, Clock, Star } from 'lucide-react';
import { User, PaginatedData } from '@/types/global';

interface Feedback {
  id: number;
  user: User;
  type: 'bug' | 'feature' | 'improvement' | 'complaint' | 'compliment';
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  admin_notes?: string;
  created_at: string;
  resolved_at?: string;
}

interface FeedbacksIndexProps {
  feedbacks: PaginatedData<Feedback>;
  stats: {
    total: number;
    open: number;
    in_progress: number;
    resolved: number;
    closed: number;
  };
  filters: {
    search: string;
    type: string;
    priority: string;
    status: string;
  };
}

export default function FeedbacksIndex({ feedbacks, stats, filters }: FeedbacksIndexProps) {
  const [search, setSearch] = useState(filters.search || '');
  const [typeFilter, setTypeFilter] = useState(filters.type || '');
  const [priorityFilter, setPriorityFilter] = useState(filters.priority || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');

  const handleSearch = () => {
    router.get('/admin/feedbacks', {
      search,
      type: typeFilter,
      priority: priorityFilter,
      status: statusFilter,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const handleStatusChange = (feedbackId: number, newStatus: string) => {
    router.patch(`/admin/feedbacks/${feedbackId}/status`, {
      status: newStatus,
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
    return <Icon className="h-4 w-4" />;
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
      <Head title="Gestion des Retours" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Retours</h1>
            <p className="text-muted-foreground">
              Gérez les retours, suggestions et plaintes des utilisateurs
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ouverts</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.open}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En cours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.in_progress}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Résolus</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fermés</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.closed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres</CardTitle>
            <CardDescription>Filtrez les retours selon vos critères</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="text-sm font-medium">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Tous les types</option>
                  <option value="bug">Bug</option>
                  <option value="feature">Fonctionnalité</option>
                  <option value="improvement">Amélioration</option>
                  <option value="complaint">Plainte</option>
                  <option value="compliment">Compliment</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Priorité</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Toutes les priorités</option>
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Élevée</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Statut</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Tous les statuts</option>
                  <option value="open">Ouvert</option>
                  <option value="in_progress">En cours</option>
                  <option value="resolved">Résolu</option>
                  <option value="closed">Fermé</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <Button onClick={handleSearch} className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedbacks List */}
        <Card>
          <CardHeader>
            <CardTitle>Retours ({feedbacks.total})</CardTitle>
            <CardDescription>
              Liste de tous les retours des utilisateurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbacks.data.map((feedback: Feedback) => (
                <div key={feedback.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={feedback.user.avatar} alt={feedback.user.name} />
                    <AvatarFallback>
                      {feedback.user.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(feedback.type)}
                        <h3 className="font-semibold">{feedback.subject}</h3>
                        <Badge variant={getPriorityBadgeVariant(feedback.priority)}>
                          {feedback.priority}
                        </Badge>
                        <Badge variant={getStatusBadgeVariant(feedback.status)}>
                          {getStatusLabel(feedback.status)}
                        </Badge>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/feedbacks/${feedback.id}`}>
                              Voir les détails
                            </Link>
                          </DropdownMenuItem>
                          {feedback.status === 'open' && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(feedback.id, 'in_progress')}
                            >
                              Marquer en cours
                            </DropdownMenuItem>
                          )}
                          {feedback.status === 'in_progress' && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(feedback.id, 'resolved')}
                            >
                              Marquer résolu
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(feedback.id, 'closed')}
                          >
                            Fermer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {feedback.message}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Par {feedback.user.name}</span>
                      <span>{new Date(feedback.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {feedbacks.links && feedbacks.links.length > 3 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Affichage de {feedbacks.from} à {feedbacks.to} sur {feedbacks.total} résultats
                </div>
                <div className="flex space-x-2">
                  {feedbacks.links.map((link: { active: boolean; url: string | null; label: string }, index: number) => (
                    <Button
                      key={index}
                      variant={link.active ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => link.url && router.get(link.url)}
                      disabled={!link.url}
                    >
                      <span dangerouslySetInnerHTML={{ __html: link.label }} />
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
