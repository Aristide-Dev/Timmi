import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

export default function CreateCycle() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        min_age: '',
        max_age: '',
        is_active: true,
        sort_order: 0,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = {
            ...formData,
            min_age: formData.min_age ? parseInt(formData.min_age) : null,
            max_age: formData.max_age ? parseInt(formData.max_age) : null,
        };
        
        router.post(route('admin.education.cycles.store'), data, {
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

    return (
        <AppLayout>
            <Head title="Créer un cycle" />

            <div className="container py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="icon" onClick={() => router.get(route('admin.education.cycles.index'))}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-3xl font-bold">Créer un cycle</h1>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Informations du cycle</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nom du cycle *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Ex: Primaire"
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
                                    placeholder="Description du cycle..."
                                    rows={3}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="min_age">Âge minimum</Label>
                                    <Input
                                        id="min_age"
                                        type="number"
                                        value={formData.min_age}
                                        onChange={(e) => handleInputChange('min_age', e.target.value)}
                                        placeholder="Ex: 6"
                                    />
                                    {errors.min_age && <p className="text-sm text-red-500">{errors.min_age}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="max_age">Âge maximum</Label>
                                    <Input
                                        id="max_age"
                                        type="number"
                                        value={formData.max_age}
                                        onChange={(e) => handleInputChange('max_age', e.target.value)}
                                        placeholder="Ex: 11"
                                    />
                                    {errors.max_age && <p className="text-sm text-red-500">{errors.max_age}</p>}
                                </div>
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
                                <Label htmlFor="is_active">Cycle actif</Label>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => router.get(route('admin.education.cycles.index'))}
                                >
                                    Annuler
                                </Button>
                                <Button type="submit">
                                    <Save className="mr-2 h-4 w-4" />
                                    Créer le cycle
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
