import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface DataTableProps<T> {
    data: T[];
    columns: {
        key: string;
        label: string;
        render?: (item: T) => React.ReactNode;
        sortable?: boolean;
    }[];
    pagination?: {
        total: number;
        perPage: number;
        currentPage: number;
        onPageChange: (page: number) => void;
    };
    searchable?: boolean;
    onSearch?: (query: string) => void;
    perPageOptions?: number[];
    onPerPageChange?: (perPage: number) => void;
    loading?: boolean;
}

export function DataTable<T>({
    data,
    columns,
    pagination,
    searchable = false,
    onSearch,
    perPageOptions = [10, 25, 50, 100],
    onPerPageChange,
    loading = false,
}: DataTableProps<T>) {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        onSearch?.(query);
    };

    const renderPagination = () => {
        if (!pagination) return null;

        const { total, perPage, currentPage, onPageChange } = pagination;
        const totalPages = Math.ceil(total / perPage);
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

        return (
            <div className="flex items-center justify-between px-2 py-4">
                <div className="flex items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        Affichage de {((currentPage - 1) * perPage) + 1} à{' '}
                        {Math.min(currentPage * perPage, total)} sur {total} résultats
                    </p>

                    {onPerPageChange && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Par page:</span>
                            <Select
                                value={perPage.toString()}
                                onValueChange={(value) => onPerPageChange(parseInt(value))}
                            >
                                <SelectTrigger className="h-8 w-20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {perPageOptions.map((option) => (
                                        <SelectItem key={option} value={option.toString()}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {pages.map((page) => (
                        <Button
                            key={page}
                            variant={page === currentPage ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {searchable && (
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    className={column.sortable ? 'cursor-pointer select-none' : ''}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        {column.sortable && sortKey === column.key && (
                                            <span className="text-xs">
                                                {sortDirection === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Chargement...
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Aucun résultat trouvé
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item, index) => (
                                <TableRow key={index}>
                                    {columns.map((column) => (
                                        <TableCell key={column.key}>
                                            {column.render
                                                ? column.render(item)
                                                // @ts-ignore
                                                : item[column.key]
                                            }
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {renderPagination()}
        </div>
    );
} 