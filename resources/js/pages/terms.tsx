import { Head } from '@inertiajs/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, Scale, User, CreditCard, Shield, 
  AlertTriangle, CheckCircle, Clock, Mail, Phone, MapPin
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

export default function TermsPage() {
  const animations = useOptimizedAnimations()
  const { isInView } = usePerformanceOptimization()
  const prefersReducedMotion = useReducedMotion()

  // Données structurées pour le SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Conditions Générales d'Utilisation - TIMMI",
    "description": "Consultez les conditions générales d'utilisation de la plateforme TIMMI pour les cours particuliers.",
    "url": typeof window !== 'undefined' ? window.location.origin + '/terms' : '',
    "dateModified": "2024-01-01",
    "publisher": {
      "@type": "Organization",
      "name": "TIMMI",
      "url": typeof window !== 'undefined' ? window.location.origin : ''
    }
  }

  const termsSections = [
    {
      id: 'introduction',
      title: 'Article 1 - Objet et champ d\'application',
      icon: FileText,
      color: 'bg-[color:var(--primary-500)]',
      content: `Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation de la plateforme TIMMI, service de mise en relation entre parents, étudiants et professeurs particuliers.

**Objet :**
TIMMI est une plateforme numérique permettant la mise en relation entre :
- Des parents cherchant des cours particuliers pour leurs enfants
- Des étudiants souhaitant prendre des cours directement
- Des professeurs qualifiés proposant leurs services

**Champ d'application :**
Ces CGU s'appliquent à tous les utilisateurs de la plateforme TIMMI, qu'ils soient parents, étudiants ou professeurs. L'utilisation de la plateforme implique l'acceptation pleine et entière des présentes conditions.

**Modifications :**
TIMMI se réserve le droit de modifier ces CGU à tout moment. Les utilisateurs seront informés des modifications par email ou via la plateforme. La poursuite de l'utilisation vaut acceptation des nouvelles conditions.

**Dernière mise à jour :** 1er janvier 2024`
    },
    {
      id: 'definitions',
      title: 'Article 2 - Définitions',
      icon: Scale,
      color: 'bg-[color:var(--accent-500)]',
      content: `**Plateforme :** Site web et application mobile TIMMI
**Utilisateur :** Toute personne utilisant la plateforme
**Parent :** Utilisateur inscrit pour ses enfants
**Étudiant :** Utilisateur inscrit pour lui-même
**Professeur :** Utilisateur proposant des cours
**Cours :** Session d'enseignement d'une durée déterminée
**Réservation :** Engagement contractuel pour un cours
**Paiement :** Transaction financière liée à un cours

**Services :**
- Mise en relation entre utilisateurs
- Gestion des réservations
- Traitement des paiements
- Suivi des cours
- Système d'évaluation

**Contenu :**
- Profils utilisateurs
- Avis et évaluations
- Messages et communications
- Documents partagés`
    },
    {
      id: 'registration',
      title: 'Article 3 - Inscription et compte utilisateur',
      icon: User,
      color: 'bg-[color:var(--primary-600)]',
      content: `**Conditions d'inscription :**
- Être âgé d'au moins 16 ans (ou avec autorisation parentale)
- Fournir des informations exactes et complètes
- Accepter les présentes CGU et la politique de confidentialité
- Respecter les lois et réglementations applicables

**Informations requises :**
- Nom et prénom
- Adresse email valide
- Numéro de téléphone
- Date de naissance
- Informations académiques (pour les professeurs)

**Vérification :**
- Vérification de l'email par confirmation
- Validation des documents (pour les professeurs)
- Contrôle de l'identité si nécessaire

**Responsabilités :**
- Maintenir la confidentialité du compte
- Informer TIMMI de tout changement
- Utiliser le compte personnel uniquement
- Respecter les règles de la plateforme

**Suspension et résiliation :**
TIMMI peut suspendre ou résilier un compte en cas de violation des CGU, d'activité frauduleuse ou de non-paiement.`
    },
    {
      id: 'services',
      title: 'Article 4 - Services proposés',
      icon: CheckCircle,
      color: 'bg-[color:var(--accent-600)]',
      content: `**Mise en relation :**
- Recherche de professeurs par critères
- Filtrage par matière, niveau, localisation
- Affichage des profils et disponibilités
- Système de recommandations

**Réservation :**
- Sélection de créneaux disponibles
- Confirmation des réservations
- Gestion des modifications et annulations
- Notifications automatiques

**Paiement :**
- Traitement sécurisé des transactions
- Support de multiples moyens de paiement
- Gestion des remboursements
- Facturation automatique

**Suivi :**
- Historique des cours
- Statistiques de progression
- Système d'évaluation mutuelle
- Support client

**Limitations :**
- TIMMI n'est pas responsable du contenu des cours
- Les professeurs sont indépendants
- Aucune garantie de résultats scolaires
- Service soumis à disponibilité`
    },
    {
      id: 'pricing',
      title: 'Article 5 - Tarifs et paiements',
      icon: CreditCard,
      color: 'bg-[color:var(--primary-700)]',
      content: `**Tarifs :**
- Tarifs affichés en euros TTC
- Prix variables selon les professeurs
- Packs et promotions disponibles
- Frais de service inclus

**Paiement :**
- Paiement en ligne sécurisé
- Cartes bancaires acceptées
- PayPal et virements possibles
- Paiement immédiat ou différé

**Facturation :**
- Factures automatiques
- Récapitulatif des transactions
- TVA incluse dans le prix
- Conservation des justificatifs

**Remboursements :**
- Annulation jusqu'à 24h avant le cours
- Remboursement sous 5 jours ouvrés
- Frais d'annulation possibles
- Cas de force majeure exclus

**Litiges :**
- Réclamation dans les 30 jours
- Médiation en cas de désaccord
- Recours aux autorités compétentes
- TIMMI s'engage à coopérer`
    },
    {
      id: 'obligations',
      title: 'Article 6 - Obligations des utilisateurs',
      icon: Shield,
      color: 'bg-[color:var(--primary-800)]',
      content: `**Obligations générales :**
- Respecter les lois et réglementations
- Utiliser la plateforme de bonne foi
- Ne pas porter atteinte aux droits d'autrui
- Informer TIMMI de tout dysfonctionnement

**Obligations des parents/étudiants :**
- Fournir des informations exactes
- Respecter les créneaux réservés
- Payer les cours dans les délais
- Évaluer les professeurs de manière objective

**Obligations des professeurs :**
- Justifier de ses compétences
- Respecter les créneaux convenus
- Dispenser des cours de qualité
- Maintenir son profil à jour

**Interdictions :**
- Utilisation frauduleuse de la plateforme
- Harcèlement ou comportement inapproprié
- Publication de contenu illicite
- Tentative de contournement des systèmes

**Sanctions :**
- Avertissement
- Suspension temporaire
- Résiliation du compte
- Signalement aux autorités`
    },
    {
      id: 'liability',
      title: 'Article 7 - Responsabilité et garanties',
      icon: AlertTriangle,
      color: 'bg-[color:var(--accent-400)]',
      content: `**Limitation de responsabilité :**
TIMMI agit en tant qu'intermédiaire et ne peut être tenu responsable :
- Du contenu des cours dispensés
- Des résultats scolaires obtenus
- Des relations entre utilisateurs
- Des dommages indirects

**Garanties :**
- Fonctionnement de la plateforme
- Sécurité des données
- Confidentialité des informations
- Disponibilité du service (sauf cas de force majeure)

**Exclusions :**
- Interruption temporaire pour maintenance
- Problèmes techniques indépendants de TIMMI
- Utilisation non conforme des services
- Force majeure

**Assurance :**
- TIMMI dispose d'une assurance responsabilité civile
- Couverture des dommages causés par la plateforme
- Plafond de garantie selon la police
- Exclusions contractuelles applicables

**Recours :**
- Réclamation auprès du service client
- Médiation par un tiers indépendant
- Recours judiciaire en dernier ressort
- Délai de prescription de 2 ans`
    },
    {
      id: 'intellectual-property',
      title: 'Article 8 - Propriété intellectuelle',
      icon: FileText,
      color: 'bg-[color:var(--accent-500)]',
      content: `**Propriété de TIMMI :**
- Marque et logo TIMMI
- Code source de la plateforme
- Design et interface utilisateur
- Base de données et algorithmes

**Droits d'utilisation :**
- Licence d'utilisation non exclusive
- Usage personnel uniquement
- Interdiction de reproduction
- Respect des droits d'auteur

**Contenu utilisateur :**
- Les utilisateurs conservent leurs droits
- Licence d'utilisation accordée à TIMMI
- Utilisation pour le fonctionnement du service
- Suppression possible à tout moment

**Marques tierces :**
- Respect des droits de propriété intellectuelle
- Signalement des violations
- Coopération avec les ayants droit
- Retrait du contenu litigieux

**Protection :**
- Surveillance des violations
- Action en contrefaçon
- Signalement aux autorités
- Indemnisation des préjudices`
    },
    {
      id: 'data-protection',
      title: 'Article 9 - Protection des données',
      icon: Shield,
      color: 'bg-[color:var(--primary-400)]',
      content: `**Conformité RGPD :**
- Respect du règlement européen
- Droit à l'information
- Consentement éclairé
- Droits des personnes concernées

**Collecte de données :**
- Données nécessaires au service
- Consentement explicite
- Finalité déterminée
- Conservation limitée

**Utilisation des données :**
- Fourniture du service
- Amélioration de la plateforme
- Communication avec les utilisateurs
- Obligations légales

**Sécurité :**
- Chiffrement des données
- Accès contrôlé
- Audit de sécurité
- Formation du personnel

**Droits des utilisateurs :**
- Accès aux données
- Rectification
- Effacement
- Portabilité
- Opposition

**Transferts internationaux :**
- Garanties appropriées
- Décisions d'adéquation
- Clauses contractuelles
- Consentement si nécessaire`
    },
    {
      id: 'termination',
      title: 'Article 10 - Résiliation',
      icon: Clock,
      color: 'bg-[color:var(--accent-600)]',
      content: `**Résiliation par l'utilisateur :**
- Possible à tout moment
- Désactivation du compte
- Conservation des données selon la loi
- Remboursement des cours non utilisés

**Résiliation par TIMMI :**
- Violation des CGU
- Comportement inapproprié
- Non-paiement
- Activité frauduleuse

**Procédure :**
- Notification par email
- Délai de 15 jours pour régulariser
- Suspension puis résiliation
- Possibilité de recours

**Effets de la résiliation :**
- Fin de l'accès à la plateforme
- Annulation des réservations futures
- Conservation des données légales
- Remboursement selon les conditions

**Conservation des données :**
- Données de facturation : 10 ans
- Données de compte : 3 ans
- Données de communication : 1 an
- Suppression automatique après délai`
    },
    {
      id: 'disputes',
      title: 'Article 11 - Règlement des litiges',
      icon: Scale,
      color: 'bg-[color:var(--primary-500)]',
      content: `**Loi applicable :**
- Droit français
- Tribunaux français compétents
- Langue française
- Monnaie en euros

**Procédure de médiation :**
- Tentative de résolution amiable
- Médiateur indépendant
- Délai de 30 jours
- Coûts partagés

**Arbitrage :**
- Possible par accord mutuel
- Arbitre unique
- Décision définitive
- Exécution forcée

**Recours judiciaire :**
- Tribunal de commerce de Paris
- Procédure accélérée possible
- Dommages-intérêts
- Frais de justice

**Prescription :**
- Délai de 2 ans
- Point de départ : connaissance du dommage
- Suspension possible
- Interruption par action en justice`
    },
    {
      id: 'contact',
      title: 'Article 12 - Contact et informations',
      icon: Mail,
      color: 'bg-[color:var(--accent-700)]',
      content: `**Éditeur :**
TIMMI SAS
123 Rue de l'Éducation
75001 Paris, France
SIRET : 123 456 789 00012
RCS : Paris B 123 456 789

**Directeur de publication :**
M. Jean Dupont
Email : contact@timmi.fr

**Hébergeur :**
OVH SAS
2 rue Kellermann
59100 Roubaix, France

**Délégué à la Protection des Données :**
Email : dpo@timmi.fr
Téléphone : 01 23 45 67 89

**Service client :**
Email : support@timmi.fr
Téléphone : 01 23 45 67 89
Horaires : 9h-18h du lundi au vendredi

**Réclamations :**
Email : reclamations@timmi.fr
Délai de réponse : 48h
Médiation : 30 jours

**Modifications des CGU :**
Notification par email
Acceptation tacite après 30 jours
Version toujours disponible sur le site
Historique des modifications conservé`
    }
  ]

  return (
    <PublicLayout>
      <Head title="Conditions Générales d'Utilisation - TIMMI">
        <meta name="description" content="Consultez les conditions générales d'utilisation de la plateforme TIMMI pour les cours particuliers." />
        <meta name="keywords" content="conditions générales, CGU, TIMMI, cours particuliers, utilisation, plateforme" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Conditions Générales d'Utilisation - TIMMI" />
        <meta property="og:description" content="Consultez les conditions générales d'utilisation de la plateforme TIMMI pour les cours particuliers." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Conditions Générales d'Utilisation - TIMMI" />
        <meta property="twitter:description" content="Consultez les conditions générales d'utilisation de la plateforme TIMMI pour les cours particuliers." />
        
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
                  <Scale className="h-4 w-4" />
                  <span>Conditions légales</span>
                  <div className="h-4 w-px bg-primary/30" />
                  <span className="text-xs opacity-90">CGU</span>
                </Badge>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground mb-6"
                variants={animations.itemVariants}
              >
                Conditions{' '}
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
                  générales
                </motion.span>
                <br />
                d'utilisation
              </motion.h1>

              <motion.p 
                className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
                variants={animations.itemVariants}
              >
                Consultez les conditions générales qui régissent l'utilisation de la plateforme TIMMI. 
                Ces conditions définissent les droits et obligations de tous les utilisateurs.
              </motion.p>

              <motion.div 
                className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"
                variants={animations.itemVariants}
              >
                {[
                  { icon: FileText, text: "Droits et obligations" },
                  { icon: Shield, text: "Protection des données" },
                  { icon: Scale, text: "Règlement des litiges" }
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
                {termsSections.map((section, index) => (
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

        {/* Terms Sections */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
              {termsSections.map((section, index) => (
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
                Des questions sur nos conditions ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Notre équipe juridique est à votre disposition pour clarifier tout point des conditions générales.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Email
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      legal@timmi.fr
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Questions juridiques
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Téléphone
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      01 23 45 67 89
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Support juridique
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-6">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Adresse
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      123 Rue de l'Éducation<br />
                      75001 Paris
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Siège social
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
