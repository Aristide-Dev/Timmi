import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type AdminUser, type Role } from '@/types';
import { type PageProps } from '@inertiajs/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface UserEditProps extends PageProps {
    user: AdminUser;
    roles: Role[];
}

export default function UserEdit({ user, roles }: UserEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        is_verified: user.is_verified || false,
        is_available: user.is_available || false,
        bio: user.bio || '',
        hourly_rate: user.hourly_rate || 0,
        experience_years: user.experience_years || 0,
        education: user.education || '',
        specializations: user.specializations || [],
        languages: user.languages || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    };

    const handleSpecializationChange = (value: string) => {
        const specializations = value.split(',').map(s => s.trim()).filter(s => s);
        setData('specializations', specializations);
    };

    const handleLanguageChange = (value: string) => {
        const languages = value.split(',').map(l => l.trim()).filter(l => l);
        setData('languages', languages);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Administration', href: route('dashboard') },
                { title: 'Utilisateurs', href: route('admin.users.index') },
                { title: user.name, href: route('admin.users.show', user.id) },
                { title: 'Modifier', href: route('admin.users.edit', user.id) },
            ]}
        >
            <Head title={`Modifier - ${user.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.users.show', user.id)}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Modifier l'utilisateur</h1>
                            <p className="text-muted-foreground">{user.name}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations de base</CardTitle>
                                <CardDescription>
                                    Modifiez les informations personnelles de l'utilisateur
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom complet</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className={errors.phone ? 'border-red-500' : ''}
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-500">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_verified"
                                        checked={data.is_verified}
                                        onCheckedChange={(checked) => setData('is_verified', checked)}
                                    />
                                    <Label htmlFor="is_verified">Compte vérifié</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_available"
                                        checked={data.is_available}
                                        onCheckedChange={(checked) => setData('is_available', checked)}
                                    />
                                    <Label htmlFor="is_available">Compte actif</Label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Professor Information */}
                        {user.roles?.some(role => role.slug === 'professor') && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informations Professeur</CardTitle>
                                    <CardDescription>
                                        Détails spécifiques au profil professeur
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Biographie</Label>
                                        <Textarea
                                            id="bio"
                                            value={data.bio}
                                            onChange={(e) => setData('bio', e.target.value)}
                                            rows={3}
                                            className={errors.bio ? 'border-red-500' : ''}
                                        />
                                        {errors.bio && (
                                            <p className="text-sm text-red-500">{errors.bio}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="hourly_rate">Tarif horaire (GNF)</Label>
                                            <Input
                                                id="hourly_rate"
                                                type="number"
                                                value={data.hourly_rate}
                                                onChange={(e) => setData('hourly_rate', Number(e.target.value))}
                                                className={errors.hourly_rate ? 'border-red-500' : ''}
                                            />
                                            {errors.hourly_rate && (
                                                <p className="text-sm text-red-500">{errors.hourly_rate}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="experience_years">Années d'expérience</Label>
                                            <Input
                                                id="experience_years"
                                                type="number"
                                                value={data.experience_years}
                                                onChange={(e) => setData('experience_years', Number(e.target.value))}
                                                className={errors.experience_years ? 'border-red-500' : ''}
                                            />
                                            {errors.experience_years && (
                                                <p className="text-sm text-red-500">{errors.experience_years}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="education">Formation</Label>
                                        <Input
                                            id="education"
                                            value={data.education}
                                            onChange={(e) => setData('education', e.target.value)}
                                            className={errors.education ? 'border-red-500' : ''}
                                        />
                                        {errors.education && (
                                            <p className="text-sm text-red-500">{errors.education}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="specializations">Spécialisations (séparées par des virgules)</Label>
                                        <Input
                                            id="specializations"
                                            value={data.specializations.join(', ')}
                                            onChange={(e) => handleSpecializationChange(e.target.value)}
                                            placeholder="Mathématiques, Physique, Chimie"
                                            className={errors.specializations ? 'border-red-500' : ''}
                                        />
                                        {errors.specializations && (
                                            <p className="text-sm text-red-500">{errors.specializations}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="languages">Langues (séparées par des virgules)</Label>
                                        <Input
                                            id="languages"
                                            value={data.languages.join(', ')}
                                            onChange={(e) => handleLanguageChange(e.target.value)}
                                            placeholder="Français, Anglais, Espagnol"
                                            className={errors.languages ? 'border-red-500' : ''}
                                        />
                                        {errors.languages && (
                                            <p className="text-sm text-red-500">{errors.languages}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Parent Information */}
                        {user.roles?.some(role => role.slug === 'parent') && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informations Parent</CardTitle>
                                    <CardDescription>
                                        Détails spécifiques au profil parent
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-center py-8 text-muted-foreground">
                                        <p>Gestion des enfants disponible dans la section dédiée</p>
                                        <Button variant="outline" className="mt-2" asChild>
                                            <Link href={route('admin.parents.children', user.id)}>
                                                Voir les enfants
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.users.show', user.id)}>
                                Annuler
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Sauvegarde...' : 'Sauvegarder'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
