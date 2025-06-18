import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, Star, Users, Zap, Globe, 
  FileText, MessageCircle, ChevronRight, Shield, Rocket
} from 'lucide-react'
import PublicLayout from '@/layouts/public-layout'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

// Optimisation des animations avec respect des préférences utilisateur
const useOptimizedAnimations = () => {
  const prefersReducedMotion = useReducedMotion()
  
  return useMemo(() => ({
    // Animations de base respectant les préférences utilisateur
    containerVariants: {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.15,
          duration: prefersReducedMotion ? 0.3 : 0.8
        }
      }
    },
    
    itemVariants: {
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: prefersReducedMotion ? 0.3 : 0.6,
          ease: "easeOut"
        }
      }
    },
    
    // Animations subtiles pour les éléments décoratifs
    particleVariants: prefersReducedMotion ? {} : {
      animate: {
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
        y: [0, -15, 0],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }), [prefersReducedMotion])
}

// Hook pour gérer la performance et le lazy loading
const usePerformanceOptimization = () => {
  const [isInView, setIsInView] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    // Délai pour éviter les animations lors du chargement initial
    const timer = setTimeout(() => {
      setIsInView(true)
      setShouldAnimate(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return { isInView, shouldAnimate }
}

export default function HomePage() {
  const animations = useOptimizedAnimations()
  const { isInView, shouldAnimate } = usePerformanceOptimization()
  const prefersReducedMotion = useReducedMotion()

  // Données structurées pour le SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Application Moderne",
    "description": "Une plateforme moderne et intuitive conçue pour vous offrir la meilleure expérience utilisateur possible.",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser"
  }

  return (
    <PublicLayout>
      <Head title="Accueil - Application Moderne">
        <meta name="description" content="Découvrez notre application moderne et intuitive. Une plateforme conçue pour offrir la meilleure expérience utilisateur avec des fonctionnalités avancées." />
        <meta name="keywords" content="application moderne, plateforme intuitive, expérience utilisateur, technologie avancée" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Application Moderne - Votre nouvelle expérience utilisateur" />
        <meta property="og:description" content="Une plateforme moderne et intuitive conçue pour vous offrir la meilleure expérience utilisateur possible." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Application Moderne - Votre nouvelle expérience utilisateur" />
        <meta property="twitter:description" content="Une plateforme moderne et intuitive conçue pour vous offrir la meilleure expérience utilisateur possible." />
        
        {/* Données structurées */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Preload des ressources critiques */}
        <link rel="preload" as="image" href="/hero-background.webp" />
      </Head>
      
      <div className="min-h-screen bg-background overflow-hidden">
        {/* Hero Section optimisée */}
        <section className="relative min-h-screen flex items-center justify-center py-12 lg:py-20">
          {/* Fond sophistiqué avec dégradé optimisé */}
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-900)]/95 via-[color:var(--primary-800)]/95 to-[color:var(--primary-700)]/95 shadow-2xl border-b border-white/10 opacity-95" />
          
          {/* Texture subtile conditionnelle */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 opacity-20 bg-noise mix-blend-soft-light" />
          )}
          
          {/* Éléments décoratifs optimisés */}
          {shouldAnimate && !prefersReducedMotion && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Particules réduites pour de meilleures performances */}
              {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                  className="absolute rounded-full bg-white/15 blur-sm"
                style={{
                    top: `${20 + i * 8}%`,
                    left: `${10 + i * 10}%`,
                    width: `${4 + Math.random() * 6}px`,
                    height: `${4 + Math.random() * 6}px`,
                  }}
                  {...animations.particleVariants}
                transition={{
                    ...animations.particleVariants.transition,
                    delay: i * 0.8,
                }}
              />
            ))}

              {/* Cercles lumineux optimisés */}
              {[...Array(3)].map((_, i) => (
            <motion.div
                  key={`circle-${i}`}
                  className="absolute rounded-full bg-white/5 blur-xl"
                  style={{
                    width: `${150 + i * 50}px`,
                    height: `${150 + i * 50}px`,
                    top: `${30 + i * 20}%`,
                    left: `${15 + i * 25}%`,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.15, 0.1],
                  }}
              transition={{ 
                    duration: 12 + i * 2,
                repeat: Infinity, 
                    delay: i * 3,
                    ease: "easeInOut"
              }}
            />
              ))}
          </div>
          )}

          <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            variants={animations.containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
              {/* Contenu principal */}
              <motion.div 
                className="lg:col-span-7 space-y-8"
                variants={animations.itemVariants}
              >
                {/* Badge amélioré */}
                <motion.div
                  variants={animations.itemVariants}
                  className="relative"
                >
                  <Badge 
                    variant="secondary" 
                    className="inline-flex items-center gap-2 bg-white/15 text-white border-white/25 hover:bg-white/25 transition-all duration-300 backdrop-blur-md shadow-lg px-4 py-2 text-sm font-medium"
                  >
                    <motion.div
                      animate={prefersReducedMotion ? {} : { rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Star className="h-4 w-4 text-yellow-300" fill="currentColor" />
                    </motion.div>
                    <span>✨ Nouvelle génération</span>
                    <div className="h-4 w-px bg-white/30" />
                    <span className="text-xs opacity-90">Version 2024</span>
                  </Badge>
                </motion.div>

                {/* Titre principal optimisé */}
                <motion.div variants={animations.itemVariants}>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-white">
                    Votre{' '}
                  <motion.span 
                      className="relative text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 inline-block"
                      animate={prefersReducedMotion ? {} : { 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ 
                        duration: 5,
                      repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundSize: '200% 200%'
                      }}
                    >
                      nouvelle
                      {/* Effet de brillance sous le texte */}
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent rounded-full"
                        animate={prefersReducedMotion ? {} : { 
                          opacity: [0.5, 1, 0.5], 
                          scaleX: [0.8, 1.1, 0.8] 
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                  </motion.span>
                    <br />
                    expérience
                  </h1>
                </motion.div>

                {/* Description améliorée */}
                <motion.div variants={animations.itemVariants} className="space-y-4">
                  <p className="text-xl lg:text-2xl text-white/90 max-w-2xl leading-relaxed">
                  Une plateforme moderne et intuitive conçue pour vous offrir 
                  la meilleure expérience utilisateur possible.
                  </p>
                  
                  {/* Points clés */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    {[
                      { icon: Shield, text: "Sécurisé" },
                      { icon: Zap, text: "Ultra-rapide" },
                      { icon: Users, text: "Collaboratif" }
                    ].map(({ icon: Icon, text }, index) => (
                      <motion.div
                        key={text}
                        className="flex items-center gap-2 text-white/80 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <Icon className="h-4 w-4 text-yellow-300" />
                        <span>{text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Boutons d'action améliorés */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  variants={animations.itemVariants}
                >
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/95 group relative overflow-hidden shadow-xl border-0 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                    asChild
                  >
                    <Link href="/dashboard">
                      <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Rocket className="h-5 w-5" />
                        <span>Commencer maintenant</span>
                        <motion.div
                          animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </motion.div>
                      
                      {/* Effet de brillance au hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </Link>
                  </Button>

                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white/30 text-white hover:bg-white/15 hover:border-white/50 group relative overflow-hidden backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300"
                    asChild
                  >
                    <Link href="/demo">
                      <span>Voir la démo</span>
                      <motion.div
                        className="ml-2"
                        animate={prefersReducedMotion ? {} : { rotate: [0, 15, 0] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Globe className="h-5 w-5" />
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>

                {/* Indicateurs de confiance */}
                <motion.div 
                  className="flex items-center gap-6 pt-8 text-white/70"
                  variants={animations.itemVariants}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-300 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm">5.0 (500+ avis)</span>
                  </div>
                  
                  <div className="h-4 w-px bg-white/30" />
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">10k+ utilisateurs actifs</span>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Carte interactive améliorée */}
              <motion.div 
                className="lg:col-span-5"
                variants={animations.itemVariants}
              >
                <motion.div 
                  className="relative bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 p-8 shadow-2xl hover:bg-white/15 transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Effet de brillance dynamique */}
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  
                  {/* Grille de fonctionnalités */}
                  <div className="grid grid-cols-2 gap-6 h-full min-h-[400px]">
                    {[
                      { 
                        Icon: FileText, 
                        title: "Documentation", 
                        subtitle: "Guides complets",
                        color: "from-blue-400 to-blue-600",
                        delay: 0 
                      },
                      { 
                        Icon: Users, 
                        title: "Communauté", 
                        subtitle: "Support 24/7",
                        color: "from-green-400 to-green-600",
                        delay: 0.1 
                      },
                      { 
                        Icon: MessageCircle, 
                        title: "Assistance", 
                        subtitle: "Chat en direct",
                        color: "from-purple-400 to-purple-600",
                        delay: 0.2 
                      },
                      { 
                        Icon: Globe, 
                        title: "Ressources", 
                        subtitle: "API & Outils",
                        color: "from-orange-400 to-orange-600",
                        delay: 0.3 
                      }
                    ].map(({ Icon, title, subtitle, color, delay }, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/15 rounded-2xl p-6 backdrop-blur-sm border border-white/25 hover:bg-white/25 transition-all duration-300 group relative overflow-hidden flex flex-col justify-center items-center text-center cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + delay, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {/* Gradient de fond au hover */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />
                        
                        {/* Icône avec animation */}
                        <motion.div
                          className="flex items-center justify-center bg-white/20 p-4 rounded-2xl mb-4 group-hover:bg-white/30 transition-colors"
                          animate={prefersReducedMotion ? {} : { 
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            delay: index * 0.5,
                            ease: "easeInOut"
                          }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                        
                        <div className="space-y-1 relative z-10">
                          <h3 className="text-white font-semibold text-lg">{title}</h3>
                          <p className="text-white/70 text-sm">{subtitle}</p>
                        </div>
                        
                        {/* Indicateur d'interaction */}
                        <motion.div
                          className="absolute bottom-3 right-3 bg-white/20 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ChevronRight className="h-4 w-4 text-white" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Indicateur de scroll */}
          {!prefersReducedMotion && (
                <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs uppercase tracking-wider">Découvrez plus</span>
                <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
                </motion.div>
            </motion.div>
          )}
        </section>
      </div>
      
      {/* Styles optimisés */}
      <style>{`
        /* Optimisation des performances avec will-change */
        .motion-safe .animate-element {
          will-change: transform, opacity;
        }
        
        /* Texture de grain optimisée */
        .bg-noise {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0);
          background-size: 24px 24px;
        }
        
        /* Amélioration du contraste pour l'accessibilité */
        @media (prefers-contrast: high) {
          .hero-text {
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
          }
          
          .glass-card {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.4);
          }
        }
        
        /* Responsive optimisé */
        @media (max-width: 640px) {
          .hero-title {
            font-size: 2.5rem;
            line-height: 1.2;
          }
        }
        
        /* Performance : Réduction des animations sur les appareils moins puissants */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Optimisation pour les écrans haute résolution */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .bg-noise {
            background-size: 12px 12px;
          }
        }
      `}</style>
    </PublicLayout>
  )
} 