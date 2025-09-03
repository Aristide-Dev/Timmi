import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type Professor, type Child, type Subject, type Level } from '@/types/global';
import { Head, router } from '@inertiajs/react';
import { 
    Calendar, 
    Clock, 
    DollarSign, 
    CreditCard, 
    ArrowLeft,
    Star,
    MapPin,
    Award,
    CheckCircle,
    Users,
    BookOpen
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    professor: Professor;
    children: Child[];
    subjects: Subject[];
    levels: Level[];
}

export default function CreateBooking({ professor, children, subjects, levels }: Props) {
    const [formData, setFormData] = useState({
        child_id: '',
        subject_id: '',
        level_id: '',
        duration: 60, // en minutes
        notes: '',
        payment_method: 'card'
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'GNF'
        }).format(amount);
    };

    const calculateTotalPrice = () => {
        const hours = formData.duration / 60;
        return professor.hourly_rate * hours;
    };

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const totalPrice = calculateTotalPrice();
        
        const bookingData = {
            ...formData,
            professor_id: professor.id,
            total_price: totalPrice
        };

        router.post(route('parent.booking.store'), bookingData, {
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const selectedChild = children.find(c => c.id.toString() === formData.child_id);
    const selectedSubject = subjects.find(s => s.id.toString() === formData.subject_id);
    const selectedLevel = levels.find(l => l.id.toString() === formData.level_id);

    return (
        <AppLayout>
            <Head title="Réserver un cours" />
            
            <div className="container py-8">
                {/* Bouton retour */}
                <div className="mb-6">
                    <Button 
                        variant="outline" 
                        onClick={() => router.get(route('parent.professors.show', professor.id))}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour au profil
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Formulaire de réservation */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Réserver un cours avec {professor.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Informations de l'enfant */}
                                    <div>
                                        <Label htmlFor="child_id">Enfant *</Label>
                                        <Select 
                                            value={formData.child_id} 
                                            onValueChange={(value) => handleInputChange('child_id', value)}
                                        >
                                            <SelectTrigger className={errors.child_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Sélectionner un enfant" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {children && children.length > 0 ? children.map((child) => (
                                                    <SelectItem key={child.id} value={child.id.toString()}>
                                                        <div className="flex items-center gap-2">
                                                            <span>{child.name}</span>
                                                            <Badge variant="outline" className="text-xs">
                                                                {child.age} ans • {child.grade_level}
                                                            </Badge>
                                                        </div>
                                                    </SelectItem>
                                                )) : (
                                                    <SelectItem value="no-children" disabled>
                                                        Aucun enfant disponible
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.child_id} className="mt-1" />
                                    </div>

                                    {/* Matière et niveau */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="subject_id">Matière *</Label>
                                            <Select 
                                                value={formData.subject_id} 
                                                onValueChange={(value) => handleInputChange('subject_id', value)}
                                            >
                                                <SelectTrigger className={errors.subject_id ? 'border-red-500' : ''}>
                                                    <SelectValue placeholder="Sélectionner une matière" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {professor.subjects && professor.subjects.length > 0 ? professor.subjects.map((subject) => (
                                                        <SelectItem key={subject.id} value={subject.id.toString()}>
                                                            <div className="flex items-center gap-2">
                                                                <div 
                                                                    className="w-4 h-4 rounded-full"
                                                                    style={{ backgroundColor: subject.color }}
                                                                />
                                                                <span>{subject.name}</span>
                                                            </div>
                                                        </SelectItem>
                                                    )) : (
                                                        <SelectItem value="no-subjects" disabled>
                                                            Aucune matière disponible
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.subject_id} className="mt-1" />
                                        </div>

                                        <div>
                                            <Label htmlFor="level_id">Niveau *</Label>
                                            <Select 
                                                value={formData.level_id} 
                                                onValueChange={(value) => handleInputChange('level_id', value)}
                                            >
                                                <SelectTrigger className={errors.level_id ? 'border-red-500' : ''}>
                                                    <SelectValue placeholder="Sélectionner un niveau" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {professor.levels && professor.levels.length > 0 ? professor.levels.map((level) => (
                                                        <SelectItem key={level.id} value={level.id.toString()}>
                                                            {level.name}
                                                        </SelectItem>
                                                    )) : (
                                                        <SelectItem value="no-levels" disabled>
                                                            Aucun niveau disponible
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.level_id} className="mt-1" />
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <Label htmlFor="notes">Notes pour le professeur</Label>
                                        <Textarea
                                            value={formData.notes}
                                            onChange={(e) => handleInputChange('notes', e.target.value)}
                                            placeholder="Informations supplémentaires, objectifs du cours..."
                                            rows={3}
                                            className={errors.notes ? 'border-red-500' : ''}
                                        />
                                        <InputError message={errors.notes} className="mt-1" />
                                    </div>

                                    <Separator />

                                    {/* Méthode de paiement */}
                                    <div>
                                        <Label>Méthode de paiement</Label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    id="card"
                                                    name="payment_method"
                                                    value="card"
                                                    checked={formData.payment_method === 'card'}
                                                    onChange={(e) => handleInputChange('payment_method', e.target.value)}
                                                />
                                                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                                                    <CreditCard className="h-4 w-4" />
                                                    Carte bancaire
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    id="mobile_money"
                                                    name="payment_method"
                                                    value="mobile_money"
                                                    checked={formData.payment_method === 'mobile_money'}
                                                    onChange={(e) => handleInputChange('payment_method', e.target.value)}
                                                />
                                                <Label htmlFor="mobile_money" className="flex items-center gap-2 cursor-pointer">
                                                    <DollarSign className="h-4 w-4" />
                                                    Mobile Money
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    id="bank_transfer"
                                                    name="payment_method"
                                                    value="bank_transfer"
                                                    checked={formData.payment_method === 'bank_transfer'}
                                                    onChange={(e) => handleInputChange('payment_method', e.target.value)}
                                                />
                                                <Label htmlFor="bank_transfer" className="flex items-center gap-2 cursor-pointer">
                                                    <CreditCard className="h-4 w-4" />
                                                    Virement bancaire
                                                </Label>
                                            </div>
                                        </div>
                                        <InputError message={errors.payment_method} className="mt-1" />
                                    </div>

                                    <Button type="submit" className="w-full" size="lg">
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        Payer et réserver
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Résumé et informations */}
                    <div className="space-y-6">
                        {/* Informations du professeur */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Professeur</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        {professor.avatar ? (
                                            <img src={professor.avatar} alt={professor.name} className="w-10 h-10 rounded-full" />
                                        ) : (
                                            <span className="text-blue-600 font-medium">
                                                {professor.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{professor.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                            <span className="text-sm">{professor.rating} ({professor.total_reviews} avis)</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>{professor.cities?.map(c => c.name).join(', ') || 'Non spécifié'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Award className="h-4 w-4" />
                                        <span>{professor.experience_years} ans d'expérience</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4" />
                                        <span>{professor.subjects.length} matières</span>
                                    </div>
                                    {professor.is_verified && (
                                        <div className="flex items-center gap-2 text-green-600">
                                            <CheckCircle className="h-4 w-4" />
                                            <span>Profil vérifié</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Résumé de la réservation */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Résumé de la réservation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {selectedChild && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Enfant</span>
                                            <span className="font-medium">{selectedChild.name}</span>
                                        </div>
                                    )}
                                    
                                    {selectedSubject && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Matière</span>
                                            <span className="font-medium">{selectedSubject.name}</span>
                                        </div>
                                    )}
                                    
                                    {selectedLevel && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Niveau</span>
                                            <span className="font-medium">{selectedLevel.name}</span>
                                        </div>
                                    )}
                                    

                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Durée</span>
                                        <span className="font-medium">{formData.duration} minutes</span>
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Prix par heure</span>
                                        <span className="font-medium">{formatCurrency(professor.hourly_rate)}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Total</span>
                                        <span className="text-lg font-bold text-green-600">
                                            {formatCurrency(calculateTotalPrice())}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Informations importantes */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations importantes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm text-gray-600">
                                    <div className="flex items-start gap-2">
                                        <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <span>Le professeur confirmera votre réservation dans les 24h</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <span>Vous pouvez annuler jusqu'à 24h avant le cours</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Users className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <span>Le cours se déroulera en ligne via notre plateforme</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
