import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { AlertCircle, Edit, User } from 'lucide-react';

interface Role {
    id: number;
    name: string;
    slug: string;
    is_admin: boolean;
    is_default: boolean;
}

interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

export default function Index({ users }: Props) {
    return (
        <AppLayout>
            <Head title="Gestion des rôles utilisateur" />

            <div className="container py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Gestion des rôles utilisateur</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Liste des utilisateurs et leurs rôles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Rôles</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {user.roles.length > 0 ? (
                                                    user.roles.map((role) => (
                                                        <Badge
                                                            key={role.id}
                                                            variant={role.is_admin ? 'destructive' : role.is_default ? 'secondary' : 'outline'}
                                                        >
                                                            {role.name}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">Aucun rôle</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/admin/user-roles/${user.id}/edit`}>
                                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                                    <Edit className="h-3 w-3" />
                                                    <span>Modifier</span>
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {users.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-8 text-center">
                                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                <AlertCircle className="mb-2 h-12 w-12" />
                                                <p>Aucun utilisateur trouvé</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {users.last_page > 1 && (
                            <div className="mt-4 flex justify-center">
                                <Pagination currentPage={users.current_page} totalPages={users.last_page} links={users.links} />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
