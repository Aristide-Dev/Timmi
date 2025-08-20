import { Head, useForm } from '@inertiajs/react';
import { MapPin, Plus, Edit, Trash2, Building } from 'lucide-react';
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

interface Commune {
    id: number;
    name: string;
    code: string;
    is_active: boolean;
    city: {
        id: number;
        name: string;
    };
    neighborhoods_count: number;
    created_at: string;
}

interface City {
    id: number;
    name: string;
}

interface Props {
    communes: Commune[];
    cities: City[];
}

export default function CommunesManagement({ communes, cities }: Props) {
    const [editingCommune, setEditingCommune] = useState<Commune | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        code: '',
        city_id: '',
        is_active: true as boolean,
    });

    const handleCreate = () => {
        post(route('admin.locations.communes.store'), {
            onSuccess: () => {
                reset();
                setIsCreateDialogOpen(false);
            },
        });
    };

    const handleEdit = (commune: Commune) => {
        setEditingCommune(commune);
        setData({
            name: commune.name,
            code: commune.code,
            city_id: commune.city.id.toString(),
            is_active: commune.is_active,
        });
        setIsEditDialogOpen(true);
    };

    const handleUpdate = () => {
        if (editingCommune) {
            put(route('admin.locations.communes.update', editingCommune.id), {
                onSuccess: () => {
                    reset();
                    setEditingCommune(null);
                    setIsEditDialogOpen(false);
                },
            });
        }
    };

    const handleDelete = (commune: Commune) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer la commune "${commune.name}" ?`)) {
            destroy(route('admin.locations.communes.destroy', commune.id), {
                onSuccess: () => {
                    // La page sera rechargée automatiquement
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Gestion des Communes" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Communes</h1>
                        <p className="text-muted-foreground">
                            Gérez les communes de votre plateforme
                        </p>
                    </div>
                    
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter une commune
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Ajouter une nouvelle commune</DialogTitle>
                                <DialogDescription>
                                    Créez une nouvelle commune avec son nom, code et ville
                                </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nom de la commune</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Ex: Kaloum"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="code">Code unique</Label>
                                    <Input
                                        id="code"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                        placeholder="Ex: KAL"
                                        maxLength={10}
                                    />
                                    {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="city_id">Ville</Label>
                                    <Select value={data.city_id} onValueChange={(value) => setData('city_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez une ville" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cities.map((city) => (
                                                <SelectItem key={city.id} value={city.id.toString()}>
                                                    {city.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.city_id && <p className="text-sm text-red-500">{errors.city_id}</p>}
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <Toggle
                                        pressed={data.is_active}
                                        onPressedChange={(pressed: boolean) => setData('is_active', pressed)}
                                    >
                                        <MapPin className="h-4 w-4" />
                                    </Toggle>
                                    <Label htmlFor="is_active">Commune active</Label>
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
                            <CardTitle className="text-sm font-medium">Total Communes</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{communes.length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Communes Actives</CardTitle>
                            <MapPin className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {communes.filter(commune => commune.is_active).length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Quartiers</CardTitle>
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {communes.reduce((sum, commune) => sum + commune.neighborhoods_count, 0)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tableau des communes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des communes</CardTitle>
                        <CardDescription>
                            Gérez toutes les communes de votre plateforme
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Commune</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Ville</TableHead>
                                    <TableHead>Quartiers</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Date création</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {communes.map((commune) => (
                                    <TableRow key={commune.id}>
                                        <TableCell className="font-medium">{commune.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{commune.code}</Badge>
                                        </TableCell>
                                        <TableCell>{commune.city.name}</TableCell>
                                        <TableCell>{commune.neighborhoods_count}</TableCell>
                                        <TableCell>
                                            <Badge variant={commune.is_active ? "default" : "destructive"}>
                                                {commune.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(commune.created_at).toLocaleDateString('fr-FR')}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(commune)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(commune)}
                                                    disabled={commune.neighborhoods_count > 0}
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
                        <DialogTitle>Modifier la commune</DialogTitle>
                        <DialogDescription>
                            Modifiez les informations de la commune
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit_name">Nom de la commune</Label>
                            <Input
                                id="edit_name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ex: Kaloum"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>
                        
                        <div>
                            <Label htmlFor="edit_code">Code unique</Label>
                            <Input
                                id="edit_code"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                placeholder="Ex: KAL"
                                maxLength={10}
                            />
                            {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                        </div>

                        <div>
                            <Label htmlFor="edit_city_id">Ville</Label>
                            <Select value={data.city_id} onValueChange={(value) => setData('city_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une ville" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cities.map((city) => (
                                        <SelectItem key={city.id} value={city.id.toString()}>
                                            {city.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.city_id && <p className="text-sm text-red-500">{errors.city_id}</p>}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <Toggle
                                pressed={data.is_active}
                                onPressedChange={(pressed: boolean) => setData('is_active', pressed)}
                            >
                                <MapPin className="h-4 w-4" />
                            </Toggle>
                            <Label htmlFor="edit_is_active">Commune active</Label>
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
