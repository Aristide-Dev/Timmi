import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Déclaration de la fonction route pour TypeScript


import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Connectez-vous à votre compte" description="Entrez votre email et mot de passe ci-dessous pour vous connecter">
            <Head title="Connexion" />
            
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
                        <Label htmlFor="email" className="text-[color:var(--foreground)] flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[color:var(--primary-500)]" />
                            Adresse email
                        </Label>
                        <div className="relative group">
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@exemple.com"
                                className="pl-10 pr-4 h-12 bg-white/50 dark:bg-gray-900/50 border-[color:var(--primary-300)] dark:border-[color:var(--primary-700)] focus:border-[color:var(--primary-500)] dark:focus:border-[color:var(--primary-400)] transition-all duration-300"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[color:var(--primary-400)] pointer-events-none" />
                            <motion.div
                                className="absolute inset-0 rounded-md bg-gradient-to-r from-[color:var(--primary-400)]/0 via-[color:var(--primary-400)]/10 to-[color:var(--primary-400)]/0 opacity-0 group-hover:opacity-100 pointer-events-none"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </div>
                        <InputError message={errors.email} />
                    </motion.div>

                    <motion.div 
                        className="grid gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex items-center">
                            <Label htmlFor="password" className="text-[color:var(--foreground)] flex items-center gap-2">
                                <Lock className="w-4 h-4 text-[color:var(--primary-500)]" />
                                Mot de passe
                            </Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm hover:text-[color:var(--primary-600)] transition-colors" tabIndex={5}>
                                    Mot de passe oublié ?
                                </TextLink>
                            )}
                        </div>
                        <div className="relative group">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Entrez votre mot de passe"
                                className="pl-10 pr-12 h-12 bg-white/50 dark:bg-gray-900/50 border-[color:var(--primary-300)] dark:border-[color:var(--primary-700)] focus:border-[color:var(--primary-500)] dark:focus:border-[color:var(--primary-400)] transition-all duration-300"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[color:var(--primary-400)] pointer-events-none" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--primary-400)] hover:text-[color:var(--primary-600)] transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                            <motion.div
                                className="absolute inset-0 rounded-md bg-gradient-to-r from-[color:var(--primary-400)]/0 via-[color:var(--primary-400)]/10 to-[color:var(--primary-400)]/0 opacity-0 group-hover:opacity-100 pointer-events-none"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </div>
                        <InputError message={errors.password} />
                    </motion.div>

                    <motion.div 
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                            className="border-[color:var(--primary-400)] data-[state=checked]:bg-[color:var(--primary-500)] data-[state=checked]:border-[color:var(--primary-500)]"
                        />
                        <Label htmlFor="remember" className="text-[color:var(--foreground)] cursor-pointer">Se souvenir de moi</Label>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Button 
                            type="submit" 
                            className="mt-4 w-full h-12 bg-gradient-to-r from-[color:var(--primary-500)] to-[color:var(--accent-500)] hover:from-[color:var(--primary-600)] hover:to-[color:var(--accent-600)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group" 
                            tabIndex={4} 
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
                                Se connecter
                            </span>
                        </Button>
                    </motion.div>
                </div>

                <motion.div 
                    className="text-center text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    Vous n'avez pas de compte ?{' '}
                    <TextLink href={route('register')} tabIndex={5} className="font-semibold text-[color:var(--primary-600)] hover:text-[color:var(--primary-700)] transition-colors">
                        S'inscrire
                    </TextLink>
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
                
                {/* Messages d'erreur généraux */}
                {(errors.email || errors.password) && (
                    <motion.div 
                        className="mb-4 text-center text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800"
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {errors.email && <div>Erreur email : {errors.email}</div>}
                        {errors.password && <div>Erreur mot de passe : {errors.password}</div>}
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
}