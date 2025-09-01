// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Phone } from 'lucide-react';
import { FormEventHandler } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyPhone({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.phone.send'));
    };

    return (
        <AuthLayout title="Vérification du téléphone" description="Veuillez vérifier votre numéro de téléphone en entrant le code que nous venons de vous envoyer par SMS.">
            <Head title="Vérification du téléphone" />
            
            {/* Particules flottantes en arrière-plan */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[color:var(--primary-400)]/20 rounded-full"
                        initial={{ 
                            x: Math.random() * 400 - 200,
                            y: Math.random() * 400 - 200,
                        }}
                        animate={{ 
                            x: Math.random() * 400 - 200,
                            y: Math.random() * 400 - 200,
                        }}
                        transition={{ 
                            duration: 20 + Math.random() * 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear"
                        }}
                        style={{
                            left: '50%',
                            top: '50%',
                        }}
                    />
                ))}
            </div>

            <motion.form 
                className="flex flex-col gap-6" 
                onSubmit={submit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Button 
                            type="submit" 
                            className="mt-4 w-full h-12 bg-gradient-to-r from-[color:var(--primary-500)] to-[color:var(--accent-500)] hover:from-[color:var(--primary-600)] hover:to-[color:var(--accent-600)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group" 
                            disabled={processing}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {processing ? (
                                    <LoaderCircle className="h-5 w-5 animate-spin" />
                                ) : (
                                    <Phone className="h-5 w-5" />
                                )}
                                Renvoyer le code de vérification
                            </span>
                        </Button>
                    </motion.div>
                </div>

                <motion.div 
                    className="text-center text-sm text-muted-foreground space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div>
                        <TextLink href={route('logout')} method="post" className="font-semibold text-[color:var(--primary-600)] hover:text-[color:var(--primary-700)] transition-colors">
                            Se déconnecter
                        </TextLink>
                    </div>
                </motion.div>
            </motion.form>

            {/* Messages de statut et d'erreur */}
            <AnimatePresence>
                {status === 'phone-verification-sent' && (
                    <motion.div 
                        className="mb-4 text-center text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg border border-green-200 dark:border-green-800"
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        Un nouveau code de vérification a été envoyé par SMS à votre numéro de téléphone.
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
}
