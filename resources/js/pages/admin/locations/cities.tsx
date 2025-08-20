import { Head, useForm } from '@inertiajs/react';
import { Building, Plus, Edit, Trash2, X, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';

interface City {
    id: number;
    name: string;
    code: string;
    is_active: boolean;
    communes_count: number;
    neighborhoods_count: number;
    created_at: string;
}

interface Props {
    cities: City[];
}

export default function CitiesManagement({ cities }: Props) {
    const [editingCity, setEditingCity] = useState<City | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        code: '',
        is_active: true as boolean,
    });

    const handleCreate = () => {
        post(route('admin.locations.cities.store'), {
            onSuccess: () => {
                reset();
                setIsCreateDialogOpen(false);
            },
        });
    };

    const handleEdit = (city: City) => {
        setEditingCity(city);
        setData({
            name: city.name,
            code: city.code,
            is_active: city.is_active,
        });
        setIsEditDialogOpen(true);
    };

    const handleUpdate = () => {
        if (editingCity) {
            put(route('admin.locations.cities.update', editingCity.id), {
                onSuccess: () => {
                    reset();
                    setEditingCity(null);
                    setIsEditDialogOpen(false);
                },
            });
        }
    };

    const handleDelete = (city: City) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer la ville "${city.name}" ?`)) {
            destroy(route('admin.locations.cities.destroy', city.id), {
                onSuccess: () => {
                    // La page sera rechargée automatiquement
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Gestion des Villes" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Villes</h1>
                        <p className="text-muted-foreground">
                            Gérez les villes de votre plateforme
                        </p>
                    </div>
                    
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter une ville
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Ajouter une nouvelle ville</DialogTitle>
                                <DialogDescription>
                                    Créez une nouvelle ville avec son nom et son code unique
                                </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nom de la ville</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Ex: Conakry"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="code">Code unique</Label>
                                    <Input
                                        id="code"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                        placeholder="Ex: CKY"
                                        maxLength={10}
                                    />
                                    {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <Toggle
                                        pressed={data.is_active}
                                        onPressedChange={(pressed: boolean) => setData('is_active', pressed)}
                                    >
                                        <Check className="h-4 w-4" />
                                        <X className="h-4 w-4" />
                                    </Toggle>
                                    <Label htmlFor="is_active">Ville active</Label>
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
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Villes</CardTitle>
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{cities.length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Villes Actives</CardTitle>
                            <Check className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {cities.filter(city => city.is_active).length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Villes Inactives</CardTitle>
                            <X className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {cities.filter(city => !city.is_active).length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Communes</CardTitle>
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {cities.reduce((sum, city) => sum + city.communes_count, 0)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tableau des villes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des villes</CardTitle>
                        <CardDescription>
                            Gérez toutes les villes de votre plateforme
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ville</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Communes</TableHead>
                                    <TableHead>Quartiers</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Date création</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cities.map((city) => (
                                    <TableRow key={city.id}>
                                        <TableCell className="font-medium">{city.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{city.code}</Badge>
                                        </TableCell>
                                        <TableCell>{city.communes_count}</TableCell>
                                        <TableCell>{city.neighborhoods_count}</TableCell>
                                        <TableCell>
                                            <Badge variant={city.is_active ? "default" : "destructive"}>
                                                {city.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(city.created_at).toLocaleDateString('fr-FR')}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(city)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(city)}
                                                    disabled={city.communes_count > 0}
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
                        <DialogTitle>Modifier la ville</DialogTitle>
                        <DialogDescription>
                            Modifiez les informations de la ville
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit_name">Nom de la ville</Label>
                            <Input
                                id="edit_name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ex: Conakry"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>
                        
                        <div>
                            <Label htmlFor="edit_code">Code unique</Label>
                            <Input
                                id="edit_code"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                placeholder="Ex: CKY"
                                maxLength={10}
                            />
                            {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <Toggle
                                pressed={data.is_active}
                                onPressedChange={(pressed: boolean) => setData('is_active', pressed)}
                            >
                                <Check className="h-4 w-4" />
                                <X className="h-4 w-4" />
                            </Toggle>
                            <Label htmlFor="edit_is_active">Ville active</Label>
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
