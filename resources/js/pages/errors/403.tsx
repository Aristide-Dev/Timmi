import ErrorPage from '@/components/error-page'
import { ShieldX } from 'lucide-react'

export default function Error403() {
  return (
    <ErrorPage
      code="403"
      title="Accès interdit"
      description="Vous n'avez pas les permissions nécessaires pour accéder à cette ressource. Cette page est réservée à certains utilisateurs."
      icon={<ShieldX className="w-full h-full" />}
      suggestions={[
        "Vérifiez que vous êtes connecté avec le bon compte",
        "Contactez un administrateur pour demander l'accès",
        "Retournez à la page d'accueil",
        "Vérifiez l'URL de la page"
      ]}
      showContact={true}
    />
  )
} 