import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, X, Star, Zap, Crown, Users, Clock, Shield, Award } from 'lucide-react'
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
          staggerChildren: prefersReducedMotion ? 0 : 0.1,
          duration: prefersReducedMotion ? 0.3 : 0.6
        }
      }
    },
    
    itemVariants: {
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: prefersReducedMotion ? 0.3 : 0.5,
          ease: [0.25, 0.46, 0.45, 0.94] as const
        }
      }
    },
    
    cardVariants: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: prefersReducedMotion ? 0.3 : 0.6,
          ease: [0.25, 0.46, 0.45, 0.94] as const
        }
      }
    }
  }), [prefersReducedMotion])
}

// Hook pour gérer la performance
const usePerformanceOptimization = () => {
  const [isInView, setIsInView] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true)
      setShouldAnimate(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return { isInView, shouldAnimate }
}

export default function PricingPage() {
  const animations = useOptimizedAnimations()
  const { isInView, shouldAnimate } = usePerformanceOptimization()
  const prefersReducedMotion = useReducedMotion()

  // Données structurées pour le SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "TIMMI - Tarifs des Cours Particuliers",
    "description": "Découvrez nos tarifs transparents pour les cours particuliers. Pas de frais cachés, paiement sécurisé.",
    "url": typeof window !== 'undefined' ? window.location.origin + '/pricing' : '',
    "offers": [
      {
        "@type": "Offer",
        "name": "Cours à l'unité",
        "price": "25",
        "priceCurrency": "EUR",
        "description": "Payez uniquement les cours que vous prenez"
      },
      {
        "@type": "Offer", 
        "name": "Pack 5 cours",
        "price": "115",
        "priceCurrency": "EUR",
        "description": "Économisez 10GNF avec notre pack de 5 cours"
      },
      {
        "@type": "Offer",
        "name": "Pack 10 cours", 
        "price": "220",
        "priceCurrency": "EUR",
        "description": "Économisez 30GNF avec notre pack de 10 cours"
      }
    ]
  }

  const pricingPlans = [
    {
      id: 'single',
      name: 'Cours à l\'unité',
      description: 'Parfait pour essayer ou des besoins ponctuels',
      price: '25GNF',
      period: 'par cours',
      icon: Clock,
      color: 'bg-blue-500',
      popular: false,
      features: [
        'Cours d\'1h avec professeur qualifié',
        'Toutes matières disponibles',
        'Tous niveaux (primaire à supérieur)',
        'Réservation flexible',
        'Paiement sécurisé',
        'Support client inclus'
      ],
      limitations: [
        'Pas de réduction de volume'
      ],
      cta: 'Réserver un cours',
      ctaLink: '/search/teachers'
    },
    {
      id: 'pack5',
      name: 'Pack 5 cours',
      description: 'Idéal pour un suivi régulier sur quelques semaines',
      price: '115GNF',
      period: '5 cours',
      originalPrice: '125GNF',
      savings: '10GNF d\'économies',
      icon: Users,
      color: 'bg-green-500',
      popular: true,
      features: [
        '5 cours d\'1h chacun',
        'Toutes matières disponibles',
        'Tous niveaux (primaire à supérieur)',
        'Réservation flexible',
        'Paiement sécurisé',
        'Support client prioritaire',
        'Historique des cours'
      ],
      limitations: [],
      cta: 'Choisir ce pack',
      ctaLink: '/search/teachers?pack=5'
    },
    {
      id: 'pack10',
      name: 'Pack 10 cours',
      description: 'Le plus économique pour un suivi à long terme',
      price: '220GNF',
      period: '10 cours',
      originalPrice: '250GNF',
      savings: '30GNF d\'économies',
      icon: Crown,
      color: 'bg-purple-500',
      popular: false,
      features: [
        '10 cours d\'1h chacun',
        'Toutes matières disponibles',
        'Tous niveaux (primaire à supérieur)',
        'Réservation flexible',
        'Paiement sécurisé',
        'Support client prioritaire',
        'Historique des cours',
        'Statistiques de progression',
        'Rapport mensuel personnalisé'
      ],
      limitations: [],
      cta: 'Choisir ce pack',
      ctaLink: '/search/teachers?pack=10'
    }
  ]

  const additionalInfo = [
    {
      icon: Shield,
      title: 'Paiement 100% sécurisé',
      description: 'Vos données bancaires sont protégées par un cryptage SSL 256 bits'
    },
    {
      icon: Clock,
      title: 'Annulation gratuite',
      description: 'Annulez ou reportez vos cours jusqu\'à 24h avant sans frais'
    },
    {
      icon: Award,
      title: 'Satisfaction garantie',
      description: 'Si vous n\'êtes pas satisfait, nous vous remboursons intégralement'
    }
  ]

  return (
    <PublicLayout>
      <Head title="Tarifs - TIMMI - Professeurs Particuliers">
        <meta name="description" content="Découvrez nos tarifs transparents pour les cours particuliers. Pas de frais cachés, paiement sécurisé. Packs économiques disponibles." />
        <meta name="keywords" content="tarifs cours particuliers, prix soutien scolaire, packs cours, économies, TIMMI" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tarifs - TIMMI - Professeurs Particuliers" />
        <meta property="og:description" content="Découvrez nos tarifs transparents pour les cours particuliers. Pas de frais cachés, paiement sécurisé." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Tarifs - TIMMI - Professeurs Particuliers" />
        <meta property="twitter:description" content="Découvrez nos tarifs transparents pour les cours particuliers. Pas de frais cachés, paiement sécurisé." />
        
        {/* Données structurées */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
          
          <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            variants={animations.containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="text-center max-w-4xl mx-auto">
              <motion.div variants={animations.itemVariants}>
                <Badge 
                  variant="secondary" 
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300 px-4 py-2 text-sm font-medium mb-6"
                >
                  <Zap className="h-4 w-4" />
                  <span>Tarifs transparents</span>
                  <div className="h-4 w-px bg-primary/30" />
                  <span className="text-xs opacity-90">Sans frais cachés</span>
                </Badge>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground mb-6"
                variants={animations.itemVariants}
              >
                Des tarifs{' '}
                <motion.span 
                  className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary inline-block"
                  animate={prefersReducedMotion ? {} : { 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                >
                  transparents
                </motion.span>
                <br />
                pour tous
              </motion.h1>

              <motion.p 
                className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
                variants={animations.itemVariants}
              >
                Choisissez la formule qui vous convient le mieux. 
                Pas de frais cachés, pas d'engagement, juste des cours de qualité.
              </motion.p>

              <motion.div 
                className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"
                variants={animations.itemVariants}
              >
                {[
                  { icon: Shield, text: "Paiement sécurisé" },
                  { icon: Clock, text: "Annulation gratuite" },
                  { icon: Award, text: "Satisfaction garantie" }
                ].map(({ icon: Icon, text }, index) => (
                  <motion.div
                    key={text}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Choisissez votre formule
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des tarifs adaptés à tous les besoins, du cours ponctuel au suivi régulier
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
                        <Star className="h-3 w-3 mr-1" />
                        Le plus populaire
                      </Badge>
                    </div>
                  )}
                  
                  <Card className={`relative h-full transition-all duration-300 hover:shadow-xl ${
                    plan.popular 
                      ? 'border-primary shadow-lg scale-105' 
                      : 'border-border hover:border-primary/50'
                  }`}>
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <plan.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <CardTitle className="text-2xl font-bold text-foreground">
                        {plan.name}
                      </CardTitle>
                      
                      <CardDescription className="text-muted-foreground">
                        {plan.description}
                      </CardDescription>
                      
                      <div className="mt-4">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-bold text-foreground">
                            {plan.price}
                          </span>
                          <span className="text-muted-foreground">
                            {plan.period}
                          </span>
                        </div>
                        
                        {plan.originalPrice && (
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <span className="text-sm text-muted-foreground line-through">
                              {plan.originalPrice}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {plan.savings}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </li>
                        ))}
                        
                        {plan.limitations.map((limitation, limitationIndex) => (
                          <li key={limitationIndex} className="flex items-start gap-3">
                            <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-primary hover:bg-primary/90' 
                            : 'bg-secondary hover:bg-secondary/90'
                        }`}
                        asChild
                      >
                        <Link href={plan.ctaLink}>
                          {plan.cta}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Information */}
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
                Pourquoi choisir TIMMI ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nous nous engageons à vous offrir la meilleure expérience possible
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {additionalInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {info.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {info.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Questions fréquentes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tout ce que vous devez savoir sur nos tarifs et conditions
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Y a-t-il des frais cachés ?",
                  answer: "Non, nos tarifs sont totalement transparents. Le prix affiché est le prix final que vous payez, sans frais supplémentaires."
                },
                {
                  question: "Puis-je changer de formule à tout moment ?",
                  answer: "Oui, vous pouvez passer d'une formule à l'autre selon vos besoins. Les cours non utilisés sont conservés dans votre compte."
                },
                {
                  question: "Que se passe-t-il si je ne suis pas satisfait ?",
                  answer: "Nous offrons une garantie de satisfaction. Si vous n'êtes pas satisfait de votre premier cours, nous vous remboursons intégralement."
                },
                {
                  question: "Les packs ont-ils une durée de validité ?",
                  answer: "Oui, les packs sont valables 6 mois à partir de la date d'achat. Cela vous laisse le temps de planifier vos cours selon vos disponibilités."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Prêt à commencer ?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Rejoignez des milliers de familles qui font confiance à TIMMI
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="px-8 py-4" asChild>
                  <Link href="/search/teachers">
                    <Users className="h-5 w-5 mr-2" />
                    Trouver un professeur
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="px-8 py-4 border-white text-white hover:bg-white hover:text-primary" asChild>
                  <Link href="/contact">
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
