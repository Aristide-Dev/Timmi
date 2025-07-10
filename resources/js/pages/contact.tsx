import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Award, Users, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PageProps } from '@/types';
import PublicLayout from '@/layouts/public-layout';
import { router } from '@inertiajs/react';

export default function Contact({ auth }: PageProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        userType: 'parent'
    });

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'contact@timmi.gn',
            description: 'Écrivez-nous, nous répondons sous 24h',
            color: 'bg-[var(--primary-100)] text-[var(--primary-700)]'
        },
        {
            icon: Phone,
            title: 'Téléphone',
            value: '+224 620 00 00 00',
            description: 'Du lundi au vendredi, 8h-18h',
            color: 'bg-[var(--accent-100)] text-[var(--accent-700)]'
        },
        {
            icon: MapPin,
            title: 'Adresse',
            value: 'Conakry, Guinée',
            description: 'Kaloum, Centre-ville',
            color: 'bg-[var(--secondary-100)] text-[var(--secondary-700)]'
        },
        {
            icon: Clock,
            title: 'Horaires',
            value: 'Lun-Ven: 8h-18h',
            description: 'Samedi: 9h-15h',
            color: 'bg-[var(--success-100)] text-[var(--success-700)]'
        }
    ];

    const subjects = [
        'Question générale',
        'Problème technique',
        'Demande de remboursement',
        'Signaler un problème',
        'Devenir professeur',
        'Partenariat',
        'Autre'
    ];

    const quickStats = [
        { value: '< 24h', label: 'Temps de réponse', icon: Clock },
        { value: '98%', label: 'Satisfaction client', icon: Award },
        { value: '24/7', label: 'Support disponible', icon: MessageCircle },
        { value: '2500+', label: 'Familles aidées', icon: Users },
    ];

    const supportFeatures = [
        {
            icon: Shield,
            title: 'Support prioritaire',
            description: 'Les urgences sont traitées en moins de 4h'
        },
        {
            icon: Users,
            title: 'Équipe experte',
            description: 'Notre équipe connaît parfaitement la plateforme'
        },
        {
            icon: MessageCircle,
            title: 'Multi-canal',
            description: 'Email, téléphone, chat - choisissez votre préférence'
        },
        {
            icon: CheckCircle,
            title: 'Suivi garanti',
            description: 'Nous vous tenons informé jusqu\'à résolution complète'
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/contact', formData);
    };

    const breadcrumbs = [
        { href: '/', title: 'Accueil' },
        { href: '/contact', title: 'Contact' },
    ];

    return (
        <PublicLayout 
            auth={auth} 
            title="Contact" 
            description="Contactez l'équipe Timmi pour toutes vos questions sur notre plateforme de cours particuliers."
            breadcrumbs={breadcrumbs}
        >
            {/* Hero Section Amélioré */}
            <section className="py-16 bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--accent-50)] relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--primary-200)]/20 to-[var(--accent-200)]/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[var(--secondary-200)]/20 to-[var(--primary-200)]/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 fadeInUp">
                            <Badge variant="secondary" className="mb-4 bg-[var(--primary-100)] text-[var(--primary-700)] border-0">
                                📞 Contactez-nous
                            </Badge>
                            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                                Nous sommes là pour 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)]"> vous aider</span>
                            </h1>
                            <p className="text-lg lg:text-xl leading-8 text-gray-600 mb-8">
                                Une question ? Un problème ? Notre équipe dédiée vous répond rapidement 
                                et vous accompagne dans votre expérience Timmi.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fadeInUp" style={{ animationDelay: '0.1s' }}>
                            {quickStats.map((stat, index) => (
                                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                                    <div className="flex items-center justify-center mb-2">
                                        <stat.icon className="h-6 w-6 text-[var(--primary-600)]" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info Améliorée */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Choisissez votre canal préféré</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Plusieurs moyens de nous joindre selon vos préférences et l'urgence de votre demande.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => (
                            <Card key={index} className="text-center border-0 shadow-lg hover-lift bg-white fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardHeader>
                                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${info.color} mb-4`}>
                                        <info.icon className="h-8 w-8" />
                                    </div>
                                    <CardTitle className="text-xl">{info.title}</CardTitle>
                                    <CardDescription className="font-medium text-foreground text-lg">
                                        {info.value}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {info.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Amélioré */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Form */}
                            <div className="fadeInUp">
                                <Card className="border-0 shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                                        <CardDescription className="text-base">
                                            Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="name" className="text-sm font-medium">Nom complet *</Label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Votre nom complet"
                                                        className="mt-1 border-2 border-[var(--primary-200)] focus:border-[var(--primary-500)]"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="votre@email.com"
                                                        className="mt-1 border-2 border-[var(--primary-200)] focus:border-[var(--primary-500)]"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="phone" className="text-sm font-medium">Téléphone</Label>
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="+224 6XX XX XX XX"
                                                        className="mt-1 border-2 border-[var(--primary-200)] focus:border-[var(--primary-500)]"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="userType" className="text-sm font-medium">Vous êtes</Label>
                                                    <select
                                                        id="userType"
                                                        name="userType"
                                                        value={formData.userType}
                                                        onChange={handleInputChange}
                                                        className="mt-1 w-full px-3 py-2 border-2 border-[var(--primary-200)] rounded-md focus:outline-none focus:border-[var(--primary-500)]"
                                                    >
                                                        <option value="parent">Parent</option>
                                                        <option value="teacher">Professeur</option>
                                                        <option value="other">Autre</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="subject" className="text-sm font-medium">Sujet *</Label>
                                                <select
                                                    id="subject"
                                                    name="subject"
                                                    required
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full px-3 py-2 border-2 border-[var(--primary-200)] rounded-md focus:outline-none focus:border-[var(--primary-500)]"
                                                >
                                                    <option value="">Sélectionnez un sujet</option>
                                                    {subjects.map(subject => (
                                                        <option key={subject} value={subject}>
                                                            {subject}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    rows={5}
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    placeholder="Décrivez votre demande en détail..."
                                                    className="mt-1 w-full px-3 py-2 border-2 border-[var(--primary-200)] rounded-md focus:outline-none focus:border-[var(--primary-500)] resize-none"
                                                />
                                            </div>

                                            <Button type="submit" className="w-full btn-primary py-3">
                                                <Send className="mr-2 h-5 w-5" />
                                                Envoyer le message
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Additional Info */}
                            <div className="space-y-8 fadeInUp" style={{ animationDelay: '0.2s' }}>
                                <Card className="border-0 shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Nos garanties support</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {supportFeatures.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-[var(--primary-100)] rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <feature.icon className="h-6 w-6 text-[var(--primary-600)]" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Temps de réponse</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center p-3 bg-[var(--primary-50)] rounded-lg">
                                                <span className="text-sm font-medium">Questions générales</span>
                                                <Badge className="bg-[var(--primary-500)] text-white">24h</Badge>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-[var(--accent-50)] rounded-lg">
                                                <span className="text-sm font-medium">Support technique</span>
                                                <Badge className="bg-[var(--accent-500)] text-white">12h</Badge>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-[var(--success-50)] rounded-lg">
                                                <span className="text-sm font-medium">Urgences</span>
                                                <Badge className="bg-[var(--success-500)] text-white">4h</Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Autres moyens de contact</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="p-4 bg-gradient-to-r from-[var(--secondary-50)] to-[var(--accent-50)] rounded-lg">
                                            <h4 className="font-medium mb-2 text-[var(--secondary-700)]">WhatsApp Business</h4>
                                            <p className="text-sm text-gray-600 mb-2">
                                                +224 620 00 00 00
                                            </p>
                                            <p className="text-xs text-gray-500">Réponse rapide pour questions urgentes</p>
                                        </div>
                                        <div className="p-4 bg-gradient-to-r from-[var(--warning-50)] to-[var(--info-50)] rounded-lg">
                                            <h4 className="font-medium mb-2 text-[var(--warning-700)]">Réseaux sociaux</h4>
                                            <p className="text-sm text-gray-600 mb-2">
                                                Facebook et Instagram @TimmiGN
                                            </p>
                                            <p className="text-xs text-gray-500">Actualités et support communautaire</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Quick Links */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--accent-100)] text-[var(--accent-700)] border-0">
                            ⚡ Réponses rapides
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Consultez d'abord notre FAQ</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Vous pourriez trouver une réponse immédiate à votre question dans notre centre d'aide.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <Card className="border-0 shadow-lg hover-lift fadeInUp" style={{ animationDelay: '0.1s' }}>
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-[var(--primary-100)] rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-6 w-6 text-[var(--primary-600)]" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Questions parents</h3>
                                <p className="text-gray-600 text-sm mb-4">Inscription, réservation, paiement...</p>
                                <a href="/faq?category=parents" className="text-[var(--primary-600)] hover:underline text-sm font-medium">
                                    Voir les questions →
                                </a>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover-lift fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-[var(--accent-100)] rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Award className="h-6 w-6 text-[var(--accent-600)]" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Questions professeurs</h3>
                                <p className="text-gray-600 text-sm mb-4">Inscription, cours, rémunération...</p>
                                <a href="/faq?category=teachers" className="text-[var(--accent-600)] hover:underline text-sm font-medium">
                                    Voir les questions →
                                </a>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover-lift fadeInUp" style={{ animationDelay: '0.3s' }}>
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-[var(--success-100)] rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Shield className="h-6 w-6 text-[var(--success-600)]" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Sécurité & Paiements</h3>
                                <p className="text-gray-600 text-sm mb-4">Protection des données, remboursements...</p>
                                <a href="/faq?category=securite" className="text-[var(--success-600)] hover:underline text-sm font-medium">
                                    Voir les questions →
                                </a>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-[var(--primary-600)] to-[var(--secondary-600)] relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center fadeInUp">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                            Une question urgente ?
                        </h2>
                        <p className="text-lg lg:text-xl text-white/90 mb-8">
                            Pour les urgences, contactez-nous directement par téléphone. 
                            Notre équipe est disponible du lundi au vendredi.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a 
                                href="tel:+224620000000" 
                                className="bg-white text-[var(--primary-700)] hover:bg-gray-100 px-8 py-4 rounded-xl font-medium transition-colors shadow-lg flex items-center justify-center"
                            >
                                <Phone className="mr-2 h-5 w-5" />
                                Appeler maintenant
                            </a>
                            <a 
                                href="/how-it-works" 
                                className="border-2 border-white text-white hover:bg-white hover:text-[var(--primary-700)] px-8 py-4 rounded-xl font-medium transition-colors"
                            >
                                Comment ça marche ?
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
} 