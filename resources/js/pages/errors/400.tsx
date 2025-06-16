import ErrorPage from '@/components/error-page'
import { AlertCircle } from 'lucide-react'

export default function Error400() {
  return (
    <ErrorPage
      code="400"
      title="Requête incorrecte"
      description="La requête que vous avez envoyée contient des erreurs ou est malformée. Le serveur ne peut pas la traiter."
      icon={<AlertCircle className="w-full h-full" />}
      suggestions={[
        "Vérifiez les données que vous avez saisies",
        "Rafraîchissez la page et réessayez",
        "Assurez-vous que tous les champs requis sont remplis",
        "Contactez le support si le problème persiste"
      ]}
      showRefresh={true}
      showContact={true}
    />
  )
} 