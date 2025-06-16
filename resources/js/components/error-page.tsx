import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Home, RefreshCw, Mail } from 'lucide-react'
import PublicLayout from '@/layouts/public-layout'

interface ErrorPageProps {
  code: string
  title: string
  description: string
  suggestions?: string[]
  showRefresh?: boolean
  showContact?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
}

export default function ErrorPage({
  code,
  title,
  description,
  suggestions = [],
  showRefresh = false,
  showContact = false,
  icon,
  children
}: ErrorPageProps) {
  const handleRefresh = () => {
    window.location.reload()
  }

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  return (
    <PublicLayout>
      <Head title={`Erreur ${code} - ${title}`} />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Code */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-gray-200 mb-4">
              {code}
            </h1>
            {icon && (
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 text-gray-400">
                  {icon}
                </div>
              </div>
            )}
          </div>

          {/* Error Content */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {description}
              </p>

              {/* Custom content */}
              {children && (
                <div className="mb-8">
                  {children}
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Que pouvez-vous faire ?
                  </h3>
                  <ul className="text-left space-y-2 max-w-md mx-auto">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleGoBack} className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Button>
                
                <Button variant="outline" asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Accueil
                  </Link>
                </Button>

                {showRefresh && (
                  <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Actualiser
                  </Button>
                )}

                {showContact && (
                  <Button variant="outline" asChild>
                    <Link href="/contact" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Help */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              Si le problème persiste, n'hésitez pas à{' '}
              <Link href="/contact" className="text-primary hover:underline">
                nous contacter
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
} 