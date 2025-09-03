import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    Calendar, 
    Clock,
    Plus,
    ArrowLeft,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Availability, PagePropsWithData } from '@/types/global';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

interface Props extends PagePropsWithData {
    availabilities: Availability[];
}

const DAYS_OF_WEEK = [
    { id: 1, name: 'Lundi', short: 'Lun' },
    { id: 2, name: 'Mardi', short: 'Mar' },
    { id: 3, name: 'Mercredi', short: 'Mer' },
    { id: 4, name: 'Jeudi', short: 'Jeu' },
    { id: 5, name: 'Vendredi', short: 'Ven' },
    { id: 6, name: 'Samedi', short: 'Sam' },
    { id: 7, name: 'Dimanche', short: 'Dim' },
];

const TIME_SLOTS = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
];

export default function ProfessorSchedule({ availabilities = [], errors, flash }: Props) {
    const [isAdding, setIsAdding] = useState(false);

    const { delete: destroy, processing } = useForm();

    const handleAddAvailability = (dayId: number, timeSlot: string) => {
        router.post(route('professor.schedule.store'), {
            day_of_week: dayId,
            start_time: timeSlot,
            end_time: getNextHour(timeSlot),
            is_online: true,
        });
    };

    const handleRemoveAvailability = (availabilityId: number) => {
        destroy(route('professor.schedule.destroy', availabilityId));
    };

    const getNextHour = (time: string): string => {
        const [hours] = time.split(':');
        const nextHour = parseInt(hours) + 1;
        return `${nextHour.toString().padStart(2, '0')}:00`;
    };

    const isTimeSlotAvailable = (dayId: number, timeSlot: string): boolean => {
        return availabilities.some(av => 
            av.day_of_week === dayId && 
            av.start_time === timeSlot &&
            av.is_available
        );
    };

    const getAvailabilityId = (dayId: number, timeSlot: string): number | null => {
        const availability = availabilities.find(av => 
            av.day_of_week === dayId && 
            av.start_time === timeSlot &&
            av.is_available
        );
        return availability?.id || null;
    };

    return (
        <AppLayout>
            <Head title="Mon Agenda - Professeur" />
            
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
                                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
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
                                    <Calendar className="h-5 w-5 text-blue-400 mr-2" />
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
                            <h1 className="text-3xl font-bold tracking-tight">Mon Agenda</h1>
                            <p className="text-muted-foreground">
                                Gérez vos disponibilités pour les cours
                            </p>
                        </div>
                    </div>
                    <Button onClick={() => setIsAdding(!isAdding)}>
                        <Plus className="h-4 w-4 mr-2" />
                        {isAdding ? 'Annuler' : 'Ajouter des créneaux'}
                    </Button>
                </div>

                {/* Instructions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Instructions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-green-100 border border-green-300 rounded"></div>
                                <span className="text-sm">Disponible</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-100 border border-gray-300 rounded"></div>
                                <span className="text-sm">Indisponible</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Cliquez pour modifier</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Grille des disponibilités */}
                <Card>
                    <CardHeader>
                        <CardTitle>Disponibilités hebdomadaires</CardTitle>
                        <CardDescription>
                            Cliquez sur un créneau pour l'ajouter ou le supprimer
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <div className="min-w-[800px]">
                                {/* En-têtes des jours */}
                                <div className="grid grid-cols-8 gap-2 mb-4">
                                    <div className="text-sm font-medium text-muted-foreground">Heures</div>
                                    {DAYS_OF_WEEK.map((day) => (
                                        <div key={day.id} className="text-center">
                                            <div className="text-sm font-medium">{day.short}</div>
                                            <div className="text-xs text-muted-foreground">{day.name}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Grille des créneaux */}
                                <div className="space-y-1">
                                    {TIME_SLOTS.map((timeSlot) => (
                                        <div key={timeSlot} className="grid grid-cols-8 gap-2">
                                            <div className="text-sm text-muted-foreground py-2">
                                                {timeSlot}
                                            </div>
                                            {DAYS_OF_WEEK.map((day) => {
                                                const isAvailable = isTimeSlotAvailable(day.id, timeSlot);
                                                const availabilityId = getAvailabilityId(day.id, timeSlot);
                                                
                                                return (
                                                    <button
                                                        key={`${day.id}-${timeSlot}`}
                                                        onClick={() => {
                                                            if (isAvailable && availabilityId) {
                                                                handleRemoveAvailability(availabilityId);
                                                            } else {
                                                                handleAddAvailability(day.id, timeSlot);
                                                            }
                                                        }}
                                                        disabled={processing}
                                                        className={`
                                                            h-8 rounded border transition-colors
                                                            ${isAvailable 
                                                                ? 'bg-green-100 border-green-300 hover:bg-green-200' 
                                                                : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                                                            }
                                                            ${processing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                                        `}
                                                    >
                                                        {isAvailable ? (
                                                            <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                                                        ) : (
                                                            <XCircle className="h-4 w-4 text-gray-400 mx-auto" />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistiques */}
                <Card>
                    <CardHeader>
                        <CardTitle>Statistiques</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">{availabilities.length}</p>
                                <p className="text-sm text-muted-foreground">Créneaux disponibles</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">
                                    {availabilities.length * 1}
                                </p>
                                <p className="text-sm text-muted-foreground">Heures par semaine</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">
                                    {DAYS_OF_WEEK.length * TIME_SLOTS.length}
                                </p>
                                <p className="text-sm text-muted-foreground">Créneaux totaux</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
