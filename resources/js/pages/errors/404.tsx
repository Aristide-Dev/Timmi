import ErrorPage from '@/components/error-page'
import { FileQuestion } from 'lucide-react'

export default function Error404() {
  return (
    <ErrorPage
      code="404"
      title="Page introuvable"
      description="La page que vous recherchez n'existe pas ou a été déplacée. Elle a peut-être été supprimée ou l'URL est incorrecte."
      icon={<FileQuestion className="w-full h-full" />}
      suggestions={[
        "Vérifiez l'orthographe de l'URL",
        "Utilisez la navigation du site pour trouver ce que vous cherchez",
        "Retournez à la page d'accueil",
        "Utilisez la barre de recherche"
      ]}
    />
  )
} 