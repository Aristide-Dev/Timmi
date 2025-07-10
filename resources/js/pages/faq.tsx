import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Users, CreditCard, BookOpen, Shield, HelpCircle, MessageCircle, Clock, Award, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { PageProps } from '@/types';
import PublicLayout from '@/layouts/public-layout';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

export default function FAQ({ auth }: PageProps) {
    const [openItems, setOpenItems] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const faqData: FAQItem[] = [
        // Général
        {
            question: "Qu'est-ce que Timmi ?",
            answer: "Timmi est une plateforme qui connecte les parents avec des professeurs particuliers qualifiés pour des cours à domicile ou en ligne. Nous proposons une large gamme de matières et nous nous assurons que tous nos professeurs sont vérifiés et expérimentés.",
            category: "general"
        },
        {
            question: "Comment puis-je m'inscrire sur Timmi ?",
            answer: "L'inscription est gratuite et simple. Cliquez sur 'S'inscrire' en haut de la page, choisissez votre profil (parent ou professeur), remplissez vos informations et validez votre compte via l'email de confirmation.",
            category: "general"
        },
        {
            question: "Timmi est-il disponible dans toute la Guinée ?",
            answer: "Actuellement, Timmi est principalement disponible à Conakry et ses environs. Nous proposons également des cours en ligne qui sont accessibles partout en Guinée.",
            category: "general"
        },

        // Pour les parents
        {
            question: "Comment choisir le bon professeur pour mon enfant ?",
            answer: "Vous pouvez filtrer les professeurs par matière, localisation, tarif et disponibilité. Consultez leurs profils, leurs qualifications, les avis d'autres parents et leurs méthodes pédagogiques pour faire le meilleur choix.",
            category: "parents"
        },
        {
            question: "Que faire si je ne suis pas satisfait du cours ?",
            answer: "Votre satisfaction est notre priorité. Si vous n'êtes pas satisfait, contactez notre support client dans les 24h suivant le cours. Nous proposons des remboursements ou des cours de remplacement selon les cas.",
            category: "parents"
        },
        {
            question: "Comment puis-je suivre les progrès de mon enfant ?",
            answer: "Après chaque cours, le professeur peut partager un résumé des points abordés et des progrès réalisés. Vous avez également accès à un tableau de bord personnel pour suivre l'évolution.",
            category: "parents"
        },

        // Paiements
        {
            question: "Quels sont les moyens de paiement acceptés ?",
            answer: "Nous acceptons les paiements par Orange Money, MTN Money et cartes bancaires (Visa, Mastercard). Tous les paiements sont sécurisés et vous recevez automatiquement un reçu.",
            category: "paiements"
        },
        {
            question: "Quand dois-je payer le cours ?",
            answer: "Le paiement s'effectue au moment de la réservation. Cela garantit la réservation de votre créneau et permet au professeur de préparer le cours spécifiquement pour votre enfant.",
            category: "paiements"
        },
        {
            question: "Puis-je annuler un cours et être remboursé ?",
            answer: "Oui, vous pouvez annuler un cours jusqu'à 24h avant l'heure prévue pour un remboursement complet. Les annulations tardives ne sont remboursées qu'en cas de force majeure.",
            category: "paiements"
        },

        // Cours
        {
            question: "Quelle est la durée d'un cours ?",
            answer: "La durée standard d'un cours est de 1h30, mais elle peut être adaptée selon les besoins de l'élève et les recommandations du professeur (1h, 2h, etc.).",
            category: "cours"
        },
        {
            question: "Les cours en ligne sont-ils aussi efficaces qu'en présentiel ?",
            answer: "Nos professeurs sont formés aux outils numériques et aux méthodes d'enseignement en ligne. Les cours virtuels peuvent être très efficaces, surtout avec une bonne préparation et des outils interactifs.",
            category: "cours"
        },
        {
            question: "Le matériel pédagogique est-il fourni ?",
            answer: "Cela dépend du professeur et de la matière. Beaucoup de professeurs fournissent leurs propres supports. Pour certaines matières, il peut être demandé aux parents de fournir les manuels scolaires de l'enfant.",
            category: "cours"
        },

        // Sécurité
        {
            question: "Comment Timmi vérifie-t-il ses professeurs ?",
            answer: "Tous nos professeurs passent par un processus de vérification rigoureux : vérification des diplômes, des références, entretien personnel et parfois test de compétences selon la matière.",
            category: "securite"
        },
        {
            question: "Mes données personnelles sont-elles sécurisées ?",
            answer: "Absolument. Nous utilisons un cryptage SSL et respectons les normes de protection des données. Vos informations personnelles ne sont jamais partagées avec des tiers sans votre consentement.",
            category: "securite"
        }
    ];

    const categories = [
        { id: 'all', label: 'Toutes les questions', icon: Search, color: 'bg-[var(--primary-100)] text-[var(--primary-700)]' },
        { id: 'general', label: 'Général', icon: HelpCircle, color: 'bg-[var(--accent-100)] text-[var(--accent-700)]' },
        { id: 'parents', label: 'Pour les parents', icon: Users, color: 'bg-[var(--secondary-100)] text-[var(--secondary-700)]' },
        { id: 'paiements', label: 'Paiements', icon: CreditCard, color: 'bg-[var(--success-100)] text-[var(--success-700)]' },
        { id: 'cours', label: 'Cours', icon: BookOpen, color: 'bg-[var(--warning-100)] text-[var(--warning-700)]' },
        { id: 'securite', label: 'Sécurité', icon: Shield, color: 'bg-[var(--info-100)] text-[var(--info-700)]' },
    ];

    const quickStats = [
        { value: '15+', label: 'Questions populaires', icon: HelpCircle },
        { value: '24h', label: 'Temps de réponse', icon: Clock },
        { value: '98%', label: 'Problèmes résolus', icon: Award },
        { value: '7j/7', label: 'Support disponible', icon: MessageCircle },
    ];

    const supportChannels = [
        {
            title: 'Chat en direct',
            description: 'Discutez avec notre équipe support',
            time: 'Réponse immédiate',
            color: 'bg-[var(--primary-50)] text-[var(--primary-700)]'
        },
        {
            title: 'Email',
            description: 'Envoyez-nous un email détaillé',
            time: 'Réponse sous 24h',
            color: 'bg-[var(--accent-50)] text-[var(--accent-700)]'
        },
        {
            title: 'Téléphone',
            description: 'Appelez notre service client',
            time: 'Lun-Ven 8h-18h',
            color: 'bg-[var(--success-50)] text-[var(--success-700)]'
        }
    ];

    const filteredFAQs = faqData.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleItem = (index: number) => {
        setOpenItems(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const breadcrumbs = [
        { href: '/', title: 'Accueil' },
        { href: '/faq', title: 'FAQ' },
    ];

    return (
        <PublicLayout 
            auth={auth} 
            title="Questions Fréquentes" 
            description="Trouvez rapidement les réponses à vos questions sur Timmi, les cours particuliers et notre plateforme."
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
                                ❓ Centre d'aide
                            </Badge>
                            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                                Questions 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)]"> Fréquentes</span>
                            </h1>
                            <p className="text-lg lg:text-xl leading-8 text-gray-600 mb-8">
                                Trouvez rapidement les réponses à vos questions sur Timmi et nos services.
                                Notre équipe met à jour régulièrement cette section.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fadeInUp" style={{ animationDelay: '0.1s' }}>
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
                        
                        {/* Search */}
                        <div className="max-w-xl mx-auto fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Rechercher une question..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 pr-4 py-4 text-lg border-2 border-[var(--primary-200)] focus:border-[var(--primary-500)] rounded-xl shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Améliorées */}
            <section className="py-8 border-b bg-white/80 backdrop-blur-sm sticky top-16 z-40 shadow-sm">
                <div className="container px-4">
                    <div className="flex flex-wrap justify-center gap-3 fadeInUp">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                                    selectedCategory === category.id
                                        ? `${category.color} shadow-lg border-2 border-current/20`
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                                }`}
                            >
                                <category.icon className="h-4 w-4 mr-2" />
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Content Amélioré */}
            <section className="py-16 bg-gradient-to-b from-white to-gray-50">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto">
                        {filteredFAQs.length === 0 ? (
                            <div className="text-center py-16 fadeInUp">
                                <div className="w-24 h-24 bg-[var(--primary-100)] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <HelpCircle className="h-12 w-12 text-[var(--primary-600)]" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-4">
                                    Aucune question trouvée
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Aucune question trouvée pour votre recherche.
                                </p>
                                <button 
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('all');
                                    }}
                                    className="btn-primary px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredFAQs.map((faq, index) => {
                                    const category = categories.find(c => c.id === faq.category);
                                    return (
                                        <Card key={index} className="border-0 shadow-lg bg-white hover-lift fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                            <CardHeader 
                                                className="cursor-pointer hover:bg-gray-50 transition-colors rounded-t-lg"
                                                onClick={() => toggleItem(index)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3 flex-1">
                                                        <Badge variant="secondary" className={`text-xs ${category?.color || 'bg-gray-100 text-gray-700'} border-0`}>
                                                            {category?.label}
                                                        </Badge>
                                                        <CardTitle className="text-lg font-medium text-left">
                                                            {faq.question}
                                                        </CardTitle>
                                                    </div>
                                                    <div className="ml-4">
                                                        {openItems.includes(index) ? (
                                                            <ChevronUp className="h-5 w-5 text-[var(--primary-600)] transition-transform duration-200" />
                                                        ) : (
                                                            <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200" />
                                                        )}
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            {openItems.includes(index) && (
                                                <CardContent className="pt-0 pb-6 border-t border-gray-100">
                                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                                        <p className="text-gray-700 leading-relaxed">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            )}
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Support Channels Section */}
            <section className="py-16 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--accent-100)] text-[var(--accent-700)] border-0">
                            💬 Besoin d'aide ?
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Autres moyens de nous contacter</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Si vous ne trouvez pas votre réponse, notre équipe support est là pour vous aider par différents canaux.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {supportChannels.map((channel, index) => (
                            <Card key={index} className="border-0 shadow-lg hover-lift text-center fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardContent className="p-8">
                                    <div className={`w-16 h-16 ${channel.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                        <MessageCircle className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{channel.title}</h3>
                                    <p className="text-gray-600 mb-3">{channel.description}</p>
                                    <Badge variant="outline" className="text-xs">
                                        {channel.time}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Questions Section */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container px-4">
                    <div className="text-center mb-12 fadeInUp">
                        <Badge variant="secondary" className="mb-4 bg-[var(--warning-100)] text-[var(--warning-700)] border-0">
                            🔥 Questions populaires
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Les questions les plus posées</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Voici les questions que nos utilisateurs posent le plus fréquemment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {faqData.slice(0, 4).map((faq, index) => (
                            <Card key={index} className="border-0 shadow-lg hover-lift fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-[var(--primary-100)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <Star className="h-4 w-4 text-[var(--primary-600)]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                            <p className="text-gray-600 text-sm line-clamp-3">{faq.answer}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section Améliorée */}
            <section className="py-16 bg-gradient-to-br from-[var(--primary-600)] to-[var(--secondary-600)] relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center fadeInUp">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                            Vous ne trouvez pas votre réponse ?
                        </h2>
                        <p className="text-lg lg:text-xl text-white/90 mb-8">
                            Notre équipe support est là pour vous aider. N'hésitez pas à nous contacter 
                            pour toute question spécifique !
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a 
                                href="/contact" 
                                className="bg-white text-[var(--primary-700)] hover:bg-gray-100 px-8 py-4 rounded-xl font-medium transition-colors shadow-lg"
                            >
                                Nous contacter
                            </a>
                            <a 
                                href="/help" 
                                className="border-2 border-white text-white hover:bg-white hover:text-[var(--primary-700)] px-8 py-4 rounded-xl font-medium transition-colors"
                            >
                                Centre d'aide
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
} 