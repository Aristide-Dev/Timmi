import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Trash2, Eye } from 'lucide-react'
import PublicLayout from '@/layouts/public-layout'
import { PagePropsWithData } from '@/types/global'
import { useFavorites } from '@/hooks/use-favorites'
import { formatDate } from '@/lib/utils'

interface FavoritesPageProps extends Record<string, unknown> {
  title: string
}

export default function FavoritesPage({ title }: PagePropsWithData<FavoritesPageProps>) {
  const { 
    removeFromFavorites, 
    clearFavorites, 
    getFavoritesByType, 
    favoritesCount 
  } = useFavorites()

  return (
    <PublicLayout>
      <Head title={title} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mes Favoris</h1>
                <p className="text-gray-600">
                  {favoritesCount > 0 
                    ? `${favoritesCount} élément${favoritesCount > 1 ? 's' : ''} dans vos favoris`
                    : 'Aucun favori pour le moment'
                  }
                </p>
              </div>
            </div>
            
            {favoritesCount > 0 && (
              <Button 
                variant="outline" 
                onClick={clearFavorites}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Tout supprimer
              </Button>
            )}
          </div>

          {/* Empty State */}
          {favoritesCount === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun favori
                </h3>
                <p className="text-gray-600 mb-6">
                  Vous n'avez pas encore ajouté d'éléments à vos favoris.
                  Explorez notre contenu et cliquez sur ❤️ pour sauvegarder vos préférés !
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <a href="/articles">Découvrir les articles</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/services">Voir les services</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Favorites by Type */}
          {favoritesCount > 0 && (
            <div className="space-y-8">
              {/* Articles */}
              {getFavoritesByType('article').length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Articles</h2>
                    <Badge variant="secondary">
                      {getFavoritesByType('article').length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFavoritesByType('article').map((favorite) => (
                      <Card key={`${favorite.type}-${favorite.id}`} className="group hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <Badge variant="outline">Article</Badge>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeFromFavorites(favorite.id, favorite.type)}
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                          <CardTitle className="text-lg line-clamp-2">
                            {favorite.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                              Ajouté le {formatDate(favorite.addedAt, { 
                                day: 'numeric', 
                                month: 'short' 
                              })}
                            </p>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              Voir
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              {getFavoritesByType('service').length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Services</h2>
                    <Badge variant="secondary">
                      {getFavoritesByType('service').length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFavoritesByType('service').map((favorite) => (
                      <Card key={`${favorite.type}-${favorite.id}`} className="group hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">Service</Badge>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeFromFavorites(favorite.id, favorite.type)}
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                          <CardTitle className="text-lg line-clamp-2">
                            {favorite.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                              Ajouté le {formatDate(favorite.addedAt, { 
                                day: 'numeric', 
                                month: 'short' 
                              })}
                            </p>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              Voir
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              {getFavoritesByType('content').length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Contenu</h2>
                    <Badge variant="secondary">
                      {getFavoritesByType('content').length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFavoritesByType('content').map((favorite) => (
                      <Card key={`${favorite.type}-${favorite.id}`} className="group hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <Badge variant="outline" className="bg-green-50 text-green-700">Contenu</Badge>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeFromFavorites(favorite.id, favorite.type)}
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                          <CardTitle className="text-lg line-clamp-2">
                            {favorite.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                              Ajouté le {formatDate(favorite.addedAt, { 
                                day: 'numeric', 
                                month: 'short' 
                              })}
                            </p>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              Voir
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
} 