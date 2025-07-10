import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

type StatusBadgeProps = {
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'active' | 'suspended';
    showIcon?: boolean;
    size?: 'sm' | 'default' | 'lg';
};

const statusConfig = {
    pending: {
        label: 'En attente',
        variant: 'secondary' as const,
        icon: Clock,
        className: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400',
    },
    confirmed: {
        label: 'Confirmé',
        variant: 'default' as const,
        icon: CheckCircle,
        className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400',
    },
    completed: {
        label: 'Terminé',
        variant: 'success' as const,
        icon: CheckCircle,
        className: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400',
    },
    cancelled: {
        label: 'Annulé',
        variant: 'destructive' as const,
        icon: XCircle,
        className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400',
    },
    active: {
        label: 'Actif',
        variant: 'success' as const,
        icon: CheckCircle,
        className: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400',
    },
    suspended: {
        label: 'Suspendu',
        variant: 'destructive' as const,
        icon: AlertCircle,
        className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400',
    },
};

export function StatusBadge({ status, showIcon = true, size = 'default' }: StatusBadgeProps) {
    const config = statusConfig[status];
    const Icon = config.icon;
    
    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        default: 'text-sm px-2.5 py-0.5',
        lg: 'text-base px-3 py-1',
    };
    
    return (
        <Badge 
            variant="outline"
            className={`${config.className} ${sizeClasses[size]} font-medium inline-flex items-center gap-1`}
        >
            {showIcon && <Icon className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} />}
            {config.label}
        </Badge>
    );
} 