import { Head } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Calendar, Eye, Heart } from 'lucide-react'
import PublicLayout from '@/layouts/public-layout'
import { PagePropsWithData } from '@/types/global'
import { useFavorites } from '@/hooks/use-favorites'

interface ArticlesPageProps extends Record<string, unknown> {
  title: string
}

// Données de démonstration
const demoArticles = [
  {
    id: 1,
    title: "Guide Complet de Laravel 12",
    excerpt: "Découvrez toutes les nouveautés et améliorations de Laravel 12 avec des exemples pratiques.",
    category: "Développement",
    date: "2024-01-15",
    readTime: "8 min",
    views: 1234
  },
  {
    id: 2,
    title: "React 19 : Les Nouveautés à Connaître",
    excerpt: "Un aperçu des nouvelles fonctionnalités de React 19 et comment les utiliser dans vos projets.",
    category: "Frontend",
    date: "2024-01-12",
    readTime: "6 min",
    views: 892
  },
  {
    id: 3,
    title: "Tailwind CSS 4 Sans Configuration",
    excerpt: "Comment utiliser Tailwind CSS 4 avec ses nouvelles fonctionnalités et sa configuration simplifiée.",
    category: "Design",
    date: "2024-01-10",
    readTime: "5 min",
    views: 756
  },
  {
    id: 4,
    title: "Optimisation des Performances Web",
    excerpt: "Techniques avancées pour améliorer les performances de vos applications web modernes.",
    category: "Performance",
    date: "2024-01-08",
    readTime: "12 min",
    views: 2156
  }
]

export default function ArticlesPage({ title }: PagePropsWithData<ArticlesPageProps>) {
  const { toggleFavorite, isFavorite } = useFavorites()

  const handleToggleFavorite = (article: typeof demoArticles[0]) => {
    toggleFavorite({
      id: article.id,
      type: 'article',
      title: article.title
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
              Articles & Ressources
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez nos derniers articles sur le développement web, 
              les nouvelles technologies et les meilleures pratiques.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoArticles.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleToggleFavorite(article)}
                      className="h-8 w-8"
                    >
                      <Heart className={`h-4 w-4 ${
                        isFavorite(article.id, 'article') 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-400 hover:text-red-500'
                      }`} />
                    </Button>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{article.views.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full group-hover:shadow-md transition-shadow">
                    Lire l'article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Charger plus d'articles
            </Button>
          </div>

          {/* Newsletter CTA */}
          <Card className="mt-16 bg-gradient-to-r from-primary to-primary/80 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Restez informé de nos derniers articles
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Recevez nos meilleurs articles directement dans votre boîte mail. 
                Pas de spam, que du contenu de qualité !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button variant="secondary">
                  S'abonner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
} 