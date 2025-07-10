import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X, Search, Phone, Mail, MapPin, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageProps } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface PublicHeaderProps {
    auth: PageProps['auth'];
}

export default function PublicHeader({ auth }: PublicHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navigationItems = [
        { href: '/', label: 'Accueil' },
        { href: '/teachers', label: 'Professeurs' },
        { href: '/subjects', label: 'Matières' },
        { href: '/how-it-works', label: 'Comment ça marche' },
        { href: '/about', label: 'À propos' },
        { href: '/contact', label: 'Contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (isMenuOpen) {
                setVisible(true);
                return;
            }

            const currentScrollPos = window.scrollY;
            const isScrollingDown = prevScrollPos < currentScrollPos;
            
            setVisible(currentScrollPos < 10 || !isScrollingDown);
            setIsScrolled(currentScrollPos > 20);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Implement search logic here
            console.log('Searching for:', searchQuery);
            setShowSearch(false);
            setSearchQuery('');
        }
    };

    return (
        <>
            <header 
                className={`fixed w-full transition-all duration-700 ease-out z-50
                    ${visible ? 'translate-y-0' : '-translate-y-full'}
                    ${isScrolled 
                        ? 'bg-gradient-to-r from-[var(--primary-900)]/95 via-[var(--primary-800)]/95 to-[var(--primary-700)]/95 shadow-2xl border-b border-white/10' 
                        : 'bg-gradient-to-r from-[var(--primary-800)]/90 via-[var(--primary-700)]/90 to-[var(--primary-600)]/90'}
                    backdrop-blur-xl backdrop-saturate-150
                `}
            >
                {/* Effet de brillance subtil */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-700)] via-[var(--primary-900)] to-[var(--primary-700)] opacity-30" />
                
                {/* TopBar */}
                <div 
                    className={`w-full transition-all duration-700 ease-out overflow-hidden border-b border-white/10
                        ${isScrolled && !isMenuOpen 
                            ? 'opacity-0 h-0 transform -translate-y-full scale-95' 
                            : 'opacity-100 transform translate-y-0 scale-100'}
                    `}
                >
                                            <div className="bg-gradient-to-r from-[var(--primary-700)] via-[var(--primary-900)] to-[var(--primary-700)] text-white">
                        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            {/* Left Section: Contact Info */}
                            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-white/90 text-sm">
                                <div className="flex items-center space-x-2 group hover:text-white transition-colors duration-300">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                                        <Phone size={14} className="text-white" />
                                    </div>
                                    <span className="font-medium">+224 620 00 00 00</span>
                                </div>
                                <div className="flex items-center space-x-2 group hover:text-white transition-colors duration-300">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                                        <Mail size={14} className="text-white" />
                                    </div>
                                    <span className="font-medium">contact@timmi.gn</span>
                                </div>
                                <div className="flex items-center space-x-2 group hover:text-white transition-colors duration-300">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                                        <MapPin size={14} className="text-white" />
                                    </div>
                                    <span className="font-medium">Conakry, Guinée</span>
                                </div>
                            </div>

                            {/* Right Section: Search */}
                            <div className="flex items-center relative">
                                {showSearch ? (
                                    <form onSubmit={handleSearch} className="flex items-center w-full md:w-72 transition-all duration-300">
                                        <div className="relative w-full group">
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Rechercher..."
                                                className="w-full px-4 py-2 pl-10 rounded-full bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all duration-300"
                                                autoFocus
                                            />
                                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowSearch(false);
                                                    setSearchQuery('');
                                                }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <button
                                        onClick={() => setShowSearch(true)}
                                        className="text-white/90 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 flex items-center justify-center hover:shadow-lg"
                                    >
                                        <Search size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <div className="w-full px-4 container relative">
                    <div className={`flex items-center justify-between transition-all duration-500 ease-out
                        ${isScrolled && !isMenuOpen ? 'py-3' : 'py-4'}
                    `}>
                        {/* Logo avec effets */}
                        <Link 
                            href="/" 
                            className="flex items-center group relative overflow-hidden rounded-2xl p-2 -m-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-2xl backdrop-blur-sm border border-white/10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out rounded-2xl transform -skew-x-12" />
                            
                            <div className="relative flex items-center space-x-3">
                                <div className="rounded-xl bg-white/10 group-hover:bg-white/20 transition-all duration-300 p-1">
                                    <img 
                                        src="/img/logo-timmi.jpg" 
                                        alt="Logo Timmi" 
                                        className={`transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:brightness-110 rounded-lg ${isScrolled && !isMenuOpen ? 'h-12 w-full' : 'h-16 w-full'}`}
                                    />
                                </div>
                                <span className={`font-bold text-white transition-all duration-500 ${isScrolled && !isMenuOpen ? 'text-xl' : 'text-2xl'}`}>
                                    Timmi
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all duration-300"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Auth Section */}
                        <div className="hidden md:flex items-center space-x-4">
                            {auth.user ? (
                                <>
                                    <Link 
                                        href={route('dashboard')} 
                                        className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors duration-300"
                                    >
                                        <User className="h-4 w-4" />
                                        <span className="text-sm font-medium">{auth.user.name}</span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        href={route('login')} 
                                        className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-300"
                                    >
                                        <LogIn className="h-4 w-4" />
                                        <span className="text-sm font-medium">Se connecter</span>
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button 
                                            size="sm" 
                                            className="bg-white text-[var(--primary-500)] hover:bg-white/90 font-medium transition-all duration-300 hover:shadow-lg"
                                        >
                                            S'inscrire
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`lg:hidden relative z-50 p-3 rounded-2xl transition-all duration-500 ease-out
                                ${isMenuOpen 
                                    ? 'bg-gradient-to-br from-white via-gray-50 to-gray-100 text-[var(--primary-800)] hover:from-gray-50 hover:to-white shadow-2xl border border-white/50' 
                                    : 'hover:bg-gradient-to-br hover:from-white/20 hover:via-white/15 hover:to-white/10 text-white border border-white/10 hover:border-white/30 backdrop-blur-sm'}
                                transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-2xl
                            `}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                            <div className="relative w-6 h-6">
                                <X className={`absolute inset-0 transition-all duration-400 ease-out ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-75'}`} />
                                <Menu className={`absolute inset-0 transition-all duration-400 ease-out ${isMenuOpen ? 'opacity-0 -rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Effet de particules subtil */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={`glow-${i}`}
                            className="absolute rounded-full bg-white/10 animate-ping"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 8 + 3}px`,
                                height: `${Math.random() * 8 + 3}px`,
                                animationDelay: `${i * 600}ms`,
                            }}
                        />
                    ))}
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Navigation Menu */}
            <motion.div 
                className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 rounded-l-3xl overflow-hidden flex flex-col lg:hidden`}
                initial={{ x: "100%" }}
                animate={{ x: isMenuOpen ? 0 : "100%" }}
                transition={{ 
                    type: "spring", 
                    damping: 30, 
                    stiffness: 300,
                    mass: 1
                }}
            >
                <div className="p-4 flex justify-between items-center border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                        <img 
                            src="/img/logo-timmi.jpg" 
                            alt="Logo Timmi" 
                            className="h-16 w-full rounded-md"
                        />
                        <span className="text-xl font-semibold text-[var(--primary-500)]">Timmi</span>
                    </div>
                    <button 
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto">
                    <div className="py-4">
                        <ul className="space-y-2 px-3">
                            {navigationItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center py-3 px-4 rounded-xl text-gray-800 hover:bg-[var(--primary-50)] hover:text-[var(--primary-600)] transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Mobile Auth Section */}
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    {auth.user ? (
                        <div className="space-y-3">
                            <div className="text-center">
                                <p className="font-medium text-gray-900">{auth.user.name}</p>
                            </div>
                            <Link 
                                href={route('dashboard')} 
                                className="block w-full bg-primary text-white text-center py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Tableau de bord
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <Link 
                                href={route('login')} 
                                className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Se connecter
                            </Link>
                            <Link 
                                href={route('register')}
                                className="block w-full bg-[var(--primary-500)] text-white text-center py-3 rounded-lg font-medium hover:bg-[var(--primary-600)] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                S'inscrire
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
} 