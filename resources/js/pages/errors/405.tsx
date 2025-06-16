import ErrorPage from '@/components/error-page'
import { Ban } from 'lucide-react'

export default function Error405() {
  return (
    <ErrorPage
      code="405"
      title="Méthode non autorisée"
      description="La méthode HTTP utilisée pour cette requête n'est pas autorisée sur cette ressource."
      icon={<Ban className="w-full h-full" />}
      suggestions={[
        "Rafraîchissez la page et réessayez",
        "Retournez à la page précédente",
        "Utilisez la navigation du site",
        "Contactez le support technique"
      ]}
      showRefresh={true}
      showContact={true}
    />
  )
} 