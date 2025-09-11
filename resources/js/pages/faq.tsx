import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Search, HelpCircle,
  BookOpen, Users, CreditCard, Shield,
  MessageCircle, Mail, Phone,
} from 'lucide-react'
import PublicLayout from '@/layouts/public-layout'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Optimisation des animations
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
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: prefersReducedMotion ? 0.3 : 0.5,
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

export default function FAQPage() {
  const animations = useOptimizedAnimations()
  const { isInView, } = usePerformanceOptimization()
  const prefersReducedMotion = useReducedMotion()
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Données structurées pour le SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Comment fonctionne TIMMI ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TIMMI est une plateforme qui met en relation parents et professeurs particuliers. Vous pouvez rechercher des professeurs par matière, niveau et localisation, puis réserver des cours en ligne."
        }
      },
      {
        "@type": "Question", 
        "name": "Comment réserver un cours ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C'est très simple ! Recherchez un professeur, consultez son profil et ses disponibilités, puis sélectionnez un créneau qui vous convient. Le paiement se fait en ligne de manière sécurisée."
        }
      }
    ]
  }

  const faqCategories = [
    {
      id: 'general',
      title: 'Général',
      icon: HelpCircle,
      color: 'bg-[color:var(--primary-500)]',
      questions: [
        {
          id: 'what-is-timmi',
          question: 'Qu\'est-ce que TIMMI ?',
          answer: 'TIMMI est une plateforme de mise en relation entre parents et professeurs particuliers. Nous facilitons la recherche, la réservation et le paiement de cours particuliers pour tous les niveaux et toutes les matières.'
        },
        {
          id: 'how-it-works',
          question: 'Comment fonctionne la plateforme ?',
          answer: '1. Recherchez un professeur par matière, niveau et localisation\n2. Consultez son profil, ses avis et ses disponibilités\n3. Réservez un créneau qui vous convient\n4. Payez en ligne de manière sécurisée\n5. Suivez vos cours et donnez votre avis'
        },
        {
          id: 'who-can-use',
          question: 'Qui peut utiliser TIMMI ?',
          answer: 'TIMMI s\'adresse aux parents qui cherchent des cours particuliers pour leurs enfants, aux étudiants qui souhaitent prendre des cours directement, et aux professeurs qualifiés qui veulent enseigner.'
        },
        {
          id: 'subjects-available',
          question: 'Quelles matières sont disponibles ?',
          answer: 'Nous proposons toutes les matières scolaires : Mathématiques, Français, Anglais, Physique, Chimie, Histoire, Géographie, Sciences, et bien d\'autres. Chaque professeur peut enseigner plusieurs matières.'
        }
      ]
    },
    {
      id: 'booking',
      title: 'Réservation et Paiement',
      icon: CreditCard,
      color: 'bg-[color:var(--accent-500)]',
      questions: [
        {
          id: 'how-to-book',
          question: 'Comment réserver un cours ?',
          answer: 'C\'est très simple ! Utilisez notre moteur de recherche pour trouver un professeur, consultez son profil et ses créneaux disponibles, puis sélectionnez celui qui vous convient. Le paiement se fait en ligne de manière sécurisée.'
        },
        {
          id: 'payment-methods',
          question: 'Quels sont les moyens de paiement acceptés ?',
          answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, et les virements bancaires. Tous les paiements sont sécurisés par un cryptage SSL 256 bits.'
        },
        {
          id: 'cancellation-policy',
          question: 'Puis-je annuler ou reporter un cours ?',
          answer: 'Oui, vous pouvez annuler ou reporter un cours jusqu\'à 24h avant le début sans frais. Pour les annulations de dernière minute, des frais peuvent s\'appliquer selon les conditions du professeur.'
        },
        {
          id: 'refund-policy',
          question: 'Quelle est votre politique de remboursement ?',
          answer: 'Si vous n\'êtes pas satisfait de votre premier cours, nous vous remboursons intégralement. Pour les autres cas, les remboursements sont traités au cas par cas selon nos conditions générales.'
        }
      ]
    },
    {
      id: 'teachers',
      title: 'Professeurs',
      icon: Users,
      color: 'bg-[color:var(--primary-600)]',
      questions: [
        {
          id: 'teacher-qualification',
          question: 'Comment sont vérifiés les professeurs ?',
          answer: 'Tous nos professeurs sont vérifiés : nous vérifions leurs diplômes, leur expérience et leurs compétences. Ils doivent également passer un entretien et fournir des références avant d\'être acceptés sur la plateforme.'
        },
        {
          id: 'teacher-rating',
          question: 'Comment fonctionne le système d\'avis ?',
          answer: 'Après chaque cours, parents et étudiants peuvent noter le professeur et laisser un commentaire. Ces avis sont publics et aident les autres utilisateurs à faire leur choix.'
        },
        {
          id: 'teacher-availability',
          question: 'Comment connaître les disponibilités d\'un professeur ?',
          answer: 'Chaque professeur met à jour son calendrier en temps réel. Vous pouvez voir ses créneaux disponibles directement sur son profil et réserver en quelques clics.'
        },
        {
          id: 'become-teacher',
          question: 'Comment devenir professeur sur TIMMI ?',
          answer: 'Rendez-vous sur notre page "Devenir professeur", remplissez le formulaire d\'inscription, envoyez vos diplômes et références. Notre équipe examinera votre candidature et vous contactera dans les 48h.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technique et Support',
      icon: Shield,
      color: 'bg-[color:var(--accent-600)]',
      questions: [
        {
          id: 'platform-requirements',
          question: 'Quels sont les prérequis techniques ?',
          answer: 'TIMMI fonctionne sur tous les navigateurs modernes (Chrome, Firefox, Safari, Edge) et sur tous les appareils (ordinateur, tablette, smartphone). Une connexion internet stable est recommandée pour les cours en ligne.'
        },
        {
          id: 'online-classes',
          question: 'Comment se déroulent les cours en ligne ?',
          answer: 'Les cours en ligne se déroulent via notre plateforme intégrée avec vidéo, chat et tableau blanc interactif. Vous recevez un lien de connexion par email avant chaque cours.'
        },
        {
          id: 'data-security',
          question: 'Mes données sont-elles sécurisées ?',
          answer: 'Absolument ! Nous utilisons un cryptage SSL 256 bits pour toutes les données et respectons le RGPD. Vos informations personnelles ne sont jamais partagées avec des tiers sans votre consentement.'
        },
        {
          id: 'contact-support',
          question: 'Comment contacter le support ?',
          answer: 'Vous pouvez nous contacter par email à support@timmi.fr, par téléphone au 01 23 45 67 89, ou via le chat en ligne disponible 7j/7. Notre équipe répond dans les 24h.'
        }
      ]
    }
  ]

  // Filtrer les questions selon le terme de recherche
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return faqCategories

    return faqCategories.map(category => ({
      ...category,
      questions: category.questions.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.questions.length > 0)
  }, [searchTerm])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setExpandedItems([]) // Fermer tous les accordéons lors d'une nouvelle recherche
  }

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <PublicLayout>
      <Head title="FAQ - TIMMI - Questions Fréquentes">
        <meta name="description" content="Trouvez les réponses à vos questions sur TIMMI. FAQ complète sur les cours particuliers, réservations, paiements et plus encore." />
        <meta name="keywords" content="FAQ TIMMI, questions cours particuliers, aide, support, réservations, paiements" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FAQ - TIMMI - Questions Fréquentes" />
        <meta property="og:description" content="Trouvez les réponses à vos questions sur TIMMI. FAQ complète sur les cours particuliers, réservations, paiements et plus encore." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="FAQ - TIMMI - Questions Fréquentes" />
        <meta property="twitter:description" content="Trouvez les réponses à vos questions sur TIMMI. FAQ complète sur les cours particuliers, réservations, paiements et plus encore." />
        
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
                  <HelpCircle className="h-4 w-4" />
                  <span>Centre d'aide</span>
                  <div className="h-4 w-px bg-primary/30" />
                  <span className="text-xs opacity-90">24/7</span>
                </Badge>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground mb-6"
                variants={animations.itemVariants}
              >
                Questions{' '}
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
                  fréquentes
                </motion.span>
              </motion.h1>

              <motion.p 
                className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
                variants={animations.itemVariants}
              >
                Trouvez rapidement les réponses à vos questions sur TIMMI. 
                Si vous ne trouvez pas ce que vous cherchez, notre équipe est là pour vous aider.
              </motion.p>

              {/* Barre de recherche */}
              <motion.div 
                className="max-w-2xl mx-auto relative"
                variants={animations.itemVariants}
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher dans la FAQ..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg border-2 border-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                {searchTerm && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-muted-foreground"
                  >
                    {filteredCategories.reduce((total, cat) => total + cat.questions.length, 0)} résultat(s) trouvé(s)
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredCategories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-muted-foreground mb-6">
                  Essayez avec d'autres mots-clés ou contactez notre support.
                </p>
                <Button onClick={() => setSearchTerm('')}>
                  Effacer la recherche
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-12">
                {filteredCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                        {category.title}
                      </h2>
                      <Badge variant="secondary" className="ml-auto">
                        {category.questions.length} question{category.questions.length > 1 ? 's' : ''}
                      </Badge>
                    </div>

                    <Accordion type="multiple" className="space-y-4">
                      {category.questions.map((faq, faqIndex) => (
                        <motion.div
                          key={faq.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: faqIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <AccordionItem value={faq.id} className="border border-border rounded-lg">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline">
                              <span className="text-left font-medium text-foreground">
                                {faq.question}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4">
                              <div className="text-muted-foreground whitespace-pre-line">
                                {faq.answer}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      ))}
                    </Accordion>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Support Section */}
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
                Vous ne trouvez pas votre réponse ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Notre équipe support est là pour vous aider. Contactez-nous et nous vous répondrons rapidement.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: MessageCircle,
                  title: 'Chat en ligne',
                  description: 'Disponible 7j/7',
                  action: 'Démarrer une conversation',
                  color: 'bg-[color:var(--primary-500)]'
                },
                {
                  icon: Mail,
                  title: 'Email',
                  description: 'support@timmi.fr',
                  action: 'Envoyer un email',
                  color: 'bg-[color:var(--accent-500)]'
                },
                {
                  icon: Phone,
                  title: 'Téléphone',
                  description: '01 23 45 67 89',
                  action: 'Nous appeler',
                  color: 'bg-[color:var(--primary-600)]'
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 ${contact.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <contact.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {contact.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {contact.description}
                      </p>
                      <Button variant="outline" className="w-full">
                        {contact.action}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
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
                Liens utiles
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Accédez rapidement aux pages importantes de notre site
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { title: 'Rechercher un professeur', href: '/search/teachers', icon: Users },
                { title: 'Devenir professeur', href: '/professor/profile', icon: BookOpen },
                { title: 'Nos tarifs', href: '/pricing', icon: CreditCard },
                { title: 'Nous contacter', href: '/contact', icon: MessageCircle }
              ].map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <link.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-medium text-foreground text-sm">
                        {link.title}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}
