import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type Cycle, type PaginatedData } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash } from 'lucide-react';
import { useState } from 'react';

interface Props {
    cycles: PaginatedData<Cycle>;
}

export default function CyclesIndex({ cycles }: Props) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [cycleToDelete, setCycleToDelete] = useState<Cycle | null>(null);

    const confirmDelete = (cycle: Cycle) => {
        setCycleToDelete(cycle);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (cycleToDelete) {
            router.delete(route('admin.education.cycles.destroy', cycleToDelete.id));
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <AppLayout>
            <Head title="Gestion des cycles" />

            <div className="container py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Gestion des cycles</h1>
                    <Link href={route('admin.education.cycles.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Nouveau cycle
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Liste des cycles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Âge min</TableHead>
                                    <TableHead>Âge max</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Ordre</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cycles.data.map((cycle) => (
                                    <TableRow key={cycle.id}>
                                        <TableCell className="font-medium">{cycle.name}</TableCell>
                                        <TableCell>{cycle.description || '-'}</TableCell>
                                        <TableCell>{cycle.min_age || '-'}</TableCell>
                                        <TableCell>{cycle.max_age || '-'}</TableCell>
                                        <TableCell>
                                            {cycle.is_active ? (
                                                <Badge variant="default">Actif</Badge>
                                            ) : (
                                                <Badge variant="secondary">Inactif</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{cycle.sort_order}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Link href={route('admin.education.cycles.edit', cycle.id)}>
                                                    <Button variant="outline" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="outline" 
                                                    size="icon" 
                                                    onClick={() => confirmDelete(cycle)}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {cycles.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                            Aucun cycle trouvé
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                        <DialogDescription>
                            Êtes-vous sûr de vouloir supprimer le cycle "{cycleToDelete?.name}" ? 
                            Cette action est irréversible.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Annuler
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Supprimer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
