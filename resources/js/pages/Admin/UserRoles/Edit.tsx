import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Role {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_default: boolean;
    is_admin: boolean;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    user: User;
    roles: Role[];
    userRoles: number[];
}

export default function Edit({ user, roles, userRoles }: Props) {
    const { data, setData, put, errors, processing } = useForm({
        roles: userRoles,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/user-roles/${user.id}`);
    };

    const handleRoleChange = (roleId: number, checked: boolean) => {
        if (checked) {
            setData('roles', [...data.roles, roleId]);
        } else {
            setData(
                'roles',
                data.roles.filter((id) => id !== roleId),
            );
        }
    };

    return (
        <AppLayout>
            <Head title={`Modifier les rôles de ${user.name}`} />

            <div className="container py-8">
                <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => window.history.back()}>
                    <ArrowLeft className="h-4 w-4" /> Retour à la liste
                </Button>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Modifier les rôles de l'utilisateur</h1>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg font-medium">{user.name}</span>
                        <Badge variant="outline">{user.email}</Badge>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Attribution des rôles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {roles.map((role) => (
                                <div key={role.id} className="flex items-start space-x-3">
                                    <Checkbox
                                        id={`role-${role.id}`}
                                        checked={data.roles.includes(role.id)}
                                        onCheckedChange={(checked) => handleRoleChange(role.id, Boolean(checked))}
                                    />
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Label htmlFor={`role-${role.id}`} className="font-medium">
                                                {role.name}
                                            </Label>
                                            {role.is_admin && (
                                                <Badge variant="destructive" className="text-xs">
                                                    Admin
                                                </Badge>
                                            )}
                                            {role.is_default && (
                                                <Badge variant="secondary" className="text-xs">
                                                    Par défaut
                                                </Badge>
                                            )}
                                        </div>
                                        {role.description && <p className="text-sm text-muted-foreground">{role.description}</p>}
                                    </div>
                                </div>
                            ))}

                            {errors.roles && <p className="mt-2 text-sm text-red-500">{errors.roles}</p>}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                Annuler
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Enregistrer les modifications
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
