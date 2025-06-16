import React from 'react';
import { 
  Phone, Mail, MapPin, Facebook, Twitter, Linkedin,
  Globe, Sun, Moon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import ThemeSwitcher from '@/components/ui/theme-switcher';
import ThemeSelector from '@/components/ui/theme-selector';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Footer: React.FC = () => {
  const { currentTheme } = useTheme();

  const quickLinks = [
    { href: "/about", text: "À propos" },
    { href: "/services", text: "Services" },
    { href: "/privacy", text: "Confidentialité" },
    { href: "/terms", text: "Conditions" },
  ];

  const socialMedia = [
    { href: "https://www.facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://www.linkedin.com", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer 
      className={cn(
        "relative text-white overflow-hidden",
        "bg-gradient-to-br from-[color:var(--primary-800)] via-[color:var(--primary-700)] to-[color:var(--primary-600)]"
      )}
      role="contentinfo"
    >
      {/* Effet de glassmorphism subtil */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
      
      {/* Effet de brillance décoratif */}
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-600)]/20 via-[color:var(--accent-500)]/20 to-[color:var(--primary-600)]/20 opacity-30" />
      
      {/* Quelques particules minimalistes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/15"
            style={{
              top: `${20 + i * 30}%`,
              left: `${20 + i * 30}%`,
              width: `${4 + i}px`,
              height: `${4 + i}px`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          
          {/* Logo et médias sociaux */}
          <div className="md:w-1/3 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">M</span>
              </div>
              <div>
                <span className="text-xl font-medium">MyApp</span>
                {currentTheme && (
                  <p className="text-xs text-white/50">{currentTheme.name}</p>
                )}
              </div>
            </Link>
            
            <p className="text-white/70 text-sm max-w-xs">
              Votre plateforme moderne pour une expérience utilisateur optimale.
            </p>
            
            {/* Infos contact minimalistes */}
            <div className="text-sm text-white/70 space-y-1">
              <a href="tel:+33123456789" className="block hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 inline mr-2" /> +33 1 23 45 67 89
              </a>
              <a href="mailto:contact@myapp.fr" className="block hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 inline mr-2" /> contact@myapp.fr
              </a>
            </div>
          </div>

          {/* Section centrale avec liens */}
          <div className="md:w-1/3">
            <div className="grid grid-cols-2 gap-6">
              {/* Liens rapides */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
                  Liens
                </h3>
                <ul className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Adresse simplifiée */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
                  Adresse
                </h3>
                <address className="text-sm text-white/70 not-italic">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>123 Rue Technologie<br />75001 Paris</span>
                  </p>
                </address>
              </div>
            </div>
          </div>
          
          {/* Section droite avec newsletter simplifiée */}
          <div className="md:w-1/3">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
              Personnalisation
            </h3>
            
            {/* Options de personnalisation */}
            <div className="space-y-4 mb-5">
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
                  <Sun className="w-4 h-4 text-white/60" />
                  <ThemeSwitcher variant="minimal" size="sm" />
                  <Moon className="w-4 h-4 text-white/60" />
                </div>
              </div>
            </div>
            
            {/* Réseaux sociaux */}
            <div className="flex space-x-3">
              {socialMedia.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                );
              })}
              
              {/* Email avec icône */}
              <a 
                href="https://www.myapp.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
                <span className="sr-only">Site web</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section copyright simplifiée */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center text-center text-xs text-white/60">
          <p>© {new Date().getFullYear()} MyApp - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 