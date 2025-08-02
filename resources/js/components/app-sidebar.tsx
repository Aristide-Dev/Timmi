import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Users, 
    BookOpen, 
    Calendar, 
    Search, 
    GraduationCap,
    Clock,
    CreditCard,
    Settings,
    Bell,
    ChartBar
} from 'lucide-react';
import AppLogo from './app-logo';

interface Props {
    className?: string;
}

export function AppSidebar({ className }: Props) {
    const { auth } = usePage<PageProps>().props;
    const role = auth.user.role;

    const getNavItems = (): NavItem[] => {
        // Navigation commune à tous les rôles
        const commonItems: NavItem[] = [
            {
                title: 'Tableau de bord',
                href: `/${role}/dashboard`,
                icon: LayoutGrid,
            },
            {
                title: 'Notifications',
                href: '/notifications',
                icon: Bell,
            },
        ];

        // Navigation spécifique par rôle
        const roleSpecificItems: Record<'admin' | 'parent' | 'teacher', NavItem[]> = {
            admin: [
                {
                    title: 'Utilisateurs',
                    href: '/admin/users',
                    icon: Users,
                },
                {
                    title: 'Réservations',
                    href: '/admin/bookings',
                    icon: Calendar,
                },
                {
                    title: 'Paiements',
                    href: '/admin/payments',
                    icon: CreditCard,
                },
                {
                    title: 'Statistiques',
                    href: '/admin/reports',
                    icon: ChartBar,
                },
                {
                    title: 'Paramètres',
                    href: '/admin/settings',
                    icon: Settings,
                },
            ],
            parent: [
                {
                    title: 'Rechercher un professeur',
                    href: '/parent/search-teachers',
                    icon: Search,
                },
                {
                    title: 'Mes réservations',
                    href: '/parent/bookings',
                    icon: Calendar,
                },
                {
                    title: 'Mes paiements',
                    href: '/parent/payments',
                    icon: CreditCard,
                },
            ],
            teacher: [
                {
                    title: 'Mes disponibilités',
                    href: '/teacher/availabilities',
                    icon: Clock,
                },
                {
                    title: 'Mes cours',
                    href: '/teacher/bookings',
                    icon: GraduationCap,
                },
                {
                    title: 'Mes revenus',
                    href: '/teacher/earnings',
                    icon: CreditCard,
                },
            ],
        };

        return [...commonItems, ...(roleSpecificItems[role] || [])];
    };

    const footerNavItems: NavItem[] = [
        {
            title: 'Paramètres',
            href: '/settings/profile',
            icon: Settings,
        },
        {
            title: 'Documentation',
            href: '/docs',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset" className={className}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={`/${role}/dashboard`} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={getNavItems()} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
