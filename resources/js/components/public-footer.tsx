import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    Mail, Phone, MapPin, Facebook, Twitter, Youtube, Linkedin,
    Globe, Users, GraduationCap, Shield, Heart, ChevronRight,
    Star, Award, Clock, CreditCard
} from 'lucide-react';

export default function PublicFooter() {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            id: 'parents',
            title: 'Pour les Parents',
            icon: Users,
            links: [
                { href: '/how-it-works', label: 'Comment ça marche', icon: GraduationCap },
                { href: '/teachers', label: 'Trouver un professeur', icon: Users },
                { href: '/subjects', label: 'Matières disponibles', icon: GraduationCap },
                { href: '/pricing', label: 'Tarifs', icon: CreditCard },
                { href: '/safety', label: 'Sécurité & Confiance', icon: Shield },
            ],
        },
        {
            id: 'teachers',
            title: 'Pour les Professeurs',
            icon: GraduationCap,
            links: [
                { href: '/become-teacher', label: 'Devenir professeur', icon: Star },
                { href: '/teacher-guide', label: 'Guide professeur', icon: Users },
                { href: '/teacher-benefits', label: 'Avantages', icon: Award },
                { href: '/teacher-support', label: 'Support', icon: Users },
                { href: '/teacher-resources', label: 'Ressources', icon: Globe },
            ],
        },
        {
            id: 'support',
            title: 'Support & Aide',
            icon: Shield,
            links: [
                { href: '/faq', label: 'Questions fréquentes', icon: Users },
                { href: '/contact', label: 'Contact', icon: Mail },
                { href: '/help', label: 'Centre d\'aide', icon: Shield },
                { href: '/feedback', label: 'Feedback', icon: Heart },
                { href: '/status', label: 'Statut du service', icon: Clock },
            ],
        },
    ];

    const legalLinks = [
        { href: '/terms', label: 'Conditions d\'utilisation' },
        { href: '/privacy', label: 'Politique de confidentialité' },
        { href: '/cookies', label: 'Politique des cookies' },
        { href: '/disclaimer', label: 'Mentions légales' },
    ];

    const socialMedia = [
        { 
            href: "https://www.facebook.com/TimmiCI", 
            icon: Facebook, 
            label: "Facebook",
            color: "#1877F2",
            hoverBg: "hover:bg-[#1877F2]"
        },
        { 
            href: "https://twitter.com/TimmiCI", 
            icon: Twitter, 
            label: "Twitter",
            color: "#1DA1F2",
            hoverBg: "hover:bg-[#1DA1F2]"
        },
        { 
            href: "https://www.linkedin.com/company/timmi-ci", 
            icon: Linkedin, 
            label: "LinkedIn",
            color: "#0A66C2",
            hoverBg: "hover:bg-[#0A66C2]"
        },
        { 
            href: "https://www.youtube.com/channel/TimmiCI", 
            icon: Youtube, 
            label: "YouTube",
            color: "#FF0000",
            hoverBg: "hover:bg-red-600"
        },
    ];

    const contactInfo = [
        {
            icon: Phone,
            label: 'Téléphone',
            value: '+224 620 00 00 00',
            description: 'Lun-Ven: 8h-18h, Sam: 9h-15h'
        },
        {
            icon: Mail,
            label: 'Email',
            value: 'contact@timmi.ci',
            description: 'Réponse sous 24h'
        },
        {
            icon: MapPin,
            label: 'Adresse',
            value: 'Conakry, Kaloum',
            description: 'Riviera Golf, Guinée'
        }
    ];

    return (
        <footer className="relative bg-gradient-to-br from-[var(--primary-900)] via-[var(--primary-800)] to-[var(--primary-700)] text-white shadow-2xl overflow-hidden">
            {/* Effet de brillance subtil */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-700)] via-[var(--primary-900)] to-[var(--primary-700)] opacity-30" />
            
            {/* Effet de particules subtil */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={`glow-${i}`}
                        className="absolute rounded-full bg-white/10 animate-ping"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 10 + 4}px`,
                            height: `${Math.random() * 10 + 4}px`,
                            animationDelay: `${i * 500}ms`,
                        }}
                    />
                ))}
            </div>

            <div className="relative container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                    
                    {/* Section Logo et Description */}
                    <div className="lg:col-span-4 space-y-6 fadeInUp">
                        <div className="group relative overflow-hidden rounded-2xl p-2 -m-2">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-500)] to-[var(--secondary-500)] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
                            <div className="relative flex items-center space-x-3">
                                <div className="p-2 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                                    <img 
                                        src="/img/logo-timmi.jpg" 
                                        alt="Logo Timmi" 
                                        className="h-16 w-full text-white transform transition-all duration-500 group-hover:scale-110 rounded-lg"
                                    />
                                </div>
                                {/* <span className="font-bold text-3xl text-white">Timmi</span> */}
                            </div>
                        </div>
                        
                        <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl">
                            <p className="text-lg text-gray-100 leading-relaxed mb-6">
                                La plateforme de confiance qui connecte les parents avec des professeurs particuliers qualifiés. 
                                Une éducation personnalisée pour la réussite de vos enfants.
                            </p>
                            
                            {/* Statistiques */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--accent-400)]">500+</div>
                                    <div className="text-sm text-gray-300">Professeurs</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--secondary-400)]">2000+</div>
                                    <div className="text-sm text-gray-300">Élèves</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--accent-400)]">4.8/5</div>
                                    <div className="text-sm text-gray-300">Satisfaction</div>
                                </div>
                            </div>

                            {/* Réseaux sociaux */}
                            <div className="border-t border-white/10 pt-6">
                                <h4 className="text-lg font-semibold mb-4 text-[var(--secondary-400)]">Suivez-nous</h4>
                                <div className="flex gap-3">
                                    {socialMedia.map((social, index) => {
                                        const Icon = social.icon;
                                        return (
                                            <a
                                                key={index}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`p-3 rounded-lg bg-white/10 text-white hover:text-white ${social.hoverBg} transition-all duration-300 group hover:scale-110`}
                                                style={{
                                                    boxShadow: `0 0 20px ${social.color}20`
                                                }}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span className="sr-only">{social.label}</span>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Contact */}
                    <div className="lg:col-span-3 space-y-6 backdrop-blur-sm bg-white/5 p-6 rounded-xl fadeInUp">
                        <h3 className="text-2xl font-bold flex items-center gap-3 text-[var(--secondary-400)]">
                            <Phone className="w-6 h-6" />
                            <span>Contact</span>
                        </h3>
                        
                        <div className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="group hover:bg-white/10 p-3 rounded-lg transition-all duration-300 hover:translate-x-1"
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                                            <item.icon className="w-5 h-5 text-[var(--secondary-400)] group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-white group-hover:text-[var(--secondary-300)] transition-colors duration-300">
                                                {item.value}
                                            </div>
                                            <div className="text-sm text-gray-300">
                                                {item.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Temps de réponse */}
                        <div className="border-t border-white/10 pt-4">
                            <h4 className="font-semibold mb-3 text-[var(--secondary-400)]">Temps de réponse</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Questions générales</span>
                                    <span className="font-medium text-white">24h</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Support technique</span>
                                    <span className="font-medium text-white">12h</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Urgences</span>
                                    <span className="font-medium text-white">4h</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sections Navigation */}
                    <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {footerSections.map((section, sectionIndex) => (
                            <div 
                                key={section.id}
                                className="backdrop-blur-sm bg-white/5 p-6 rounded-xl fadeInUp"
                                style={{ animationDelay: `${0.3 + sectionIndex * 0.1}s` }}
                            >
                                <h3 className="text-lg font-bold text-[var(--secondary-400)] flex items-center gap-2 mb-4">
                                    <section.icon className="w-5 h-5" />
                                    {section.title}
                                </h3>
                                <div className="space-y-2">
                                    {section.links.map((link, index) => (
                                        <div
                                            key={index}
                                            className="hover:translate-x-1 transition-transform duration-200"
                                        >
                                            <Link
                                                href={link.href}
                                                className="flex items-center gap-3 text-gray-200 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group text-sm"
                                            >
                                                <link.icon className="w-4 h-4 text-[var(--secondary-400)] group-hover:scale-110 transition-transform duration-300" />
                                                <span className="flex-1">{link.label}</span>
                                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section Bottom avec liens légaux */}
                <div className="relative border-t border-white/10 mt-12 pt-8 fadeInUp" style={{ animationDelay: '0.6s' }}>
                    {/* Liens légaux */}
                    <div className="flex flex-wrap justify-center gap-6 mb-8">
                        {legalLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-gray-300 hover:text-white text-sm transition-colors duration-300 hover:underline"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
                        <div className="backdrop-blur-sm bg-white/5 px-6 py-3 rounded-full">
                            <p className="text-gray-200 text-lg flex items-center gap-2"> 
                                © {currentYear} <span className="font-medium text-white">Timmi</span> - Tous droits réservés
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                            <span>Fait avec</span>
                            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                            <span>en Guinée</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Styles pour les animations personnalisées */}
            <style>{`
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-3000 { animation-delay: 3s; }
            `}</style>
        </footer>
    );
} 