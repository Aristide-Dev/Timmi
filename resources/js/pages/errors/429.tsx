import ErrorPage from '@/components/error-page'
import { Timer } from 'lucide-react'

export default function Error429() {
  return (
    <ErrorPage
      code="429"
      title="Trop de requêtes"
      description="Vous avez envoyé trop de requêtes en peu de temps. Veuillez patienter quelques instants avant de réessayer."
      icon={<Timer className="w-full h-full" />}
      suggestions={[
        "Attendez quelques minutes avant de réessayer",
        "Réduisez la fréquence de vos actions",
        "Rafraîchissez la page après un moment",
        "Contactez le support si le problème persiste"
      ]}
      showRefresh={true}
      showContact={true}
    />
  )
} 