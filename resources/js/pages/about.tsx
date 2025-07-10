import { Users, Target, Heart, Award, TrendingUp, Shield, Clock, Star, MapPin, Mail, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageProps } from '@/types';
import PublicLayout from '@/layouts/public-layout';

export default function About({ auth }: PageProps) {
    const values = [
        {
            icon: Target,
            title: 'Excellence Éducative',
            description: 'Nous nous engageons à offrir la meilleure qualité d\'enseignement en sélectionnant rigoureusement nos professeurs.',
            color: 'bg-[var(--primary-100)] text-[var(--primary-700)]',
        },
        {
            icon: Heart,
            title: 'Passion pour l\'Apprentissage',
            description: 'Nous croyons que l\'apprentissage est un voyage passionnant qui doit être personnalisé pour chaque enfant.',
            color: 'bg-[var(--accent-100)] text-[var(--accent-700)]',
        },
        {
            icon: Users,
            title: 'Communauté Bienveillante',
            description: 'Nous créons un environnement sûr et bienveillant où les enfants peuvent s\'épanouir et grandir.',
            color: 'bg-[var(--success-100)] text-[var(--success-700)]',
        },
        {
            icon: Award,
            title: 'Confiance et Transparence',
            description: 'Nous privilégions la transparence dans nos relations avec les parents et les professeurs.',
            color: 'bg-[var(--secondary-100)] text-[var(--secondary-700)]',
        },
    ];

    const stats = [
        { value: '2500+', label: 'Élèves accompagnés', icon: Users, color: 'text-[var(--primary-600)]' },
        { value: '350+', label: 'Professeurs qualifiés', icon: Award, color: 'text-[var(--accent-600)]' },
        { value: '98%', label: 'Satisfaction parents', icon: Star, color: 'text-yellow-600' },
        { value: '15+', label: 'Matières enseignées', icon: Target, color: 'text-[var(--secondary-600)]' },
    ];

    const milestones = [
        {
            year: '2023',
            title: 'Lancement de Timmi',
            description: 'Création de la plateforme avec une vision claire : démocratiser l\'accès à l\'éducation de qualité.',
            icon: TrendingUp
        },
        {
            year: '2023',
            title: 'Premiers professeurs',
            description: '50 professeurs rejoignent la plateforme après un processus de sélection rigoureux.',
            icon: Users
        },
        {
            year: '2024',
            title: 'Expansion géographique',
            description: 'Extension à tout Conakry et lancement des cours en ligne pour couvrir toute la Guinée.',
            icon: MapPin
        },
        {
            year: '2024',
            title: 'Reconnaissance',
            description: 'Timmi devient la plateforme de référence pour les cours particuliers en Guinée.',
            icon: Award
        }
    ];

    const teamMembers = [
        {
            name: 'Direction Générale',
            role: 'Vision stratégique',
            description: 'Pilotage de la vision et de la stratégie de développement de Timmi',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
        },
        {
            name: 'Équipe Pédagogique',
            role: 'Qualité éducative',
            description: 'Sélection et formation des professeurs, développement des méthodes pédagogiques',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
        },
        {
            name: 'Équipe Technique',
            role: 'Innovation technologique',
            description: 'Développement et maintenance de la plateforme, innovation produit',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        }
    ];

    const achievements = [
        { icon: TrendingUp, title: '500% de croissance', description: 'en 2024' },
        { icon: Star, title: '4.8/5 de satisfaction', description: 'sur toutes nos prestations' },
        { icon: Shield, title: '100% de sécurité', description: 'pour tous nos utilisateurs' },
        { icon: Clock, title: '24/7 support', description: 'pour accompagner nos utilisateurs' }
    ];

    const breadcrumbs = [
        { href: '/', title: 'Accueil' },
        { href: '/about', title: 'À propos' },
    ];

    return (
        <PublicLayout 
            auth={auth} 
            title="À propos" 
            description="Découvrez l'histoire et la mission de Timmi, votre plateforme de confiance pour les cours particuliers."
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
                                🌟 Notre histoire
                            </Badge>
                            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                                Notre Mission : Démocratiser 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)]"> l'Excellence Éducative</span>
                            </h1>
                            <p className="text-lg lg:text-xl leading-8 text-gray-600 mb-8">
                                Timmi est née d'une conviction simple : chaque enfant mérite d'avoir accès à une éducation 
                                de qualité, personnalisée et adaptée à ses besoins. Nous connectons les familles avec les 
                                meilleurs professeurs pour créer des expériences d'apprentissage exceptionnelles.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fadeInUp" style={{ animationDelay: '0.1s' }}>
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                                    <div className="flex items-center justify-center mb-2">
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section Améliorée */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="fadeInUp">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Notre Histoire</h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    Fondée en 2023 à Conakry, Timmi est née de l'observation que de nombreux parents 
                                    peinent à trouver des professeurs particuliers qualifiés et de confiance pour leurs enfants.
                                </p>
                                <p>
                                    Notre équipe, composée d'éducateurs passionnés et de technologues expérimentés, 
                                    a développé une plateforme qui simplifie cette recherche tout en garantissant 
                                    la qualité et la sécurité.
                                </p>
                                <p>
                                    Aujourd'hui, nous sommes fiers d'accompagner des milliers de familles guinéennes 
                                    dans leur parcours éducatif, en proposant des solutions d'apprentissage innovantes 
                                    et personnalisées.
                                </p>
                            </div>
                        </div>
                        <div className="relative fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                                alt="Équipe Timmi" 
                                className="rounded-2xl shadow-2xl w-full h-auto"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--primary-600)]">2024</div>
                                    <div className="text-sm text-gray-600">Année de croissance</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--accent-100)] text-[var(--accent-700)] border-0">
                            📅 Nos étapes clés
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">L'évolution de Timmi</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Retour sur les moments marquants qui ont façonné notre parcours.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[var(--primary-200)]"></div>
                            
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`relative flex items-center mb-12 fadeInUp`} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                                        <Card className="border-0 shadow-lg">
                                            <CardContent className="p-6">
                                                <div className="flex items-center gap-3 mb-3">
                                                    {index % 2 === 0 ? (
                                                        <>
                                                            <div>
                                                                <Badge className="bg-[var(--primary-500)] text-white">{milestone.year}</Badge>
                                                                <h3 className="text-lg font-semibold text-gray-900 mt-2">{milestone.title}</h3>
                                                            </div>
                                                            <div className="w-10 h-10 bg-[var(--primary-100)] rounded-full flex items-center justify-center">
                                                                <milestone.icon className="h-5 w-5 text-[var(--primary-600)]" />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-10 h-10 bg-[var(--primary-100)] rounded-full flex items-center justify-center">
                                                                <milestone.icon className="h-5 w-5 text-[var(--primary-600)]" />
                                                            </div>
                                                            <div>
                                                                <Badge className="bg-[var(--primary-500)] text-white">{milestone.year}</Badge>
                                                                <h3 className="text-lg font-semibold text-gray-900 mt-2">{milestone.title}</h3>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <p className="text-gray-600">{milestone.description}</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    
                                    {/* Timeline dot */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--primary-500)] rounded-full border-4 border-white shadow-lg"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section Améliorée */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--secondary-100)] text-[var(--secondary-700)] border-0">
                            💎 Nos valeurs
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ce qui nous guide</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Ces valeurs guident chacune de nos décisions et définissent notre approche 
                            de l'éducation et du service client.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="text-center border-0 shadow-lg hover-lift fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardHeader>
                                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${value.color} mb-4`}>
                                        <value.icon className="h-8 w-8" />
                                    </div>
                                    <CardTitle className="text-xl">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm">
                                        {value.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--warning-100)] text-[var(--warning-700)] border-0">
                            🏆 Nos accomplissements
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nos résultats parlent d'eux-mêmes</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Quelques chiffres qui témoignent de notre engagement et de la confiance de nos utilisateurs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {achievements.map((achievement, index) => (
                            <Card key={index} className="text-center border-0 shadow-lg hover-lift fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 bg-[var(--primary-100)] rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <achievement.icon className="h-6 w-6 text-[var(--primary-600)]" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{achievement.title}</h3>
                                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section Améliorée */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--info-100)] text-[var(--info-700)] border-0">
                            👥 Notre équipe
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">L'équipe derrière Timmi</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Une équipe passionnée et expérimentée, dédiée à transformer l'éducation en Guinée.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {teamMembers.map((member, index) => (
                            <Card key={index} className="text-center border-0 shadow-lg hover-lift fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardContent className="p-8">
                                    <img 
                                        src={member.avatar} 
                                        alt={member.name}
                                        className="h-20 w-20 rounded-full object-cover mx-auto mb-4"
                                    />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                    <Badge variant="secondary" className="mb-4 bg-[var(--primary-100)] text-[var(--primary-700)] border-0">
                                        {member.role}
                                    </Badge>
                                    <p className="text-gray-600 text-sm">{member.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="max-w-4xl mx-auto mt-12 fadeInUp" style={{ animationDelay: '0.4s' }}>
                        <Card className="border-0 shadow-xl">
                            <CardContent className="p-8">
                                <div className="text-center">
                                    <p className="text-xl text-gray-700 mb-6 italic">
                                        "Notre vision est simple : créer un écosystème éducatif où chaque enfant 
                                        peut atteindre son plein potentiel grâce à un accompagnement personnalisé 
                                        et de qualité."
                                    </p>
                                    <div className="text-sm text-gray-500">
                                        — L'équipe fondatrice de Timmi
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nous contacter</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Des questions sur notre mission ? Envie de nous rejoindre ? N'hésitez pas à nous contacter.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <Card className="text-center border-0 shadow-lg hover-lift fadeInUp" style={{ animationDelay: '0.1s' }}>
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-[var(--primary-100)] rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="h-6 w-6 text-[var(--primary-600)]" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                                <p className="text-gray-600 text-sm">contact@timmi.gn</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-0 shadow-lg hover-lift fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-[var(--accent-100)] rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="h-6 w-6 text-[var(--accent-600)]" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Adresse</h3>
                                <p className="text-gray-600 text-sm">Conakry, Kaloum<br />Centre-ville</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-0 shadow-lg hover-lift fadeInUp" style={{ animationDelay: '0.3s' }}>
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-[var(--success-100)] rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Globe className="h-6 w-6 text-[var(--success-600)]" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Zone de couverture</h3>
                                <p className="text-gray-600 text-sm">Conakry et environs<br />Cours en ligne disponibles</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section Améliorée */}
            <section className="py-16 bg-gradient-to-br from-[var(--primary-600)] to-[var(--secondary-600)] relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center fadeInUp">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                            Rejoignez Notre Communauté
                        </h2>
                        <p className="text-lg lg:text-xl text-white/90 mb-8">
                            Que vous soyez parent ou professeur, découvrez comment Timmi peut 
                            transformer votre expérience éducative et contribuer à l'excellence en Guinée.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a 
                                href="/become-teacher" 
                                className="bg-white text-[var(--primary-700)] hover:bg-gray-100 px-8 py-4 rounded-xl font-medium transition-colors shadow-lg"
                            >
                                Devenir Professeur
                            </a>
                            <a 
                                href="/contact" 
                                className="border-2 border-white text-white hover:bg-white hover:text-[var(--primary-700)] px-8 py-4 rounded-xl font-medium transition-colors"
                            >
                                Nous Contacter
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
} 