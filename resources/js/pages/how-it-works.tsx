import { Search, UserCheck, Calendar, BookOpen, CreditCard, Star, Shield, Clock, Award, TrendingUp, Users, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageProps } from '@/types';
import PublicLayout from '@/layouts/public-layout';

export default function HowItWorks({ auth }: PageProps) {
    const parentSteps = [
        {
            icon: Search,
            title: 'Trouvez votre professeur',
            description: 'Parcourez les profils des professeurs qualifiés et sélectionnez celui qui correspond le mieux aux besoins de votre enfant.',
            details: ['Filtres par matière et localisation', 'Consultation des avis et notes', 'Comparaison des tarifs'],
            color: 'bg-[var(--primary-100)] text-[var(--primary-700)]',
        },
        {
            icon: Calendar,
            title: 'Réservez votre cours',
            description: 'Choisissez le créneau qui vous convient dans le planning du professeur et confirmez votre réservation.',
            details: ['Planning en temps réel', 'Flexibilité des horaires', 'Confirmation instantanée'],
            color: 'bg-[var(--accent-100)] text-[var(--accent-700)]',
        },
        {
            icon: CreditCard,
            title: 'Payez en sécurité',
            description: 'Effectuez votre paiement de manière sécurisée via Orange Money ou carte bancaire.',
            details: ['Paiement sécurisé', 'Plusieurs moyens de paiement', 'Reçu automatique'],
            color: 'bg-[var(--success-100)] text-[var(--success-700)]',
        },
        {
            icon: BookOpen,
            title: 'Profitez du cours',
            description: 'Votre enfant bénéficie d\'un cours personnalisé, à domicile ou en ligne selon votre choix.',
            details: ['Cours adaptés au niveau', 'Suivi personnalisé', 'Support continu'],
            color: 'bg-[var(--secondary-100)] text-[var(--secondary-700)]',
        },
    ];

    const teacherSteps = [
        {
            icon: UserCheck,
            title: 'Créez votre profil',
            description: 'Inscrivez-vous et créez un profil détaillé mettant en valeur vos compétences et votre expérience.',
            details: ['Validation des diplômes', 'Vérification des références', 'Test de compétences'],
            color: 'bg-[var(--primary-100)] text-[var(--primary-700)]',
        },
        {
            icon: Calendar,
            title: 'Définissez vos disponibilités',
            description: 'Configurez votre planning et vos tarifs selon vos préférences et disponibilités.',
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
            description: 'Vos revenus sont versés automatiquement selon la fréquence que vous avez choisie.',
            details: ['Paiements automatiques', 'Suivi des revenus', 'Factures générées'],
            color: 'bg-[var(--secondary-100)] text-[var(--secondary-700)]',
        },
    ];

    const benefits = [
        { icon: Shield, title: 'Professeurs vérifiés et qualifiés', description: 'Tous nos enseignants passent un processus de sélection rigoureux' },
        { icon: CreditCard, title: 'Paiements sécurisés', description: 'Transactions protégées et remboursements garantis' },
        { icon: MessageCircle, title: 'Support client réactif', description: 'Équipe disponible 7j/7 pour vous accompagner' },
        { icon: BookOpen, title: 'Cours à domicile ou en ligne', description: 'Flexibilité totale selon vos préférences' },
        { icon: Calendar, title: 'Annulation facile', description: 'Modification ou annulation jusqu\'à 24h avant' },
        { icon: TrendingUp, title: 'Suivi des progrès', description: 'Rapports détaillés et évolution personnalisée' },
    ];

    const stats = [
        { value: '2500+', label: 'Familles satisfaites', icon: Users },
        { value: '350+', label: 'Professeurs experts', icon: Award },
        { value: '98%', label: 'Taux de satisfaction', icon: Star },
        { value: '24/7', label: 'Support disponible', icon: Clock },
    ];

    const testimonials = [
        {
            name: 'Sarah Koné',
            role: 'Mère de famille',
            content: 'Grâce à Timmi, ma fille a retrouvé confiance en mathématiques. Le processus est si simple !',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
        },
        {
            name: 'Ahmed Traoré',
            role: 'Papa de 2 enfants',
            content: 'Interface intuitive, professeurs qualifiés. Timmi a révolutionné notre approche de l\'aide aux devoirs.',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        }
    ];

    const breadcrumbs = [
        { href: '/', title: 'Accueil' },
        { href: '/how-it-works', title: 'Comment ça marche' },
    ];

    return (
        <PublicLayout 
            auth={auth} 
            title="Comment ça marche" 
            description="Découvrez comment Timmi simplifie la recherche et la réservation de cours particuliers."
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
                        <div className="text-center mb-12 fadeInUp">
                            <Badge variant="secondary" className="mb-4 bg-[var(--primary-100)] text-[var(--primary-700)] border-0">
                                🚀 Guide d'utilisation
                            </Badge>
                            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                                Comment 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)]"> ça marche ?</span>
                            </h1>
                            <p className="text-lg lg:text-xl leading-8 text-gray-600 mb-8">
                                Découvrez en quelques étapes simples comment Timmi révolutionne 
                                l'accès aux cours particuliers pour les parents et les professeurs.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fadeInUp" style={{ animationDelay: '0.1s' }}>
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

            {/* For Parents Section Améliorée */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--primary-100)] text-[var(--primary-700)] border-0">
                            👨‍👩‍👧‍👦 Pour les Parents
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Trouvez le professeur idéal en 4 étapes</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Un processus simple et transparent pour donner à votre enfant 
                            l'accompagnement éducatif qu'il mérite.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {parentSteps.map((step, index) => (
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

            {/* For Teachers Section Améliorée */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--secondary-100)] text-[var(--secondary-700)] border-0">
                            🎓 Pour les Professeurs
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Commencez à enseigner en 4 étapes</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Rejoignez notre communauté de professeurs et partagez votre passion 
                            pour l'enseignement tout en générant des revenus.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teacherSteps.map((step, index) => (
                            <Card key={index} className="relative border-0 shadow-lg bg-white hover-lift fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.color}`}>
                                            <step.icon className="h-8 w-8" />
                                        </div>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--secondary-600)] text-white text-lg font-bold shadow-lg">
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
                                                <div className="h-1.5 w-1.5 rounded-full bg-[var(--secondary-600)] mr-3 flex-shrink-0" />
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
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 fadeInUp">
                            <Badge variant="secondary" className="mb-4 bg-[var(--accent-100)] text-[var(--accent-700)] border-0">
                                ✨ Avantages
                            </Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Pourquoi choisir Timmi ?</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Des avantages pensés pour simplifier votre expérience éducative et garantir votre satisfaction.
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

            {/* Testimonials Section */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--warning-100)] text-[var(--warning-700)] border-0">
                            💝 Témoignages
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ils ont testé Timmi</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez les retours de nos utilisateurs satisfaits.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-0 shadow-lg fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <img 
                                            src={testimonial.avatar} 
                                            alt={testimonial.name}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900">{testimonial.name}</div>
                                            <div className="text-sm text-gray-600">{testimonial.role}</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">"{testimonial.content}"</p>
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
                            Prêt à commencer l'aventure ?
                        </h2>
                        <p className="text-lg lg:text-xl text-white/90 mb-8">
                            Rejoignez des milliers de familles et de professeurs qui font déjà confiance à Timmi 
                            pour transformer l'éducation en Guinée.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <a 
                                href="/register" 
                                className="bg-white text-[var(--primary-700)] hover:bg-gray-100 px-8 py-4 rounded-xl font-medium transition-colors shadow-lg"
                            >
                                Créer un compte parent
                            </a>
                            <a 
                                href="/become-teacher" 
                                className="border-2 border-white text-white hover:bg-white hover:text-[var(--primary-700)] px-8 py-4 rounded-xl font-medium transition-colors"
                            >
                                Devenir professeur
                            </a>
                        </div>
                        <div className="flex items-center justify-center gap-8 text-white/80">
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                <span className="text-sm">100% Gratuit</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                <span className="text-sm">Inscription en 2 min</span>
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