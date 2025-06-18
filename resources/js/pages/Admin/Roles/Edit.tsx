import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

interface PermissionGroup {
    [key: string]: {
        [key: string]: string;
    };
}

interface Role {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_default: boolean;
    is_admin: boolean;
    permissions: string[] | null;
}

interface Props {
    role: Role;
    availablePermissions: PermissionGroup;
}

export default function Edit({ role, availablePermissions }: Props) {
    const { data, setData, put, errors, processing } = useForm({
        name: role.name,
        slug: role.slug,
        description: role.description || '',
        is_default: role.is_default,
        is_admin: role.is_admin,
        permissions: role.permissions || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/roles/${role.id}`);
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
            <Head title={`Modifier le rôle: ${role.name}`} />

            <div className="container py-8">
                <h1 className="mb-6 text-3xl font-bold">Modifier le rôle: {role.name}</h1>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations du rôle</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" value={data.slug} onChange={(e) => setData('slug', e.target.value)} />
                                    {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_default"
                                        checked={data.is_default}
                                        onCheckedChange={(checked) => setData('is_default', Boolean(checked))}
                                    />
                                    <Label htmlFor="is_default">Rôle par défaut</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_admin"
                                        checked={data.is_admin}
                                        onCheckedChange={(checked) => {
                                            setData('is_admin', Boolean(checked));
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
                                                                onCheckedChange={(checked) => handlePermissionChange(permKey, Boolean(checked))}
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
                                Mettre à jour
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
