import ErrorPage from '@/components/error-page'
import { Clock } from 'lucide-react'

export default function Error419() {
  return (
    <ErrorPage
      code="419"
      title="Page expirée"
      description="Votre session a expiré pour des raisons de sécurité. Cette protection évite les attaques par falsification de requête."
      icon={<Clock className="w-full h-full" />}
      suggestions={[
        "Rafraîchissez la page pour obtenir un nouveau token",
        "Reconnectez-vous si nécessaire",
        "Remplissez à nouveau le formulaire",
        "Évitez de laisser la page ouverte trop longtemps"
      ]}
      showRefresh={true}
    />
  )
} 