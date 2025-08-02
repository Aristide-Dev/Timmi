import { Head } from '@inertiajs/react';
import { Bell, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';

type Notification = {
    id: number;
    title: string;
    message: string;
    type: 'success' | 'warning' | 'info' | 'error';
    read_at: string | null;
    created_at: string;
    data?: Record<string, any>;
};

interface NotificationsProps extends PageProps {
    notifications: Notification[];
    unreadCount: number;
}

export default function Notifications({ notifications, unreadCount }: NotificationsProps) {
    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'warning':
                return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            case 'error':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Info className="h-5 w-5 text-blue-500" />;
        }
    };

    const getNotificationBadge = (type: string) => {
        switch (type) {
            case 'success':
                return <Badge variant="default" className="bg-green-100 text-green-800">Succès</Badge>;
            case 'warning':
                return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Attention</Badge>;
            case 'error':
                return <Badge variant="default" className="bg-red-100 text-red-800">Erreur</Badge>;
            default:
                return <Badge variant="secondary">Information</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) {
            return 'À l\'instant';
        } else if (diffInHours < 24) {
            return `Il y a ${diffInHours}h`;
        } else {
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Notifications" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Notifications</h1>
                        <p className="text-muted-foreground">
                            {unreadCount > 0 
                                ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`
                                : 'Toutes vos notifications'
                            }
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            Marquer tout comme lu
                        </Button>
                        <Button variant="outline" size="sm">
                            <Bell className="mr-2 h-4 w-4" />
                            Paramètres
                        </Button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="space-y-4">
                    {notifications.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">Aucune notification</h3>
                                <p className="text-muted-foreground text-center">
                                    Vous n'avez pas encore reçu de notifications.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        notifications.map((notification) => (
                            <Card 
                                key={notification.id} 
                                className={`transition-colors ${
                                    !notification.read_at 
                                        ? 'border-l-4 border-l-blue-500 bg-blue-50/50' 
                                        : ''
                                }`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="font-medium text-sm">
                                                            {notification.title}
                                                        </h3>
                                                        {getNotificationBadge(notification.type)}
                                                        {!notification.read_at && (
                                                            <Badge variant="default" className="bg-blue-500 text-white text-xs">
                                                                Nouveau
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-3">
                                                        {notification.message}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                        <span>{formatDate(notification.created_at)}</span>
                                                        {notification.data && Object.keys(notification.data).length > 0 && (
                                                            <span>• Données supplémentaires disponibles</span>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    {!notification.read_at && (
                                                        <Button variant="ghost" size="sm">
                                                            Marquer comme lu
                                                        </Button>
                                                    )}
                                                    <Button variant="ghost" size="sm">
                                                        Supprimer
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination ou Load More */}
                {notifications.length > 0 && (
                    <div className="flex justify-center">
                        <Button variant="outline">
                            Charger plus de notifications
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 