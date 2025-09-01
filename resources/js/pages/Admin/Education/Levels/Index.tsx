import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type Level, type PaginatedData } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash } from 'lucide-react';
import { useState } from 'react';

interface Props {
    levels: PaginatedData<Level>;
}

export default function LevelsIndex({ levels }: Props) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [levelToDelete, setLevelToDelete] = useState<Level | null>(null);

    const confirmDelete = (level: Level) => {
        setLevelToDelete(level);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (levelToDelete) {
            router.delete(route('admin.education.levels.destroy', levelToDelete.id));
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <AppLayout>
            <Head title="Gestion des niveaux" />

            <div className="container py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Gestion des niveaux</h1>
                    <Link href={route('admin.education.levels.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Nouveau niveau
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Liste des niveaux</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Cycle</TableHead>
                                    <TableHead>Niveau</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Ordre</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {levels.data.map((level) => (
                                    <TableRow key={level.id}>
                                        <TableCell className="font-medium">{level.name}</TableCell>
                                        <TableCell>{level.cycle?.name || '-'}</TableCell>
                                        <TableCell>{level.grade_level || '-'}</TableCell>
                                        <TableCell>{level.description || '-'}</TableCell>
                                        <TableCell>
                                            {level.is_active ? (
                                                <Badge variant="default">Actif</Badge>
                                            ) : (
                                                <Badge variant="secondary">Inactif</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{level.sort_order}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Link href={route('admin.education.levels.edit', level.id)}>
                                                    <Button variant="outline" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="outline" 
                                                    size="icon" 
                                                    onClick={() => confirmDelete(level)}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {levels.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                            Aucun niveau trouvé
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
                            Êtes-vous sûr de vouloir supprimer le niveau "{levelToDelete?.name}" ? 
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
