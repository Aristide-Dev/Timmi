import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type City, type PaginatedData } from '@/types/global';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash } from 'lucide-react';
import { useState } from 'react';

interface Props {
    cities: PaginatedData<City>;
}

export default function CitiesIndex({ cities }: Props) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [cityToDelete, setCityToDelete] = useState<City | null>(null);

    const confirmDelete = (city: City) => {
        setCityToDelete(city);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (cityToDelete) {
            router.delete(route('admin.locations.cities.destroy', cityToDelete.id));
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <AppLayout>
            <Head title="Gestion des villes" />

            <div className="container py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Gestion des villes</h1>
                    <Link href={route('admin.locations.cities.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Nouvelle ville
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Liste des villes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Ordre</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cities.data.map((city) => (
                                    <TableRow key={city.id}>
                                        <TableCell className="font-medium">{city.name}</TableCell>
                                        <TableCell>{city.code || '-'}</TableCell>
                                        <TableCell>{city.description || '-'}</TableCell>
                                        <TableCell>
                                            {city.is_active ? (
                                                <Badge variant="default">Actif</Badge>
                                            ) : (
                                                <Badge variant="secondary">Inactif</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{city.sort_order}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Link href={route('admin.locations.cities.edit', city.id)}>
                                                    <Button variant="outline" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="outline" 
                                                    size="icon" 
                                                    onClick={() => confirmDelete(city)}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {cities.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            Aucune ville trouvée
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
                            Êtes-vous sûr de vouloir supprimer la ville "{cityToDelete?.name}" ? 
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
