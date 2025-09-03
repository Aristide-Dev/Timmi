import { TopBar } from '@/components/top-bar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DesktopNav, MobileNav } from '@/components/ui/menu';
import { useFavorites } from '@/hooks/use-favorites';
import { ExtendedPageProps } from '@/types/global';
import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, CircleUser, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

const Header: React.FC = () => {
    const pageProps = usePage<ExtendedPageProps>().props;
    const auth = pageProps.auth;

    const [state, setState] = useState({
        isMenuOpen: false,
        isScrolled: false,
        prevScrollPos: 0,
        visible: true,
    });

    // Utilisation des hooks (avec gestion d'erreur)
    let favoritesCount = 0;
    try {
        const favorites = useFavorites();
        favoritesCount = favorites.favoritesCount;
    } catch {
        // Les hooks ne sont pas encore disponibles partout
    }

    const updateState = useCallback((updates: Partial<typeof state>) => {
        setState((prev) => ({ ...prev, ...updates }));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (state.isMenuOpen) {
                updateState({ visible: true });
                return;
            }

            const currentScrollPos = window.scrollY;
            const isScrollingDown = state.prevScrollPos < currentScrollPos;

            updateState({
                visible: currentScrollPos < 10 || !isScrollingDown,
                isScrolled: currentScrollPos > 20,
                prevScrollPos: currentScrollPos,
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [state.prevScrollPos, state.isMenuOpen, updateState]);

    useEffect(() => {
        if (state.isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [state.isMenuOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                updateState({ isMenuOpen: false });
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [updateState]);

    return (
        <>
            <motion.header
                className={`fixed w-full transition-all duration-700 ease-out ${state.visible ? 'translate-y-0' : '-translate-y-full'} ${
                    state.isScrolled
                        ? 'bg-gradient-to-r from-[color:var(--primary-900)]/98 via-[color:var(--primary-800)]/95 to-[color:var(--primary-700)]/98 shadow-2xl shadow-[color:var(--primary-500)]/20 border-b border-[color:var(--primary-400)]/20'
                        : 'bg-gradient-to-r from-[color:var(--primary-800)]/90 via-[color:var(--primary-700)]/85 to-[color:var(--primary-600)]/90'
                } ${state.isMenuOpen ? 'z-50' : 'z-30'} backdrop-blur-2xl backdrop-saturate-200`}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {/* Effet de brillance dynamique */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse opacity-50"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatDelay: 2,
                    }}
                />
                
                {/* Gradient border animé */}
                <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-500)]/20 via-[color:var(--accent-500)]/20 to-[color:var(--primary-500)]/20 animate-gradient-x opacity-30" />

                {/* Ligne lumineuse animée */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[color:var(--primary-400)]/60 to-transparent transition-all duration-500 ${state.isScrolled ? 'opacity-100 shadow-lg shadow-[color:var(--primary-400)]/50' : 'opacity-60'}`} />

                {/* TopBar sophistiqué qui disparaît au scroll avec animation */}
                <AnimatePresence>
                    {(!state.isScrolled || state.isMenuOpen) && (
                        <motion.div
                            initial={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full transition-all duration-700 ease-out overflow-hidden"
                        >
                            <TopBar />
                            {/* Ligne de séparation avec effet de dégradé sophistiqué */}
                            <motion.div
                                className="absolute right-4 bottom-0 left-4 h-px bg-gradient-to-r from-transparent via-[color:var(--primary-300)]/20 to-transparent"
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation principale */}
                <div className="w-full px-4 max-w-7xl mx-auto">
                    <motion.div
                        className={`flex items-center justify-between transition-all duration-500 ease-out ${state.isScrolled && !state.isMenuOpen ? 'py-3' : 'py-4'} `}
                    >
                        {/* Logo avec effets sophistiqués et animations Framer Motion */}
                        <Link
                            href="/"
                            className="group relative -m-2 flex items-center overflow-hidden rounded-2xl p-2"
                            aria-label="Retour à l'accueil"
                        >
                            {/* Effet de hover avec glassmorphism avancé */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            />

                            {/* Effet de brillance au survol avec animation */}
                            <motion.div
                                className="absolute inset-0 -skew-x-12 transform rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ opacity: 0, x: '-100%' }}
                                whileHover={{ opacity: 1, x: '100%' }}
                                transition={{ duration: 0.7, ease: 'easeOut' }}
                            />

                            <div className="relative overflow-hidden rounded-xl">
                                <motion.div
                                    className={`flex items-center justify-center rounded-lg bg-white/20 ${state.isScrolled && !state.isMenuOpen ? 'h-10 w-full' : 'h-12 w-full'} `}
                                    style={{
                                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3)) brightness(1.05)',
                                    }}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img src="/logo.jpg" className="size-full object-cover"/>
                                </motion.div>
                            </div>
                        </Link>

                        {/* Navigation desktop avec composant sophistiqué */}
                        <div
                            className="relative hidden md:block w-full"
                        >
                            <DesktopNav />
                        </div>

                        {/* Actions avec animations Framer Motion */}
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >

                            {/* Favorites avec animation sophistiquée */}
                            <Link href="/favorites" className="relative">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                        <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.3 }}>
                                            <Heart className="h-5 w-5" />
                                        </motion.div>
                                        <AnimatePresence>
                                            {favoritesCount > 0 && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, type: 'spring', stiffness: 500 }}
                                                >
                                                    <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs">
                                                        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                                                            {favoritesCount}
                                                        </motion.span>
                                                    </Badge>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Button>
                                </motion.div>
                            </Link>

                            {/* User Menu avec animations */}
                            {auth.user ? (
                                <Link href="/dashboard">
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
                                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/70">
                                            <motion.div whileHover={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 0.3 }}>
                                                <CircleUser className="h-10 w-10 hover:text-[color:var(--accent-700)]" />
                                            </motion.div>
                                        </Button>
                                    </motion.div>
                                </Link>
                            ) : (
                                <motion.div
                                    className="hidden items-center gap-2 sm:flex"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 }}
                                >
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                                        <Button variant="ghost" asChild className="text-white hover:bg-white/20">
                                            <Link href="/login">Connexion</Link>
                                        </Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                                        <Button asChild className="bg-white text-[color:var(--primary-700)] hover:bg-gray-100">
                                            <Link href="/register">S'inscrire</Link>
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* Bouton menu mobile ultra-moderne avec effets avancés */}
                            <motion.button
                                onClick={() => updateState({ isMenuOpen: !state.isMenuOpen })}
                                className={`md:hidden relative z-50 p-4 rounded-2xl group overflow-hidden
                                    transition-all duration-500 ease-out
                                    ${state.isMenuOpen 
                                        ? 'bg-gradient-to-br from-white via-gray-100 to-gray-200 text-[color:var(--primary-800)] shadow-2xl shadow-[color:var(--primary-500)]/30 scale-110' 
                                        : 'bg-gradient-to-br from-white/10 via-[color:var(--primary-500)]/20 to-white/10 text-white border border-white/20 hover:border-[color:var(--primary-400)]/50 backdrop-blur-xl'}
                                    transform hover:scale-110 active:scale-95 hover:rotate-6 active:rotate-0
                                    shadow-lg hover:shadow-2xl hover:shadow-[color:var(--primary-500)]/30
                                `}
                                aria-label={state.isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                                aria-expanded={state.isMenuOpen}
                                whileHover={{ scale: 1.1, rotate: 3 }}
                                whileTap={{ scale: 0.95, rotate: 0 }}
                                transition={{ duration: 0.2 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                {/* Effet de vague au hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-400)]/0 via-[color:var(--primary-400)]/30 to-[color:var(--primary-400)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl transform -skew-x-12 group-hover:animate-pulse" />
                                
                                {/* Particules flottantes pour le bouton */}
                                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
                                            style={{
                                                top: `${Math.random() * 100}%`,
                                                left: `${Math.random() * 100}%`,
                                                animationDelay: `${i * 200}ms`,
                                                animationDuration: `${2 + Math.random() * 2}s`
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Effet de brillance pour le bouton avec animation */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                <div className="relative w-6 h-6">
                                    <AnimatePresence>
                                        {state.isMenuOpen ? (
                                            <motion.div
                                                key="close"
                                                initial={{ rotate: -90, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: 90, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute inset-0"
                                            >
                                                <X className="h-6 w-6" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="menu"
                                                initial={{ rotate: 90, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: -90, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute inset-0"
                                            >
                                                <Menu className="h-6 w-6" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Système de particules amélioré */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Orbes flottants */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={`orb-${i}`}
                            className="absolute rounded-full bg-gradient-to-r from-[color:var(--primary-400)]/20 to-[color:var(--accent-400)]/20 animate-float"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 15 + 8}px`,
                                height: `${Math.random() * 15 + 8}px`,
                                animationDelay: `${i * 300}ms`,
                                animationDuration: `${3 + Math.random() * 2}s`
                            }}
                        />
                    ))}

                    {/* Étoiles scintillantes */}
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={`star-${i}`}
                            className="absolute"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${i * 400}ms`,
                            }}
                        >
                            <div className="w-1 h-1 bg-white/60 rounded-full animate-twinkle" />
                        </div>
                    ))}

                    {/* Rayons de lumière */}
                    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[color:var(--primary-300)]/30 to-transparent animate-pulse" />
                    <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[color:var(--accent-300)]/20 to-transparent animate-pulse animation-delay-1000" />

                    {/* Soft glowing particles avec animations fluides Framer Motion */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={`glow-${i}`}
                            className="absolute rounded-full bg-white/10"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 8 + 3}px`,
                                height: `${Math.random() * 8 + 3}px`,
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
                                ease: 'easeInOut',
                            }}
                        />
                    ))}

                    {/* Floating orbits avec mouvements complexes */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={`float-${i}`}
                            className="absolute h-1.5 w-1.5 rounded-full bg-white/15"
                            style={{
                                top: `${40 + (i % 2 === 0 ? -15 : 15)}%`,
                                left: `${20 + i * 15}%`,
                            }}
                            animate={{
                                y: [0, -25, 0],
                                x: [0, 15, 0],
                                opacity: [0.4, 0.8, 0.4],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 6 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}

                    {/* Effet de brillance générale amélioré */}
                    <motion.div
                        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: 'linear',
                            repeatDelay: 3,
                        }}
                    />
                </div>
            </motion.header>

            {/* Overlay amélioré avec effet de grain */}
            <AnimatePresence>
                {state.isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden transition-all duration-700 ease-out backdrop-blur-lg bg-gradient-to-br from-[color:var(--primary-900)]/80 via-[color:var(--primary-800)]/60 to-[color:var(--primary-700)]/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => updateState({ isMenuOpen: false })}
                        aria-hidden="true"
                    >
                        <motion.div
                            className="bg-noise absolute inset-0 opacity-30 mix-blend-soft-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                        
                        {/* Effet de particules sur l'overlay */}
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 100}ms`,
                                    animationDuration: `${4 + Math.random() * 3}s`
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Menu mobile avec composant sophistiqué */}
            <MobileNav isOpen={state.isMenuOpen} onClose={() => updateState({ isMenuOpen: false })} />

            {/* Styles pour les animations personnalisées inspirés de GIMEG-GL */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-10px) rotate(120deg); }
                    66% { transform: translateY(-5px) rotate(240deg); }
                }
                
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
                
                @keyframes gradient-x {
                    0%, 100% { transform: translateX(-100%); }
                    50% { transform: translateX(100%); }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-twinkle {
                    animation: twinkle 2s ease-in-out infinite;
                }
                
                .animate-gradient-x {
                    animation: gradient-x 3s ease-in-out infinite;
                }
                
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
                
        .bg-noise {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0);
          background-size: 20px 20px;
        }
      `}</style>
        </>
    );
};

export default Header;
