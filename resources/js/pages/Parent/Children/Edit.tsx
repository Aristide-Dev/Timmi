import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type Child } from '@/types/global';
import { Head, router } from '@inertiajs/react';
import { 
    ArrowLeft,
    User,
    GraduationCap,
    Upload
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    child: Child;
    levels: Array<{
        id: number;
        name: string;
        cycle: {
            name: string;
        };
    }>;
}

export default function EditChild({ child, levels }: Props) {
    const [formData, setFormData] = useState({
        name: child.name,
        age: child.age.toString(),
        grade_level: child.grade_level,
        avatar: null as File | null,
        is_active: child.is_active
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, avatar: file }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('age', formData.age);
        formDataToSend.append('grade_level', formData.grade_level);
        formDataToSend.append('is_active', formData.is_active.toString());
        formDataToSend.append('_method', 'PUT');
        
        if (formData.avatar) {
            formDataToSend.append('avatar', formData.avatar);
        }

        router.post(route('parent.children.update', child.id), formDataToSend, {
            onSuccess: () => {
                router.get(route('parent.children.index'));
            },
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    const ageOptions = Array.from({ length: 18 }, (_, i) => i + 1);

    return (
        <AppLayout>
            <Head title={`Modifier ${child.name}`} />
            
            <div className="container py-8">
                {/* Bouton retour */}
                <div className="mb-6">
                    <Button 
                        variant="outline" 
                        onClick={() => router.get(route('parent.children.index'))}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour à la liste
                    </Button>
                </div>

                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Modifier {child.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Photo de profil */}
                                <div>
                                    <Label htmlFor="avatar">Photo de profil (optionnel)</Label>
                                    <div className="mt-2">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                                {formData.avatar ? (
                                                    <img 
                                                        src={URL.createObjectURL(formData.avatar)} 
                                                        alt="Aperçu"
                                                        className="w-18 h-18 rounded-full object-cover"
                                                    />
                                                ) : child.avatar ? (
                                                    <img 
                                                        src={child.avatar} 
                                                        alt={child.name}
                                                        className="w-18 h-18 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <User className="h-8 w-8 text-gray-400" />
                                                )}
                                            </div>
                                            <div>
                                                <input
                                                    type="file"
                                                    id="avatar"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => document.getElementById('avatar')?.click()}
                                                >
                                                    <Upload className="h-4 w-4 mr-2" />
                                                    Choisir une photo
                                                </Button>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    JPG, PNG ou GIF (max 2MB)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Nom */}
                                <div>
                                    <Label htmlFor="name">Nom complet *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className={errors.name ? 'border-red-500' : ''}
                                        placeholder="Ex: Marie Diallo"
                                    />
                                    <InputError message={errors.name} className="mt-1" />
                                </div>

                                {/* Âge */}
                                <div>
                                    <Label htmlFor="age">Âge *</Label>
                                    <Select 
                                        value={formData.age} 
                                        onValueChange={(value) => handleInputChange('age', value)}
                                    >
                                        <SelectTrigger className={errors.age ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Sélectionner l'âge" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ageOptions.map((age) => (
                                                <SelectItem key={age} value={age.toString()}>
                                                    {age} ans
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.age} className="mt-1" />
                                </div>

                                {/* Niveau scolaire */}
                                <div>
                                    <Label htmlFor="grade_level">Niveau scolaire *</Label>
                                    <Select 
                                        value={formData.grade_level} 
                                        onValueChange={(value) => handleInputChange('grade_level', value)}
                                    >
                                        <SelectTrigger className={errors.grade_level ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Sélectionner le niveau" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {levels.map((level) => (
                                                <SelectItem key={level.id} value={level.name}>
                                                    <div className="flex items-center gap-2">
                                                        <GraduationCap className="h-4 w-4" />
                                                        <div>
                                                            <div className="font-medium">{level.name}</div>
                                                            <div className="text-xs text-gray-500">{level.cycle.name}</div>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.grade_level} className="mt-1" />
                                </div>

                                {/* Statut */}
                                <div>
                                    <Label htmlFor="is_active">Statut</Label>
                                    <Select 
                                        value={formData.is_active.toString()} 
                                        onValueChange={(value) => handleInputChange('is_active', value === 'true')}
                                    >
                                        <SelectTrigger className={errors.is_active ? 'border-red-500' : ''}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">Actif</SelectItem>
                                            <SelectItem value="false">Inactif</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.is_active} className="mt-1" />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Un enfant inactif ne pourra pas être sélectionné pour de nouvelles réservations.
                                    </p>
                                </div>

                                {/* Boutons d'action */}
                                <div className="flex gap-4 pt-6">
                                    <Button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="flex-1"
                                    >
                                        {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={() => router.get(route('parent.children.index'))}
                                    >
                                        Annuler
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
