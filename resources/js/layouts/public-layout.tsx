import React, { useEffect, useState, useCallback } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { ArrowUp, X, CheckCircle, AlertCircle, AlertTriangle, Info, Sparkles } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicLayoutProps, ExtendedPageProps } from '@/types/global';
import { cn } from '@/lib/utils';
import { PageLoading } from '@/components/ui/loading-spinner';

export default function PublicLayout({ 
  children,
  title = "MyApp - Votre Plateforme Moderne",
  description = "MyApp est une plateforme moderne offrant une expérience utilisateur optimale avec les dernières technologies web. Laravel 12, React 19, TypeScript, Tailwind CSS 4.",
  keywords = "MyApp, plateforme moderne, Laravel 12, React 19, TypeScript, Tailwind CSS 4, application web, services numériques, technologie avancée, France, Paris",
  ogImage = "/images/og-image.jpg",
  canonicalUrl,
  ogType = "website",
  twitterCreator = "@myapp",
  datePublished,
  dateModified,
  articleSection,
  alternateLocales = [],
  itemProps = {},
  seo = {}
}: PublicLayoutProps) {
  const { flash = {}, url } = usePage<ExtendedPageProps>().props;
  
  const [state, setState] = useState({
    showFlash: !!flash?.message,
    showBackToTop: false,
    isMobileMenuOpen: false,
    notifications: [],
    isScrolled: false,
    isLoading: true
  });

  // Sécurisation de l'URL pour éviter les erreurs
  const safeUrl = url || (typeof window !== 'undefined' ? window.location.origin : 'https://myapp.fr');
  const currentUrl = safeUrl;
  
  // Merge des props SEO avec les valeurs par défaut
  const seoConfig = {
    title,
    description,
    keywords,
    ogImage,
    canonicalUrl,
    ogType,
    twitterCreator,
    datePublished,
    dateModified,
    articleSection,
    alternateLocales,
    itemProps,
    ...seo
  };
  
  // Simplification des URLs pour éviter les références à window
  const absoluteImageUrl = seoConfig.ogImage?.startsWith('http') ? seoConfig.ogImage : `${new URL(safeUrl).origin}${seoConfig.ogImage}`;

  const updateState = useCallback((updates: Partial<typeof state>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Gestion optimisée du scroll
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    updateState({
      showBackToTop: scrollTop > 400,
      isScrolled: scrollTop > 50
    });
  }, [updateState]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (flash?.message) {
      updateState({ showFlash: true });
      const timer = setTimeout(() => updateState({ showFlash: false }), 5000);
      return () => clearTimeout(timer);
    }
  }, [flash?.message, updateState]);

  useEffect(() => {
    // Simuler un temps de chargement minimal pour une meilleure UX
    const timer = setTimeout(() => {
      updateState({ isLoading: false });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        {/* Balises meta de base */}
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords} />
        <meta name="author" content="MyApp" />
        <meta charSet="UTF-8" />
        
        {/* Directives pour les robots et les navigateurs */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        
        {/* Métadonnées géographiques et linguistiques */}
        <meta name="language" content="fr" />
        <meta name="geo.region" content="FR" />
        <meta name="geo.placename" content="Paris" />
        <meta name="geo.position" content="48.8566;2.3522" />
        <meta name="ICBM" content="48.8566, 2.3522" />
        
        {/* Métadonnées pour applications mobiles */}
        <meta name="application-name" content="MyApp" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MyApp" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#3b82f6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Sécurité */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Open Graph optimisé */}
        <meta property="og:type" content={seoConfig.ogType} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={seoConfig.title} />
        <meta property="og:description" content={seoConfig.description} />
        <meta property="og:image" content={absoluteImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Logo MyApp - Votre Plateforme Moderne" />
        <meta property="og:site_name" content="MyApp" />
        <meta property="og:locale" content="fr_FR" />
        
        {/* Article metadata pour les pages de contenu */}
        {seoConfig.ogType === 'article' && (
          <>
            <meta property="article:published_time" content={seoConfig.datePublished} />
            <meta property="article:modified_time" content={seoConfig.dateModified} />
            <meta property="article:author" content="MyApp" />
            <meta property="article:publisher" content="MyApp" />
            {seoConfig.articleSection && <meta property="article:section" content={seoConfig.articleSection} />}
            <meta property="article:tag" content="technologie, web, application, Laravel, React" />
          </>
        )}
        
        {/* Twitter Card optimisé */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={seoConfig.title} />
        <meta name="twitter:description" content={seoConfig.description} />
        <meta name="twitter:image" content={absoluteImageUrl} />
        <meta name="twitter:image:alt" content="Logo MyApp - Votre Plateforme Moderne" />
        <meta name="twitter:creator" content={seoConfig.twitterCreator} />
        <meta name="twitter:site" content="@myapp" />
        
        {/* Canonical et langues alternatives */}
        <link rel="canonical" href={seoConfig.canonicalUrl || currentUrl} />
        {seoConfig.alternateLocales.map(({locale, url: localeUrl}) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={localeUrl} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={safeUrl} />
        
        {/* PWA Manifest et icônes */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
        
        {/* Métadonnées Safari */}
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
        
        {/* Métadonnées Windows */}
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Préconnexion aux origines externes */}
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.bunny.net" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Préchargement conditionnel uniquement pour la page d'accueil */}
        {currentUrl.endsWith('/') && (
          <link rel="preload" href="/images/og-image.jpg" as="image" fetchPriority="high" />
        )}
        
        {/* Schema.org JSON-LD amélioré pour l'organisation */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MyApp - Votre Plateforme Moderne",
            "alternateName": ["MyApp", "MyApp Platform"],
            "url": safeUrl,
            "logo": {
              "@type": "ImageObject",
              "url": `${safeUrl}/images/og-image.jpg`,
              "width": 1200,
              "height": 630,
              "caption": "Logo MyApp"
            },
            "description": seoConfig.description,
            "image": absoluteImageUrl,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Rue de la Technologie",
              "addressLocality": "Paris",
              "addressRegion": "Île-de-France",
              "addressCountry": "FR",
              "postalCode": "75001"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+33 1 23 45 67 89",
              "contactType": "customer service",
              "email": "contact@myapp.fr",
              "availableLanguage": ["French"],
              "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            },
            "serviceType": [
              "Plateforme web moderne",
              "Solutions technologiques avancées",
              "Services numériques innovants",
              "Développement d'applications",
              "Consultation technologique"
            ],
            "foundingDate": "2024",
            "keywords": seoConfig.keywords,
            "sameAs": [
              "https://www.facebook.com/myapp",
              "https://twitter.com/myapp",
              "https://www.linkedin.com/company/myapp",
              "https://www.youtube.com/channel/myapp"
            ],
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": currentUrl
            }
          })}
        </script>
        
        {/* Schema.org pour la page web */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": seoConfig.title,
            "description": seoConfig.description,
            "url": currentUrl,
            "image": absoluteImageUrl,
            "publisher": {
              "@type": "Organization",
              "name": "MyApp",
              "logo": {
                "@type": "ImageObject",
                "url": `${safeUrl}/images/og-image.jpg`
              }
            },
            "datePublished": seoConfig.datePublished,
            "dateModified": seoConfig.dateModified,
            "inLanguage": "fr-FR",
            "isPartOf": {
              "@type": "WebSite",
              "name": "MyApp",
              "url": safeUrl
            }
          })}
        </script>

        {/* Schema.org pour le site web */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MyApp - Votre Plateforme Moderne",
            "url": safeUrl,
            "description": seoConfig.description,
            "publisher": {
              "@type": "Organization",
              "name": "MyApp"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${safeUrl}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            },
            "inLanguage": "fr-FR"
          })}
        </script>
      </Head>

      <div className="min-h-screen flex flex-col relative overflow-x-hidden" {...seoConfig.itemProps}>
        {/* Arrière-plan animé avec dégradé amélioré inspiré de Patrimoine-Bati */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 -z-10" />
        
        {/* Particules flottantes décoratives avec performance optimisée */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {[
            { top: '25%', left: '25%', size: 'w-2 h-2', color: 'bg-blue-200/40', delay: 0, duration: 3 },
            { top: '75%', right: '25%', size: 'w-1 h-1', color: 'bg-purple-200/40', delay: 1, duration: 4 },
            { top: '50%', left: '75%', size: 'w-1.5 h-1.5', color: 'bg-pink-200/40', delay: 2, duration: 3.5 },
            { top: '33%', right: '33%', size: 'w-1 h-1', color: 'bg-indigo-200/40', delay: 0.5, duration: 2.5 },
            { top: '60%', left: '10%', size: 'w-1 h-1', color: 'bg-cyan-200/40', delay: 1.5, duration: 3 },
            { top: '15%', right: '15%', size: 'w-1.5 h-1.5', color: 'bg-emerald-200/40', delay: 2.5, duration: 4 }
          ].map((particle, index) => (
            <motion.div 
              key={index}
              className={`absolute ${particle.size} ${particle.color} rounded-full`}
              style={{ 
                top: particle.top, 
                left: particle.left, 
                right: particle.right,
              }}
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1],
                y: [0, -15, 0],
                x: [0, 8, 0]
              }}
              transition={{ 
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Header avec effet glassmorphism */}
        <motion.div 
          className="relative z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
        </motion.div>

        {/* Flash Messages Améliorés avec animations inspirées de Patrimoine-Bati */}
        <AnimatePresence>
          {state.showFlash && flash?.message && (
            <motion.div 
              className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className={`
                max-w-md mx-auto px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20
                ${flash.type === 'success' 
                  ? 'bg-gradient-to-r from-emerald-500/90 to-green-500/90' 
                  : flash.type === 'error'
                  ? 'bg-gradient-to-r from-rose-500/90 to-red-500/90'
                  : flash.type === 'warning'
                  ? 'bg-gradient-to-r from-amber-500/90 to-orange-500/90'
                  : flash.type === 'info'
                  ? 'bg-gradient-to-r from-cyan-500/90 to-blue-500/90'
                  : 'bg-gradient-to-r from-blue-500/90 to-indigo-500/90'
                } text-white relative overflow-hidden
              `}>
                {/* Effet de brillance avec repeatDelay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
                />
                
                {/* Effet de particules dans le flash message */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/30 rounded-full"
                      style={{
                        top: `${15 + i * 25}%`,
                        right: `${8 + i * 20}%`,
                      }}
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1],
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 1.5 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-3">
                    {flash.type === 'success' && <CheckCircle className="w-5 h-5 animate-pulse" />}
                    {flash.type === 'error' && <AlertCircle className="w-5 h-5 animate-pulse" />}
                    {flash.type === 'warning' && <AlertTriangle className="w-5 h-5 animate-pulse" />}
                    {flash.type === 'info' && <Info className="w-5 h-5 animate-pulse" />}
                    {!flash.type && <Sparkles className="w-5 h-5 animate-pulse" />}
                    <div>
                      <p className="font-medium text-sm">{flash.message}</p>
                      {flash.type && (
                        <p className="text-xs opacity-80 capitalize">{flash.type}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => updateState({ showFlash: false })}
                    className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110 ml-4 flex-shrink-0"
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenu principal avec état de chargement */}
        <main 
          className="flex-grow relative z-10 pt-[calc(4rem+var(--top-bar-height,2.5rem))] transition-[padding] duration-300"
          role="main"
          aria-label="Contenu principal"
        >
          <AnimatePresence mode="wait">
            {state.isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[50vh] flex items-center justify-center"
              >
                <PageLoading text="Chargement de la page..." />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                {/* Effet de dégradé subtil au-dessus du contenu */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/60 via-transparent to-transparent pointer-events-none" />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {children}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Bouton retour en haut stylisé et optimisé avec particules internes */}
        <AnimatePresence>
          {state.showBackToTop && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-50"
            >
              <Button
                onClick={scrollToTop}
                className={cn(
                  "p-4 text-white rounded-2xl shadow-2xl",
                  "transition-all duration-300 ease-out",
                  "hover:shadow-[var(--primary-500)]/25 hover:scale-110",
                  "backdrop-blur-sm border border-white/10",
                  "group overflow-hidden w-12 h-12",
                  "bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-800)]",
                  "hover:from-[var(--primary-500)] hover:to-[var(--primary-800)]"
                )}
                aria-label="Retour en haut de la page"
              >
                {/* Effet de hover brillant */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.7 }}
                />
                
                {/* Particules internes dans le bouton */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/40 rounded-full"
                      style={{
                        top: `${25 + i * 25}%`,
                        left: `${20 + i * 30}%`,
                      }}
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
                
                <ArrowUp className="w-6 h-6 relative z-10 transition-transform group-hover:-translate-y-1 group-hover:scale-110" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer avec séparateur stylisé */}
        <div className="relative mt-20">
          {/* Séparateur décoratif */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8" />
          
          {/* Points décoratifs animés */}
          <div className="flex justify-center space-x-2 mb-8">
            {[0, 0.5, 1].map((delay, index) => (
              <motion.div 
                key={index}
                className="w-1 h-1 bg-gray-300 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay, repeat: Infinity }}
              />
            ))}
          </div>
          
          <Footer />
        </div>
      </div>
    </>
  );
} 