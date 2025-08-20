import { Head, useForm } from '@inertiajs/react';
import { Home, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';

interface Neighborhood {
    id: number;
    name: string;
    code: string;
    is_active: boolean;
    commune: {
        id: number;
        name: string;
        city: {
            id: number;
            name: string;
        };
    };
    created_at: string;
}

interface Commune {
    id: number;
    name: string;
    city: {
        id: number;
        name: string;
    };
}

interface Props {
    neighborhoods: Neighborhood[];
    communes: Commune[];
}

export default function NeighborhoodsManagement({ neighborhoods, communes }: Props) {
    const [editingNeighborhood, setEditingNeighborhood] = useState<Neighborhood | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        code: '',
        commune_id: '',
        is_active: true as boolean,
    });

    const handleCreate = () => {
        post(route('admin.locations.neighborhoods.store'), {
            onSuccess: () => {
                reset();
                setIsCreateDialogOpen(false);
            },
        });
    };

    const handleEdit = (neighborhood: Neighborhood) => {
        setEditingNeighborhood(neighborhood);
        setData({
            name: neighborhood.name,
            code: neighborhood.code,
            commune_id: neighborhood.commune.id.toString(),
            is_active: neighborhood.is_active,
        });
        setIsEditDialogOpen(true);
    };

    const handleUpdate = () => {
        if (editingNeighborhood) {
            put(route('admin.locations.neighborhoods.update', editingNeighborhood.id), {
                onSuccess: () => {
                    reset();
                    setEditingNeighborhood(null);
                    setIsEditDialogOpen(false);
                },
            });
        }
    };

    const handleDelete = (neighborhood: Neighborhood) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer le quartier "${neighborhood.name}" ?`)) {
            destroy(route('admin.locations.neighborhoods.destroy', neighborhood.id), {
                onSuccess: () => {
                    // La page sera rechargée automatiquement
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Gestion des Quartiers" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Quartiers</h1>
                        <p className="text-muted-foreground">
                            Gérez les quartiers de votre plateforme
                        </p>
                    </div>
                    
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter un quartier
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Ajouter un nouveau quartier</DialogTitle>
                                <DialogDescription>
                                    Créez un nouveau quartier avec son nom, code et commune
                                </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nom du quartier</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Ex: Almamya"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="code">Code unique</Label>
                                    <Input
                                        id="code"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                        placeholder="Ex: ALM"
                                        maxLength={10}
                                    />
                                    {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="commune_id">Commune</Label>
                                    <Select value={data.commune_id} onValueChange={(value) => setData('commune_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez une commune" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {communes.map((commune) => (
                                                <SelectItem key={commune.id} value={commune.id.toString()}>
                                                    {commune.name} - {commune.city.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.commune_id && <p className="text-sm text-red-500">{errors.commune_id}</p>}
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <Toggle
                                        pressed={data.is_active}
                                        onPressedChange={(pressed: boolean) => setData('is_active', pressed)}
                                    >
                                        <Home className="h-4 w-4" />
                                    </Toggle>
                                    <Label htmlFor="is_active">Quartier actif</Label>
                                </div>
                            </div>
                            
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                    Annuler
                                </Button>
                                <Button onClick={handleCreate} disabled={processing}>
                                    {processing ? 'Création...' : 'Créer'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Statistiques */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Quartiers</CardTitle>
                            <Home className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{neighborhoods.length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Quartiers Actifs</CardTitle>
                            <Home className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {neighborhoods.filter(neighborhood => neighborhood.is_active).length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Quartiers Inactifs</CardTitle>
                            <Home className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {neighborhoods.filter(neighborhood => !neighborhood.is_active).length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tableau des quartiers */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des quartiers</CardTitle>
                        <CardDescription>
                            Gérez tous les quartiers de votre plateforme
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Quartier</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Commune</TableHead>
                                    <TableHead>Ville</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Date création</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {neighborhoods.map((neighborhood) => (
                                    <TableRow key={neighborhood.id}>
                                        <TableCell className="font-medium">{neighborhood.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{neighborhood.code}</Badge>
                                        </TableCell>
                                        <TableCell>{neighborhood.commune.name}</TableCell>
                                        <TableCell>{neighborhood.commune.city.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={neighborhood.is_active ? "default" : "destructive"}>
                                                {neighborhood.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(neighborhood.created_at).toLocaleDateString('fr-FR')}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(neighborhood)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(neighborhood)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Dialog d'édition */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modifier le quartier</DialogTitle>
                        <DialogDescription>
                            Modifiez les informations du quartier
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit_name">Nom du quartier</Label>
                            <Input
                                id="edit_name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ex: Almamya"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>
                        
                        <div>
                            <Label htmlFor="edit_code">Code unique</Label>
                            <Input
                                id="edit_code"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                placeholder="Ex: ALM"
                                maxLength={10}
                            />
                            {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                        </div>

                        <div>
                            <Label htmlFor="edit_commune_id">Commune</Label>
                            <Select value={data.commune_id} onValueChange={(value) => setData('commune_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une commune" />
                                </SelectTrigger>
                                <SelectContent>
                                    {communes.map((commune) => (
                                        <SelectItem key={commune.id} value={commune.id.toString()}>
                                            {commune.name} - {commune.city.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.commune_id && <p className="text-sm text-red-500">{errors.commune_id}</p>}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <Toggle
                                pressed={data.is_active}
                                onPressedChange={(pressed: boolean) => setData('is_active', pressed)}
                            >
                                <Home className="h-4 w-4" />
                            </Toggle>
                            <Label htmlFor="edit_is_active">Quartier actif</Label>
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Annuler
                        </Button>
                        <Button onClick={handleUpdate} disabled={processing}>
                            {processing ? 'Mise à jour...' : 'Mettre à jour'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
