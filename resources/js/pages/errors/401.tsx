import ErrorPage from '@/components/error-page'
import { Lock } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'

export default function Error401() {
  return (
    <ErrorPage
      code="401"
      title="Accès non autorisé"
      description="Vous devez vous connecter pour accéder à cette page. Vos identifiants sont requis pour continuer."
      icon={<Lock className="w-full h-full" />}
      suggestions={[
        "Connectez-vous avec vos identifiants",
        "Vérifiez que votre session n'a pas expiré",
        "Créez un compte si vous n'en avez pas",
        "Contactez l'administrateur si vous pensez que c'est une erreur"
      ]}
      showContact={true}
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/login">Se connecter</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/register">Créer un compte</Link>
        </Button>
      </div>
    </ErrorPage>
  )
} 