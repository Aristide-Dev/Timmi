import { Icon } from '@/components/icon';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import ThemeSelector from '@/components/ui/theme-selector';
import ThemeSwitcher from '@/components/ui/theme-switcher';
import { type NavItem } from '@/types';
import { motion } from 'framer-motion';
import { Palette, Sparkles } from 'lucide-react';
import { useState, type ComponentPropsWithoutRef } from 'react';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    const [showThemeSelector, setShowThemeSelector] = useState(false);
    const ALLOW_THEME_CHANGE  = import.meta.env.VITE_THEME_ALLOW_CHANGE !== false;

    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden border-none bg-gradient-to-r from-slate-800 via-[color:var(--primary-600)] to-slate-800 text-white shadow-xl"
                >
                    {/* Effet de brillance décoratif */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-50" />

                    {/* Effet décoratif haut */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

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

                    {/* Sélecteur de thème */}
                    {ALLOW_THEME_CHANGE && (
                        <motion.div
                            className="relative z-10 mb-3 p-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <div className="flex items-center justify-between">
                                <motion.button
                                    onClick={() => setShowThemeSelector(!showThemeSelector)}
                                    className={`group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/20`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Palette className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                    <span className="font-medium">Thème</span>
                                    <motion.div className="ml-1 text-xs" animate={{ rotate: showThemeSelector ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                        {showThemeSelector ? '▲' : '▼'}
                                    </motion.div>
                                </motion.button>

                                <ThemeSwitcher variant="minimal" size="sm" />
                            </div>

                            {/* Panneau de sélection de thème */}
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: showThemeSelector ? 'auto' : 0,
                                    opacity: showThemeSelector ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-3 pb-1">
                                    <ThemeSelector variant="minimal" showTitle={false} />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    <SidebarMenu>
                        {items.map((item, index) => (
                            <SidebarMenuItem key={item.title}>
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <SidebarMenuButton
                                        asChild
                                        className="group relative overflow-hidden transition-all duration-300"
                                        style={{
                                            color: 'white',
                                        }}
                                    >
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative flex items-center gap-3 overflow-hidden rounded-full px-3 py-2 transition-all duration-300 hover:bg-white/10"
                                        >
                                            {/* Effet de brillance au hover */}
                                            <motion.div
                                                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                                                animate={{ x: ['-200%', '200%'] }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    repeatDelay: 1,
                                                }}
                                            />

                                            {/* Icône avec animation */}
                                            <motion.div className="relative" whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                                                {item.icon && (
                                                    <Icon
                                                        iconNode={item.icon}
                                                        className="h-5 w-5 text-white opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                                                    />
                                                )}

                                                {/* Effet de particule pour les éléments importants */}
                                                {index === 0 && (
                                                    <motion.div
                                                        className="pointer-events-none absolute -top-1 -right-1 h-2 w-2 opacity-0 group-hover:opacity-100"
                                                        animate={{
                                                            rotate: [0, 360],
                                                            opacity: [0, 0.7, 0],
                                                        }}
                                                        transition={{
                                                            rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                                                            opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                                                        }}
                                                    >
                                                        <Sparkles className="h-full w-full text-yellow-300" />
                                                    </motion.div>
                                                )}
                                            </motion.div>

                                            {/* Texte avec animation */}
                                            <motion.span
                                                className="font-medium transition-all duration-300 group-hover:translate-x-0.5"
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                {item.title}
                                            </motion.span>
                                        </a>
                                    </SidebarMenuButton>
                                </motion.div>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>

                    {/* Effet décoratif bas */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </motion.div>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
