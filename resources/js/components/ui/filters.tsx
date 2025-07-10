import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface FiltersProps {
    children: ReactNode;
    onReset?: () => void;
    onApply?: () => void;
    hasFilters?: boolean;
    className?: string;
}

export function Filters({
    children,
    onReset,
    onApply,
    hasFilters = false,
    className = '',
}: FiltersProps) {
    return (
        <Card className={className}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2 text-lg font-semibold">
                        <Filter className="h-5 w-5" />
                        Filtres
                    </div>
                    {hasFilters && onReset && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onReset}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Réinitialiser
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {children}
                </div>

                {onApply && (
                    <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
                        {onReset && (
                            <Button variant="outline" onClick={onReset}>
                                Réinitialiser
                            </Button>
                        )}
                        <Button onClick={onApply}>
                            Appliquer les filtres
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

interface FilterGroupProps {
    label: string;
    children: ReactNode;
    className?: string;
}

export function FilterGroup({ label, children, className = '' }: FilterGroupProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
            </label>
            {children}
        </div>
    );
}

interface FilterSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: {
        value: string;
        label: string;
    }[];
    placeholder?: string;
}

export function FilterSelect({ label, value, onChange, options, placeholder }: FilterSelectProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {placeholder && (
                    <option value="">{placeholder}</option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
} 