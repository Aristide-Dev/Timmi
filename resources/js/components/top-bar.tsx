import React, { useState, useCallback } from 'react';
import { Phone, Mail, Search, X, Globe, Sparkles } from 'lucide-react';
import { router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export const TopBar = () => {
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            // Animation d'erreur plus élégante
            const input = document.querySelector('input[type="text"]') as HTMLInputElement;
            if (input) {
                input.classList.add('animate-pulse');
                setTimeout(() => input.classList.remove('animate-pulse'), 1000);
            }
            return;
        }

        setLoading(true);
        router.get('/search', {
            q: searchQuery
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
                setShowSearchInput(false);
                setSearchQuery('');
            },
            onError: () => {
                setLoading(false);
            }
        });
    }, [searchQuery]);

    return (
        <motion.div 
            className="bg-gradient-to-r from-slate-800 via-primary to-slate-800 text-white shadow-xl border-none relative overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Effet de brillance décoratif */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-50" />
            
            {/* Particules décoratives avec mouvement fluide */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/20"
                        style={{
                            top: `${15 + i * 15}%`,
                            left: `${5 + i * 15}%`,
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
                            ease: "easeInOut"
                        }}
                    />
                ))}
                
                {/* Effet de brillance supplémentaire */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "linear",
                        repeatDelay: 2
                    }}
                />
            </div>

            <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 relative z-10">
                {/* Left Section: Logos et branding sophistiqué */}
                <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8 w-full lg:w-auto">
                    <div className="flex items-center space-x-6">
                        {/* Logo principal avec effet glassmorphism avancé */}
                        <motion.div 
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -inset-3 bg-gradient-to-br from-white/15 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
                            <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 group-hover:border-white/40 transition-all duration-300 shadow-lg">
                                <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                                    <span className="text-white font-bold text-xl">M</span>
                                    {/* Effet de brillance interne */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Branding text avec hiérarchie sophistiquée */}
                        <motion.div 
                            className="relative group"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -inset-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <h1 className="text-xl font-bold tracking-wide text-white flex items-center gap-2">
                                    MyApp Platform
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Sparkles size={16} className="text-yellow-300" />
                                    </motion.div>
                                </h1>
                                <p className="text-xs text-white/70 tracking-wider uppercase font-medium">
                                    Solutions Technologiques Modernes
                                </p>
                            </div>
                        </motion.div>

                        {/* Badge technologique avec animations */}
                        <motion.div 
                            className="hidden xl:flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 group relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform -skew-x-12" />
                            <Globe size={14} className="text-emerald-300 relative z-10" />
                            <span className="text-xs font-medium text-white/90 relative z-10">Laravel 12 • React 19 • TypeScript</span>
                        </motion.div>
                    </div>

                    {/* Section contact avec effets sophistiqués */}
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-white/90">
                        <motion.a
                            href="tel:+33123456789"
                            className="flex items-center space-x-3 group hover:text-white transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/10 relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300 group-hover:shadow-lg relative z-10">
                                <Phone size={16} className="text-white" />
                            </div>
                            <span className="text-sm font-medium tracking-wide relative z-10">
                                +33 1 23 45 67 89
                            </span>
                        </motion.a>
                        
                        <motion.a
                            href="mailto:contact@myapp.fr"
                            className="flex items-center space-x-3 group hover:text-white transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/10 relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300 group-hover:shadow-lg relative z-10">
                                <Mail size={16} className="text-white" />
                            </div>
                            <span className="text-sm font-medium tracking-wide relative z-10">
                                contact@myapp.fr
                            </span>
                        </motion.a>
                    </div>
                </div>

                {/* Right Section: Recherche ultra-sophistiquée */}
                <div className="flex items-center relative w-full lg:w-auto justify-end">
                    <AnimatePresence mode="wait">
                        {showSearchInput ? (
                            <motion.form
                                key="search-form"
                                onSubmit={handleSearch}
                                className="flex items-center w-full lg:w-80 transition-all duration-300 ease-in-out"
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <div className="relative w-full group">
                                    {/* Effet de glassmorphism sophistiqué au focus */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-focus-within:opacity-100 transition-all duration-300 blur-md" />
                                    
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Rechercher du contenu, articles, services..."
                                        className="relative w-full px-5 py-3 pl-12 pr-12 rounded-full 
                                            bg-white/10 text-white 
                                            placeholder-white/50 
                                            border border-white/20 
                                            focus:outline-none 
                                            focus:ring-2 focus:ring-white/40
                                            focus:bg-white/15
                                            focus:border-white/30
                                            transition-all duration-300
                                            backdrop-blur-md
                                            hover:bg-white/12
                                            shadow-lg
                                            focus:shadow-xl focus:shadow-white/10"
                                        autoFocus
                                        aria-label="Champ de recherche"
                                    />
                                    
                                    {/* Icône de recherche avec animation sophistiquée */}
                                    <motion.div
                                        className="absolute left-4 top-1/2 -translate-y-1/2"
                                        animate={{ 
                                            scale: loading ? [1, 1.2, 1] : [1, 1.1, 1],
                                            rotate: loading ? 360 : 0
                                        }}
                                        transition={{ 
                                            scale: { duration: 2, repeat: Infinity },
                                            rotate: { duration: loading ? 1 : 0.3, repeat: loading ? Infinity : 0, ease: "linear" }
                                        }}
                                    >
                                        <Search size={18} className="text-white/70 group-focus-within:text-white/90 transition-colors" />
                                    </motion.div>
                                    
                                    {/* Bouton de fermeture ultra-élégant */}
                                    <motion.button
                                        type="button"
                                        onClick={() => {
                                            setShowSearchInput(false);
                                            setSearchQuery('');
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 
                                            text-white/60 hover:text-white 
                                            bg-white/10 hover:bg-red-500/20
                                            p-1.5 rounded-full
                                            transition-all duration-200
                                            hover:scale-110
                                            border border-white/10 hover:border-red-400/30"
                                        aria-label="Fermer la recherche"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <X size={16} />
                                    </motion.button>
                                    
                                    {/* Indicateur de chargement sophistiqué */}
                                    {loading && (
                                        <motion.div
                                            className="absolute right-12 top-1/2 -translate-y-1/2"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                        >
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-blue-400 rounded-full animate-spin" />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.form>
                        ) : (
                            <motion.button
                                key="search-button"
                                onClick={() => setShowSearchInput(true)}
                                className="text-white/90 hover:text-white 
                                    bg-white/10 hover:bg-white/20 
                                    p-3 rounded-full 
                                    transition-all duration-300 
                                    flex items-center justify-center
                                    hover:shadow-xl hover:shadow-white/10
                                    backdrop-blur-md
                                    border border-white/20
                                    hover:border-white/40
                                    group relative overflow-hidden"
                                aria-label="Ouvrir la recherche"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Effet de brillance circulaire au hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-45" />
                                
                                <Search size={18} className="relative z-10" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default TopBar;