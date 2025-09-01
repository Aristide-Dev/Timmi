import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type Subject } from '@/types/global';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    subject: Subject;
}

export default function EditSubject({ subject }: Props) {
    const [formData, setFormData] = useState({
        name: subject.name,
        description: subject.description || '',
        icon: subject.icon || '',
        color: subject.color || '#3b82f6',
        is_active: subject.is_active,
        sort_order: subject.sort_order,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        router.put(route('admin.education.subjects.update', subject.id), formData, {
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
            name: subject.name,
            description: subject.description || '',
            icon: subject.icon || '',
            color: subject.color || '#3b82f6',
            is_active: subject.is_active,
            sort_order: subject.sort_order,
        });
    }, [subject]);

    return (
        <AppLayout>
            <Head title={`Modifier ${subject.name}`} />

            <div className="container py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="icon" onClick={() => router.get(route('admin.education.subjects.index'))}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-3xl font-bold">Modifier {subject.name}</h1>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Informations de la matière</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nom de la matière *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Ex: Mathématiques"
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
                                    placeholder="Description de la matière..."
                                    rows={3}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="icon">Icône</Label>
                                    <Input
                                        id="icon"
                                        value={formData.icon}
                                        onChange={(e) => handleInputChange('icon', e.target.value)}
                                        placeholder="Ex: calculator"
                                    />
                                    {errors.icon && <p className="text-sm text-red-500">{errors.icon}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="color">Couleur</Label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id="color"
                                            type="color"
                                            value={formData.color}
                                            onChange={(e) => handleInputChange('color', e.target.value)}
                                            className="w-16 h-10 p-1"
                                        />
                                        <Input
                                            value={formData.color}
                                            onChange={(e) => handleInputChange('color', e.target.value)}
                                            placeholder="#3b82f6"
                                        />
                                    </div>
                                    {errors.color && <p className="text-sm text-red-500">{errors.color}</p>}
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
                                <Label htmlFor="is_active">Matière active</Label>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => router.get(route('admin.education.subjects.index'))}
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
