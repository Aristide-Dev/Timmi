import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    const { currentTheme } = useTheme();
    const isDark = currentTheme?.isDark || false;

    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 overflow-hidden">
            {/* Arrière-plan coloré inspiré d'auth-split-layout */}
            <motion.div 
                className="absolute inset-0 z-0 pointer-events-none" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                style={{ 
                    background: isDark 
                        ? `linear-gradient(135deg, var(--primary-900) 0%, var(--accent-800) 50%, var(--primary-950) 100%),
                           radial-gradient(ellipse at 30% 20%, rgba(var(--accent-700), 0.4) 0%, transparent 60%),
                           radial-gradient(ellipse at 80% 70%, rgba(var(--primary-600), 0.3) 0%, transparent 50%)`
                        : `linear-gradient(135deg, var(--primary-50) 0%, var(--accent-100) 50%, var(--primary-100) 100%),
                           radial-gradient(ellipse at 30% 20%, rgba(var(--accent-300), 0.3) 0%, transparent 60%),
                           radial-gradient(ellipse at 80% 70%, rgba(var(--primary-300), 0.2) 0%, transparent 50%)`
                }}
            />

            {/* Motif SVG avec opacité adaptée au thème */}
            <motion.div 
                className="absolute inset-0 z-0 pointer-events-none" 
                style={{ 
                    opacity: isDark ? 0.15 : 0.08,
                    backgroundImage: isDark 
                        ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.6\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
                        : 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-3.134-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                    backgroundSize: '100px 100px'
                }}
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                    opacity: isDark ? [0.1, 0.2, 0.1] : [0.05, 0.12, 0.05]
                }}
                transition={{
                    backgroundPosition: { duration: 20, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
            />

            {/* Couche de texture subtile */}
            <motion.div 
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: isDark
                        ? `repeating-linear-gradient(45deg, 
                            transparent, 
                            transparent 2px, 
                            rgba(var(--accent-700), 0.03) 2px, 
                            rgba(var(--accent-700), 0.03) 4px)`
                        : `repeating-linear-gradient(45deg, 
                            transparent, 
                            transparent 2px, 
                            rgba(var(--primary-300), 0.02) 2px, 
                            rgba(var(--primary-300), 0.02) 4px)`
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            
            {/* Motif géométrique moderne */}
            <motion.div 
                className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
                style={{ 
                    backgroundImage: isDark
                        ? `radial-gradient(circle at 25% 25%, rgba(var(--accent-500), 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(var(--primary-400), 0.08) 0%, transparent 50%)`
                        : `radial-gradient(circle at 25% 25%, rgba(var(--primary-400), 0.08) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(var(--accent-400), 0.06) 0%, transparent 50%)`
                }}
                animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                    opacity: [0.05, 0.15, 0.05]
                }}
                transition={{ 
                    duration: 20, 
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            {/* Système de particules avancé */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Particules colorées inspirées d'auth-split-layout */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`glow-particle-${i}`}
                        className="absolute rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 8 + 4}px`,
                            height: `${Math.random() * 8 + 4}px`,
                            background: isDark 
                                ? `rgba(255, 255, 255, 0.3)`
                                : `rgba(var(--primary-600), 0.4)`,
                            boxShadow: isDark
                                ? `0 0 20px rgba(255, 255, 255, 0.5)`
                                : `0 0 15px rgba(var(--primary-500), 0.6)`
                        }}
                        animate={{
                            opacity: [0.2, 0.7, 0.2],
                            scale: [1, 1.4, 1],
                            y: [0, -25, 0],
                            x: [0, Math.random() * 15 - 7.5, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 3,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Particules d'accent avec couleurs du thème */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={`accent-particle-${i}`}
                        className="absolute rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 12 + 6}px`,
                            height: `${Math.random() * 12 + 6}px`,
                            background: isDark 
                                ? `radial-gradient(circle, rgba(var(--accent-400), 0.4) 0%, rgba(var(--accent-600), 0.2) 50%, transparent 100%)`
                                : `radial-gradient(circle, rgba(var(--accent-300), 0.3) 0%, rgba(var(--accent-500), 0.15) 50%, transparent 100%)`,
                            boxShadow: isDark
                                ? `0 0 25px rgba(var(--accent-400), 0.6)`
                                : `0 0 20px rgba(var(--accent-400), 0.4)`,
                            filter: `blur(${Math.random() * 3 + 1}px)`
                        }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.6, 1],
                            y: [0, -30, 0],
                            x: [0, Math.random() * 20 - 10, 0],
                            rotate: [0, 180, 0]
                        }}
                        transition={{
                            duration: 7 + Math.random() * 3,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Micro-particules scintillantes */}
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={`micro-particle-${i}`}
                        className="absolute rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: '2px',
                            height: '2px',
                            background: isDark 
                                ? `rgba(var(--accent-300), 0.6)`
                                : `rgba(var(--primary-400), 0.5)`,
                            boxShadow: isDark
                                ? `0 0 8px rgba(var(--accent-300), 0.8)`
                                : `0 0 6px rgba(var(--primary-400), 0.7)`
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5, 0.5]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Vagues lumineuses inspirées d'auth-split-layout */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{
                        background: isDark
                            ? `linear-gradient(to right, transparent, rgba(255, 255, 255, 0.12), transparent)`
                            : `linear-gradient(to right, transparent, rgba(var(--primary-500), 0.08), transparent)`
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ 
                        duration: 12, 
                        repeat: Infinity, 
                        ease: "linear",
                        repeatDelay: 4
                    }}
                />

                {/* Vague d'accent colorée */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{
                        background: isDark
                            ? `linear-gradient(45deg, 
                                transparent 0%, 
                                rgba(var(--accent-400), 0.1) 30%, 
                                rgba(var(--primary-300), 0.08) 50%, 
                                rgba(var(--accent-500), 0.06) 70%, 
                                transparent 100%)`
                            : `linear-gradient(45deg, 
                                transparent 0%, 
                                rgba(var(--accent-300), 0.08) 30%, 
                                rgba(var(--primary-400), 0.06) 50%, 
                                rgba(var(--accent-400), 0.04) 70%, 
                                transparent 100%)`
                    }}
                    animate={{ 
                        x: ['-120%', '120%'],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ 
                        duration: 18, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        repeatDelay: 6,
                        delay: 2
                    }}
                />

                {/* Effet de prismes lumineux */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: isDark
                            ? `conic-gradient(from 0deg at 20% 30%, 
                                transparent 0deg, 
                                rgba(var(--accent-400), 0.1) 60deg, 
                                transparent 120deg,
                                rgba(var(--primary-400), 0.08) 180deg,
                                transparent 240deg,
                                rgba(var(--accent-500), 0.12) 300deg,
                                transparent 360deg)`
                            : `conic-gradient(from 0deg at 20% 30%, 
                                transparent 0deg, 
                                rgba(var(--primary-300), 0.08) 60deg, 
                                transparent 120deg,
                                rgba(var(--accent-300), 0.06) 180deg,
                                transparent 240deg,
                                rgba(var(--primary-400), 0.1) 300deg,
                                transparent 360deg)`
                    }}
                    animate={{
                        rotate: [0, 360],
                        opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                        rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                    }}
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex w-full max-w-md flex-col gap-6 z-10"
            >
                {/* Logo animé avec effets */}
                <motion.div
                    className="relative"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/" className="group flex items-center justify-center font-medium relative mx-auto">
                        {/* Effet de halo au hover */}
                        <motion.div 
                            className="absolute -inset-4 rounded-xl opacity-0 group-hover:opacity-100 blur-lg pointer-events-none"
                            transition={{ duration: 0.3 }}
                            style={{
                                background: `radial-gradient(circle, rgba(var(--accent-500), 0.2), rgba(var(--primary-500), 0.2))`
                            }}
                        />
                        
                        <motion.div 
                            className="relative flex h-16 w-16 items-center justify-center rounded-2xl backdrop-blur-xl shadow-2xl border transition-all duration-500 overflow-hidden group"
                            style={{
                                background: isDark 
                                    ? `linear-gradient(135deg, 
                                        rgba(var(--primary-800), 0.8) 0%, 
                                        rgba(var(--accent-700), 0.6) 50%, 
                                        rgba(var(--primary-900), 0.9) 100%)`
                                    : `linear-gradient(135deg, 
                                        rgba(var(--primary-50), 0.9) 0%, 
                                        rgba(var(--accent-100), 0.7) 50%, 
                                        rgba(var(--primary-100), 0.95) 100%)`,
                                borderColor: isDark 
                                    ? `rgba(var(--accent-400), 0.5)`
                                    : `rgba(var(--primary-400), 0.4)`,
                                boxShadow: isDark
                                    ? `0 20px 60px rgba(var(--accent-900), 0.4), 
                                       0 8px 25px rgba(var(--primary-800), 0.3), 
                                       inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                                    : `0 20px 60px rgba(var(--primary-200), 0.3), 
                                       0 8px 25px rgba(var(--accent-200), 0.2), 
                                       inset 0 1px 0 rgba(255, 255, 255, 0.8)`
                            }}
                            whileHover={{ scale: 1.08, rotate: 8 }}
                            whileTap={{ scale: 0.92 }}
                        >
                            {/* Effet de brillance orbitale */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                                style={{
                                    background: isDark
                                        ? `conic-gradient(from 0deg, transparent, rgba(var(--accent-400), 0.4), transparent, rgba(var(--primary-400), 0.3), transparent)`
                                        : `conic-gradient(from 0deg, transparent, rgba(var(--primary-400), 0.3), transparent, rgba(var(--accent-400), 0.2), transparent)`
                                }}
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                            
                            {/* Couche de protection pour le logo */}
                            <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm" />
                            <AppLogoIcon 
                                className="size-23 fill-current relative z-10 transition-all duration-300" 
                                style={{
                                    color: isDark ? 'white' : 'black',
                                    filter: isDark 
                                        ? `drop-shadow(0 0 12px rgba(var(--accent-400), 0.6))`
                                        : `drop-shadow(0 0 8px rgba(var(--primary-500), 0.4))`
                                }}
                            />
                            
                            {/* Effet de brillance au hover amélioré */}
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                                animate={{ x: ['-300%', '300%'] }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    repeatDelay: 1.5
                                }}
                            />
                            
                            {/* Constellation de particules autour du logo */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={`logo-particle-${i}`}
                                    className="absolute w-1 h-1 rounded-full pointer-events-none"
                                    style={{
                                        top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 25}%`,
                                        left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 25}%`,
                                        background: isDark 
                                            ? `rgba(var(--accent-300), 0.8)`
                                            : `rgba(var(--primary-400), 0.7)`,
                                        boxShadow: isDark
                                            ? `0 0 6px rgba(var(--accent-300), 1)`
                                            : `0 0 4px rgba(var(--primary-400), 0.8)`
                                    }}
                                    animate={{ 
                                        opacity: [0, 1, 0],
                                        scale: [0.5, 1.2, 0.5],
                                        rotate: [0, 360]
                                    }}
                                    transition={{ 
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                            
                            {/* Icône Sparkles centrale */}
                            <motion.div
                                className="absolute -top-2 -right-2 w-4 h-4 pointer-events-none"
                                animate={{ 
                                    rotate: [0, 360],
                                    scale: [0.8, 1.2, 0.8],
                                    opacity: [0.6, 1, 0.6]
                                }}
                                transition={{ 
                                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                    opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                }}
                            >
                                <Sparkles 
                                    className="w-full h-full" 
                                    style={{
                                        color: isDark 
                                            ? `rgba(var(--accent-300), 0.9)`
                                            : `rgba(var(--primary-500), 0.8)`,
                                        filter: isDark
                                            ? `drop-shadow(0 0 8px rgba(var(--accent-400), 0.8))`
                                            : `drop-shadow(0 0 6px rgba(var(--primary-500), 0.6))`
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                </Link>
                </motion.div>

                <div className="flex flex-col gap-6">
                    {/* Carte avec animation et effets */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
                        className="relative"
                    >
                        <Card className="rounded-3xl border shadow-2xl backdrop-blur-xl overflow-hidden relative group"
                            style={{
                                background: isDark 
                                    ? `linear-gradient(145deg, 
                                        rgba(var(--primary-900), 0.95) 0%, 
                                        rgba(var(--accent-900), 0.8) 30%, 
                                        rgba(var(--primary-800), 0.9) 70%, 
                                        rgba(var(--accent-800), 0.85) 100%)`
                                    : `linear-gradient(145deg, 
                                        rgba(255, 255, 255, 0.95) 0%, 
                                        rgba(var(--primary-50), 0.9) 30%, 
                                        rgba(var(--accent-50), 0.8) 70%, 
                                        rgba(255, 255, 255, 0.98) 100%)`,
                                borderColor: isDark 
                                    ? `rgba(var(--accent-400), 0.4)`
                                    : `rgba(var(--primary-300), 0.3)`,
                                boxShadow: isDark
                                    ? `0 32px 80px rgba(var(--accent-900), 0.4), 
                                       0 16px 40px rgba(var(--primary-800), 0.3), 
                                       inset 0 1px 0 rgba(255, 255, 255, 0.1), 
                                       inset 0 -1px 0 rgba(var(--accent-700), 0.2)`
                                    : `0 32px 80px rgba(var(--primary-200), 0.3), 
                                       0 16px 40px rgba(var(--accent-200), 0.2), 
                                       inset 0 1px 0 rgba(255, 255, 255, 0.9), 
                                       inset 0 -1px 0 rgba(var(--primary-200), 0.3)`
                            }}
                        >
                            {/* Effet de grain lumineux */}
                            <motion.div
                                className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{
                                    background: isDark
                                        ? `radial-gradient(circle at 30% 20%, rgba(var(--accent-500), 0.2) 0%, transparent 50%),
                                           radial-gradient(circle at 80% 80%, rgba(var(--primary-400), 0.15) 0%, transparent 50%)`
                                        : `radial-gradient(circle at 30% 20%, rgba(var(--primary-400), 0.15) 0%, transparent 50%),
                                           radial-gradient(circle at 80% 80%, rgba(var(--accent-300), 0.1) 0%, transparent 50%)`
                                }}
                                animate={{
                                    opacity: [0.1, 0.3, 0.1],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Effet de brillance sophistiqué */}
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
                                animate={{ x: ['-300%', '300%'] }}
                                transition={{ 
                                    duration: 3, 
                                    repeat: Infinity, 
                                    ease: "easeInOut",
                                    repeatDelay: 2
                                }}
                            />
                            
                            {/* Bordure lumineuse animée */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl pointer-events-none"
                                style={{
                                    background: `conic-gradient(from 0deg, 
                                        transparent 0deg, 
                                        ${isDark ? 'rgba(var(--accent-400), 0.3)' : 'rgba(var(--primary-400), 0.2)'} 90deg, 
                                        transparent 180deg, 
                                        ${isDark ? 'rgba(var(--primary-400), 0.2)' : 'rgba(var(--accent-400), 0.15)'} 270deg, 
                                        transparent 360deg)`,
                                    mask: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                                    maskComposite: 'xor',
                                    padding: '1px'
                                }}
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                            
                            <CardHeader className="px-10 pt-8 pb-0 text-center relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <CardTitle className="text-2xl text-[color:var(--foreground)] dark:text-white">{title}</CardTitle>
                                    <CardDescription className="text-[color:var(--muted-foreground)] dark:text-white/60">{description}</CardDescription>
                                </motion.div>
                        </CardHeader>
                            
                            <CardContent className="px-10 py-8 relative z-10">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    {children}
                                </motion.div>
                            </CardContent>
                    </Card>
                    </motion.div>
                </div>
            </motion.div>
            
            {/* Orbes lumineux inspirés du panneau gauche d'auth-split-layout */}
            <motion.div 
                className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
                style={{
                    background: isDark
                        ? `rgba(255, 255, 255, 0.12)`
                        : `rgba(var(--primary-400), 0.15)`
                }}
                animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div 
                className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"
                style={{
                    background: isDark
                        ? `rgba(255, 255, 255, 0.1)`
                        : `rgba(var(--accent-400), 0.12)`
                }}
                animate={{ 
                    scale: [1, 1.25, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                }}
            />
            
            {/* Orbes d'accent avec couleurs du thème */}
            <motion.div 
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{
                    background: isDark
                        ? `rgba(var(--accent-500), 0.08)`
                        : `rgba(var(--accent-300), 0.1)`
                }}
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.5, 0.2],
                    x: [0, 15, 0],
                    y: [0, -10, 0]
                }}
                transition={{ 
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            />
            
            <motion.div 
                className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                style={{
                    background: isDark
                        ? `rgba(var(--primary-400), 0.1)`
                        : `rgba(var(--primary-500), 0.08)`
                }}
                animate={{ 
                    scale: [1, 1.18, 1],
                    opacity: [0.25, 0.55, 0.25],
                    x: [0, -12, 0],
                    y: [0, 8, 0]
                }}
                transition={{ 
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />
        </div>
    );
}
