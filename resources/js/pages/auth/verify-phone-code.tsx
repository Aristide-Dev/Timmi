// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Shield, Sparkles } from 'lucide-react';
import { FormEventHandler } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyPhoneCode({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.phone.verify'));
    };

    return (
        <AuthLayout title="Code de vérification" description="Entrez le code à 6 chiffres que nous avons envoyé par SMS à votre numéro de téléphone.">
            <Head title="Code de vérification" />
            
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
                        className="grid gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Label htmlFor="code" className="text-[color:var(--foreground)] flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[color:var(--primary-500)]" />
                            Code de vérification
                        </Label>
                        <div className="relative group">
                            <Input
                                id="code"
                                type="text"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                placeholder="123456"
                                maxLength={6}
                                className="text-center text-lg tracking-widest h-12 bg-white/50 dark:bg-gray-900/50 border-[color:var(--primary-300)] dark:border-[color:var(--primary-700)] focus:border-[color:var(--primary-500)] dark:focus:border-[color:var(--primary-400)] transition-all duration-300"
                                autoComplete="one-time-code"
                                required
                            />
                            <motion.div
                                className="absolute inset-0 rounded-md bg-gradient-to-r from-[color:var(--primary-400)]/0 via-[color:var(--primary-400)]/10 to-[color:var(--primary-400)]/0 opacity-0 group-hover:opacity-100 pointer-events-none"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </div>
                        <InputError message={errors.code} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
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
                                    <Sparkles className="h-5 w-5" />
                                )}
                                Vérifier le code
                            </span>
                        </Button>
                    </motion.div>
                </div>

                <motion.div 
                    className="text-center text-sm text-muted-foreground space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div>
                        <TextLink href={route('verification.phone.send')} method="post" className="font-semibold text-[color:var(--primary-600)] hover:text-[color:var(--primary-700)] transition-colors">
                            Renvoyer le code
                        </TextLink>
                    </div>
                    
                    <div>
                        <TextLink href={route('logout')} method="post" className="font-semibold text-[color:var(--primary-600)] hover:text-[color:var(--primary-700)] transition-colors">
                            Se déconnecter
                        </TextLink>
                    </div>
                </motion.div>
            </motion.form>

            {/* Messages de statut et d'erreur */}
            <AnimatePresence>
                {status && (
                    <motion.div 
                        className="mb-4 text-center text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg border border-green-200 dark:border-green-800"
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {status}
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
}
