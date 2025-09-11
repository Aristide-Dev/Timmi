import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, ShieldCheck, Users, MapPin, BookOpen, GraduationCap, Search, Calendar, Home, User, FileText, DollarSign, BarChart3, Settings, MessageSquare, CreditCard, UserCheck, TrendingUp, Database } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props as unknown as { auth: { user: { roles: string[] } } };
    const userRoles = auth?.user?.roles || [];

    const getMainNavItems = (): NavItem[] => {
        const items: NavItem[] = [];

        // Dashboard commun
        // items.push({
        //     title: 'Dashboard',
        //     href: '/dashboard',
        //     icon: LayoutGrid,
        // });
        

        // Menu pour les Parents
        if (userRoles.includes('parent')) {
            items.push(
                {
                    title: 'Tableau de bord',
                    href: route('parent.dashboard'),
                    icon: Home,
                },
                {
                    title: 'Rechercher un professeur',
                    href: route('parent.search.professors'),
                    icon: Search,
                },
                {
                    title: 'Mes réservations',
                    href: route('parent.bookings.index'),
                    icon: Calendar,
                },
                {
                    title: 'Mes enfants',
                    href: route('parent.children.index'),
                    icon: User,
                },
                {
                    title: 'Mon profil',
                    href: route('parent.profile.index'),
                    icon: Users,
                },
                {
                    title: 'Feedback',
                    href: route('parent.feedback.index'),
                    icon: FileText,
                }
            );
        }

        // Menu pour les Étudiants
        if (userRoles.includes('student')) {
            items.push(
                {
                    title: 'Tableau de bord',
                    href: route('student.dashboard'),
                    icon: Home,
                },
                {
                    title: 'Rechercher un professeur',
                    href: route('student.search.professors'),
                    icon: Search,
                },
                {
                    title: 'Mes réservations',
                    href: route('student.bookings.index'),
                    icon: Calendar,
                },
                {
                    title: 'Mon profil',
                    href: route('student.profile.index'),
                    icon: User,
                },
                {
                    title: 'Mes matières',
                    href: route('student.subjects.index'),
                    icon: BookOpen,
                },
                {
                    title: 'Mes niveaux',
                    href: route('student.levels.index'),
                    icon: GraduationCap,
                },
                {
                    title: 'Mes villes',
                    href: route('student.cities.index'),
                    icon: MapPin,
                },
                {
                    title: 'Feedback',
                    href: route('student.feedback.index'),
                    icon: FileText,
                }
            );
        }

        // Menu pour les Professeurs
        if (userRoles.includes('professor')) {
            items.push(
                {
                    title: 'Tableau de bord',
                    href: route('professor.dashboard'),
                    icon: Home,
                },
                {
                    title: 'Mon profil',
                    href: route('professor.profile.index'),
                    icon: User,
                },
                {
                    title: 'Mes matières',
                    href: route('professor.subjects.index'),
                    icon: BookOpen,
                },
                {
                    title: 'Mes niveaux',
                    href: route('professor.levels.index'),
                    icon: GraduationCap,
                },
                {
                    title: 'Mes zones',
                    href: route('professor.zones.index'),
                    icon: MapPin,
                },
                {
                    title: 'Mon agenda',
                    href: route('professor.schedule.index'),
                    icon: Calendar,
                },
                {
                    title: 'Mes réservations',
                    href: route('professor.bookings.index'),
                    icon: FileText,
                },
                {
                    title: 'Mes revenus',
                    href: route('professor.earnings.index'),
                    icon: Users,
                },
                {
                    title: 'Mes certificats',
                    href: route('professor.certificates.index'),
                    icon: ShieldCheck,
                }
            );
        }

        // Menu pour les Admins
        if (userRoles.includes('admin') || userRoles.includes('super-admin')) {
            items.push(
                {
                    title: 'Tableau de bord',
                    href: route('dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'Utilisateurs',
                    icon: Users,
                    items: [
                        {
                            title: 'Tous les utilisateurs',
                            href: route('admin.users.index'),
                            icon: Users,
                        },
                        {
                            title: 'Professeurs',
                            href: route('admin.professors.index'),
                            icon: UserCheck,
                        },
                        {
                            title: 'Parents',
                            href: route('admin.parents.index'),
                            icon: User,
                        },
                        {
                            title: 'Gestion des rôles',
                            href: route('admin.roles.index'),
                            icon: ShieldCheck,
                        },
                        {
                            title: 'Rôles utilisateurs',
                            href: route('admin.user-roles.index'),
                            icon: Users,
                        },
                    ],
                },
                {
                    title: 'Réservations & Sessions',
                    icon: Calendar,
                    items: [
                        {
                            title: 'Toutes les réservations',
                            href: route('admin.bookings.index'),
                            icon: Calendar,
                        },
                        {
                            title: 'Sessions en cours',
                            href: route('admin.sessions.index'),
                            icon: BookOpen,
                        },
                        {
                            title: 'Paiements',
                            href: route('admin.payments.index'),
                            icon: CreditCard,
                        },
                        {
                            title: 'Revenus',
                            href: route('admin.earnings.index'),
                            icon: DollarSign,
                        },
                    ],
                },
                {
                    title: 'Contenu & Feedback',
                    icon: FileText,
                    items: [
                        {
                            title: 'Avis & Commentaires',
                            href: route('admin.reviews.index'),
                            icon: MessageSquare,
                        },
                        {
                            title: 'Feedback',
                            href: route('admin.feedback.index'),
                            icon: FileText,
                        },
                        {
                            title: 'Certificats',
                            href: route('admin.certificates.index'),
                            icon: ShieldCheck,
                        },
                    ],
                },
                {
                    title: 'Localisation',
                    icon: MapPin,
                    items: [
                        {
                            title: 'Gestion des villes',
                            href: route('admin.locations.cities.index'),
                            icon: MapPin,
                        },
                        {
                            title: 'Gestion des quartiers',
                            href: route('admin.locations.neighborhoods.index'),
                            icon: MapPin,
                        },
                    ],
                },
                {
                    title: 'Éducation',
                    icon: BookOpen,
                    items: [
                        {
                            title: 'Gestion des cycles',
                            href: route('admin.education.cycles.index'),
                            icon: BookOpen,
                        },
                        {
                            title: 'Gestion des niveaux',
                            href: route('admin.education.levels.index'),
                            icon: GraduationCap,
                        },
                        {
                            title: 'Gestion des matières',
                            href: route('admin.education.subjects.index'),
                            icon: BookOpen,
                        },
                    ],
                },
                {
                    title: 'Statistiques & Rapports',
                    icon: BarChart3,
                    items: [
                        {
                            title: 'Analytics',
                            href: route('admin.analytics.index'),
                            icon: BarChart3,
                        },
                        {
                            title: 'Rapports',
                            href: route('admin.reports.index'),
                            icon: TrendingUp,
                        },
                    ],
                },
                {
                    title: 'Système',
                    icon: Settings,
                    items: [
                        {
                            title: 'Paramètres',
                            href: route('admin.settings.index'),
                            icon: Settings,
                        },
                        {
                            title: 'Base de données',
                            href: route('admin.database.index'),
                            icon: Database,
                        },
                    ],
                }
            );
        }

        return items;
    };

    const mainNavItems = getMainNavItems();

    const footerNavItems: NavItem[] = [
        // {
        //     title: 'Repository',
        //     href: 'https://github.com/laravel/react-starter-kit',
        //     icon: Folder,
        // },
        // {
        //     title: 'Documentation',
        //     href: 'https://laravel.com/docs/starter-kits#react',
        //     icon: BookOpen,
        // },
    ];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="shrink-0">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="flex-1 overflow-y-auto">
                
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="shrink-0">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}