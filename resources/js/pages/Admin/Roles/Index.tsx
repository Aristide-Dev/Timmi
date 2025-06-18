import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { AlertCircle, Edit, Plus, Trash } from 'lucide-react';
import { useState } from 'react';

interface Role {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_default: boolean;
    is_admin: boolean;
    permissions: string[] | null;
}

interface Props {
    roles: Role[];
}

export default function Index({ roles }: Props) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

    const confirmDelete = (role: Role) => {
        setRoleToDelete(role);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (roleToDelete) {
            router.delete(route('admin.roles.destroy', roleToDelete.id));
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <AppLayout>
            <Head title="Gestion des rôles" />

            <div className="container py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Gestion des rôles</h1>
                    <Link href={route('admin.roles.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Nouveau rôle
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Liste des rôles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="font-medium">{role.name}</TableCell>
                                        <TableCell>{role.slug}</TableCell>
                                        <TableCell>{role.description || '-'}</TableCell>
                                        <TableCell>
                                            {role.is_admin && (
                                                <Badge variant="destructive" className="mr-1">
                                                    Admin
                                                </Badge>
                                            )}
                                            {role.is_default && <Badge variant="secondary">Par défaut</Badge>}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Link href={route('admin.roles.edit', role.id)}>
                                                    <Button variant="outline" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                {!role.is_default && (
                                                    <Button variant="outline" size="icon" onClick={() => confirmDelete(role)}>
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {roles.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-8 text-center">
                                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                <AlertCircle className="mb-2 h-12 w-12" />
                                                <p>Aucun rôle trouvé</p>
                                            </div>
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
                            Êtes-vous sûr de vouloir supprimer le rôle "{roleToDelete?.name}" ? Cette action est irréversible.
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
