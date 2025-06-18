import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import ThemeSelector from '@/components/ui/theme-selector';
import ThemeSwitcher from '@/components/ui/theme-switcher';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    const [showThemeSelector, setShowThemeSelector] = useState(false);
    const { currentTheme } = useTheme();
    const isDark = currentTheme?.isDark || false;
    
    return (
        <div className="relative">
            {/* Particules animées en arrière-plan */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Particules brillantes avec mouvement fluide */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            background: isDark 
                                ? `rgba(var(--${currentTheme.accent}-rgb-300), 0.2)`
                                : `rgba(var(--${currentTheme.primary}-rgb-500), 0.2)`
                        }}
                        animate={{
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.3, 1],
                            y: [0, -20, 0],
                            x: [0, Math.random() * 10 - 5, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Effet de brillance générale */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        background: `linear-gradient(to right, transparent, rgba(var(--${currentTheme.accent}-rgb-400), 0.05), transparent)`
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ 
                        duration: 10, 
                        repeat: Infinity, 
                        ease: "linear",
                        repeatDelay: 3
                    }}
                />
            </div>
            
            {/* Bouton sélecteur de thème avec animation */}
            <motion.div 
                className="absolute top-4 right-4 z-20 flex items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <motion.button
                    onClick={() => setShowThemeSelector(!showThemeSelector)}
                    className="flex items-center justify-center p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        background: isDark 
                            ? `rgba(var(--${currentTheme.primary}-rgb-800), 0.5)`
                            : `rgba(var(--${currentTheme.primary}-rgb-100), 0.5)`
                    }}
                >
                    <Sparkles className={`h-5 w-5 ${isDark ? 'text-white' : 'text-[color:var(--primary-700)]'}`} />
                </motion.button>
                
                <AnimatePresence>
                    {showThemeSelector && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2 backdrop-blur-md p-2 rounded-full border"
                            style={{
                                background: isDark 
                                    ? `rgba(var(--${currentTheme.primary}-rgb-900), 0.7)`
                                    : `rgba(var(--${currentTheme.primary}-rgb-50), 0.7)`,
                                borderColor: isDark 
                                    ? `rgba(var(--${currentTheme.accent}-rgb-500), 0.3)`
                                    : `rgba(var(--${currentTheme.primary}-rgb-300), 0.3)`
                            }}
                        >
                            <ThemeSwitcher variant="minimal" size="sm" />
                            <ThemeSelector variant="minimal" showTitle={false} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AuthLayoutTemplate title={title} description={description} {...props}>
                {children}
            </AuthLayoutTemplate>
        </div>
    );
}
