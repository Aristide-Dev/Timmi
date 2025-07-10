import { Loader2 } from 'lucide-react';

interface LoadingProps {
    size?: 'sm' | 'default' | 'lg';
    className?: string;
    fullPage?: boolean;
}

export function Loading({ size = 'default', className = '', fullPage = false }: LoadingProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        default: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    if (fullPage) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <Loader2 className={`${sizeClasses[size]} animate-spin text-primary ${className}`} />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-4">
            <Loader2 className={`${sizeClasses[size]} animate-spin text-primary ${className}`} />
        </div>
    );
}

interface LoadingOverlayProps {
    loading: boolean;
    children: React.ReactNode;
}

export function LoadingOverlay({ loading, children }: LoadingOverlayProps) {
    return (
        <div className="relative">
            {children}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
                    <Loading />
                </div>
            )}
        </div>
    );
}

interface LoadingButtonProps {
    loading?: boolean;
    children: React.ReactNode;
    className?: string;
}

export function LoadingButton({ loading, children, className = '' }: LoadingButtonProps) {
    return (
        <div className={`inline-flex items-center gap-2 ${className}`}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {children}
        </div>
    );
} 