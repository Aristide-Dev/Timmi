import { Link } from '@inertiajs/react';
import { User, GraduationCap, Users, ArrowRight } from 'lucide-react';
import AuthCardLayout from '@/layouts/auth/auth-card-layout';

export default function Onboarding() {
    return (
        <AuthCardLayout
            title="Choisissez votre profil"
            description="Sélectionnez le type de compte qui correspond à vos besoins"
        >
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                {/* Header moderne avec gradient */}
                <div className="text-center space-y-4 mb-12">
                    <div className="inline-block">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-2">
                            Bienvenue sur TIMMI
                        </h1>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    </div>
                    <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                        Rejoignez notre communauté d'éducation et découvrez une nouvelle façon d'apprendre
                    </p>
                </div>

                {/* Cards modernes avec glassmorphism */}
                <div className="grid gap-8 md:grid-cols-3 max-w-5xl w-full">
                    {/* Carte Parent/Élève */}
                    <Link href={route('register', { type: 'parent' })} className="group">
                        <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
                            {/* Gradient d'arrière-plan */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Contenu */}
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Parent / Élève</h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                    Trouvez des professeurs qualifiés et suivez les progrès de vos enfants
                                </p>
                                
                                <div className="space-y-2">
                                    {['Recherche intelligente', 'Réservation simplifiée', 'Suivi en temps réel', 'Paiements sécurisés'].map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Carte Professeur */}
                    <Link href={route('register', { type: 'teacher' })} className="group">
                        <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all duration-300" />
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Professeur</h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                    Partagez votre expertise et développez votre activité d'enseignement
                                </p>
                                
                                <div className="space-y-2">
                                    {['Profile professionnel', 'Planning flexible', 'Gestion automatisée', 'Revenus optimisés'].map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Carte Élève Direct */}
                    <Link href={route('register', { type: 'student' })} className="group">
                        <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <User className="w-8 h-8 text-white" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-300" />
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Élève Direct</h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                    Prenez en main votre apprentissage avec un accompagnement personnalisé
                                </p>
                                
                                <div className="space-y-2">
                                    {['Profil personnalisé', 'Cours adaptés', 'Historique détaillé', 'Progrès mesurables'].map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Footer moderne */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500">
                        Vous avez déjà un compte ?{' '}
                        <Link 
                            href={route('login')} 
                            className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                        >
                            Connectez-vous
                        </Link>
                    </p>
                </div>

                {/* Éléments décoratifs */}
                <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
                </div>
            </div>
        </AuthCardLayout>
    );
}