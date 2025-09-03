import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Award, 
    Plus,
    Trash2,
    ArrowLeft,
    Upload,
    Download,
    Calendar,
    XCircle,
    AlertCircle
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Certificate, PagePropsWithData } from '@/types/global';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

interface Props extends PagePropsWithData {
    certificates: Certificate[];
    errors?: Record<string, string>;
}

export default function ProfessorCertificates({ certificates = [], errors, flash }: Props) {
    const [isAdding, setIsAdding] = useState(false);

    const { data, setData, post, delete: destroy, processing } = useForm({
        name: '',
        issuing_organization: '',
        issued_date: '',
        expiry_date: '',
        certificate_file: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('professor.certificates.store'), {
            forceFormData: true,
        });
    };

    const handleRemoveCertificate = (certificateId: number) => {
        destroy(route('professor.certificates.destroy', certificateId));
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const isExpired = (expiryDate: string) => {
        return new Date(expiryDate) < new Date();
    };

    const isExpiringSoon = (expiryDate: string) => {
        const expiry = new Date(expiryDate);
        const now = new Date();
        const diffTime = expiry.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && diffDays > 0;
    };

    return (
        <AppLayout>
            <Head title="Mes Certificats - Professeur" />
            
            <div className="space-y-6">
                {/* Affichage des erreurs */}
                {errors && Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <h3 className="text-sm font-medium text-red-800 mb-2">Erreurs de validation :</h3>
                        <ul className="text-sm text-red-700 space-y-1">
                            {Object.entries(errors).map(([field, message]) => (
                                <li key={field}>• {message}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Affichage des messages flash */}
                {flash && (
                    <>
                        {flash.success && (
                            <div className="bg-green-50 border border-green-200 rounded-md p-4">
                                <div className="flex">
                                    <Award className="h-5 w-5 text-green-400 mr-2" />
                                    <p className="text-sm text-green-800">{flash.success}</p>
                                </div>
                            </div>
                        )}
                        {flash.error && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                <div className="flex">
                                    <XCircle className="h-5 w-5 text-red-400 mr-2" />
                                    <p className="text-sm text-red-800">{flash.error}</p>
                                </div>
                            </div>
                        )}
                        {flash.warning && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                                <div className="flex">
                                    <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                                    <p className="text-sm text-yellow-800">{flash.warning}</p>
                                </div>
                            </div>
                        )}
                        {flash.info && (
                            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                                <div className="flex">
                                    <Award className="h-5 w-5 text-blue-400 mr-2" />
                                    <p className="text-sm text-blue-800">{flash.info}</p>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('professor.dashboard')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Mes Certificats</h1>
                            <p className="text-muted-foreground">
                                Gérez vos certificats et qualifications
                            </p>
                        </div>
                    </div>
                    <Button onClick={() => setIsAdding(!isAdding)}>
                        <Plus className="h-4 w-4 mr-2" />
                        {isAdding ? 'Annuler' : 'Ajouter un certificat'}
                    </Button>
                </div>

                {/* Formulaire d'ajout */}
                {isAdding && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                Ajouter un certificat
                            </CardTitle>
                            <CardDescription>
                                Ajoutez un nouveau certificat ou qualification
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Nom du certificat *</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Ex: Certificat d'enseignement"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Organisme émetteur *</label>
                                        <input
                                            type="text"
                                            value={data.issuing_organization}
                                            onChange={(e) => setData('issuing_organization', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Ex: Ministère de l'Éducation"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Date d'obtention *</label>
                                        <input
                                            type="date"
                                            value={data.issued_date}
                                            onChange={(e) => setData('issued_date', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Date d'expiration</label>
                                        <input
                                            type="date"
                                            value={data.expiry_date}
                                            onChange={(e) => setData('expiry_date', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Fichier du certificat</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => setData('certificate_file', e.target.files?.[0] || null)}
                                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                                        />
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4">
                                    <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                                        Annuler
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Ajout...' : 'Ajouter le certificat'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Liste des certificats */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Mes certificats
                        </CardTitle>
                        <CardDescription>
                            Vos certificats et qualifications professionnelles
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {certificates.length > 0 ? (
                            <div className="space-y-4">
                                {certificates.map((certificate) => (
                                    <div key={certificate.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Award className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-lg">{certificate.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {certificate.issuing_organization}
                                                </p>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <p className="text-sm text-muted-foreground">
                                                        <Calendar className="h-4 w-4 inline mr-1" />
                                                        Obtenu le {formatDate(certificate.issued_date)}
                                                    </p>
                                                    {certificate.expiry_date && (
                                                        <p className="text-sm text-muted-foreground">
                                                            Expire le {formatDate(certificate.expiry_date)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {certificate.expiry_date && (
                                                <>
                                                    {isExpired(certificate.expiry_date) ? (
                                                        <Badge variant="destructive">Expiré</Badge>
                                                    ) : isExpiringSoon(certificate.expiry_date) ? (
                                                        <Badge variant="outline" className="border-orange-300 text-orange-700">
                                                            Expire bientôt
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="default">Valide</Badge>
                                                    )}
                                                </>
                                            )}
                                            {certificate.file_path && (
                                                <Button variant="outline" size="sm">
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Télécharger
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveCertificate(certificate.id)}
                                                disabled={processing}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground text-lg">
                                    Aucun certificat ajouté
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Ajoutez vos certificats pour renforcer votre profil
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Statistiques */}
                <Card>
                    <CardHeader>
                        <CardTitle>Statistiques</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">{certificates.length}</p>
                                <p className="text-sm text-muted-foreground">Total certificats</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">
                                    {certificates.filter(c => c.expiry_date && !isExpired(c.expiry_date)).length}
                                </p>
                                <p className="text-sm text-muted-foreground">Certificats valides</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">
                                    {certificates.filter(c => c.expiry_date && isExpiringSoon(c.expiry_date)).length}
                                </p>
                                <p className="text-sm text-muted-foreground">Expirent bientôt</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">
                                    {certificates.filter(c => c.expiry_date && isExpired(c.expiry_date)).length}
                                </p>
                                <p className="text-sm text-muted-foreground">Expirés</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
