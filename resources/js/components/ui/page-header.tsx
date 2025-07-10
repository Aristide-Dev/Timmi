import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: ReactNode;
    action?: {
        label: string;
        icon?: LucideIcon;
        onClick: () => void;
    };
    breadcrumbs?: {
        label: string;
        href?: string;
    }[];
}

export function PageHeader({
    title,
    description,
    children,
    action,
    breadcrumbs,
}: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 pb-6">
            {breadcrumbs && (
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        {breadcrumbs.map((item, index) => (
                            <li key={index} className="flex items-center">
                                {index > 0 && (
                                    <span className="mx-2 text-muted-foreground">/</span>
                                )}
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <span className="text-sm text-foreground">
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            )}

            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-muted-foreground mt-1">
                            {description}
                        </p>
                    )}
                </div>

                {action && (
                    <Button onClick={action.onClick} className="flex-shrink-0">
                        {action.icon && (
                            <action.icon className="mr-2 h-4 w-4" />
                        )}
                        {action.label}
                    </Button>
                )}
            </div>

            {children && (
                <div className="mt-4">
                    {children}
                </div>
            )}
        </div>
    );
} 