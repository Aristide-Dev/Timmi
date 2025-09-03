import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type User } from '@/types/global';
import { Head, router } from '@inertiajs/react';
import { 
    ArrowLeft,
    User as UserIcon,
    Upload,
    Eye,
    EyeOff
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    user: User;
}

export default function EditProfile({ user }: Props) {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: null as File | null,
        current_password: '',
        password: '',
        password_confirmation: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const handleInputChange = (field: string, value: string) => {
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
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone || '');
        formDataToSend.append('_method', 'PUT');
        
        if (formData.avatar) {
            formDataToSend.append('avatar', formData.avatar);
        }
        
        if (formData.current_password) {
            formDataToSend.append('current_password', formData.current_password);
        }
        
        if (formData.password) {
            formDataToSend.append('password', formData.password);
            formDataToSend.append('password_confirmation', formData.password_confirmation);
        }

        router.post(route('parent.profile.update'), formDataToSend, {
            onSuccess: () => {
                router.get(route('parent.profile.index'));
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

    return (
        <AppLayout>
            <Head title="Modifier mon profil" />
            
            <div className="container py-8">
                {/* Bouton retour */}
                <div className="mb-6">
                    <Button 
                        variant="outline" 
                        onClick={() => router.get(route('parent.profile.index'))}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour au profil
                    </Button>
                </div>

                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserIcon className="h-5 w-5" />
                                Modifier mon profil
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
                                                ) : user.avatar ? (
                                                    <img 
                                                        src={user.avatar} 
                                                        alt={user.name}
                                                        className="w-18 h-18 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <UserIcon className="h-8 w-8 text-gray-400" />
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

                                {/* Email */}
                                <div>
                                    <Label htmlFor="email">Adresse email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={errors.email ? 'border-red-500' : ''}
                                        placeholder="marie.diallo@example.com"
                                    />
                                    <InputError message={errors.email} className="mt-1" />
                                </div>

                                {/* Téléphone */}
                                <div>
                                    <Label htmlFor="phone">Numéro de téléphone *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className={errors.phone ? 'border-red-500' : ''}
                                        placeholder="+224612345678"
                                    />
                                    <InputError message={errors.phone} className="mt-1" />
                                </div>

                                {/* Section changement de mot de passe */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-medium mb-4">Changer le mot de passe (optionnel)</h3>
                                    
                                    {/* Mot de passe actuel */}
                                    <div className="mb-4">
                                        <Label htmlFor="current_password">Mot de passe actuel</Label>
                                        <div className="relative">
                                            <Input
                                                id="current_password"
                                                type={showCurrentPassword ? "text" : "password"}
                                                value={formData.current_password}
                                                onChange={(e) => handleInputChange('current_password', e.target.value)}
                                                className={errors.current_password ? 'border-red-500 pr-10' : 'pr-10'}
                                                placeholder="Votre mot de passe actuel"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            >
                                                {showCurrentPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                        <InputError message={errors.current_password} className="mt-1" />
                                    </div>

                                    {/* Nouveau mot de passe */}
                                    <div className="mb-4">
                                        <Label htmlFor="password">Nouveau mot de passe</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={(e) => handleInputChange('password', e.target.value)}
                                                className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                                                placeholder="Nouveau mot de passe"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                        <InputError message={errors.password} className="mt-1" />
                                    </div>

                                    {/* Confirmation du mot de passe */}
                                    <div>
                                        <Label htmlFor="password_confirmation">Confirmer le nouveau mot de passe</Label>
                                        <div className="relative">
                                            <Input
                                                id="password_confirmation"
                                                type={showPasswordConfirmation ? "text" : "password"}
                                                value={formData.password_confirmation}
                                                onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
                                                className={errors.password_confirmation ? 'border-red-500 pr-10' : 'pr-10'}
                                                placeholder="Confirmer le nouveau mot de passe"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                            >
                                                {showPasswordConfirmation ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                        <InputError message={errors.password_confirmation} className="mt-1" />
                                    </div>
                                </div>

                                {/* Boutons d'action */}
                                <div className="flex gap-4 pt-6">
                                    <Button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="flex-1"
                                    >
                                        {isSubmitting ? 'Mise à jour...' : 'Mettre à jour le profil'}
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={() => router.get(route('parent.profile.index'))}
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
