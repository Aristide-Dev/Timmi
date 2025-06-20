import AuthLayoutTemplate from '@/layouts/auth/auth-split-layout';
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
            {/* Particules animées en arrière-plan avec couleurs améliorées */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Particules brillantes avec couleurs graduelles */}
                {[...Array(15)].map((_, i) => {
                    const particleType = i % 3; // 3 types de particules différentes
                    const size = Math.random() * 8 + 3;
                    
                    return (
                        <motion.div
                            key={`particle-${i}`}
                            className="absolute rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${size}px`,
                                height: `${size}px`,
                                background: particleType === 0 
                                    ? (isDark 
                                        ? `radial-gradient(circle, rgba(var(--accent-400), 0.4) 0%, rgba(var(--accent-600), 0.2) 50%, transparent 100%)`
                                        : `radial-gradient(circle, rgba(var(--primary-400), 0.3) 0%, rgba(var(--primary-600), 0.15) 50%, transparent 100%)`)
                                    : particleType === 1
                                    ? (isDark
                                        ? `radial-gradient(circle, rgba(var(--primary-300), 0.35) 0%, rgba(var(--primary-500), 0.18) 50%, transparent 100%)`
                                        : `radial-gradient(circle, rgba(var(--accent-500), 0.25) 0%, rgba(var(--accent-700), 0.12) 50%, transparent 100%)`)
                                    : (isDark
                                        ? `radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(var(--accent-400), 0.1) 50%, transparent 100%)`
                                        : `radial-gradient(circle, rgba(var(--primary-200), 0.4) 0%, rgba(var(--primary-400), 0.2) 50%, transparent 100%)`),
                                boxShadow: isDark
                                    ? `0 0 ${size * 2}px rgba(var(--accent-400), 0.3)`
                                    : `0 0 ${size * 1.5}px rgba(var(--primary-500), 0.2)`
                            }}
                            animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.4, 1],
                                y: [0, -30, 0],
                                x: [0, Math.random() * 15 - 7.5, 0],
                                rotate: [0, 360, 0]
                            }}
                            transition={{
                                duration: 5 + Math.random() * 4,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: "easeInOut"
                            }}
                        />
                    );
                })}

                {/* Effet de brillance multicouche */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        background: isDark
                            ? `linear-gradient(45deg, 
                                transparent 0%, 
                                rgba(var(--accent-500), 0.08) 25%, 
                                rgba(var(--primary-400), 0.12) 50%, 
                                rgba(var(--accent-600), 0.06) 75%, 
                                transparent 100%)`
                            : `linear-gradient(45deg, 
                                transparent 0%, 
                                rgba(var(--primary-300), 0.06) 25%, 
                                rgba(var(--accent-400), 0.1) 50%, 
                                rgba(var(--primary-500), 0.05) 75%, 
                                transparent 100%)`
                    }}
                    animate={{ 
                        x: ['-120%', '120%'],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ 
                        duration: 12, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        repeatDelay: 4
                    }}
                />

                {/* Effet de vague lumineuse */}
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-32"
                    style={{
                        background: isDark
                            ? `radial-gradient(ellipse at center bottom, 
                                rgba(var(--accent-600), 0.15) 0%, 
                                rgba(var(--primary-700), 0.08) 40%, 
                                transparent 70%)`
                            : `radial-gradient(ellipse at center bottom, 
                                rgba(var(--primary-400), 0.12) 0%, 
                                rgba(var(--accent-500), 0.06) 40%, 
                                transparent 70%)`
                    }}
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
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
                    className="relative flex items-center justify-center p-3 rounded-xl backdrop-blur-md border transition-all duration-300 overflow-hidden group"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: isDark 
                            ? `linear-gradient(135deg, 
                                rgba(var(--primary-800), 0.7) 0%, 
                                rgba(var(--accent-700), 0.5) 100%)`
                            : `linear-gradient(135deg, 
                                rgba(var(--primary-100), 0.8) 0%, 
                                rgba(var(--accent-200), 0.6) 100%)`,
                        borderColor: isDark 
                            ? `rgba(var(--accent-500), 0.4)`
                            : `rgba(var(--primary-400), 0.3)`,
                        boxShadow: isDark
                            ? `0 8px 32px rgba(var(--accent-600), 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                            : `0 8px 32px rgba(var(--primary-400), 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)`
                    }}
                >
                    {/* Effet de brillance au survol */}
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: isDark
                                ? `linear-gradient(45deg, transparent, rgba(var(--accent-400), 0.2), transparent)`
                                : `linear-gradient(45deg, transparent, rgba(var(--primary-300), 0.3), transparent)`
                        }}
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                    
                    <Sparkles 
                        className="h-5 w-5 relative z-10" 
                        style={{
                            color: isDark 
                                ? `rgba(var(--accent-200), 0.9)`
                                : `rgba(var(--primary-700), 0.9)`,
                            filter: isDark 
                                ? `drop-shadow(0 0 8px rgba(var(--accent-400), 0.6))`
                                : `drop-shadow(0 0 6px rgba(var(--primary-500), 0.4))`
                        }}
                    />
                </motion.button>
                
                <AnimatePresence>
                    {showThemeSelector && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="relative flex items-center gap-3 backdrop-blur-xl p-3 rounded-2xl border overflow-hidden"
                            style={{
                                background: isDark 
                                    ? `linear-gradient(135deg, 
                                        rgba(var(--primary-900), 0.85) 0%, 
                                        rgba(var(--accent-800), 0.7) 50%, 
                                        rgba(var(--primary-800), 0.8) 100%)`
                                    : `linear-gradient(135deg, 
                                        rgba(var(--primary-50), 0.9) 0%, 
                                        rgba(var(--accent-100), 0.8) 50%, 
                                        rgba(var(--primary-100), 0.85) 100%)`,
                                borderColor: isDark 
                                    ? `rgba(var(--accent-400), 0.4)`
                                    : `rgba(var(--primary-300), 0.5)`,
                                boxShadow: isDark
                                    ? `0 12px 48px rgba(var(--accent-900), 0.3), 
                                       0 4px 16px rgba(var(--primary-800), 0.2), 
                                       inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                                    : `0 12px 48px rgba(var(--primary-300), 0.2), 
                                       0 4px 16px rgba(var(--accent-200), 0.15), 
                                       inset 0 1px 0 rgba(255, 255, 255, 0.8)`
                            }}
                        >
                            {/* Effet de grain lumineux */}
                            <motion.div
                                className="absolute inset-0 opacity-30"
                                style={{
                                    background: isDark
                                        ? `radial-gradient(circle at 30% 20%, rgba(var(--accent-500), 0.15) 0%, transparent 50%),
                                           radial-gradient(circle at 80% 80%, rgba(var(--primary-400), 0.1) 0%, transparent 50%)`
                                        : `radial-gradient(circle at 30% 20%, rgba(var(--primary-400), 0.12) 0%, transparent 50%),
                                           radial-gradient(circle at 80% 80%, rgba(var(--accent-300), 0.08) 0%, transparent 50%)`
                                }}
                                animate={{
                                    opacity: [0.2, 0.4, 0.2],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <div className="relative z-10">
                                <ThemeSwitcher variant="minimal" size="sm" />
                            </div>
                            <div className="w-px h-6 bg-gradient-to-b opacity-30" style={{
                                background: isDark 
                                    ? `linear-gradient(to bottom, transparent, rgba(var(--accent-400), 0.6), transparent)`
                                    : `linear-gradient(to bottom, transparent, rgba(var(--primary-400), 0.5), transparent)`
                            }} />
                            <div className="relative z-10">
                                <ThemeSelector variant="minimal" showTitle={false} />
                            </div>
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
