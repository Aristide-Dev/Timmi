import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type Subject, type PaginatedData } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash } from 'lucide-react';
import { useState } from 'react';

interface Props {
    subjects: PaginatedData<Subject>;
}

export default function SubjectsIndex({ subjects }: Props) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);

    const confirmDelete = (subject: Subject) => {
        setSubjectToDelete(subject);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (subjectToDelete) {
            router.delete(route('admin.education.subjects.destroy', subjectToDelete.id));
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <AppLayout>
            <Head title="Gestion des matières" />

            <div className="container py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Gestion des matières</h1>
                    <Link href={route('admin.education.subjects.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Nouvelle matière
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Liste des matières</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Icône</TableHead>
                                    <TableHead>Couleur</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Ordre</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subjects.data.map((subject) => (
                                    <TableRow key={subject.id}>
                                        <TableCell className="font-medium">{subject.name}</TableCell>
                                        <TableCell>{subject.icon || '-'}</TableCell>
                                        <TableCell>
                                            {subject.color && (
                                                <div className="flex items-center space-x-2">
                                                    <div 
                                                        className="w-4 h-4 rounded-full border"
                                                        style={{ backgroundColor: subject.color }}
                                                    />
                                                    <span>{subject.color}</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>{subject.description || '-'}</TableCell>
                                        <TableCell>
                                            {subject.is_active ? (
                                                <Badge variant="default">Actif</Badge>
                                            ) : (
                                                <Badge variant="secondary">Inactif</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{subject.sort_order}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Link href={route('admin.education.subjects.edit', subject.id)}>
                                                    <Button variant="outline" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="outline" 
                                                    size="icon" 
                                                    onClick={() => confirmDelete(subject)}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {subjects.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                            Aucune matière trouvée
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
                            Êtes-vous sûr de vouloir supprimer la matière "{subjectToDelete?.name}" ? 
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
