import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, AlertTriangle } from 'lucide-react'
import PublicLayout from '@/layouts/public-layout'
import { PagePropsWithData } from '@/types/global'

interface ErrorTestIndexProps extends Record<string, unknown> {
  errors: Record<number, {
    title: string
    description: string
  }>
}

export default function ErrorTestIndex({ errors }: PagePropsWithData<ErrorTestIndexProps>) {
  return (
    <PublicLayout>
      <Head title="Test des Pages d'Erreur" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-orange-500 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900">
                Test des Pages d'Erreur
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Testez toutes les pages d'erreur personnalisées de l'application. 
              Cliquez sur une erreur pour voir sa page correspondante.
            </p>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-yellow-800 mb-1">
                  Attention - Page de développement
                </h3>
                <p className="text-yellow-700 text-sm">
                  Cette page est destinée au développement et aux tests. 
                  Elle ne devrait pas être accessible en production.
                </p>
              </div>
            </div>
          </div>

          {/* Error Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(errors).map(([code, error]) => {
              const statusCode = parseInt(code)
              
              // Déterminer la couleur du badge selon le type d'erreur
              const getBadgeVariant = (code: number) => {
                if (code >= 500) return 'destructive' // Erreurs serveur
                if (code >= 400) return 'secondary'   // Erreurs client
                return 'default'
              }

              // Déterminer l'icône selon le type d'erreur
              const getErrorIcon = (code: number) => {
                if (code === 404) return '🔍'
                if (code === 401 || code === 403) return '🔒'
                if (code === 500) return '💥'
                if (code === 503) return '🔧'
                if (code === 429) return '⏱️'
                if (code === 419) return '⏰'
                return '⚠️'
              }

              return (
                <Card key={code} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={getBadgeVariant(statusCode)}>
                        {code}
                      </Badge>
                      <span className="text-2xl">{getErrorIcon(statusCode)}</span>
                    </div>
                    <CardTitle className="text-lg">
                      {error.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-4">
                      {error.description}
                    </p>
                    
                    <Button 
                      asChild 
                      className="w-full group-hover:shadow-md transition-shadow"
                      variant={statusCode >= 500 ? 'destructive' : 'default'}
                    >
                      <Link 
                        href={`/test-errors/${code}`} 
                        className="flex items-center justify-center gap-2"
                      >
                        Tester l'erreur {code}
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Comment ça fonctionne ?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Chaque lien déclenche une erreur HTTP spécifique qui sera interceptée par 
                  le gestionnaire d'exception Laravel et affichera la page d'erreur React correspondante.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Laravel 12</Badge>
                  <Badge variant="outline">Inertia.js</Badge>
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">shadcn/ui</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
} 