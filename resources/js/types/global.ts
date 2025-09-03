// export interface User {
//     id: number
//     name: string
//     email: string
//     phone?: string
//     email_verified_at?: string
//     phone_verified_at?: string
//     avatar?: string
//     role: 'admin' | 'user' | 'vendor'
//     created_at: string
//     updated_at: string
// }

// Interfaces pour la localisation
export interface City {
    id: number
    name: string
    slug: string
    code?: string
    description?: string
    is_active: boolean
    sort_order: number
    created_at: string
    updated_at: string
}

export interface Neighborhood {
    id: number
    city_id: number
    name: string
    slug: string
    description?: string
    is_active: boolean
    sort_order: number
    city?: City
    created_at: string
    updated_at: string
}

// Interfaces pour l'éducation
export interface Cycle {
    id: number
    name: string
    slug: string
    description?: string
    min_age?: number
    max_age?: number
    is_active: boolean
    sort_order: number
    created_at: string
    updated_at: string
}

export interface Level {
    id: number
    cycle_id: number
    name: string
    slug: string
    description?: string
    grade_level?: number
    is_active: boolean
    sort_order: number
    cycle?: Cycle
    created_at: string
    updated_at: string
}

export interface Subject {
    id: number
    name: string
    slug: string
    description?: string
    icon?: string
    color?: string
    is_active: boolean
    sort_order: number
    created_at: string
    updated_at: string
}

export interface PaginatedData<T> {
    data: T[]
    current_page: number
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Array<{
        url: string | null
        label: string
        active: boolean
    }>
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

export interface Notification {
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    duration?: number
    action?: {
        label: string
        onClick: () => void
    }
}

export interface ApiResponse<T = unknown> {
    data: T
    message: string
    success: boolean
    errors?: Record<string, string[]>
}

export interface PageProps {
    auth: {
        user: User | null
    }
    ziggy: {
        location: string
        url: string
        port: number | null
        defaults: Record<string, unknown>
        routes: Record<string, unknown>
    }
    flash?: {
        success?: string
        error?: string
        warning?: string
        info?: string
    }
    errors?: Record<string, string>
    [key: string]: unknown
}

export type PagePropsWithData<T extends Record<string, unknown> = Record<string, unknown>> = PageProps & T

// Types pour le SEO et les layouts
export interface AlternateLocale {
    locale: string;
    url: string;
}

export interface PublicLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    canonicalUrl?: string;
    ogType?: string;
    twitterCreator?: string;
    datePublished?: string;
    dateModified?: string;
    articleSection?: string;
    alternateLocales?: AlternateLocale[];
    itemProps?: Record<string, unknown>;
    seo?: Record<string, unknown>;
}

// Type pour les flash messages étendus (compatible avec le type existant)
export interface ExtendedFlash {
    message?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
}

// Type pour les props de page étendues avec flash et url
export interface ExtendedPageProps extends PageProps {
    flash?: ExtendedFlash;
    url?: string;
}

export interface ThemeConfig {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    isDark?: boolean;
    isCustom?: boolean;
    colors: {
        [key: string]: string;
    };
}

// Interfaces pour les Parents
export interface ParentDashboard {
    total_children: number;
    active_bookings: number;
    completed_sessions: number;
    total_spent: number;
    upcoming_sessions: Session[];
    recent_bookings: Booking[];
    children: Child[];
}

export interface Child {
    id: number;
    name: string;
    age: number;
    grade_level: string;
    subjects: string[];
    avatar?: string;
    is_active: boolean;
}

export interface Professor {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    bio: string;
    experience_years: number;
    education: string;
    subjects: Subject[];
    levels: Level[];
    cities: City[];
    hourly_rate: number;
    rating: number;
    total_reviews: number;
    is_verified: boolean;
    is_available: boolean;
    languages: string[];
    specializations: string[];
    certificates: Certificate[];
    availability: Availability[];
    reviews: Review[];
}

export interface Certificate {
    id: number;
    name: string;
    issuer: string;
    date_obtained: string;
    file_url?: string;
}

export interface Availability {
    id: number;
    day_of_week: number;
    start_time: string;
    end_time: string;
    is_available: boolean;
}

export interface Review {
    id: number;
    parent_name: string;
    rating: number;
    comment: string;
    date: string;
    subject: string;
}

export interface ProfessorSearchFilters {
    subjects?: number[];
    levels?: number[];
    cities?: number[];
    price_min?: number;
    price_max?: number;
    rating_min?: number;
    availability?: string;
    languages?: string[];
    verified_only?: boolean;
}

export interface ProfessorSearchResult {
    professors: Professor[];
    total: number;
    current_page: number;
    last_page: number;
    filters: ProfessorSearchFilters;
}

export interface Booking {
    id: number;
    professor: Professor;
    child: Child;
    subject: Subject;
    level: Level;
    duration: number;
    total_price: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    payment_status: 'pending' | 'paid' | 'refunded';
    payment_method?: string;
    meeting_link?: string;
    notes?: string;
    created_at: string;
}

export interface Session {
    id: number;
    booking: Booking;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    notes?: string;
    created_at: string;
    feedback?: Feedback;
}

export interface Feedback {
    id: number;
    session: Session;
    rating: number;
    comment: string;
    categories: {
        teaching_quality: number;
        punctuality: number;
        communication: number;
        patience: number;
    };
    created_at: string;
}

export interface PaymentMethod {
    id: number;
    type: 'card' | 'mobile_money' | 'bank_transfer';
    name: string;
    is_default: boolean;
    last_four?: string;
    expiry_date?: string;
}

export interface Payment {
    id: number;
    booking: Booking;
    amount: number;
    method: PaymentMethod;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    transaction_id?: string;
    created_at: string;
}

// Nouvelles interfaces pour les relations many-to-many
export interface Certificate {
    id: number;
    user_id: number;
    name: string;
    issuer: string;
    date_obtained: string;
    file_url?: string;
    created_at: string;
    updated_at: string;
}

export interface Availability {
    id: number;
    user_id: number;
    day_of_week: number; // 0 = dimanche, 1 = lundi, etc.
    start_time: string;
    end_time: string;
    is_available: boolean;
    day_name?: string; // Attribut calculé côté backend
    created_at: string;
    updated_at: string;
}

export interface Review {
    id: number;
    professor_id: number;
    parent_id: number;
    parent_name: string;
    subject: string;
    rating: number; // 1-5 étoiles
    comment: string;
    date: string;
    created_at: string;
    updated_at: string;
}

export interface Role {
    id: number;
    name: string;
    slug: string;
    description?: string;
    is_default: boolean;
    is_admin: boolean;
    permissions?: string[];
    created_at: string;
    updated_at: string;
}

// Mise à jour de l'interface User pour inclure les nouvelles relations
export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    phone_verified_at?: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
    
    // Champs spécifiques aux professeurs
    bio?: string;
    hourly_rate?: number;
    experience_years?: number;
    education?: string;
    specializations?: string[];
    languages?: string[];
    is_verified?: boolean;
    is_available?: boolean;
    rating?: number;
    total_reviews?: number;
    avatar?: string;
    
    // Relations
    roles?: Role[];
    subjects?: Subject[];
    levels?: Level[];
    cities?: City[];
    certificates?: Certificate[];
    availabilities?: Availability[];
    reviews?: Review[];
    children?: Child[];
    bookings?: Booking[];
    professor_bookings?: Booking[];
}