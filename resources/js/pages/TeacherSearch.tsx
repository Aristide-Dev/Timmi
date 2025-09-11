import { Head } from '@inertiajs/react'
import PublicLayout from '@/layouts/public-layout'
import TeacherSearchComponent from '@/components/TeacherSearchComponent'

interface TeacherSearchPageProps {
  teachers: {
    data: Array<{
      id: number;
      name: string;
      email: string;
      avatar?: string;
      phone?: string;
      bio?: string;
      hourly_rate?: number;
      experience_years?: number;
      is_verified: boolean;
      created_at: string;
      updated_at: string;
      subjects?: Array<{
        id: number;
        name: string;
      }>;
      levels?: Array<{
        id: number;
        name: string;
      }>;
      cities?: Array<{
        id: number;
        name: string;
      }>;
      reviews?: Array<{
        id: number;
        rating: number;
        comment: string;
        student: {
          name: string;
        };
      }>;
      bookings?: Array<{
        id: number;
        status: string;
      }>;
    }>;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
  subjects: Array<{ id: number; name: string }>;
  levels: Array<{ id: number; name: string }>;
  cities: Array<{ id: number; name: string }>;
  filters: {
    search?: string;
    subject?: string;
    level?: string;
    city?: string;
    min_price?: number;
    max_price?: number;
    min_rating?: number;
  };
}

export default function TeacherSearchPage({ teachers, subjects, levels, cities, filters }: TeacherSearchPageProps) {
  return (
    <PublicLayout>
      <Head title="Recherche de Professeurs - TIMMI">
        <meta name="description" content="Trouvez facilement des professeurs particuliers qualifiés pour vos enfants. Recherche avancée par matière, niveau et localisation." />
        <meta name="keywords" content="professeurs particuliers, cours particuliers, soutien scolaire, recherche professeur, TIMMI" />
      </Head>
      
      <TeacherSearchComponent 
        teachers={teachers}
        subjects={subjects}
        levels={levels}
        cities={cities}
        filters={filters}
      />
    </PublicLayout>
  )
}
