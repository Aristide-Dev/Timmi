import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { 
  Star, Users, Shield, Target, BookOpen, 
  CheckCircle, MapPin, Clock, GraduationCap,
  Search, MessageCircle
} from 'lucide-react'
import PublicLayout from '@/layouts/public-layout'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

// Optimisation des animations avec respect des préférences utilisateur
const useOptimizedAnimations = () => {
  const prefersReducedMotion = useReducedMotion()
  
  return useMemo(() => ({
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
    }
  }), [prefersReducedMotion])
}

// Hook pour gérer la performance et le lazy loading
const usePerformanceOptimization = () => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return { isInView }
}

export default function AboutPage() {
  const animations = useOptimizedAnimations()
  const { isInView } = usePerformanceOptimization()
  const prefersReducedMotion = useReducedMotion()

  // Données structurées pour le SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TIMMI - Plateforme de Professeurs Particuliers",
    "description": "TIMMI simplifie la recherche et la réservation de professeurs particuliers. Trouvez des enseignants qualifiés près de chez vous.",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "foundingDate": "2024"
  }

  return (
    <PublicLayout>
      <Head title="À propos - TIMMI - Professeurs Particuliers">
        <meta name="description" content="Découvrez TIMMI, la plateforme qui simplifie la recherche et la réservation de professeurs particuliers pour vos enfants." />
        <meta name="keywords" content="à propos TIMMI, plateforme éducation, professeurs particuliers, cours particuliers" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="À propos de TIMMI - Professeurs Particuliers" />
        <meta property="og:description" content="Découvrez TIMMI, la plateforme qui simplifie la recherche et la réservation de professeurs particuliers." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="À propos de TIMMI - Professeurs Particuliers" />
        <meta property="twitter:description" content="Découvrez TIMMI, la plateforme qui simplifie la recherche et la réservation de professeurs particuliers." />
        
        {/* Données structurées */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      
      <div className="min-h-screen bg-background">

          {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              variants={animations.containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={animations.itemVariants} className="mb-6">
                <Badge 
                  variant="secondary" 
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300 px-4 py-2 text-sm font-medium"
                >
                  <motion.div
                    animate={prefersReducedMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="h-4 w-4 text-primary" fill="currentColor" />
                  </motion.div>
                  <span>✨ Plateforme éducative</span>
                </Badge>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground mb-6"
                variants={animations.itemVariants}
              >
                À propos de
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary">
                  TIMMI
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                variants={animations.itemVariants}
              >
                La plateforme qui simplifie la recherche et la réservation 
                de professeurs particuliers pour vos enfants.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Section Qu'est-ce que TIMMI */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Qu'est-ce que TIMMI ?</h2>
                </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    TIMMI est une plateforme web innovante conçue pour simplifier la recherche 
                    et la réservation de professeurs particuliers pour vos enfants. Nous connectons 
                    les parents avec des enseignants qualifiés, vérifiés et disponibles près de chez vous.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Recherche localisée</h4>
                        <p className="text-muted-foreground text-sm">Trouvez des professeurs dans votre ville et quartier</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Professeurs vérifiés</h4>
                        <p className="text-muted-foreground text-sm">Tous nos enseignants sont validés et leurs diplômes vérifiés</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Paiement sécurisé</h4>
                        <p className="text-muted-foreground text-sm">Système de paiement intégré avec garantie de satisfaction</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Nos chiffres
                </h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">200+</div>
                        <div className="text-sm text-muted-foreground">Professeurs actifs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">500+</div>
                        <div className="text-sm text-muted-foreground">Familles inscrites</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">1000+</div>
                        <div className="text-sm text-muted-foreground">Cours réservés</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">15+</div>
                        <div className="text-sm text-muted-foreground">Matières disponibles</div>
                      </div>
                    </div>
                  </div>
            </Card>
              </motion.div>
            </div>
                </div>
        </section>

        {/* Section Comment ça marche */}
        <section className="py-16 lg:py-24 bg-muted/30">
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
                En quelques étapes simples, trouvez et réservez le professeur parfait pour votre enfant
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Recherchez",
                  description: "Filtrez par matière, niveau et localisation pour trouver des professeurs qualifiés près de chez vous",
                  icon: Search,
                  color: "bg-[color:var(--primary-500)]"
                },
                {
                  step: "2", 
                  title: "Consultez",
                  description: "Consultez les profils détaillés, avis et tarifs pour sélectionner le professeur idéal",
                  icon: Users,
                  color: "bg-[color:var(--accent-500)]"
                },
                {
                  step: "3",
                  title: "Réservez",
                  description: "Sélectionnez un créneau et payez en toute sécurité pour confirmer votre cours",
                  icon: CheckCircle,
                  color: "bg-[color:var(--primary-600)]"
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
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm">
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto`}>
                        {step.step}
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <step.icon className="h-4 w-4 text-[color:var(--primary-600)]" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </Card>
                </motion.div>
              ))}
            </div>
                </div>
        </section>

        {/* Section Avantages */}
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
                Pourquoi choisir TIMMI ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une plateforme conçue pour répondre aux besoins des familles modernes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Sécurité garantie",
                  description: "Tous nos professeurs sont vérifiés et validés. Paiement sécurisé avec garantie de satisfaction.",
                  color: "bg-[color:var(--primary-500)]"
                },
                {
                  icon: MapPin,
                  title: "Proximité géographique",
                  description: "Trouvez des professeurs dans votre ville et quartier pour éviter les longs déplacements.",
                  color: "bg-[color:var(--accent-500)]"
                },
                {
                  icon: Clock,
                  title: "Flexibilité horaire",
                  description: "Réservez aux créneaux qui vous conviennent, en présentiel ou en ligne selon vos préférences.",
                  color: "bg-[color:var(--primary-600)]"
                },
                {
                  icon: GraduationCap,
                  title: "Expertise pédagogique",
                  description: "Professeurs qualifiés spécialisés par cycle scolaire (primaire, collège, lycée, supérieur).",
                  color: "bg-[color:var(--accent-600)]"
                },
                {
                  icon: Star,
                  title: "Avis authentiques",
                  description: "Consultez les avis vérifiés d'autres parents pour faire le meilleur choix pour votre enfant.",
                  color: "bg-[color:var(--accent-400)]"
                },
                {
                  icon: BookOpen,
                  title: "Toutes les matières",
                  description: "Large choix de matières et niveaux pour répondre à tous les besoins éducatifs de vos enfants.",
                  color: "bg-[color:var(--primary-700)]"
                }
              ].map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                    <div className="text-center space-y-4">
                      <div className={`w-16 h-16 ${advantage.color} rounded-full flex items-center justify-center mx-auto`}>
                        <advantage.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{advantage.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
                    </div>
            </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section CTA */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
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
                Rejoignez les centaines de familles qui font confiance à TIMMI pour l'éducation de leurs enfants
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4" asChild>
                  <Link href="/search/teachers">
                    <Search className="h-5 w-5 mr-2" />
                    Trouver un professeur
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="px-8 py-4" asChild>
                  <Link href="/contact">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </motion.div>
        </div>
        </section>
      </div>
    </PublicLayout>
  )
} 