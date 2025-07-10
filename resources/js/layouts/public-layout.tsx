import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicHeader from '@/components/public-header';
import PublicFooter from '@/components/public-footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { type BreadcrumbItem, type PageProps } from '@/types';
import { type ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
    auth: PageProps['auth'];
    className?: string;
}

export default function PublicLayout({ 
    children, 
    title, 
    description, 
    breadcrumbs, 
    auth,
    className = ""
}: PublicLayoutProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const pageTitle = title ? `${title} - Timmi` : 'Timmi - Plateforme de cours particuliers';
    const pageDescription = description || 'Trouvez le professeur idéal pour votre enfant. Cours particuliers à domicile ou en ligne avec des professeurs qualifiés et vérifiés.';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        setIsLoaded(true);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="/logo-timmi.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content="/logo-timmi.jpg" />
                <meta name="theme-color" content="var(--primary-800)" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="preload" href="/logo-timmi.jpg" as="image" />
            </Head>

            <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
                {/* Loading overlay */}
                                    {!isLoaded && (
                    <div className="fixed inset-0 bg-[var(--primary-900)] z-50 flex items-center justify-center fadeIn">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4 animate-spin" />
                            <p className="text-white text-lg font-medium">
                                Chargement...
                            </p>
                        </div>
                    </div>
                )}

                {/* Header */}
                <PublicHeader auth={auth} />

                {/* Main Content avec padding adaptatif pour le header fixe */}
                <main className={`flex-1 ${className} transition-all duration-500 ease-out`} style={{ paddingTop: isScrolled ? '80px' : '120px' }}>
                    {/* Breadcrumbs avec animation */}
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <div className="border-b bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm sticky top-[80px] z-10 slideInLeft">
                            <div className="container py-4">
                                <Breadcrumbs breadcrumbs={breadcrumbs} />
                            </div>
                        </div>
                    )}

                    {/* Page Content avec animation */}
                    <div className="relative fadeInUp">
                        {children}
                    </div>

                    {/* Scroll indicator */}
                    <div
                        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[var(--primary-500)] to-[var(--accent-500)] z-50 origin-left transition-transform duration-300"
                        style={{
                            transform: `scaleX(${isScrolled ? 1 : 0})`
                        }}
                    />
                </main>

                {/* Footer avec animation d'entrée */}
                <div className="fadeInUp">
                    <PublicFooter />
                </div>

                {/* Background decorative elements */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    {/* Gradient orbs */}
                    <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[var(--primary-500)]/5 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
                    <div className="absolute top-1/3 -right-40 w-80 h-80 bg-[var(--accent-500)]/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
                    <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-[var(--secondary-500)]/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
                </div>

                {/* Back to top button */}
                <button
                    className={`fixed bottom-8 right-8 p-3 bg-[var(--primary-600)] text-white rounded-full shadow-lg hover:bg-[var(--primary-700)] transition-all duration-300 z-40 hover:scale-110 ${
                        isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            </div>

            {/* Styles personnalisés pour les animations */}
            <style>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                }

                .slideInLeft {
                    animation: slideInLeft 0.4s ease-out 0.2s forwards;
                    opacity: 0;
                }

                .fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                /* Smooth scroll behavior */
                html {
                    scroll-behavior: smooth;
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, var(--primary-600), var(--accent-600));
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, var(--primary-700), var(--accent-700));
                }

                /* Selection color */
                ::selection {
                    background-color: var(--primary-200);
                    color: var(--primary-900);
                }
                
                ::-moz-selection {
                    background-color: var(--primary-200);
                    color: var(--primary-900);
                }
            `}</style>
        </>
    );
} 