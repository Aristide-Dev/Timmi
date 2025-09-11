import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowRight, Star, Users, Shield,
  Search, MapPin, BookOpen, GraduationCap, CheckCircle, Calendar
} from 'lucide-react'
import PublicLayout from '@/layouts/public-layout'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import TestimonialsSection from '@/components/TestimonialsSection'
import StatsSection from '@/components/StatsSection'
import SubjectsSection from '@/components/SubjectsSection'

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
          ease: [0.25, 0.46, 0.45, 0.94] as const
        }
      }
    },
    
    // Animations subtiles pour les éléments décoratifs
    particlTIMMIriants: prefersReducedMotion ? {} : {
      animate: {
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
        y: [0, -15, 0],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1] as const
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
    "name": "TIMMI - Plateforme de Professeurs Particuliers",
    "description": "Trouvez facilement des professeurs particuliers qualifiés pour vos enfants. Recherche par matière, niveau et localisation. Paiement sécurisé et suivi des cours.",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser"
  }

  return (
    <PublicLayout>
      <Head title="Accueil - TIMMI - Professeurs Particuliers">
        <meta name="description" content="Trouvez facilement des professeurs particuliers qualifiés pour vos enfants. Recherche par matière, niveau et localisation. Paiement sécurisé et suivi des cours." />
        <meta name="keywords" content="professeurs particuliers, cours particuliers, soutien scolaire, éducation, matières, niveaux, localisation, paiement sécurisé" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TIMMI - Trouvez le Professeur Particulier Idéal" />
        <meta property="og:description" content="Plateforme de mise en relation entre parents et professeurs particuliers. Recherche avancée, paiement sécurisé, suivi des cours." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="TIMMI - Trouvez le Professeur Particulier Idéal" />
        <meta property="twitter:description" content="Plateforme de mise en relation entre parents et professeurs particuliers. Recherche avancée, paiement sécurisé, suivi des cours." />
        
        {/* Données structurées */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Preload des ressources critiques */}
        <link rel="preload" as="image" href="/images/heros/hero-02.jpg" />
      </Head>
      
      <div className="min-h-screen bg-background overflow-hidden">

        <section className="relative min-h-screen flex items-center justify-center py-12 lg:py-20">
          {/* Hero Section optimisée */}
          <div className="absolute min-h-screen h-full w-full bg-[url('/images/heros/hero-02.jpg')] bg-contain md:bg-cover bg-no-repeat bg-fixed"></div>
          {/* Fond sophistiqué avec dégradé optimisé */}
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-900)]/70 via-[color:var(--primary-800)]/70 to-[color:var(--primary-700)]/70 shadow-2xl border-b border-white/10 opacity-95" />
          
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
                  {...animations.particlTIMMIriants}
                transition={{
                    ...animations.particlTIMMIriants.transition,
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
                    ease: [0.4, 0, 0.6, 1] as const
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
                      <Star className="h-4 w-4 text-red-500" fill="currentColor" />
                      <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                      <Star className="h-4 w-4 text-green-500" fill="currentColor" />
                    </motion.div>
                    <div className="h-4 w-px bg-white/30" />
                    <span className="text-xs opacity-90">GUINEE</span>
                  </Badge>
                </motion.div>

                {/* Titre principal optimisé */}
                <motion.div variants={animations.itemVariants}>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-white">
                    Trouvez le{' '}
                  <motion.span 
                      className="relative text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--primary-700)] via-[color:var(--accent-200)] to-[color:var(--primary-900)] inline-block"
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
                      professeur
                      {/* Effet de brillance sous le texte */}
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[color:var(--primary-700)] via-[color:var(--accent-300)]/60 to-transparent rounded-full"
                        animate={prefersReducedMotion ? {} : { 
                          opacity: [0.5, 1, 0.5], 
                          scaleX: [0.8, 1.1, 0.8] 
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: [0.4, 0, 0.6, 1] as const }}
                      />
                  </motion.span>
                    <br />
                    parfait
                  </h1>
                </motion.div>

                {/* Description améliorée */}
                <motion.div variants={animations.itemVariants} className="space-y-4">
                  <p className="text-xl lg:text-2xl text-white/90 max-w-2xl leading-relaxed">
                  Connectez-vous avec des professeurs qualifiés pour donner 
                  le meilleur soutien scolaire à vos enfants.
                  </p>
                  
                  {/* Points clés */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    {[
                      { icon: Shield, text: "Sécurisé" },
                      { icon: MapPin, text: "Localisé" },
                      { icon: BookOpen, text: "Toutes matières" }
                    ].map(({ icon: Icon, text }, index) => (
                      <motion.div
                        key={text}
                        className="flex items-center gap-2 text-white/80 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <Icon className="h-4 w-4 text-[color:var(--accent-300)]" />
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
                    className=" group relative overflow-hidden shadow-xl border-0 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                    asChild
                  >
                    <Link href="/search/teachers">
                      <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Search className="h-5 w-5" />
                        <span>Rechercher un professeur</span>
                        <motion.div
                          animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                            ease: [0.4, 0, 0.6, 1] as const
                          }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </motion.div>
                      
                      {/* Effet de brillance au hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[color:var(--primary-500)]/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </Link>
                  </Button>

                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="hover:text-white border-2 border-white/30 hover:bg-white/15 hover:border-white/50 group relative overflow-hidden backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300"
                    asChild
                  >
                    <Link href="/professor/profile">
                      <span>Devenir professeur</span>
                      <motion.div
                        className="ml-2"
                        animate={prefersReducedMotion ? {} : { rotate: [0, 15, 0] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: [0.4, 0, 0.6, 1] as const
                        }}
                      >
                        <GraduationCap className="h-5 w-5" />
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
                        <Star key={i} className="h-4 w-4 text-[color:var(--accent-400)] fill-current" />
                      ))}
                    </div>
                    <span className="text-sm">4.9/5 (1200+ avis)</span>
                  </div>
                  
                  <div className="h-4 w-px bg-white/30" />
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">500+ professeurs qualifiés</span>
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
                transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.6, 1] as const }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs uppercase tracking-wider">Découvrez plus</span>
                <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
                </motion.div>
            </motion.div>
          )}
        </section>

        {/* Section de recherche de professeurs - Composant moderne */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Trouvez le professeur idéal
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Recherchez par matière, niveau et localisation pour trouver le professeur parfait pour votre enfant
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Recherche avancée
                  </h3>
                  <p className="text-muted-foreground">
                    Utilisez les filtres ci-dessous pour affiner votre recherche
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Matière
                    </label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Sélectionnez une matière" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maths">Mathématiques</SelectItem>
                        <SelectItem value="francais">Français</SelectItem>
                        <SelectItem value="anglais">Anglais</SelectItem>
                        <SelectItem value="physique">Physique</SelectItem>
                        <SelectItem value="chimie">Chimie</SelectItem>
                        <SelectItem value="histoire">Histoire</SelectItem>
                        <SelectItem value="geographie">Géographie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Niveau
                    </label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primaire">Primaire</SelectItem>
                        <SelectItem value="college">Collège</SelectItem>
                        <SelectItem value="lycee">Lycée</SelectItem>
                        <SelectItem value="superieur">Supérieur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Ville
                    </label>
                    <Input placeholder="Votre ville" className="h-12" />
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button size="lg" className="px-8 py-3 text-lg">
                    <Search className="h-5 w-5 mr-2" />
                    Rechercher des professeurs
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Section des matières disponibles - Composant moderne */}
        <SubjectsSection />

        {/* Section Comment ça marche */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                En quelques étapes simples, trouvez et réservez le professeur parfait
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Recherchez",
                  description: "Filtrez par matière, niveau et localisation pour trouver des professeurs qualifiés",
                  icon: Search,
                  color: "bg-gradient-to-br from-[color:var(--primary-500)] to-[color:var(--primary-600)]"
                },
                {
                  step: "2", 
                  title: "Choisissez",
                  description: "Consultez les profils, avis et tarifs pour sélectionner le professeur idéal",
                  icon: CheckCircle,
                  color: "bg-gradient-to-br from-[color:var(--accent-500)] to-[color:var(--accent-600)]"
                },
                {
                  step: "3",
                  title: "Réservez",
                  description: "Sélectionnez un créneau et payez en toute sécurité pour confirmer votre cours",
                  icon: Calendar,
                  color: "bg-gradient-to-br from-[color:var(--primary-600)] to-[color:var(--primary-700)]"
                }
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}>
                      {step.step}
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-background to-muted/50 rounded-full flex items-center justify-center shadow-lg border border-[color:var(--primary-200)]">
                        <step.icon className="h-4 w-4 text-[color:var(--primary-600)]" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Témoignages - Composant moderne */}
        <TestimonialsSection />

        {/* Section Statistiques - Composant moderne */}
        <StatsSection />

        {/* Section CTA Final */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Prêt à commencer ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Rejoignez des milliers de familles qui font confiance à TIMMI pour l'éducation de leurs enfants
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4" asChild>
                  <Link href="/search/teachers">
                    <Search className="h-5 w-5 mr-2" />
                    Trouver un professeur
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="px-8 py-4" asChild>
                  <Link href="/professor/profile">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Devenir professeur
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
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