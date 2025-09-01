import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type City, type Neighborhood } from '@/types/global';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    neighborhood: Neighborhood & { city: City };
    cities: City[];
}

export default function EditNeighborhood({ neighborhood, cities }: Props) {
    const [formData, setFormData] = useState({
        city_id: neighborhood.city_id.toString(),
        name: neighborhood.name,
        description: neighborhood.description || '',
        is_active: neighborhood.is_active,
        sort_order: neighborhood.sort_order,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        router.put(route('admin.locations.neighborhoods.update', neighborhood.id), formData, {
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    useEffect(() => {
        setFormData({
            city_id: neighborhood.city_id.toString(),
            name: neighborhood.name,
            description: neighborhood.description || '',
            is_active: neighborhood.is_active,
            sort_order: neighborhood.sort_order,
        });
    }, [neighborhood]);

    return (
        <AppLayout>
            <Head title={`Modifier ${neighborhood.name}`} />

            <div className="container py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="icon" onClick={() => router.get(route('admin.locations.neighborhoods.index'))}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-3xl font-bold">Modifier {neighborhood.name}</h1>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Informations du quartier</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="city_id">Ville *</Label>
                                <Select value={formData.city_id} onValueChange={(value) => handleInputChange('city_id', value)}>
                                    <SelectTrigger className={errors.city_id ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Sélectionner une ville" />
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

                            <div className="space-y-2">
                                <Label htmlFor="name">Nom du quartier *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Ex: Centre-ville"
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Description du quartier..."
                                    rows={3}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sort_order">Ordre de tri</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    value={formData.sort_order}
                                    onChange={(e) => handleInputChange('sort_order', parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                />
                                {errors.sort_order && <p className="text-sm text-red-500">{errors.sort_order}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                                />
                                <Label htmlFor="is_active">Quartier actif</Label>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => router.get(route('admin.locations.neighborhoods.index'))}
                                >
                                    Annuler
                                </Button>
                                <Button type="submit">
                                    <Save className="mr-2 h-4 w-4" />
                                    Mettre à jour
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
