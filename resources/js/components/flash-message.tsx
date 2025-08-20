import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Info, X, AlertTriangle } from 'lucide-react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';

interface FlashMessageProps {
    className?: string;
}

export default function FlashMessage({ className }: FlashMessageProps) {
    const { flash } = usePage<PageProps>().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'error' | 'info' | 'warning'>('info');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        } else if (flash?.warning) {
            setMessage(flash.warning);
            setType('warning');
            setVisible(true);
        } else if (flash?.info) {
            setMessage(flash.info);
            setType('info');
            setVisible(true);
        }

        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash, visible]);

    const handleClose = () => {
        setVisible(false);
    };

    if (!visible || !message) {
        return null;
    }

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-4 w-4" />;
            case 'error':
                return <XCircle className="h-4 w-4" />;
            case 'info':
                return <Info className="h-4 w-4" />;
            case 'warning':
                return <AlertTriangle className="h-4 w-4" />;
            default:
                return <Info className="h-4 w-4" />;
        }
    };

    const getVariant = () => {
        switch (type) {
            case 'success':
                return 'success';
            case 'error':
                return 'destructive';
            case 'info':
                return 'info';
            default:
                return 'default';
        }
    };

    return (
        <div className={`fixed top-4 flex justify-end z-50 w-full max-w-md animate-in slide-in-from-right-2 duration-300 ${className}`}>
            <Alert variant={getVariant()}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {getIcon()}
                        <AlertDescription>{message}</AlertDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClose}
                        className="h-6 w-6 p-0 hover:bg-transparent"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </Alert>
        </div>
    );
}
