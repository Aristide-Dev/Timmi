import { Head, useForm, router } from '@inertiajs/react';
import { Clock, Plus, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { useState } from 'react';

type Availability = {
    id: number;
    day_of_week: number;
    start_time: string;
    end_time: string;
    is_recurring: boolean;
    start_date?: string;
    end_date?: string;
};

interface TeacherAvailabilitiesProps extends PageProps {
    availabilities: Availability[];
}

export default function TeacherAvailabilities({ availabilities }: TeacherAvailabilitiesProps) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [availabilityToDelete, setAvailabilityToDelete] = useState<Availability | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        day_of_week: '',
        start_time: '',
        end_time: '',
        is_recurring: true,
        start_date: '',
        end_date: '',
    });

    const daysOfWeek = [
        { value: '0', label: 'Dimanche' },
        { value: '1', label: 'Lundi' },
        { value: '2', label: 'Mardi' },
        { value: '3', label: 'Mercredi' },
        { value: '4', label: 'Jeudi' },
        { value: '5', label: 'Vendredi' },
        { value: '6', label: 'Samedi' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('teacher.availabilities.store'), {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                setData({
                    day_of_week: '',
                    start_time: '',
                    end_time: '',
                    is_recurring: true,
                    start_date: '',
                    end_date: '',
                });
            },
        });
    };

    const handleDelete = (availability: Availability) => {
        setAvailabilityToDelete(availability);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (availabilityToDelete) {
            router.delete(route('teacher.availabilities.destroy', availabilityToDelete.id), {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    setAvailabilityToDelete(null);
                },
            });
        }
    };

    const formatTime = (time: string) => {
        return time.substring(0, 5); // Format HH:MM
    };

    const getDayLabel = (dayOfWeek: number) => {
        return daysOfWeek.find(day => day.value === dayOfWeek.toString())?.label || 'Inconnu';
    };

    const groupAvailabilitiesByDay = () => {
        const grouped: Record<number, Availability[]> = {};
        daysOfWeek.forEach(day => {
            grouped[parseInt(day.value)] = [];
        });

        availabilities.forEach(availability => {
            if (grouped[availability.day_of_week]) {
                grouped[availability.day_of_week].push(availability);
            }
        });

        return grouped;
    };

    const groupedAvailabilities = groupAvailabilitiesByDay();

    return (
        <AppLayout>
            <Head title="Mes Disponibilités" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Mes Disponibilités</h1>
                        <p className="text-muted-foreground">
                            Gérez vos créneaux disponibles pour recevoir des réservations
                        </p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter un créneau
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Ajouter une disponibilité</DialogTitle>
                                <DialogDescription>
                                    Définissez un nouveau créneau de disponibilité
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="day_of_week">Jour de la semaine</Label>
                                        <select
                                            id="day_of_week"
                                            value={data.day_of_week}
                                            onChange={(e) => setData('day_of_week', e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="">Sélectionner un jour</option>
                                            {daysOfWeek.map((day) => (
                                                <option key={day.value} value={day.value}>
                                                    {day.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.day_of_week && (
                                            <p className="text-sm text-red-500 mt-1">{errors.day_of_week}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="start_time">Heure de début</Label>
                                        <Input
                                            id="start_time"
                                            type="time"
                                            value={data.start_time}
                                            onChange={(e) => setData('start_time', e.target.value)}
                                        />
                                        {errors.start_time && (
                                            <p className="text-sm text-red-500 mt-1">{errors.start_time}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="end_time">Heure de fin</Label>
                                        <Input
                                            id="end_time"
                                            type="time"
                                            value={data.end_time}
                                            onChange={(e) => setData('end_time', e.target.value)}
                                        />
                                        {errors.end_time && (
                                            <p className="text-sm text-red-500 mt-1">{errors.end_time}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="is_recurring"
                                        checked={data.is_recurring}
                                        onChange={(e) => setData('is_recurring', e.target.checked)}
                                        className="rounded border-gray-300"
                                    />
                                    <Label htmlFor="is_recurring">Créneau récurrent</Label>
                                </div>

                                {!data.is_recurring && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="start_date">Date de début</Label>
                                            <Input
                                                id="start_date"
                                                type="date"
                                                value={data.start_date}
                                                onChange={(e) => setData('start_date', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="end_date">Date de fin</Label>
                                            <Input
                                                id="end_date"
                                                type="date"
                                                value={data.end_date}
                                                onChange={(e) => setData('end_date', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                        Annuler
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Ajout...' : 'Ajouter'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Alerts */}
                {availabilities.length === 0 && (
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Vous n'avez pas encore défini de disponibilités. Ajoutez des créneaux pour commencer à recevoir des réservations.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Weekly Schedule */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {daysOfWeek.map((day) => {
                        const dayAvailabilities = groupedAvailabilities[parseInt(day.value)];
                        return (
                            <Card key={day.value}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        {day.label}
                                    </CardTitle>
                                    <CardDescription>
                                        {dayAvailabilities.length === 0 
                                            ? 'Aucune disponibilité'
                                            : `${dayAvailabilities.length} créneau${dayAvailabilities.length > 1 ? 'x' : ''}`
                                        }
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {dayAvailabilities.length === 0 ? (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                                            Non disponible
                                        </p>
                                    ) : (
                                        <div className="space-y-2">
                                            {dayAvailabilities.map((availability) => (
                                                <div key={availability.id} className="flex items-center justify-between p-3 border rounded-lg bg-blue-50/50">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-blue-500" />
                                                        <span className="font-medium">
                                                            {formatTime(availability.start_time)} - {formatTime(availability.end_time)}
                                                        </span>
                                                        {availability.is_recurring && (
                                                            <Badge variant="outline" className="text-xs">
                                                                Récurrent
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(availability)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Delete Confirmation Dialog */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Supprimer la disponibilité</DialogTitle>
                            <DialogDescription>
                                Êtes-vous sûr de vouloir supprimer cette disponibilité ? Cette action ne peut pas être annulée.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                Annuler
                            </Button>
                            <Button variant="destructive" onClick={confirmDelete}>
                                Supprimer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
} 