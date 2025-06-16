import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Facebook, Twitter, Youtube, Linkedin,
  Globe, Building2, FileText, Users, Sparkles, Send, ArrowRight,
  Sun, Moon, Palette, Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import ColorPicker from '@/components/ui/color-picker';

// Composant pour charger les images de manière paresseuse
const LazyImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, className, ...props }) => {
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
  const { currentTheme, toggleDarkMode } = useTheme();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usefulLinks = [
    { 
      href: "/about", 
      text: "À propos de nous",
      icon: <Building2 className="w-4 h-4" />,
      description: "Découvrez notre histoire"
    },
    { 
      href: "/services", 
      text: "Nos services",
      icon: <FileText className="w-4 h-4" />,
      description: "Solutions complètes"
    },
    { 
      href: "/contact", 
      text: "Nous contacter",
      icon: <Users className="w-4 h-4" />,
      description: "Échangeons ensemble"
    },
    { 
      href: "/help", 
      text: "Centre d'aide",
      icon: <FileText className="w-4 h-4" />,
      description: "Support et assistance"
    },
    { 
      href: "/privacy", 
      text: "Politique de confidentialité",
      icon: <FileText className="w-4 h-4" />,
      description: "Protection des données"
    },
  ];

  const socialMedia = [
    { 
      href: "https://www.facebook.com/myapp", 
      icon: <Facebook />, 
      label: "Facebook",
      color: "#1877F2",
      hoverBg: "hover:bg-[#1877F2]",
      description: "Suivez nos actualités"
    },
    { 
      href: "https://twitter.com/myapp", 
      icon: <Twitter />, 
      label: "Twitter",
      color: "#1DA1F2",
      hoverBg: "hover:bg-[#1DA1F2]",
      description: "Actualités en temps réel"
    },
    { 
      href: "https://www.linkedin.com/company/myapp", 
      icon: <Linkedin />, 
      label: "LinkedIn",
      color: "#0A66C2",
      hoverBg: "hover:bg-[#0A66C2]",
      description: "Réseau professionnel"
    },
    { 
      href: "https://www.youtube.com/channel/myapp", 
      icon: <Youtube />, 
      label: "YouTube",
      color: "#FF0000",
      hoverBg: "hover:bg-red-600",
      description: "Contenus vidéo"
    },
  ];

  const contactInfo = {
    phones: ["+33 1 23 45 67 89"],
    emails: ["contact@myapp.fr", "support@myapp.fr"],
    address: "123 Rue de la Technologie, 75001 Paris, France"
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    // Simulation d'une soumission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Newsletter signup:', email);
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <footer 
      className={cn(
        "relative text-white shadow-2xl overflow-hidden",
        "bg-gradient-to-br from-[var(--primary-800)] via-[var(--primary-700)] to-[var(--primary-600)]"
      )} 
      role="contentinfo"
    >
      {/* Effet de brillance décoratif amélioré */}
      <div className={cn(
        "absolute inset-0 opacity-60",
        "bg-gradient-to-r from-[var(--primary-600)]/20 via-[var(--accent-500)]/30 to-[var(--primary-600)]/20"
      )} />
      
      {/* Particules décoratives ultra-sophistiquées inspirées du top-bar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/20"
            style={{
              top: `${15 + i * 8}%`,
              left: `${5 + i * 8}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
              y: [0, -20, 0],
              x: [0, Math.random() * 12 - 6, 0],
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Effet de brillance animé traversant comme dans top-bar */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/8 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear",
            repeatDelay: 5
          }}
        />

        {/* Particules de brillance sophistiquées */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shine-${i}`}
            className="absolute w-1.5 h-1.5 bg-accent-300/40 rounded-full"
            style={{
              top: `${20 + i * 12}%`,
              left: `${15 + i * 10}%`,
            }}
            animate={{
              opacity: [0.4, 0.9, 0.4],
              scale: [1, 1.8, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.6,
            }}
          />
        ))}

        {/* Vagues animées au bas du footer */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute bottom-0 left-0 right-0 h-full"
              style={{
                backgroundImage: `linear-gradient(to right, transparent, var(--accent-500)/${10 - i * 2}%, transparent)`,
                transform: `translateY(${i * 10}px)`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Effet de halo lumineux */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/5 to-transparent opacity-50" />

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Section Logo et Description avec glassmorphism sophistiqué */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group h-full"
            onMouseEnter={() => setHoveredSection('logo')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Effet de halo au hover inspiré de la top-bar */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/15 to-primary-500/10 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 blur-xl"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.4 }}
            />

            <div className={cn(
              "glass-strong rounded-2xl p-6 space-y-6 transition-all duration-500",
              "border border-white/10 hover:border-accent-400/30",
              "hover:shadow-lg hover:shadow-accent-500/20"
            )}>
              {/* Logo avec effets sophistiqués */}
              <Link href="/" className="group/logo relative overflow-hidden rounded-2xl p-3 -m-3 block">
                {/* Effet de brillance interne au hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover/logo:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                
                <div className="relative flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-white/30 to-accent-500/20 rounded-xl flex items-center justify-center relative overflow-hidden"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <LazyImage
                      src="/images/logo.svg"
                      alt="MyApp Logo"
                      className="w-8 h-8 object-contain relative z-10"
                    />
                    {/* Sparkles animés */}
                    <motion.div
                      className="absolute top-1 right-1"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={10} className="text-accent-300" />
                    </motion.div>
                  </motion.div>
                  <div>
                    <span className={cn(
                      "text-2xl font-bold bg-clip-text text-transparent",
                      "bg-gradient-to-r from-white to-[var(--accent-200)]"
                    )}>MyApp</span>
                    <p className="text-xs text-white/70 tracking-wider uppercase font-medium">
                      {currentTheme.name}
                    </p>
                  </div>
                </div>
              </Link>
            
              <motion.p 
                className="text-white/90 leading-relaxed"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
              MyApp - Votre plateforme moderne pour une expérience utilisateur optimale avec les dernières technologies.
              </motion.p>
              
              {/* Badge technologique sophistiqué */}
              <motion.div 
                className="glass rounded-xl p-4 border border-white/10 hover:border-accent-400/50 transition-all duration-300 group/tech relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-500/10 to-transparent opacity-0 group-hover/tech:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <h4 className="font-semibold mb-2 flex items-center gap-2 relative z-10">
                  <Globe className="w-4 h-4 text-accent-300" />
                  Technologie moderne
                </h4>
                <p className="text-sm text-white/80 relative z-10">Laravel 12 • React 19 • TypeScript • Tailwind CSS 4</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Section Contact avec effets sophistiqués */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
            onMouseEnter={() => setHoveredSection('contact')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Effet de halo au hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-500/10 via-primary-500/15 to-accent-500/10 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 blur-xl"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.4 }}
            />

            <div className={cn(
              "glass-strong rounded-2xl p-6 space-y-6 transition-all duration-500",
              "border border-white/10 hover:border-accent-400/30",
              "hover:shadow-lg hover:shadow-accent-500/20"
            )}>
              <h3 className="text-2xl font-bold flex items-center gap-3 text-white group/title">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <Phone className="w-6 h-6 text-accent-300" aria-hidden="true" />
                </motion.div>
              <span>Contact</span>
                {hoveredSection === 'contact' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sparkles size={16} className="text-accent-300" />
                  </motion.div>
                )}
            </h3>
            
            <address className="not-italic space-y-4">
              {contactInfo.phones.map((phone, index) => (
                <motion.div 
                  key={index} 
                    className="flex items-start group/contact glass hover:glass-strong p-3 rounded-xl transition-all duration-300 relative overflow-hidden border border-transparent hover:border-accent-400/30"
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/contact:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10"
                >
                      <Phone className="mt-1 mr-3 text-accent-300 group-hover/contact:scale-110 transition-transform duration-300"/>
                    </motion.div>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-white/90 group-hover/contact:text-white transition-colors duration-300 relative z-10">
                    {phone}
                  </a>
                </motion.div>
              ))}
              
              {contactInfo.emails.map((email, index) => (
                <motion.div 
                  key={index} 
                    className="flex items-start group/contact glass hover:glass-strong p-3 rounded-xl transition-all duration-300 relative overflow-hidden border border-transparent hover:border-accent-400/30"
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/contact:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10"
                >
                      <Mail className="mt-1 mr-3 text-accent-300 group-hover/contact:scale-110 transition-transform duration-300"/>
                    </motion.div>
                    <a href={`mailto:${email}`} className="text-white/90 group-hover/contact:text-white transition-colors duration-300 relative z-10">
                    {email}
                  </a>
                </motion.div>
              ))}
              
              <motion.div 
                  className="flex items-start group/contact glass hover:glass-strong p-3 rounded-xl transition-all duration-300 relative overflow-hidden border border-transparent hover:border-accent-400/30"
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/contact:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
              >
                    <MapPin className="mt-1 mr-3 text-accent-300 group-hover/contact:scale-110 transition-transform duration-300"/>
                  </motion.div>
                  <span className="text-white/90 group-hover/contact:text-white transition-colors duration-300 relative z-10">
                  {contactInfo.address}
                </span>
              </motion.div>
            </address>

              {/* Réseaux sociaux avec effets sophistiqués */}
              <div className="pt-4 border-t border-white/20">
                <h4 className="text-lg font-semibold mb-4 text-accent-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Suivez-nous
                </h4>
                <div className="grid grid-cols-2 gap-3">
                {socialMedia.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                        className={`group/social relative p-4 rounded-xl glass hover:glass-strong text-white transition-all duration-300 overflow-hidden border border-transparent hover:border-white/30`}
                        whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        boxShadow: `0 0 20px ${social.color}20`
                      }}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/social:opacity-100"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.8 }}
                        />
                        <div className="relative z-10 flex items-center gap-3">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                    >
                      {Icon}
                          </motion.div>
                          <div>
                            <div className="font-medium text-sm">{social.label}</div>
                            <div className="text-xs text-white/70">{social.description}</div>
                          </div>
                        </div>
                      <span className="sr-only">{social.label}</span>
                    </motion.a>
                  );
                })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section Liens utiles avec effets sophistiqués */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group"
            onMouseEnter={() => setHoveredSection('links')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Effet de halo au hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/15 to-primary-500/10 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 blur-xl"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.4 }}
            />

            <div className={cn(
              "glass-strong rounded-2xl p-6 space-y-6 transition-all duration-500",
              "border border-white/10 hover:border-accent-400/30",
              "hover:shadow-lg hover:shadow-accent-500/20"
            )}>
              <h3 className="text-xl font-bold text-accent-200 flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
              <Globe className="w-5 h-5" />
                </motion.div>
              Liens utiles
                {hoveredSection === 'links' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sparkles size={14} className="text-accent-300" />
                  </motion.div>
                )}
            </h3>
              <div className="space-y-2">
              {usefulLinks.map((link, index) => (
                <motion.div
                  key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                      className="flex items-center gap-3 text-white/90 hover:text-white p-3 rounded-xl hover:glass-strong transition-all duration-300 group/link relative overflow-hidden border border-transparent hover:border-accent-400/30"
                  >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/link:opacity-100"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div 
                        className="p-2 rounded-lg bg-white/10 text-accent-300 relative z-10"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                      {link.icon}
                      </motion.div>
                      <div className="flex-1 relative z-10">
                        <div className="font-medium">{link.text}</div>
                        <div className="text-xs text-white/60">{link.description}</div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                  </Link>
                </motion.div>
              ))}
              </div>
            </div>
          </motion.div>

          {/* Newsletter Section avec effets ultra-sophistiqués */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative group"
            onMouseEnter={() => setHoveredSection('newsletter')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Effet de halo au hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-500/10 via-primary-500/15 to-accent-500/10 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 blur-xl"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.4 }}
            />

            <div className={cn(
              "glass-strong rounded-2xl p-6 space-y-6 transition-all duration-500",
              "border border-white/10 hover:border-accent-400/30",
              "hover:shadow-lg hover:shadow-accent-500/20"
            )}>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-accent-200 flex items-center justify-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                  Newsletter
                  {hoveredSection === 'newsletter' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sparkles size={16} className="text-accent-300" />
                    </motion.div>
                  )}
                </h3>
                <p className="text-white/80 mb-6">
              Recevez nos dernières actualités et mises à jour directement dans votre boîte mail.
            </p>
              </div>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative group/input">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-all duration-300 blur-sm"
                    whileFocus={{ opacity: 1 }}
                  />
              <input
                type="email"
                placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                    className="relative w-full px-4 py-3 glass border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:glass-strong transition-all duration-300 hover:border-accent-400/40"
                required
                    disabled={isSubmitting}
              />
              </div>
                
              <motion.button
                type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full text-white font-semibold py-3 rounded-xl",
                    "transition-all duration-300 relative overflow-hidden",
                    "group/submit disabled:opacity-50",
                    "gradient-button from-[var(--accent-500)] to-[var(--accent-600)]",
                    "shadow-[var(--accent-500)]/30",
                    "hover:shadow-[var(--accent-500)]/50"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
              >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/submit:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                    )}
                    <span>{isSubmitting ? 'Envoi...' : "S'abonner"}</span>
                  </div>
              </motion.button>
            </form>

              {/* Avantages de la newsletter */}
              <div className="pt-4 border-t border-white/20">
                <div className="space-y-2">
                  {[
                    "Actualités exclusives",
                    "Conseils d'experts",
                    "Offres spéciales"
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 text-sm text-white/80"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <Sparkles size={12} className="text-accent-300" />
                      </motion.div>
                      {benefit}
                    </motion.div>
                  ))}
                </div>
              </div>
          </div>
        </motion.div>

          {/* Section de contrôle du thème avec design amélioré */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative group col-span-full"
          >
            {/* Effet de halo au hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-500/10 via-primary-500/15 to-accent-500/10 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 blur-xl"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.4 }}
            />

            {/* Particules décoratives */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Particules flottantes */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`theme-particle-${i}`}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 15}%`,
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                  }}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.5, 1],
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}

              {/* Étoiles scintillantes */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`theme-star-${i}`}
                  className="absolute"
                  style={{
                    top: `${30 + i * 20}%`,
                    right: `${15 + i * 20}%`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                >
                  <Sparkles className="w-3 h-3 text-accent-300/40" />
                </motion.div>
              ))}

              {/* Effet de vague */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-accent-500/5 to-transparent"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className={cn(
              "glass-strong rounded-2xl transition-all duration-300 relative",
              "border border-white/10 hover:border-accent-400/30",
              "hover:shadow-lg hover:shadow-accent-500/20",
              "backdrop-blur-xl"
            )}>
              {/* Effet de brillance animé */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatDelay: 5
                }}
              />

              {/* En-tête de la section avec décorations */}
              <div className="p-6 border-b border-white/10 relative">
                {/* Ligne décorative */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="p-2 rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-accent-300 relative overflow-hidden group/icon"
                    >
                      {/* Effet de brillance sur l'icône */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/icon:opacity-100"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <Palette className="w-5 h-5 relative z-10" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Personnalisation</h3>
                      <p className="text-sm text-white/70">Adaptez l'interface à votre style</p>
                    </div>
                  </div>
                  
                  {/* Toggle mode sombre/clair amélioré */}
                  <motion.button
                    onClick={() => toggleDarkMode()}
                    className={cn(
                      "relative p-3 rounded-xl transition-all duration-300 overflow-hidden",
                      "glass hover:glass-strong",
                      "border border-white/10 hover:border-accent-400/30",
                      "group/toggle"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Effet de brillance au hover */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/toggle:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <div className="relative z-10 flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: currentTheme.isDark ? 360 : 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                      >
                        {/* Halo lumineux derrière l'icône */}
                        <div className={cn(
                          "absolute inset-0 rounded-full blur-sm",
                          currentTheme.isDark ? "bg-blue-300/30" : "bg-yellow-300/30"
                        )} />
                        {currentTheme.isDark ? (
                          <Moon className="w-5 h-5 text-blue-300" />
                        ) : (
                          <Sun className="w-5 h-5 text-yellow-300" />
                        )}
                      </motion.div>
                      <span className="text-sm font-medium text-white">
                        {currentTheme.isDark ? 'Mode sombre' : 'Mode clair'}
                      </span>
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Section du ColorPicker avec mise en page améliorée */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-accent-300" />
                    </motion.div>
                    <span className="text-sm font-medium text-white">Thème actuel : {currentTheme.name}</span>
                  </div>
                </div>

                {/* ColorPicker avec style amélioré */}
                <div className="relative group/picker">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-xl opacity-0 group-hover/picker:opacity-100 transition-all duration-300 blur-sm"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <ColorPicker
                    color={`var(--${currentTheme.primary}-500)`}
                    label="Choisir un thème"
                    className={cn(
                      "glass hover:glass-strong transition-all duration-300",
                      "border border-white/10 hover:border-accent-400/30",
                      "rounded-xl overflow-hidden",
                      "shadow-lg shadow-accent-500/10 hover:shadow-accent-500/20"
                    )}
                  />
                </div>

                {/* Message d'aide avec animation */}
                <motion.p 
                  className="text-sm text-white/60 mt-4 flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Info className="w-4 h-4" />
                  Cliquez sur une couleur pour l'appliquer au thème
                </motion.p>
              </div>

              {/* Ligne décorative du bas */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Section Copyright avec séparateur sophistiqué */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative mt-12 pt-8"
        >
          {/* Séparateur décoratif sophistiqué */}
          <div className="relative mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            {/* Points décoratifs animés */}
            <div className="flex justify-center -mt-1">
              <div className={cn(
                "flex space-x-2 px-4 rounded-full",
                "bg-[var(--primary-700)]"
              )}>
                {[0, 0.3, 0.6].map((delay, index) => (
                  <motion.div 
                    key={index}
                    className="w-2 h-2 bg-accent-300 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, delay, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
            <motion.p 
              className="text-white/90 text-lg glass px-6 py-3 rounded-full border border-white/20 hover:border-accent-400/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            > 
              © {new Date().getFullYear()} <span className="font-medium text-white bg-gradient-to-r from-white to-accent-200 bg-clip-text text-transparent">MyApp</span> - Tous droits réservés
            </motion.p>
          
          <div className="flex items-center gap-6">
              {[
                { href: "/privacy", text: "Confidentialité" },
                { href: "/terms", text: "Conditions d'utilisation" },
                { href: "/cookies", text: "Cookies" }
              ].map((link) => (
                <motion.div key={link.href} whileHover={{ scale: 1.05 }}>
                  <Link 
                    href={link.href} 
                    className="text-white/80 hover:text-white text-sm transition-colors duration-300 relative group/footer-link"
                  >
                    <span className="relative z-10">{link.text}</span>
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-400 to-primary-400 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 