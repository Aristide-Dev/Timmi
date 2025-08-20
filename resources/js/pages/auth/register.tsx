import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, MapPin, Building, Home } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';
import { usePage } from '@inertiajs/react';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'parent' | 'teacher' | 'student' | '';
    phone: string;
    city_id: string;
    commune_id: string;
    neighborhood_id: string;
};

type City = {
    id: number;
    name: string;
    code: string;
};

type Commune = {
    id: number;
    name: string;
    code: string;
    city_id: number;
};

type Neighborhood = {
    id: number;
    name: string;
    code: string;
    commune_id: number;
};

export default function Register() {
    const { defaultRole } = usePage<{ defaultRole: string }>().props;
    
    const [cities, setCities] = useState<City[]>([]);
    const [communes, setCommunes] = useState<Commune[]>([]);
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: defaultRole || '',
        phone: '',
        city_id: '',
        commune_id: '',
        neighborhood_id: '',
    });

    // Charger les villes au montage du composant
    useEffect(() => {
        fetch('/api/cities')
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => console.error('Erreur lors du chargement des villes:', error));
    }, []);

    // Charger les communes quand une ville est sélectionnée
    useEffect(() => {
        if (data.city_id) {
            fetch(`/api/cities/${data.city_id}/communes`)
                .then(response => response.json())
                .then(data => setCommunes(data))
                .catch(error => console.error('Erreur lors du chargement des communes:', error));
        } else {
            setCommunes([]);
        }
        setData('commune_id', '');
        setData('neighborhood_id', '');
    }, [data.city_id]);

    // Charger les quartiers quand une commune est sélectionnée
    useEffect(() => {
        if (data.commune_id) {
            fetch(`/api/communes/${data.commune_id}/neighborhoods`)
                .then(response => response.json())
                .then(data => setNeighborhoods(data))
                .catch(error => console.error('Erreur lors du chargement des quartiers:', error));
        } else {
            setNeighborhoods([]);
        }
        setData('neighborhood_id', '');
    }, [data.commune_id]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthSplitLayout 
            title="Créer un compte" 
            description="Entrez vos informations pour créer votre compte"
        >
            <Head title="Inscription" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="role">Type de compte</Label>
                        <Select
                            value={data.role}
                            onValueChange={(value) => setData('role', value as 'parent' | 'teacher' | 'student')}
                            disabled={processing}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un type de compte" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="parent">Parent d'élève</SelectItem>
                                <SelectItem value="teacher">Professeur</SelectItem>
                                <SelectItem value="student">Élève direct</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Prénom et nom"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@exemple.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                            id="phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            disabled={processing}
                            placeholder="07XXXXXXXX"
                        />
                        <InputError message={errors.phone} />
                    </div>

                    {/* Sélection des localités pour les professeurs */}
                    {data.role === 'teacher' && (
                        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                Localisation pour les cours
                            </div>
                            
                            <div className="grid gap-4">
                    <div className="grid gap-2">
                                    <Label htmlFor="city_id" className="flex items-center gap-2">
                                        <Building className="w-4 h-4" />
                                        Ville
                                    </Label>
                                    <Select
                                        value={data.city_id}
                                        onValueChange={(value) => setData('city_id', value)}
                            disabled={processing}
                                    >
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
                                    <InputError message={errors.city_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="commune_id" className="flex items-center gap-2">
                                        <Building className="w-4 h-4" />
                                        Commune
                                    </Label>
                                    <Select
                                        value={data.commune_id}
                                        onValueChange={(value) => setData('commune_id', value)}
                                        disabled={processing || !data.city_id}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez une commune" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {communes.map((commune) => (
                                                <SelectItem key={commune.id} value={commune.id.toString()}>
                                                    {commune.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.commune_id} />
                    </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="neighborhood_id" className="flex items-center gap-2">
                                        <Home className="w-4 h-4" />
                                        Quartier
                                    </Label>
                                    <Select
                                        value={data.neighborhood_id}
                                        onValueChange={(value) => setData('neighborhood_id', value)}
                                        disabled={processing || !data.commune_id}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez un quartier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {neighborhoods.map((neighborhood) => (
                                                <SelectItem key={neighborhood.id} value={neighborhood.id.toString()}>
                                                    {neighborhood.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.neighborhood_id} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Mot de passe"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirmer le mot de passe"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    {data.role === 'teacher' && (
                        <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
                            <p className="font-medium">Note pour les professeurs :</p>
                            <p>Votre compte devra être validé par un administrateur avant de pouvoir recevoir des réservations. Vous recevrez un email de confirmation une fois votre compte approuvé.</p>
                        </div>
                    )}

                    <Button type="submit" className="mt-2 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Créer mon compte
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Vous avez déjà un compte ?{' '}
                    <TextLink href={route('login')}>
                        Se connecter
                    </TextLink>
                </div>
            </form>
        </AuthSplitLayout>
    );
}
