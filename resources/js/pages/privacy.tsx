import { Head } from '@inertiajs/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, Lock, Eye, Database, UserCheck, 
  FileText, AlertTriangle, CheckCircle, Clock, Mail
} from 'lucide-react'
import PublicLayout from '@/layouts/public-layout'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

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

export default function PrivacyPage() {
  const animations = useOptimizedAnimations()
  const { isInView, shouldAnimate } = usePerformanceOptimization()
  const prefersReducedMotion = useReducedMotion()

  // Données structurées pour le SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Politique de Confidentialité - TIMMI",
    "description": "Découvrez comment TIMMI protège vos données personnelles et respecte votre vie privée conformément au RGPD.",
    "url": typeof window !== 'undefined' ? window.location.origin + '/privacy' : '',
    "dateModified": "2024-01-01",
    "publisher": {
      "@type": "Organization",
      "name": "TIMMI",
      "url": typeof window !== 'undefined' ? window.location.origin : ''
    }
  }

  const privacySections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: FileText,
      color: 'bg-[color:var(--primary-500)]',
      content: `Chez TIMMI, nous nous engageons à protéger votre vie privée et vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations lorsque vous utilisez notre plateforme de cours particuliers.

Cette politique s'applique à tous les utilisateurs de TIMMI, qu'ils soient parents, étudiants ou professeurs. En utilisant notre service, vous acceptez les pratiques décrites dans cette politique.

Dernière mise à jour : 1er janvier 2024`
    },
    {
      id: 'data-collection',
      title: 'Données que nous collectons',
      icon: Database,
      color: 'bg-[color:var(--accent-500)]',
      content: `Nous collectons différents types de données pour fournir et améliorer notre service :

**Données d'identification :**
- Nom et prénom
- Adresse email
- Numéro de téléphone
- Date de naissance (pour les étudiants)

**Données de profil :**
- Photo de profil (optionnelle)
- Informations académiques (niveau d'études, matières d'intérêt)
- Préférences de localisation
- Objectifs d'apprentissage

**Données de paiement :**
- Informations de facturation
- Historique des transactions
- Méthodes de paiement (sécurisées par nos partenaires)

**Données d'utilisation :**
- Pages visitées et temps passé
- Cours réservés et suivis
- Interactions avec la plateforme
- Avis et évaluations

**Données techniques :**
- Adresse IP
- Type de navigateur et appareil
- Cookies et technologies similaires`
    },
    {
      id: 'data-usage',
      title: 'Utilisation de vos données',
      icon: Eye,
      color: 'bg-[color:var(--primary-600)]',
      content: `Nous utilisons vos données personnelles pour :

**Fournir nos services :**
- Mettre en relation parents, étudiants et professeurs
- Faciliter la réservation et le suivi des cours
- Gérer les paiements et facturations
- Fournir un support client

**Améliorer notre plateforme :**
- Analyser l'utilisation de nos services
- Développer de nouvelles fonctionnalités
- Personnaliser votre expérience utilisateur
- Optimiser les performances

**Communication :**
- Envoyer des notifications importantes
- Informer sur les nouveaux services
- Répondre à vos demandes de support
- Envoyer des newsletters (avec votre consentement)

**Sécurité et conformité :**
- Prévenir la fraude et les abus
- Respecter nos obligations légales
- Protéger nos droits et ceux de nos utilisateurs`
    },
    {
      id: 'data-sharing',
      title: 'Partage de données',
      icon: UserCheck,
      color: 'bg-[color:var(--accent-600)]',
      content: `Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations dans les cas suivants :

**Avec votre consentement :**
- Lorsque vous nous donnez explicitement votre accord
- Pour des fonctionnalités que vous activez volontairement

**Prestataires de services :**
- Processeurs de paiement (Stripe, PayPal)
- Services de communication (email, SMS)
- Hébergement et infrastructure technique
- Services d'analyse (anonymisées)

**Obligations légales :**
- Répondre aux demandes des autorités compétentes
- Respecter les lois et réglementations applicables
- Protéger nos droits et ceux de nos utilisateurs

**Sécurité :**
- Prévenir la fraude et les activités illégales
- Protéger la sécurité de notre plateforme
- Enquêter sur les violations de nos conditions d'utilisation`
    },
    {
      id: 'data-security',
      title: 'Sécurité de vos données',
      icon: Lock,
      color: 'bg-[color:var(--primary-700)]',
      content: `Nous mettons en place des mesures de sécurité robustes pour protéger vos données :

**Chiffrement :**
- Toutes les données sont chiffrées en transit (SSL/TLS)
- Les données sensibles sont chiffrées au repos
- Utilisation de protocoles de chiffrement de niveau bancaire

**Accès contrôlé :**
- Accès limité aux employés autorisés
- Authentification à deux facteurs obligatoire
- Audit régulier des accès et permissions

**Infrastructure sécurisée :**
- Hébergement sur des serveurs certifiés
- Surveillance 24/7 de nos systèmes
- Sauvegardes régulières et sécurisées

**Formation et sensibilisation :**
- Formation régulière de notre équipe
- Politiques de sécurité strictes
- Tests de pénétration réguliers

**Incidents de sécurité :**
- Plan de réponse aux incidents
- Notification rapide en cas de violation
- Mesures correctives immédiates`
    },
    {
      id: 'your-rights',
      title: 'Vos droits',
      icon: CheckCircle,
      color: 'bg-[color:var(--primary-800)]',
      content: `Conformément au RGPD, vous disposez des droits suivants :

**Droit d'accès :**
- Consulter les données que nous détenons sur vous
- Obtenir une copie de vos données personnelles
- Comprendre comment nous les utilisons

**Droit de rectification :**
- Corriger les données inexactes
- Compléter les données incomplètes
- Mettre à jour vos informations

**Droit à l'effacement :**
- Demander la suppression de vos données
- "Droit à l'oubli" dans certaines conditions
- Suppression des données non nécessaires

**Droit à la portabilité :**
- Récupérer vos données dans un format lisible
- Transférer vos données vers un autre service
- Obtenir une copie structurée de vos données

**Droit d'opposition :**
- Vous opposer au traitement de vos données
- Arrêter la réception de communications marketing
- Limiter certains usages de vos données

**Droit de limitation :**
- Limiter le traitement de vos données
- Suspendre certains usages
- Conserver vos données sans les utiliser

Pour exercer ces droits, contactez-nous à privacy@timmi.fr`
    },
    {
      id: 'cookies',
      title: 'Cookies et technologies similaires',
      icon: AlertTriangle,
      color: 'bg-[color:var(--accent-400)]',
      content: `Nous utilisons des cookies et technologies similaires pour améliorer votre expérience :

**Cookies essentiels :**
- Nécessaires au fonctionnement de la plateforme
- Sécurité et authentification
- Préférences de base

**Cookies de performance :**
- Mesure de l'utilisation de la plateforme
- Amélioration des performances
- Statistiques anonymisées

**Cookies de fonctionnalité :**
- Mémorisation de vos préférences
- Personnalisation de l'expérience
- Fonctionnalités avancées

**Cookies de marketing :**
- Publicités ciblées (avec consentement)
- Suivi des campagnes
- Mesure de l'efficacité

Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur ou via notre bannière de cookies.`
    },
    {
      id: 'data-retention',
      title: 'Conservation des données',
      icon: Clock,
      color: 'bg-[color:var(--accent-500)]',
      content: `Nous conservons vos données personnelles aussi longtemps que nécessaire :

**Données de compte :**
- Conservées tant que votre compte est actif
- Suppression dans les 30 jours après fermeture du compte
- Conservation prolongée si requise par la loi

**Données de transaction :**
- Conservées 7 ans pour obligations comptables
- Données de paiement sécurisées selon les standards PCI DSS
- Archivage sécurisé après suppression

**Données de communication :**
- Messages de support : 3 ans
- Emails marketing : jusqu'à désabonnement
- Notifications : 1 an

**Données techniques :**
- Logs de sécurité : 1 an
- Données d'analyse : 2 ans (anonymisées)
- Cookies : selon leur durée de vie

**Suppression automatique :**
- Processus automatisé de suppression
- Vérification manuelle des cas complexes
- Notification de suppression si requise`
    },
    {
      id: 'international-transfers',
      title: 'Transferts internationaux',
      icon: Shield,
      color: 'bg-[color:var(--primary-400)]',
      content: `Vos données peuvent être transférées en dehors de l'Union Européenne :

**Garanties de protection :**
- Décisions d'adéquation de la Commission Européenne
- Clauses contractuelles types approuvées
- Certifications de protection des données

**Pays concernés :**
- États-Unis (avec garanties appropriées)
- Canada (décision d'adéquation)
- Autres pays avec protections équivalentes

**Mesures de sécurité :**
- Chiffrement des données en transit
- Contrats de protection des données
- Audit régulier des partenaires

**Vos droits :**
- Information sur les transferts
- Possibilité de s'opposer
- Recours en cas de problème

Pour plus d'informations sur les transferts, contactez-nous.`
    },
    {
      id: 'children-privacy',
      title: 'Protection des mineurs',
      icon: UserCheck,
      color: 'bg-[color:var(--accent-600)]',
      content: `Nous accordons une attention particulière à la protection des données des mineurs :

**Consentement parental :**
- Autorisation parentale requise pour les moins de 16 ans
- Vérification de l'identité des parents
- Contrôle parental sur les données de l'enfant

**Données collectées :**
- Informations minimales nécessaires
- Pas de données sensibles sans nécessité
- Surveillance renforcée de l'utilisation

**Droits des parents :**
- Accès aux données de leur enfant
- Modification ou suppression des données
- Retrait du consentement à tout moment

**Sécurité renforcée :**
- Mesures de protection supplémentaires
- Surveillance des interactions
- Signalement des comportements inappropriés

**Formation :**
- Sensibilisation de notre équipe
- Procédures spécifiques pour les mineurs
- Collaboration avec les autorités compétentes`
    },
    {
      id: 'contact',
      title: 'Contact et réclamations',
      icon: Mail,
      color: 'bg-[color:var(--primary-500)]',
      content: `Pour toute question concernant cette politique de confidentialité :

**Délégué à la Protection des Données (DPO) :**
- Email : dpo@timmi.fr
- Téléphone : 01 23 45 67 89
- Adresse : 123 Rue de la Protection, 75001 Paris

**Autorité de contrôle :**
- CNIL (Commission Nationale de l'Informatique et des Libertés)
- Site web : www.cnil.fr
- Téléphone : 01 53 73 22 22

**Droit de réclamation :**
- Vous pouvez déposer une réclamation auprès de la CNIL
- Nous nous engageons à coopérer avec les autorités
- Résolution amiable privilégiée

**Mise à jour de la politique :**
- Notification des changements importants
- Version toujours disponible sur notre site
- Historique des modifications conservé

**Questions générales :**
- Email : privacy@timmi.fr
- Support client : support@timmi.fr
- Téléphone : 01 23 45 67 89`
    }
  ]

  return (
    <PublicLayout>
      <Head title="Politique de Confidentialité - TIMMI">
        <meta name="description" content="Découvrez comment TIMMI protège vos données personnelles et respecte votre vie privée conformément au RGPD." />
        <meta name="keywords" content="politique confidentialité, RGPD, protection données, vie privée, TIMMI" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Politique de Confidentialité - TIMMI" />
        <meta property="og:description" content="Découvrez comment TIMMI protège vos données personnelles et respecte votre vie privée conformément au RGPD." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Politique de Confidentialité - TIMMI" />
        <meta property="twitter:description" content="Découvrez comment TIMMI protège vos données personnelles et respecte votre vie privée conformément au RGPD." />
        
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
                  <Shield className="h-4 w-4" />
                  <span>Protection des données</span>
                  <div className="h-4 w-px bg-primary/30" />
                  <span className="text-xs opacity-90">RGPD</span>
                </Badge>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground mb-6"
                variants={animations.itemVariants}
              >
                Politique de{' '}
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
                  confidentialité
                </motion.span>
              </motion.h1>

              <motion.p 
                className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
                variants={animations.itemVariants}
              >
                Chez TIMMI, nous nous engageons à protéger votre vie privée et vos données personnelles. 
                Découvrez comment nous respectons vos droits et sécurisons vos informations.
              </motion.p>

              <motion.div 
                className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"
                variants={animations.itemVariants}
              >
                {[
                  { icon: Shield, text: "Conforme RGPD" },
                  { icon: Lock, text: "Données sécurisées" },
                  { icon: CheckCircle, text: "Vos droits respectés" }
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

        {/* Table of Contents */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Table des matières
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {privacySections.map((section, index) => (
                  <motion.a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-8 h-8 ${section.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <section.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {section.title}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Privacy Sections */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
              {privacySections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${section.color} rounded-full flex items-center justify-center`}>
                          <section.icon className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                          {section.title}
                        </h2>
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="prose prose-gray max-w-none">
                        <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                          {section.content}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Des questions sur vos données ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Notre équipe est là pour vous aider à comprendre vos droits et notre politique de confidentialité.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Email
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      privacy@timmi.fr
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Réponse sous 24h
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      DPO
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      dpo@timmi.fr
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Délégué à la Protection des Données
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}
