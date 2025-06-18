import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeSelector from '@/components/ui/theme-selector';
import ThemeSwitcher from '@/components/ui/theme-switcher';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, Folder, LayoutGrid, Menu, Palette, Search, ShieldCheck, Users } from 'lucide-react';
import { useState } from 'react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    // Section Administration
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
    // Autres éléments de navigation simplifiés
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

const activeItemStyles = 'bg-white/15 text-white font-medium';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showThemeSelector, setShowThemeSelector] = useState(false);

    return (
        <>
            <div className="relative overflow-hidden border-none bg-gradient-to-r from-slate-800 via-[color:var(--primary-600)] to-slate-800 text-white shadow-xl">
                {/* Effet de brillance décoratif */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-50" />

                {/* Effet décoratif haut */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Effet décoratif bas */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Particules décoratives avec mouvement fluide */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-white/20"
                            style={{
                                top: `${15 + i * 25}%`,
                                left: `${5 + i * 30}%`,
                                width: `${Math.random() * 4 + 2}px`,
                                height: `${Math.random() * 4 + 2}px`,
                            }}
                            animate={{
                                opacity: [0.2, 0.6, 0.2],
                                scale: [1, 1.3, 1],
                                y: [0, -15, 0],
                                x: [0, Math.random() * 10 - 5, 0],
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}

                    {/* Effet de brillance supplémentaire */}
                    <motion.div
                        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'linear',
                            repeatDelay: 2,
                        }}
                    />
                </div>

                <div className="relative z-10 mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px] text-white hover:bg-white/10 hover:text-white">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="z-50 h-full border-none bg-gradient-to-b from-slate-800 via-[color:var(--primary-600)] to-slate-800 p-0 text-white"
                            >
                                {/* Effet de brillance décoratif */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-50" />

                                {/* Effet décoratif haut */}
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                {/* Effet décoratif bas */}
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                {/* Particules décoratives */}
                                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute rounded-full bg-white/20"
                                            style={{
                                                top: `${15 + i * 25}%`,
                                                left: `${5 + i * 30}%`,
                                                width: `${Math.random() * 4 + 2}px`,
                                                height: `${Math.random() * 4 + 2}px`,
                                            }}
                                            animate={{
                                                opacity: [0.2, 0.6, 0.2],
                                                scale: [1, 1.3, 1],
                                                y: [0, -15, 0],
                                                x: [0, Math.random() * 10 - 5, 0],
                                            }}
                                            transition={{
                                                duration: 3 + i * 0.5,
                                                repeat: Infinity,
                                                delay: i * 0.3,
                                                ease: 'easeInOut',
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="relative z-10 flex h-full flex-col overflow-auto">
                                    <div className="flex items-center justify-between p-4">
                                        <AppLogoIcon className="h-6 w-6 fill-current text-white" />
                                        <SheetClose className="rounded-full bg-white/10 p-2 hover:bg-white/20">
                                            <span className="sr-only">Fermer</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M18 6 6 18" />
                                                <path d="m6 6 12 12" />
                                            </svg>
                                        </SheetClose>
                                    </div>

                                    <div className="flex flex-col space-y-1 p-4">
                                        {mainNavItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="flex items-center space-x-2 rounded-full px-3 py-2 font-medium transition-colors hover:bg-white/10"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="mt-auto border-t border-white/10 p-4">
                                        {/* Sélecteur de thème */}
                                        <div className="mb-4">
                                            <div className="mb-2 flex items-center justify-between px-3 py-2">
                                                <span className="text-sm font-medium">Mode</span>
                                                <ThemeSwitcher variant="minimal" size="sm" />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <motion.button
                                                onClick={() => setShowThemeSelector(!showThemeSelector)}
                                                className={`group flex w-full items-center justify-between gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/20`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Palette className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                                    <span className="font-medium">Couleurs du thème</span>
                                                </div>
                                                <motion.div
                                                    className="ml-1 text-xs"
                                                    animate={{ rotate: showThemeSelector ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {showThemeSelector ? '▲' : '▼'}
                                                </motion.div>
                                            </motion.button>
                                        </div>

                                        {/* Panneau de sélection de thème */}
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: showThemeSelector ? 'auto' : 0,
                                                opacity: showThemeSelector ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="mb-4 overflow-hidden"
                                        >
                                            <div className="flex flex-col gap-4 py-3">
                                                <div className="px-3">
                                                    <div className="mt-2">
                                                        <ThemeSelector variant="minimal" showTitle={false} />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {rightNavItems.map((item) => (
                                            <a
                                                key={item.title}
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 rounded-full px-3 py-2 font-medium transition-colors hover:bg-white/10"
                                            >
                                                {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                <span>{item.title}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href="/dashboard" prefetch className="flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                page.url === item.href && activeItemStyles,
                                                'h-9 cursor-pointer rounded-full bg-transparent px-3 hover:bg-white/10 hover:text-white',
                                            )}
                                        >
                                            {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
                                            {item.title}
                                        </Link>
                                        {page.url === item.href && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-white/70"></div>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <div className="relative flex items-center space-x-1">
                            <Button variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer rounded-full bg-white/5 hover:bg-white/10">
                                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
                            </Button>

                            {/* Desktop Theme Selector */}
                            <div className="relative hidden lg:block">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <motion.button
                                            className="group ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 p-0 text-white ring-offset-background transition-colors hover:bg-white/10 hover:text-white"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Palette className="size-5 opacity-80 group-hover:opacity-100" />
                                        </motion.button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="min-w-56 rounded-lg border border-white/10 bg-gradient-to-b from-slate-800 via-[color:var(--primary-600)] to-slate-800 text-white"
                                        align="end"
                                    >
                                        <div className="relative overflow-hidden p-2">
                                            {/* Effet de brillance décoratif */}
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-50" />

                                            {/* Effet décoratif haut */}
                                            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                            {/* Effet décoratif bas */}
                                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                            <div className="relative z-10">
                                                <div className="mb-2 flex items-center justify-between px-2 py-1.5">
                                                    <span className="text-sm font-medium">Mode</span>
                                                    <ThemeSwitcher variant="minimal" size="sm" />
                                                </div>
                                                <div className="mt-3 border-t border-white/10 pt-3">
                                                    <div className="px-2 py-1.5 text-sm font-medium">Couleurs du thème</div>
                                                    <ThemeSelector variant="minimal" showTitle={false} />
                                                </div>
                                            </div>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="hidden lg:flex">
                                {rightNavItems.map((item) => (
                                    <TooltipProvider key={item.title} delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 p-0 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                >
                                                    <span className="sr-only">{item.title}</span>
                                                    {item.icon && <Icon iconNode={item.icon} className="size-5 opacity-80 group-hover:opacity-100" />}
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{item.title}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="ghost"
                                        className="size-10 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm hover:border-white/30 hover:bg-white/10"
                                    >
                                        <Avatar className="size-8 overflow-hidden rounded-full">
                                            <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                            <AvatarFallback className="rounded-full bg-white/10 text-white">
                                                {getInitials(auth.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </motion.div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56 rounded-lg border border-white/10 bg-gradient-to-b from-slate-800 via-[color:var(--primary-600)] to-slate-800 text-white"
                                align="end"
                            >
                                <div className="relative overflow-hidden">
                                    {/* Effet de brillance décoratif */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-50" />
                                    {/* Effet décoratif haut */}
                                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                    {/* Effet décoratif bas */}
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                    <div className="relative z-10">
                                        <UserMenuContent user={auth.user} />
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70 bg-background">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
