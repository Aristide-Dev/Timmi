import ErrorPage from '@/components/error-page'
import { AlertTriangle } from 'lucide-react'

export default function Error422() {
  return (
    <ErrorPage
      code="422"
      title="Données non valides"
      description="Les données que vous avez soumises contiennent des erreurs de validation. Veuillez corriger les champs en erreur."
      icon={<AlertTriangle className="w-full h-full" />}
      suggestions={[
        "Vérifiez tous les champs du formulaire",
        "Corrigez les erreurs de validation affichées",
        "Assurez-vous que tous les champs requis sont remplis",
        "Respectez le format demandé pour chaque champ"
      ]}
      showRefresh={true}
    />
  )
} 