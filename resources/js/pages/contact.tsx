import { Head, Link } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, 
  Send, CheckCircle, ArrowRight, Users, 
  BookOpen, HelpCircle, Star
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
          staggerChildren: prefersReducedMotion ? 0 : 0.1,
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

export default function ContactPage() {
  const animations = useOptimizedAnimations()
  const { isInView, shouldAnimate } = usePerformanceOptimization()
  const prefersReducedMotion = useReducedMotion()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  })

  // Données structurées pour le SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TIMMI - Contact",
    "description": "Contactez l'équipe TIMMI pour toute question sur nos services de professeurs particuliers.",
    "url": typeof window !== 'undefined' ? window.location.origin + '/contact' : '',
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33 1 23 45 67 89",
      "contactType": "customer service",
      "availableLanguage": "French"
    }
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      description: "Du lundi au vendredi, 9h-18h",
      color: "bg-[color:var(--primary-500)]",
      action: "Appeler maintenant"
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact@timmi.fr",
      description: "Réponse sous 24h",
      color: "bg-[color:var(--accent-500)]",
      action: "Envoyer un email"
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "123 Rue de la Technologie",
      description: "75001 Paris, France",
      color: "bg-[color:var(--primary-600)]",
      action: "Voir sur la carte"
    },
    {
      icon: Clock,
      title: "Horaires",
      value: "Lundi - Vendredi",
      description: "9h - 18h (Weekend fermé)",
      color: "bg-[color:var(--accent-600)]",
      action: "Voir les horaires"
    }
  ]

  const quickLinks = [
    {
      title: "Rechercher un professeur",
      description: "Trouvez le professeur idéal pour vos besoins",
      icon: BookOpen,
      href: "/search/teachers",
      color: "bg-[color:var(--primary-500)]"
    },
    {
      title: "Devenir professeur",
      description: "Rejoignez notre communauté d'enseignants",
      icon: Users,
      href: "/professor/profile",
      color: "bg-[color:var(--accent-500)]"
    },
    {
      title: "FAQ",
      description: "Trouvez des réponses à vos questions",
      icon: HelpCircle,
      href: "/faq",
      color: "bg-[color:var(--primary-600)]"
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique d'envoi du formulaire
    console.log('Formulaire envoyé:', formData)
  }

  return (
    <PublicLayout>
      <Head title="Contact - TIMMI - Professeurs Particuliers">
        <meta name="description" content="Contactez l'équipe TIMMI pour toute question sur nos services de professeurs particuliers. Support client réactif et bienveillant." />
        <meta name="keywords" content="contact TIMMI, support client, aide, questions, professeurs particuliers" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact - TIMMI" />
        <meta property="og:description" content="Contactez l'équipe TIMMI pour toute question sur nos services de professeurs particuliers." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Contact - TIMMI" />
        <meta property="twitter:description" content="Contactez l'équipe TIMMI pour toute question sur nos services de professeurs particuliers." />
        
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
                    <MessageCircle className="h-4 w-4 text-primary" fill="currentColor" />
                  </motion.div>
                  <span>✨ Support TIMMI</span>
                </Badge>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground mb-6"
                variants={animations.itemVariants}
              >
                Contactez
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary">
                  {" "}notre équipe
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                variants={animations.itemVariants}
              >
                Une question sur TIMMI ? Besoin d'aide pour trouver un professeur ? 
                Notre équipe est là pour vous accompagner dans votre recherche.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Section Méthodes de contact */}
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
                Nos moyens de contact
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choisissez le moyen qui vous convient le mieux pour nous joindre
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20 h-full">
                    <div className="space-y-4">
                      <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto`}>
                        <method.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{method.title}</h3>
                      <p className="text-foreground font-medium">{method.value}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        {method.action}
                      </Button>
                    </div>
              </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Formulaire de contact */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Formulaire */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="lg:col-span-2"
                >
                  <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-background to-muted/20">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          Envoyez-nous un message
                        </h3>
                        <p className="text-muted-foreground">
                          Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                          Prénom *
                        </label>
                            <Input 
                              id="firstName" 
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required 
                              className="h-12"
                            />
                      </div>
                      <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                          Nom *
                        </label>
                            <Input 
                              id="lastName" 
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required 
                              className="h-12"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                              Email *
                            </label>
                            <Input 
                              id="email" 
                              name="email"
                              type="email" 
                              value={formData.email}
                              onChange={handleInputChange}
                              required 
                              className="h-12"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                              Téléphone
                            </label>
                            <Input 
                              id="phone" 
                              name="phone"
                              type="tel" 
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="h-12"
                            />
                      </div>
                    </div>

                    <div>
                          <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                            Catégorie *
                      </label>
                          <Select name="category" value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Sélectionnez une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">Question générale</SelectItem>
                              <SelectItem value="student">Étudiant</SelectItem>
                              <SelectItem value="parent">Parent</SelectItem>
                              <SelectItem value="professor">Professeur</SelectItem>
                              <SelectItem value="technical">Support technique</SelectItem>
                              <SelectItem value="billing">Facturation</SelectItem>
                              <SelectItem value="other">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                    </div>

                    <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Sujet *
                      </label>
                          <Input 
                            id="subject" 
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required 
                            className="h-12"
                            placeholder="Résumé de votre demande"
                          />
                    </div>

                    <div>
                          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                          <Textarea 
                        id="message" 
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                        rows={6} 
                        required 
                            placeholder="Décrivez votre demande en détail..."
                            className="resize-none"
                      />
                    </div>

                        <Button type="submit" className="w-full h-12 text-lg" size="lg">
                          <Send className="h-5 w-5 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                    </div>
                  </Card>
                </motion.div>

                {/* Informations et liens rapides */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  {/* Informations de contact */}
                  <Card className="p-6 border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      Informations pratiques
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Réponse sous 24h</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Support multilingue</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Confidentialité garantie</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Support 7j/7</span>
                      </div>
                    </div>
                  </Card>

                  {/* Liens rapides */}
                  <Card className="p-6 border-0 bg-gradient-to-br from-background to-muted/20">
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      Liens rapides
                    </h4>
                    <div className="space-y-3">
                      {quickLinks.map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 group"
                        >
                          <div className={`w-10 h-10 ${link.color} rounded-full flex items-center justify-center`}>
                            <link.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {link.title}
                            </h5>
                            <p className="text-sm text-muted-foreground">{link.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </Card>

                  {/* Témoignage */}
                  <Card className="p-6 border-0 bg-gradient-to-br from-[color:var(--accent-50)] to-[color:var(--accent-100)]">
                    <div className="text-center space-y-3">
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-[color:var(--accent-400)] fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-sm text-muted-foreground italic">
                        "L'équipe TIMMI a été d'une aide précieuse pour trouver le professeur parfait pour mon fils. Service client exceptionnel !"
                      </blockquote>
                      <p className="text-xs text-muted-foreground">- Marie L., Parent satisfait</p>
                    </div>
              </Card>
                </motion.div>
              </div>
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
                Découvrez nos services et trouvez le professeur idéal pour vos besoins éducatifs
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4" asChild>
                  <Link href="/search/teachers">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Rechercher un professeur
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="px-8 py-4" asChild>
                  <Link href="/faq">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Consulter la FAQ
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