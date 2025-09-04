import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
    User, 
    ArrowLeft,
    Upload,
    Save
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { User as UserType, Subject, Level, City, PagePropsWithData } from '@/types/global';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

interface Props extends PagePropsWithData {
    user: UserType;
    subjects: Subject[];
    levels: Level[];
    cities: City[];
}

export default function ProfessorProfileEdit({ user, subjects, levels, cities }: Props) {
    const [selectedSubjects, setSelectedSubjects] = useState<number[]>(
        user.subjects?.map(s => s.id) || []
    );
    const [selectedLevels, setSelectedLevels] = useState<number[]>(
        user.levels?.map(l => l.id) || []
    );
    const [selectedCities, setSelectedCities] = useState<number[]>(
        user.cities?.map(c => c.id) || []
    );

    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        hourly_rate: Number(user.hourly_rate) || 0,
        profile_photo: null as File | null,
        subjects: selectedSubjects,
        levels: selectedLevels,
        cities: selectedCities,
    });

    const handleSubjectChange = (subjectId: number, checked: boolean) => {
        let newSubjects;
        if (checked) {
            newSubjects = [...selectedSubjects, subjectId];
        } else {
            newSubjects = selectedSubjects.filter(id => id !== subjectId);
        }
        setSelectedSubjects(newSubjects);
        setData('subjects', newSubjects);
    };

    const handleLevelChange = (levelId: number, checked: boolean) => {
        let newLevels;
        if (checked) {
            newLevels = [...selectedLevels, levelId];
        } else {
            newLevels = selectedLevels.filter(id => id !== levelId);
        }
        setSelectedLevels(newLevels);
        setData('levels', newLevels);
    };

    const handleCityChange = (cityId: number, checked: boolean) => {
        let newCities;
        if (checked) {
            newCities = [...selectedCities, cityId];
        } else {
            newCities = selectedCities.filter(id => id !== cityId);
        }
        setSelectedCities(newCities);
        setData('cities', newCities);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation côté client
        if (!data.bio.trim()) {
            alert('La biographie est obligatoire.');
            return;
        }
        
        if (selectedSubjects.length === 0) {
            alert('Vous devez sélectionner au moins une matière.');
            return;
        }
        
        if (selectedLevels.length === 0) {
            alert('Vous devez sélectionner au moins un niveau.');
            return;
        }
        
        if (selectedCities.length === 0) {
            alert('Vous devez sélectionner au moins une ville.');
            return;
        }
        
        const options: any = {};
        
        // Utiliser forceFormData seulement si nous avons un fichier à uploader
        if (data.profile_photo) {
            options.forceFormData = true;
        }
        
        put(route('professor.profile.update'), options);
    };

    return (
        <AppLayout>
            <Head title="Modifier le Profil - Professeur" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('professor.profile.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Modifier le Profil</h1>
                            <p className="text-muted-foreground">
                                Mettez à jour vos informations personnelles et professionnelles
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informations personnelles */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Informations personnelles
                            </CardTitle>
                            <CardDescription>
                                Vos informations de base et de contact
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom complet *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Votre nom complet"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="votre@email.com"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Téléphone *</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+225 XX XX XX XX"
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hourly_rate">Tarif horaire (GNF) *</Label>
                                    <Input
                                        id="hourly_rate"
                                        type="number"
                                        value={data.hourly_rate}
                                        onChange={(e) => setData('hourly_rate', Number(e.target.value))}
                                        placeholder="5000"
                                    />
                                    {errors.hourly_rate && (
                                        <p className="text-sm text-red-600">{errors.hourly_rate}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Biographie *</Label>
                                <Textarea
                                    id="bio"
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    placeholder="Décrivez votre parcours, vos compétences et votre approche pédagogique..."
                                    rows={4}
                                />
                                {errors.bio && (
                                    <p className="text-sm text-red-600">{errors.bio}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="profile_photo">Photo de profil</Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        id="profile_photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('profile_photo', e.target.files?.[0] || null)}
                                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                                    />
                                    <Upload className="h-4 w-4 text-muted-foreground" />
                                </div>
                                {errors.profile_photo && (
                                    <p className="text-sm text-red-600">{errors.profile_photo}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Matières enseignées */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Matières enseignées *</CardTitle>
                            <CardDescription>
                                Sélectionnez les matières que vous enseignez
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {subjects.map((subject) => (
                                    <div key={subject.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`subject-${subject.id}`}
                                            checked={selectedSubjects.includes(subject.id)}
                                            onCheckedChange={(checked) => 
                                                handleSubjectChange(subject.id, checked as boolean)
                                            }
                                        />
                                        <Label 
                                            htmlFor={`subject-${subject.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {subject.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            {errors.subjects && (
                                <p className="text-sm text-red-600 mt-2">{errors.subjects}</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Niveaux enseignés */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Niveaux enseignés *</CardTitle>
                            <CardDescription>
                                Sélectionnez les niveaux scolaires que vous couvrez
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {levels.map((level) => (
                                    <div key={level.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`level-${level.id}`}
                                            checked={selectedLevels.includes(level.id)}
                                            onCheckedChange={(checked) => 
                                                handleLevelChange(level.id, checked as boolean)
                                            }
                                        />
                                        <Label 
                                            htmlFor={`level-${level.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {level.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            {errors.levels && (
                                <p className="text-sm text-red-600 mt-2">{errors.levels}</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Zones géographiques */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Zones géographiques *</CardTitle>
                            <CardDescription>
                                Sélectionnez les villes où vous donnez des cours
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {cities.map((city) => (
                                    <div key={city.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`city-${city.id}`}
                                            checked={selectedCities.includes(city.id)}
                                            onCheckedChange={(checked) => 
                                                handleCityChange(city.id, checked as boolean)
                                            }
                                        />
                                        <Label 
                                            htmlFor={`city-${city.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {city.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            {errors.cities && (
                                <p className="text-sm text-red-600 mt-2">{errors.cities}</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href={route('professor.profile.index')}>
                                Annuler
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
