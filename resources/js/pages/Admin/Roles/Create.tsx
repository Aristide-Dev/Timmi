import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface PermissionGroup {
    [key: string]: {
        [key: string]: string;
    };
}

interface Props {
    availablePermissions: PermissionGroup;
}

export default function Create({ availablePermissions }: Props) {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: '',
        slug: '',
        description: '',
        is_default: false,
        is_admin: false,
        permissions: [] as string[],
    });

    useEffect(() => {
        // Générer automatiquement le slug à partir du nom
        if (data.name) {
            const slug = data.name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');

            setData('slug', slug);
        }
    }, [data.name]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/roles', {
            onSuccess: () => reset(),
        });
    };

    const handlePermissionChange = (permission: string, checked: boolean) => {
        if (checked) {
            setData('permissions', [...data.permissions, permission]);
        } else {
            setData(
                'permissions',
                data.permissions.filter((p) => p !== permission),
            );
        }
    };

    return (
        <AppLayout>
            <Head title="Créer un rôle" />

            <div className="container py-8">
                <h1 className="mb-6 text-3xl font-bold">Créer un nouveau rôle</h1>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations du rôle</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" value={data.slug} onChange={(e) => setData('slug', e.target.value)} error={errors.slug} />
                                    {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    error={errors.description}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_default"
                                        checked={data.is_default}
                                        onCheckedChange={(checked) => setData('is_default', !!checked)}
                                    />
                                    <Label htmlFor="is_default">Rôle par défaut</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_admin"
                                        checked={data.is_admin}
                                        onCheckedChange={(checked) => {
                                            setData('is_admin', !!checked);
                                            // Si c'est un rôle admin, les permissions sont ignorées
                                            if (checked) {
                                                setData('permissions', []);
                                            }
                                        }}
                                    />
                                    <Label htmlFor="is_admin">Rôle administrateur</Label>
                                </div>
                            </div>

                            {!data.is_admin && (
                                <>
                                    <Separator className="my-4" />
                                    <h3 className="mb-4 text-lg font-semibold">Permissions</h3>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {Object.entries(availablePermissions).map(([groupName, permissions]) => (
                                            <div key={groupName} className="space-y-2">
                                                <h4 className="font-medium capitalize">{groupName}</h4>
                                                <div className="space-y-2 pl-2">
                                                    {Object.entries(permissions).map(([permKey, permLabel]) => (
                                                        <div key={permKey} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={permKey}
                                                                checked={data.permissions.includes(permKey)}
                                                                onCheckedChange={(checked) => handlePermissionChange(permKey, !!checked)}
                                                            />
                                                            <Label htmlFor={permKey}>{permLabel}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                Annuler
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Créer le rôle
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
