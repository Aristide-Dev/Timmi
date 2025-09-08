import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    age?: number;
    grade_level?: string;
    school?: string;
    learning_goals?: string;
    preferred_subjects?: number[];
    preferred_levels?: number[];
    preferred_cities?: number[];
    parent_id?: number;
    student_subjects: Array<{
        id: number;
        name: string;
    }>;
    student_levels: Array<{
        id: number;
        name: string;
    }>;
    student_cities: Array<{
        id: number;
        name: string;
    }>;
    parent?: {
        id: number;
        name: string;
        email: string;
    };
}

interface EditProfileProps {
    user: User;
    subjects: Array<{
        id: number;
        name: string;
    }>;
    levels: Array<{
        id: number;
        name: string;
    }>;
    cities: Array<{
        id: number;
        name: string;
    }>;
}

export default function EditStudentProfile({ user, subjects, levels, cities }: EditProfileProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        age: user.age || '',
        grade_level: user.grade_level || '',
        school: user.school || '',
        learning_goals: user.learning_goals || '',
        preferred_subjects: user.preferred_subjects || [],
        preferred_levels: user.preferred_levels || [],
        preferred_cities: user.preferred_cities || [],
        parent_id: user.parent_id || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('student.profile.update'));
    };

    const handleArrayChange = (field: string, value: number, checked: boolean) => {
        const currentArray = data[field as keyof typeof data] as number[];
        if (checked) {
            setData(field as keyof typeof data, [...currentArray, value] as any);
        } else {
            setData(field as keyof typeof data, currentArray.filter(id => id !== value) as any);
        }
    };

    return (
        <AppLayout>
            <Head title="Modifier mon profil - Étudiant" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center space-x-4">
                    <Button asChild variant="outline" size="sm">
                        <Link href={route('student.profile.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Modifier mon profil</h1>
                        <p className="text-muted-foreground">
                            Mettez à jour vos informations personnelles
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Informations personnelles */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations personnelles</CardTitle>
                                <CardDescription>
                                    Vos données de base
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nom complet *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className={errors.phone ? 'border-red-500' : ''}
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="age">Âge</Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        min="13"
                                        max="25"
                                        value={data.age}
                                        onChange={(e) => setData('age', e.target.value ? parseInt(e.target.value) : '')}
                                        className={errors.age ? 'border-red-500' : ''}
                                    />
                                    {errors.age && (
                                        <p className="text-sm text-red-500 mt-1">{errors.age}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="grade_level">Niveau scolaire</Label>
                                    <Input
                                        id="grade_level"
                                        value={data.grade_level}
                                        onChange={(e) => setData('grade_level', e.target.value)}
                                        placeholder="Ex: Terminale, 1ère année université..."
                                        className={errors.grade_level ? 'border-red-500' : ''}
                                    />
                                    {errors.grade_level && (
                                        <p className="text-sm text-red-500 mt-1">{errors.grade_level}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="school">École/Université</Label>
                                    <Input
                                        id="school"
                                        value={data.school}
                                        onChange={(e) => setData('school', e.target.value)}
                                        className={errors.school ? 'border-red-500' : ''}
                                    />
                                    {errors.school && (
                                        <p className="text-sm text-red-500 mt-1">{errors.school}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Objectifs d'apprentissage */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Objectifs d'apprentissage</CardTitle>
                                <CardDescription>
                                Décrivez vos objectifs et motivations
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <Label htmlFor="learning_goals">Objectifs</Label>
                                    <Textarea
                                        id="learning_goals"
                                        value={data.learning_goals}
                                        onChange={(e) => setData('learning_goals', e.target.value)}
                                        placeholder="Ex: Améliorer mes notes en mathématiques, préparer le baccalauréat..."
                                        rows={4}
                                        className={errors.learning_goals ? 'border-red-500' : ''}
                                    />
                                    {errors.learning_goals && (
                                        <p className="text-sm text-red-500 mt-1">{errors.learning_goals}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Matières préférées */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Matières préférées</CardTitle>
                                <CardDescription>
                                    Sélectionnez les matières qui vous intéressent
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {subjects.map((subject) => (
                                        <div key={subject.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`subject-${subject.id}`}
                                                checked={data.preferred_subjects.includes(subject.id)}
                                                onCheckedChange={(checked) => 
                                                    handleArrayChange('preferred_subjects', subject.id, checked as boolean)
                                                }
                                            />
                                            <Label htmlFor={`subject-${subject.id}`} className="text-sm">
                                                {subject.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.preferred_subjects && (
                                    <p className="text-sm text-red-500 mt-1">{errors.preferred_subjects}</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Niveaux préférés */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Niveaux préférés</CardTitle>
                                <CardDescription>
                                    Sélectionnez les niveaux que vous souhaitez étudier
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {levels.map((level) => (
                                        <div key={level.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`level-${level.id}`}
                                                checked={data.preferred_levels.includes(level.id)}
                                                onCheckedChange={(checked) => 
                                                    handleArrayChange('preferred_levels', level.id, checked as boolean)
                                                }
                                            />
                                            <Label htmlFor={`level-${level.id}`} className="text-sm">
                                                {level.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.preferred_levels && (
                                    <p className="text-sm text-red-500 mt-1">{errors.preferred_levels}</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Villes préférées */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Zones géographiques</CardTitle>
                                <CardDescription>
                                    Sélectionnez les villes où vous souhaitez prendre des cours
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {cities.map((city) => (
                                        <div key={city.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`city-${city.id}`}
                                                checked={data.preferred_cities.includes(city.id)}
                                                onCheckedChange={(checked) => 
                                                    handleArrayChange('preferred_cities', city.id, checked as boolean)
                                                }
                                            />
                                            <Label htmlFor={`city-${city.id}`} className="text-sm">
                                                {city.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.preferred_cities && (
                                    <p className="text-sm text-red-500 mt-1">{errors.preferred_cities}</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-4">
                        <Button asChild variant="outline">
                            <Link href={route('student.profile.index')}>
                                Annuler
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? 'Sauvegarde...' : 'Sauvegarder'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
