import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, Star, Users, Shield, Zap, Globe, 
  FileText, MessageCircle, Sparkles 
} from 'lucide-react'
import { PagePropsWithData } from '@/types/global'
import PublicLayout from '@/layouts/public-layout'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Animations variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

interface HomePageProps extends Record<string, unknown> {
  stats: {
    total_users: number
    total_articles: number
    total_services: number
  }
}

export default function HomePage({ stats }: PagePropsWithData<HomePageProps>) {
  return (
    <PublicLayout>
      <Head title="Accueil - Application Moderne" />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section avec effets sophistiqués */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 text-white py-20 lg:py-32">
          {/* Particules décoratives */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-white/20"
                style={{
                  top: `${15 + i * 8}%`,
                  left: `${5 + i * 8}%`,
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                  y: [0, -20, 0],
                  x: [0, Math.random() * 12 - 6, 0],
                }}
                transition={{
                  duration: 5 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Effet de brillance animé */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/8 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 5
              }}
            />
          </div>

          <motion.div 
            className="container mx-auto px-4 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="space-y-6"
                variants={itemVariants}
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="inline-flex items-center gap-2 bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Star className="h-4 w-4" />
                    </motion.div>
                    Application moderne
                  </Badge>
                </motion.div>

                <motion.h1 
                  className="text-4xl lg:text-6xl font-bold leading-tight"
                  variants={itemVariants}
                >
                  Bienvenue dans votre 
                  <motion.span 
                    className="text-yellow-300 inline-block ml-2"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    nouvelle application
                  </motion.span>
                </motion.h1>

                <motion.p 
                  className="text-xl lg:text-2xl text-white/90 max-w-2xl"
                  variants={itemVariants}
                >
                  Une plateforme moderne et intuitive conçue pour vous offrir 
                  la meilleure expérience utilisateur possible.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  variants={itemVariants}
                >
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90 group relative overflow-hidden"
                    asChild
                  >
                    <Link href="/dashboard">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="mr-2"
                      >
                        <Zap className="h-5 w-5" />
                      </motion.div>
                      Commencer
                    </Link>
                  </Button>

                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 group relative overflow-hidden"
                    asChild
                  >
                    <Link href="/about">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                      En savoir plus
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="relative"
                variants={itemVariants}
              >
                <div className="aspect-square relative bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition-colors">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    {[
                      { Icon: FileText, delay: 0 },
                      { Icon: Users, delay: 0.2 },
                      { Icon: MessageCircle, delay: 0.4 },
                      { Icon: Globe, delay: 0.6 }
                    ].map(({ Icon, delay }, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 group relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        />
                        <motion.div
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="flex items-center justify-center"
                        >
                          <Icon className="h-8 w-8 text-white relative z-10" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section avec animations */}
        <motion.section 
          className="py-16 bg-white border-b relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Effet de brillance décoratif */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Users, 
                  value: stats?.total_users?.toLocaleString() || '5,000',
                  label: 'Utilisateurs actifs',
                  color: 'bg-blue-500'
                },
                { 
                  icon: FileText, 
                  value: stats?.total_articles?.toLocaleString() || '1,200',
                  label: 'Articles publiés',
                  color: 'bg-green-500'
                },
                { 
                  icon: Globe, 
                  value: stats?.total_services?.toLocaleString() || '850',
                  label: 'Services disponibles',
                  color: 'bg-purple-500'
                }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center group"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.div 
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative",
                      "bg-gradient-to-br from-primary/10 to-primary/20"
                    )}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <stat.icon className="h-8 w-8 text-primary" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl font-bold text-gray-900 mb-2 relative"
                    variants={itemVariants}
                  >
                    {stat.value}
                    <span className="text-primary">+</span>
                  </motion.h3>
                  
                  <motion.p 
                    className="text-muted-foreground"
                    variants={itemVariants}
                  >
                    {stat.label}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section avec animations */}
        <motion.section 
          className="py-16 bg-gray-50 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Effet de vague décoratif */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute bottom-0 left-0 right-0 h-64 opacity-30"
                style={{
                  backgroundImage: `linear-gradient(to right, transparent, var(--primary-500)/${10 - i * 2}%, transparent)`,
                  transform: `translateY(${i * 10}px)`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="text-center mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2"
                variants={itemVariants}
              >
                Pourquoi nous choisir ?
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6 text-primary" />
                </motion.div>
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                variants={itemVariants}
              >
                Découvrez les avantages qui font de notre plateforme le choix idéal
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Performance optimale',
                  description: 'Une expérience utilisateur fluide et rapide sur tous les appareils',
                  color: 'green'
                },
                {
                  icon: Shield,
                  title: 'Sécurité avancée',
                  description: 'Vos données sont protégées par les dernières technologies de sécurité',
                  color: 'blue'
                },
                {
                  icon: MessageCircle,
                  title: 'Support réactif',
                  description: 'Notre équipe est disponible pour vous accompagner dans vos projets',
                  color: 'purple'
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="text-center group relative"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                      `bg-${feature.color}-100 relative overflow-hidden`
                    )}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <feature.icon className={`h-8 w-8 text-${feature.color}-600 relative z-10`} />
                    </motion.div>
                  </motion.div>

                  <motion.h3 
                    className="text-xl font-semibold text-gray-900 mb-2"
                    variants={itemVariants}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground"
                    variants={itemVariants}
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </PublicLayout>
  )
} 