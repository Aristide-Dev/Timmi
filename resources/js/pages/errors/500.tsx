import ErrorPage from '@/components/error-page'
import { ServerCrash } from 'lucide-react'

export default function Error500() {
  return (
    <ErrorPage
      code="500"
      title="Erreur serveur interne"
      description="Une erreur inattendue s'est produite sur nos serveurs. Nos équipes techniques ont été automatiquement notifiées."
      icon={<ServerCrash className="w-full h-full" />}
      suggestions={[
        "Rafraîchissez la page dans quelques instants",
        "Essayez de refaire votre action plus tard",
        "Retournez à la page d'accueil",
        "Contactez le support si l'erreur persiste"
      ]}
      showRefresh={true}
      showContact={true}
    />
  )
} 