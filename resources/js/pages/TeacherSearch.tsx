import { Head } from '@inertiajs/react'
import PublicLayout from '@/layouts/public-layout'
import TeacherSearchComponent from '@/components/TeacherSearchComponent'

export default function TeacherSearchPage() {
  return (
    <PublicLayout>
      <Head title="Recherche de Professeurs - TIMMI">
        <meta name="description" content="Trouvez facilement des professeurs particuliers qualifiés pour vos enfants. Recherche avancée par matière, niveau et localisation." />
        <meta name="keywords" content="professeurs particuliers, cours particuliers, soutien scolaire, recherche professeur, TIMMI" />
      </Head>
      
      <TeacherSearchComponent />
    </PublicLayout>
  )
}
