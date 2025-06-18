import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Users, Settings, FileText, Calendar, ShoppingCart, BarChart, HelpCircle, Bell } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Utilisateurs',
        href: '/users',
        icon: Users,
    },
    {
        title: 'Paramètres',
        href: '/settings',
        icon: Settings,
    },
    {
        title: 'Documents',
        href: '/documents',
        icon: FileText,
    },
    {
        title: 'Calendrier',
        href: '/calendar',
        icon: Calendar,
    },
    {
        title: 'Produits',
        href: '/products',
        icon: ShoppingCart,
    },
    {
        title: 'Statistiques',
        href: '/statistics',
        icon: BarChart,
    },
    {
        title: 'Aide',
        href: '/help',
        icon: HelpCircle, 
    },
    {
        title: 'Notifications',
        href: '/notifications',
        icon: Bell,
    },
    // Autres éléments de navigation simplifiés
];

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

export function AppSidebar() {
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
