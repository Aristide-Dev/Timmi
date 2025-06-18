import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="w-full"
                        >
                            <SidebarMenuButton 
                                size="lg" 
                                className="group text-white relative overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 rounded-full data-[state=open]:bg-white/15"
                            >
                                {/* Effet de brillance au hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 pointer-events-none" />
                                
                                <UserInfo user={auth.user} />
                                
                                <motion.div
                                    animate={{ rotate: [0, 15, 0, -15, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                                    className="ml-auto"
                                >
                                    <ChevronsUpDown className="size-4 text-white/80 group-hover:text-white transition-colors" />
                                </motion.div>
                            </SidebarMenuButton>
                        </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-gradient-to-b from-slate-800 via-[color:var(--primary-600)] to-slate-800 text-white border border-white/10"
                        align="end"
                        side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}
                    >
                        <div className="relative overflow-hidden">
                            {/* Effet de brillance décoratif */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-50 pointer-events-none" />
                            {/* Effet décoratif haut */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                            {/* Effet décoratif bas */}
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                            
                            <div className="relative z-10">
                                <UserMenuContent user={auth.user} />
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
