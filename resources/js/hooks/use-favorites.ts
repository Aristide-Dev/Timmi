import { useLocalStorage } from './use-local-storage'

export interface FavoriteItem {
  id: string | number
  type: 'article' | 'service' | 'content'
  title: string
  image?: string
  addedAt: string
}

/**
 * Hook pour gérer les favoris
 */
export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>('favorites', [])

  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    const newItem: FavoriteItem = {
      ...item,
      addedAt: new Date().toISOString()
    }
    
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === item.id && fav.type === item.type)
      if (exists) return prev
      return [...prev, newItem]
    })
  }

  const removeFromFavorites = (id: string | number, type: FavoriteItem['type']) => {
    setFavorites(prev => prev.filter(fav => !(fav.id === id && fav.type === type)))
  }

  const isFavorite = (id: string | number, type: FavoriteItem['type']) => {
    return favorites.some(fav => fav.id === id && fav.type === type)
  }

  const toggleFavorite = (item: Omit<FavoriteItem, 'addedAt'>) => {
    if (isFavorite(item.id, item.type)) {
      removeFromFavorites(item.id, item.type)
    } else {
      addToFavorites(item)
    }
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  const getFavoritesByType = (type: FavoriteItem['type']) => {
    return favorites.filter(fav => fav.type === type)
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    getFavoritesByType,
    favoritesCount: favorites.length
  }
} 