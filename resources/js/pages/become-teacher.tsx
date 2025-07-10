import { UserCheck, Calendar, BookOpen, CreditCard, Star, Shield, Clock, Award, TrendingUp, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageProps } from '@/types';
import PublicLayout from '@/layouts/public-layout';

export default function BecomeTeacher({ auth }: PageProps) {
    const steps = [
        {
            icon: UserCheck,
            title: 'Créez votre profil',
            description: 'Inscrivez-vous et valorisez vos compétences et votre expérience.',
            details: ['Validation des diplômes', 'Vérification des références', 'Test de compétences'],
            color: 'bg-[var(--primary-100)] text-[var(--primary-700)]',
        },
        {
            icon: Calendar,
            title: 'Définissez vos disponibilités',
            description: 'Configurez votre planning et vos tarifs selon vos préférences.',
            details: ['Planning flexible', 'Tarifs personnalisés', 'Zones d\'intervention'],
            color: 'bg-[var(--accent-100)] text-[var(--accent-700)]',
        },
        {
            icon: BookOpen,
            title: 'Donnez vos cours',
            description: 'Enseignez selon votre passion et accompagnez vos élèves vers la réussite.',
            details: ['Autonomie pédagogique', 'Ressources didactiques', 'Support technique'],
            color: 'bg-[var(--success-100)] text-[var(--success-700)]',
        },
        {
            icon: CreditCard,
            title: 'Recevez vos paiements',
            description: 'Vos revenus sont versés automatiquement selon la fréquence choisie.',
            details: ['Paiements automatiques', 'Suivi des revenus', 'Factures générées'],
            color: 'bg-[var(--secondary-100)] text-[var(--secondary-700)]',
        },
    ];

    const benefits = [
        { icon: CreditCard, title: 'Revenus garantis et paiements rapides', description: 'Recevez vos paiements de façon sécurisée et ponctuelle via notre plateforme' },
        { icon: Users, title: 'Accompagnement et support dédiés', description: 'Notre équipe vous accompagne à chaque étape de votre parcours d\'enseignant' },
        { icon: Award, title: 'Communauté de professeurs qualifiés', description: 'Rejoignez un réseau d\'enseignants passionnés et échangez vos meilleures pratiques' },
        { icon: Shield, title: 'Gestion simplifiée de votre activité', description: 'Outils intégrés pour gérer vos cours, élèves et revenus en toute simplicité' },
        { icon: Clock, title: 'Flexibilité totale de votre emploi du temps', description: 'Travaillez quand vous voulez, où vous voulez, selon vos disponibilités' },
        { icon: TrendingUp, title: 'Valorisation de votre expertise', description: 'Mettez en avant vos compétences et développez votre réputation d\'expert' },
    ];

    const stats = [
        { value: '350+', label: 'Professeurs actifs', icon: Users },
        { value: '4.8/5', label: 'Satisfaction moyenne', icon: Star },
        { value: '85%', label: 'Recommandent Timmi', icon: Award },
        { value: '15k GNF', label: 'Revenu moyen/semaine', icon: TrendingUp },
    ];

    const testimonials = [
        {
            name: 'Dr. Koffi Adjoua',
            subject: 'Mathématiques',
            content: 'Timmi m\'a permis de partager ma passion pour les mathématiques tout en générant des revenus complémentaires. La plateforme est intuitive !',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            rating: 5
        },
        {
            name: 'Marie-Claire Sanogo',
            subject: 'Français',
            content: 'J\'enseigne depuis 3 ans sur Timmi. Les parents sont reconnaissants et les enfants motivés. Une expérience enrichissante !',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
            rating: 5
        },
        {
            name: 'Ibrahim Coulibaly',
            subject: 'Sciences',
            content: 'La flexibilité offerte par Timmi me permet de concilier ma vie professionnelle et ma passion pour l\'enseignement.',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
            rating: 5
        }
    ];

    const requirements = [
        'Diplôme dans votre domaine d\'expertise',
        'Expérience d\'enseignement (même informelle)',
        'Passion pour la transmission du savoir',
        'Disponibilité régulière',
        'Connexion internet stable (pour cours en ligne)'
    ];

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    const breadcrumbs = [
        { href: '/', title: 'Accueil' },
        { href: '/become-teacher', title: 'Devenir professeur' },
    ];

    return (
        <PublicLayout
            auth={auth}
            title="Devenir professeur"
            description="Rejoignez la communauté Timmi, partagez votre passion et générez des revenus en toute simplicité."
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="fadeInUp">
                                <Badge variant="secondary" className="mb-4 bg-[var(--primary-100)] text-[var(--primary-700)] border-0">
                                    🎓 Rejoignez-nous
                                </Badge>
                                <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                                    Enseignez avec 
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)]"> Timmi</span>
                                </h1>
                                <p className="text-lg lg:text-xl leading-8 text-gray-600 mb-8">
                                    Partagez votre savoir, gérez votre activité en toute liberté et bénéficiez d'un accompagnement sur-mesure. 
                                    Inscrivez-vous dès aujourd'hui pour rejoindre notre réseau de professeurs qualifiés !
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="/register?role=teacher">
                                        <Button size="lg" className="btn-primary px-8 py-4">
                                            Commencer mon inscription
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </a>
                                    <a href="/how-it-works">
                                        <Button size="lg" variant="outline" className="border-[var(--primary-200)] text-[var(--primary-700)] hover:bg-[var(--primary-50)] px-8 py-4">
                                            Comment ça marche ?
                                        </Button>
                                    </a>
                                </div>
                            </div>

                            <div className="relative fadeInUp" style={{ animationDelay: '0.2s' }}>
                                <div className="relative">
                                    <img 
                                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop" 
                                        alt="Professeur enseignant" 
                                        className="rounded-2xl shadow-2xl w-full h-auto"
                                    />
                                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {renderStars(5)}
                                            </div>
                                            <span className="text-sm font-medium">4.8/5 (350+ professeurs)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 fadeInUp" style={{ animationDelay: '0.3s' }}>
                            {stats.map((stat, index) => (
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

            {/* Steps Section Améliorée */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--accent-100)] text-[var(--accent-700)] border-0">
                            🚀 4 étapes simples
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Comment devenir professeur sur Timmi ?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Un parcours fluide et transparent pour démarrer votre activité d'enseignement en toute sérénité.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <Card key={index} className="relative border-0 shadow-lg bg-white hover-lift fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.color}`}>
                                            <step.icon className="h-8 w-8" />
                                        </div>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-500)] text-white text-lg font-bold shadow-lg">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl">{step.title}</CardTitle>
                                    <CardDescription className="text-base">{step.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        {step.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-center">
                                                <div className="h-1.5 w-1.5 rounded-full bg-[var(--primary-500)] mr-3 flex-shrink-0" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section Améliorée */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 fadeInUp">
                            <Badge variant="secondary" className="mb-4 bg-[var(--secondary-100)] text-[var(--secondary-700)] border-0">
                                ✨ Avantages exclusifs
                            </Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Pourquoi enseigner avec Timmi ?</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Des avantages concrets pensés pour booster votre carrière et votre épanouissement professionnel.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {benefits.map((benefit, index) => (
                                <Card key={index} className="border-0 shadow-lg hover-lift fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-[var(--primary-100)] rounded-xl flex items-center justify-center">
                                                    <benefit.icon className="h-6 w-6 text-[var(--primary-600)]" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Requirements Section */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12 fadeInUp">
                            <Badge variant="secondary" className="mb-4 bg-[var(--warning-100)] text-[var(--warning-700)] border-0">
                                📋 Prérequis
                            </Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ce dont vous avez besoin</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Voici les critères minimum pour rejoindre notre communauté de professeurs.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="border-0 shadow-lg fadeInUp" style={{ animationDelay: '0.1s' }}>
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Critères requis</h3>
                                    <ul className="space-y-4">
                                        {requirements.map((requirement, index) => (
                                            <li key={index} className="flex items-center">
                                                <div className="w-6 h-6 bg-[var(--success-100)] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                                    <UserCheck className="h-3 w-3 text-[var(--success-600)]" />
                                                </div>
                                                <span className="text-gray-700">{requirement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg fadeInUp" style={{ animationDelay: '0.2s' }}>
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Notre processus de sélection</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-[var(--primary-100)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-sm font-bold text-[var(--primary-600)]">1</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Vérification des documents</h4>
                                                <p className="text-sm text-gray-600">Diplômes, CV et références</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-[var(--primary-100)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-sm font-bold text-[var(--primary-600)]">2</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Entretien personnalisé</h4>
                                                <p className="text-sm text-gray-600">Discussion sur vos motivations et méthodes</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-[var(--primary-100)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-sm font-bold text-[var(--primary-600)]">3</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Test de compétences</h4>
                                                <p className="text-sm text-gray-600">Évaluation dans votre domaine d'expertise</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--info-100)] text-[var(--info-700)] border-0">
                            💝 Témoignages
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ce que disent nos professeurs</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez les retours de nos enseignants qui ont choisi Timmi pour développer leur activité.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-0 shadow-lg fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-1 mb-4">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={testimonial.avatar} 
                                            alt={testimonial.name}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900">{testimonial.name}</div>
                                            <div className="text-sm text-gray-600">Professeur de {testimonial.subject}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section Améliorée */}
            <section className="py-24 bg-gradient-to-br from-[var(--primary-600)] via-[var(--primary-700)] to-[var(--secondary-600)] relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center fadeInUp">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                            Prêt à rejoindre l'aventure ?
                        </h2>
                        <p className="text-lg lg:text-xl text-white/90 mb-8">
                            Inscrivez-vous gratuitement et commencez à enseigner sur Timmi dès aujourd'hui. 
                            Rejoignez une communauté qui valorise l'excellence pédagogique.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <a href="/register?role=teacher">
                                <Button size="lg" variant="secondary" className="bg-white text-[var(--primary-700)] hover:bg-gray-100 px-8 py-4 shadow-lg">
                                    Je deviens professeur
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                            </a>
                            <a href="/contact">
                                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[var(--primary-700)] px-8 py-4">
                                    Poser une question
                                </Button>
                            </a>
                        </div>
                        <div className="flex items-center justify-center gap-8 text-white/80">
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                <span className="text-sm">100% Gratuit</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                <span className="text-sm">Inscription en 5 min</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                <span className="text-sm">Sans engagement</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
} 