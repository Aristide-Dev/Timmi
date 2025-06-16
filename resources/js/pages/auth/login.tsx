import React from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';

export default function Login() {
    return (
        <PublicLayout
            title="Connexion - MyApp"
            description="Connectez-vous à votre compte MyApp pour accéder à toutes les fonctionnalités."
        >
            <div className="min-h-screen flex items-center justify-center py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Carte de connexion */}
                        <div className="glass rounded-2xl p-8 border border-primary-200">
                            <div className="text-center mb-8">
                                <motion.div
                                    className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <User className="w-8 h-8 text-white" />
                                </motion.div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Connexion</h1>
                                <p className="text-muted-foreground">
                                    Page de connexion temporaire
                                </p>
                            </div>

                            {/* Formulaire */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                            type="email"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                                            placeholder="votre@email.com"
                                        />
                                    </div>
                    </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mot de passe
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                            type="password"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                                            placeholder="••••••••"
                                        />
                    </div>
                    </div>

                                <Button className="w-full gradient-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-primary transition-all duration-300">
                                    Se connecter
                                    <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>

                            {/* Note */}
                            <div className="mt-6 p-4 bg-info-50 border border-info-200 rounded-xl">
                                <p className="text-sm text-info-700 text-center">
                                    <strong>Note :</strong> Cette page est temporaire. Le système d'authentification complet sera implémenté prochainement.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </PublicLayout>
    );
}
