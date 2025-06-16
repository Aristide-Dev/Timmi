import { Head } from '@inertiajs/react'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Target, Heart, Zap } from 'lucide-react'
import PublicLayout from '@/layouts/public-layout'
import { PagePropsWithData } from '@/types/global'

interface AboutPageProps extends Record<string, unknown> {
  title: string
}

export default function AboutPage({ title }: PagePropsWithData<AboutPageProps>) {
  return (
    <PublicLayout>
      <Head title={title} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              À propos de <span className="text-primary">MyApp</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nous créons des solutions modernes et innovantes pour améliorer 
              l'expérience utilisateur et simplifier les processus complexes.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Notre Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Développer des technologies accessibles et intuitives qui 
                  permettent à chacun de réaliser son potentiel.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Nos Valeurs
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Transparence, innovation et respect de l'utilisateur 
                  sont au cœur de tout ce que nous entreprenons.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Notre Équipe
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Une équipe passionnée de développeurs, designers et 
                  experts métier unis par la même vision.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Innovation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nous adoptons les dernières technologies pour créer 
                  des solutions performantes et durables.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
            <CardContent className="p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Notre Histoire
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Fondée en 2024, MyApp est née de la volonté de créer des outils 
                  numériques qui mettent vraiment l'utilisateur au centre. Nous croyons 
                  qu'une bonne technologie doit être invisible et permettre à chacun 
                  de se concentrer sur ce qui compte vraiment.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Aujourd'hui, nous continuons d'innover avec des technologies modernes 
                  comme Laravel 12, React 19 et Tailwind CSS pour offrir des expériences 
                  utilisateur exceptionnelles.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
} 