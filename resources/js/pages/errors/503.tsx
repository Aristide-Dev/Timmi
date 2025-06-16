import ErrorPage from '@/components/error-page'
import { Wrench } from 'lucide-react'

export default function Error503() {
  return (
    <ErrorPage
      code="503"
      title="Service indisponible"
      description="Le service est temporairement indisponible. Nous effectuons une maintenance ou sommes en surcharge. Veuillez réessayer plus tard."
      icon={<Wrench className="w-full h-full" />}
      suggestions={[
        "Attendez quelques minutes et réessayez",
        "Vérifiez nos réseaux sociaux pour les mises à jour",
        "Revenez plus tard quand la maintenance sera terminée",
        "Contactez le support pour plus d'informations"
      ]}
      showRefresh={true}
      showContact={true}
    />
  )
} 