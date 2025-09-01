export interface User {
    id: number
    name: string
    email: string
    email_verified_at?: string
    avatar?: string
    role: 'admin' | 'user' | 'vendor'
    created_at: string
    updated_at: string
}

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