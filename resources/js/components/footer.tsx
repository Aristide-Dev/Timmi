import ThemeSelector from '@/components/ui/theme-selector';
import ThemeSwitcher from '@/components/ui/theme-switcher';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Mail, MapPin, Phone, Globe,
    ChevronRight, ExternalLink, Building2, Package, Wrench, Clock, Star
} from 'lucide-react';
import React, { useState } from 'react';
import { appDetails } from '@/constants/app-details';

// Composant optimisé pour le préchargement des ressources critiques
const PreloadCriticalResources = () => (
    <>
        <link rel="preload" href="/favicon.svg" as="image" fetchPriority="high" />
    </>
);

// Composant pour charger les images non critiques de manière paresseuse
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LazyImage = ({ src, alt, className, ...props }: { 
    src: string; 
    alt: string; 
    className?: string; 
    [key: string]: unknown;
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setHasError(true);

    if (hasError) {
        return (
            <div className={`${className} bg-gray-200 flex items-center justify-center text-gray-500 text-sm`}>
                Image non disponible
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={handleLoad}
            onError={handleError}
            {...props}
        />
    );
};

const Footer: React.FC = () => {
    const { currentTheme } = useTheme();

    const quickLinks = [
        { href: '/about', text: 'À propos', icon: <Star className="w-4 h-4" /> },
        { href: '/services', text: 'Services', icon: <Wrench className="w-4 h-4" /> },
        { href: '/contact', text: 'Contact', icon: <Phone className="w-4 h-4" /> },
        { href: '/privacy', text: 'Confidentialité', icon: <Building2 className="w-4 h-4" /> },
        { href: '/terms', text: 'Conditions', icon: <Package className="w-4 h-4" /> },
    ];

    // Utilisation des données depuis app-details.js
    const socialMedia = appDetails.social.map(social => ({
        ...social,
        label: social.href.includes('facebook') ? 'Facebook' : 
               social.href.includes('twitter') ? 'Twitter' : 
               social.href.includes('linkedin') ? 'LinkedIn' : 
               social.href.includes('instagram') ? 'Instagram' : 
               social.href.includes('youtube') ? 'YouTube' : 'Social',
        color: social.href.includes('facebook') ? '#1877f2' : 
               social.href.includes('twitter') ? '#1da1f2' : 
               social.href.includes('linkedin') ? '#0a66c2' : 
               social.href.includes('instagram') ? '#E4405F' : 
               social.href.includes('youtube') ? '#FF0000' : '#666',
        hoverBg: social.href.includes('facebook') ? 'hover:bg-blue-500' : 
                 social.href.includes('twitter') ? 'hover:bg-sky-500' : 
                 social.href.includes('linkedin') ? 'hover:bg-blue-600' : 
                 social.href.includes('instagram') ? 'hover:bg-pink-500' : 
                 social.href.includes('youtube') ? 'hover:bg-red-500' : 'hover:bg-gray-500'
    }));

    const usefulLinks = appDetails.usefulLinks;
    const services = appDetails.services;
    const contactInfo = appDetails.contact;

    return (
        <footer
            className={cn(
                'relative overflow-hidden text-white shadow-2xl',
                'bg-gradient-to-br from-[color:var(--primary-900)] via-[color:var(--primary-800)] to-[color:var(--primary-700)]',
            )}
            role="contentinfo"
        >
            {/* Effet de brillance subtil */}
            <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-700)] via-[color:var(--primary-900)] to-[color:var(--primary-700)] opacity-50" />
            
            {/* Effet de particules sophistiqué */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`glow-${i}`}
                        className="absolute rounded-full bg-white/10"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 12 + 4}px`,
                            height: `${Math.random() * 12 + 4}px`,
                        }}
                        animate={{
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.5, 1],
                            y: [0, -15, 0],
                            x: [0, Math.random() * 10 - 5, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
                
                {/* Étoiles scintillantes */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="absolute w-1 h-1 bg-white/60 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <PreloadCriticalResources />

            <div className="relative container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Section Logo et Description */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center md:items-start space-y-6"
                    >
                        <div className="group relative overflow-hidden rounded-2xl p-2 space-y-3">
                            <div className="absolute w-full -inset-0.5 bg-gradient-to-r from-[color:var(--primary-600)] to-[color:var(--accent-600)] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                            <div className="relative w-full flex items-center space-x-3">
                                <div className="bg-white/20 p-0 rounded-xl backdrop-blur-sm">
                                    <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 rounded-xl flex items-center justify-center">
                                        <img src="/logo.jpg" className="size-full object-cover rounded-xl"/>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white text-xl font-bold">{appDetails.name}</span>
                                    <span className="text-xs text-gray-300 uppercase tracking-wide">{appDetails.author}</span>
                                </div>
                            </div>
                        </div>
                        
                        <p className="text-sm text-justify text-gray-100 md:text-left leading-relaxed backdrop-blur-sm bg-white/5 p-4 rounded-xl">
                            {appDetails.description}
                        </p>
                        
                        {/* Mission et Vision */}
                        <div className="space-y-3 w-full">
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border-l-4 border-[color:var(--accent-400)]">
                                <h4 className="text-sm font-bold text-[color:var(--accent-300)] mb-1">Notre Mission</h4>
                                <p className="text-xs text-gray-300 leading-relaxed">Créer des solutions technologiques innovantes qui transforment les entreprises.</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border-l-4 border-[color:var(--primary-400)]">
                                <h4 className="text-sm font-bold text-[color:var(--primary-300)] mb-1">Notre Vision</h4>
                                <p className="text-xs text-gray-300 leading-relaxed">Être le leader en innovation technologique pour un avenir numérique durable.</p>
                            </div>
                        </div>
                        
                        {currentTheme && (
                            <div className="group relative overflow-hidden rounded-xl w-full">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[color:var(--primary-600)] to-[color:var(--accent-600)] rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                                <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                                    <p className="text-xs text-[color:var(--accent-300)] font-medium">Thème actuel: {currentTheme.name}</p>
                    </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Section Contact */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6 backdrop-blur-sm bg-white/5 p-6 rounded-xl"
                    >
                        <h3 className="text-2xl font-bold flex items-center gap-3 text-[color:var(--accent-400)]">
                            <Phone className="w-6 h-6" aria-hidden="true" />
                            <span>Contact</span>
                        </h3>
                        
                        <address className="not-italic space-y-4">
                            {contactInfo.phones.map((phone, index) => (
                                <motion.div 
                                    key={index} 
                                    className="flex items-start group hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
                                    whileHover={{ x: 5 }}
                                >
                                    <Phone className="mt-1 mr-3 text-[color:var(--accent-400)] group-hover:scale-110 transition-transform duration-300"/>
                                    <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                                        <a href={`tel:${phone}`} className="hover:text-[color:var(--accent-400)] transition-colors">
                                            {phone}
                                        </a>
                                    </span>
                                </motion.div>
                            ))}
                            
                            {contactInfo.emails.map((email, index) => (
                                <motion.div 
                                    key={index} 
                                    className="flex items-start group hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
                                    whileHover={{ x: 5 }}
                                >
                                    <Mail className="mt-1 mr-3 text-[color:var(--accent-400)] group-hover:scale-110 transition-transform duration-300"/>
                                    <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                                        <a href={`mailto:${email}`} className="hover:text-[color:var(--accent-400)] transition-colors">
                                            {email}
                                        </a>
                                    </span>
                                </motion.div>
                            ))}
                            
                            <motion.div 
                                className="flex items-start group hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
                                whileHover={{ x: 5 }}
                            >
                                <MapPin className="mt-1 mr-3 text-[color:var(--accent-400)] group-hover:scale-110 transition-transform duration-300"/>
                                <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                                    <span className="text-sm">{contactInfo.address}</span>
                                </span>
                            </motion.div>
                            
                            {/* Horaires d'ouverture */}
                            <motion.div 
                                className="flex items-start group hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
                                whileHover={{ x: 5 }}
                            >
                                <Clock className="mt-1 mr-3 text-[color:var(--accent-400)] group-hover:scale-110 transition-transform duration-300"/>
                                <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium">{contactInfo.hours.weekdays}</span>
                                        <span className="text-xs text-gray-400">{contactInfo.hours.weekhours}</span>
                                    </div>
                                        </span>
                            </motion.div>
                                </address>

                        {/* Réseaux sociaux */}
                        <div className="pt-4 border-t border-white/10">
                            <h4 className="text-lg font-semibold mb-4 text-[color:var(--accent-400)]">Suivez-nous</h4>
                            <div className="flex flex-wrap gap-3">
                                {socialMedia.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 rounded-lg bg-white/10 text-white hover:text-white ${social.hoverBg} transition-all duration-300 group backdrop-blur-sm`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            boxShadow: `0 0 20px ${social.color}20`
                                        }}
                                    >
                                        <social.icon className="w-4 h-4" />
                                        <span className="sr-only">{social.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Section Services */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-4 backdrop-blur-sm bg-white/5 p-6 rounded-xl"
                    >
                        <h3 className="text-xl font-bold text-[color:var(--accent-400)] flex items-center gap-2">
                            <Wrench className="w-5 h-5" />
                            Nos Services
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                            {services.slice(0, 6).map((service, index) => (
                                <motion.a
                                    key={index}
                                    href={service.link}
                                    className="flex items-center gap-3 text-gray-200 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                                    whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                >
                                    <ChevronRight className="w-3 h-3 text-[color:var(--accent-400)] group-hover:scale-110 transition-transform duration-300" />
                                    <span className="flex-1 text-sm">{service.title}</span>
                                </motion.a>
                            ))}
                            {services.length > 6 && (
                                <motion.a
                                    href="/services"
                                    className="flex items-center gap-3 text-[color:var(--accent-300)] hover:text-[color:var(--accent-200)] p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group mt-2"
                                    whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                >
                                    <Package className="w-3 h-3 text-[color:var(--accent-400)] group-hover:scale-110 transition-transform duration-300" />
                                    <span className="flex-1 text-sm font-medium">Voir tous nos services ({services.length})</span>
                                </motion.a>
                            )}
                    </div>

                        {/* Section Personnalisation */}
                        <div className="pt-4 border-t border-white/10">
                            <h4 className="text-lg font-semibold mb-4 text-[color:var(--accent-400)]">Personnalisation</h4>
                            <div className="space-y-4">
                            {/* Sélecteur de thème unifié */}
                            <div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="mb-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-white/80">Couleurs :</span>
                                                    <ThemeSelector variant="minimal" showTitle={false} />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                            <p className="text-xs">Changer les couleurs du thème</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            {/* Mode clair/sombre */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white/80">Mode :</span>
                                <div className="flex items-center gap-2">
                                    <ThemeSwitcher variant="minimal" size="sm" />
                                </div>
                            </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section Liens utiles */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="space-y-4 backdrop-blur-sm bg-white/5 p-6 rounded-xl"
                    >
                        <h3 className="text-xl font-bold text-[color:var(--accent-400)] flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            Liens utiles
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                            {quickLinks.map((link, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                >
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-3 text-gray-200 hover:text-white p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                                    >
                                        <span className="p-2 rounded-lg bg-white/10 text-[color:var(--accent-400)] group-hover:scale-110 transition-transform duration-300">
                                            {link.icon}
                                        </span>
                                        <span className="flex-1 text-sm">{link.text}</span>
                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Liens externes */}
                        <div className="pt-4 border-t border-white/10">
                            <h4 className="text-sm font-semibold mb-3 text-[color:var(--accent-400)]">Partenaires</h4>
                            <div className="grid grid-cols-1 gap-1">
                                {usefulLinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-gray-200 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                                        whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                    >
                                        <span className="text-[color:var(--accent-400)] group-hover:scale-110 transition-transform duration-300">
                                            <link.icon className="w-4 h-4" />
                                        </span>
                                        <span className="flex-1 text-xs">{link.text}</span>
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Section Copyright */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="relative border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-6">
                        <div className="group relative overflow-hidden rounded-2xl p-2 -m-2">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[color:var(--primary-600)] to-[color:var(--accent-600)] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                            <div className="relative">
                                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center opacity-90 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105">
                                    <span className="text-xl font-bold">M</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-gray-200 text-lg backdrop-blur-sm bg-white/5 px-6 py-2 rounded-full mb-2"> 
                                © {new Date().getFullYear()} <span className="font-medium text-white">{appDetails.name}</span> - Tous droits réservés
                            </p>
                            <p className="text-xs text-gray-400 italic">Innovation & Excellence depuis 2024</p>
                    </div>
                </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href={appDetails.legal.privacyPolicy} className="text-gray-300 hover:text-[color:var(--accent-400)] transition-colors text-sm">
                            Politique de confidentialité
                        </a>
                        <a href={appDetails.legal.termsOfService} className="text-gray-300 hover:text-[color:var(--accent-400)] transition-colors text-sm">
                            Conditions d'utilisation
                        </a>
                        <a href={appDetails.legal.cookiePolicy} className="text-gray-300 hover:text-[color:var(--accent-400)] transition-colors text-sm">
                            Politique de cookies
                        </a>
                </div>
                </motion.div>
            </div>

            {/* Styles pour les animations personnalisées */}
            <style>{`
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-3000 {
                    animation-delay: 3s;
                }
                .bg-noise {
                    background-image: 
                        radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0);
                    background-size: 20px 20px;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
