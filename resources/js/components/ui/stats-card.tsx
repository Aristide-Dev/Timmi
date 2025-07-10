import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        direction: 'up' | 'down';
    };
    loading?: boolean;
    className?: string;
}

export function StatsCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    loading = false,
    className,
}: StatsCardProps) {
    return (
        <Card className={cn('overflow-hidden', className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-2">
                        <div className="h-7 w-20 animate-pulse rounded bg-muted" />
                        {description && (
                            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                        )}
                    </div>
                ) : (
                    <>
                        <div className="flex items-baseline gap-2">
                            <div className="text-2xl font-bold">
                                {value}
                            </div>
                            {trend && (
                                <div
                                    className={cn(
                                        'text-xs font-medium',
                                        trend.direction === 'up'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    )}
                                >
                                    {trend.direction === 'up' ? '+' : '-'}
                                    {trend.value}%
                                </div>
                            )}
                        </div>
                        {description && (
                            <p className="text-xs text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
} 