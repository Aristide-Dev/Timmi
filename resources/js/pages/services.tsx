import { Head } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, Palette, Zap, Users, Globe, Heart } from 'lucide-react'
import PublicLayout from '@/layouts/public-layout'
import { PagePropsWithData } from '@/types/global'
import { useFavorites } from '@/hooks/use-favorites'

interface ServicesPageProps extends Record<string, unknown> {
  title: string
}

// Données de démonstration
const demoServices = [
  {
    id: 1,
    title: "Développement Web",
    description: "Création d'applications web modernes avec Laravel, React et les dernières technologies.",
    icon: Code,
    price: "À partir de 2 500€",
    features: ["Laravel 12", "React 19", "Tailwind CSS", "Base de données", "API REST"],
    popular: true
  },
  {
    id: 2,
    title: "Design UI/UX",
    description: "Conception d'interfaces utilisateur intuitives et expériences utilisateur optimales.",
    icon: Palette,
    price: "À partir de 1 200€",
    features: ["Maquettes", "Prototypes", "Design System", "Responsive", "Accessibilité"],
    popular: false
  },
  {
    id: 3,
    title: "Optimisation Performance",
    description: "Amélioration des performances de vos applications existantes pour une meilleure UX.",
    icon: Zap,
    price: "À partir de 800€",
    features: ["Audit performance", "Optimisation code", "CDN", "Cache", "Monitoring"],
    popular: false
  },
  {
    id: 4,
    title: "Formation & Support",
    description: "Formation de vos équipes et support technique pour maintenir vos projets.",
    icon: Users,
    price: "Sur devis",
    features: ["Formation Laravel", "Formation React", "Support 24/7", "Documentation", "Maintenance"],
    popular: false
  },
  {
    id: 5,
    title: "Déploiement & Hébergement",
    description: "Configuration serveur, déploiement automatisé et hébergement sécurisé.",
    icon: Globe,
    price: "À partir de 300€/mois",
    features: ["Serveur dédié", "CI/CD", "SSL", "Backups", "Monitoring"],
    popular: false
  }
]

export default function ServicesPage({ title }: PagePropsWithData<ServicesPageProps>) {
  const { toggleFavorite, isFavorite } = useFavorites()

  const handleToggleFavorite = (service: typeof demoServices[0]) => {
    toggleFavorite({
      id: service.id,
      type: 'service',
      title: service.title
    })
  }

  return (
    <PublicLayout>
      <Head title={title} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nos Services
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des solutions sur mesure pour accompagner vos projets digitaux 
              de la conception au déploiement.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoServices.map((service) => {
              const IconComponent = service.icon
              return (
                <Card 
                  key={service.id} 
                  className={`group hover:shadow-lg transition-all duration-200 relative ${
                    service.popular ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white">
                        Populaire
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleToggleFavorite(service)}
                        className="h-8 w-8"
                      >
                        <Heart className={`h-4 w-4 ${
                          isFavorite(service.id, 'service') 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-400 hover:text-red-500'
                        }`} />
                      </Button>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-2xl font-bold text-primary">
                      {service.price}
                    </div>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full group-hover:shadow-md transition-shadow ${
                        service.popular ? 'bg-primary hover:bg-primary/90' : ''
                      }`}
                      variant={service.popular ? 'default' : 'outline'}
                    >
                      Demander un devis
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA Section */}
          <Card className="mt-16 bg-gradient-to-r from-primary to-primary/80 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Un projet en tête ?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Discutons de votre projet ! Nous proposons une consultation gratuite 
                pour analyser vos besoins et vous proposer la meilleure solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Consultation gratuite
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  Voir nos réalisations
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Process Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Notre Processus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Analyse", desc: "Étude de vos besoins" },
                { step: 2, title: "Conception", desc: "Design et architecture" },
                { step: 3, title: "Développement", desc: "Réalisation technique" },
                { step: 4, title: "Livraison", desc: "Tests et mise en ligne" }
              ].map((phase) => (
                <div key={phase.step} className="text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {phase.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {phase.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
} 