import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Search, Calendar, User, Clock, ArrowRight, 
  BookOpen, TrendingUp, Star, Tag, Filter,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import PublicLayout from '@/layouts/public-layout'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

// Optimisation des animations
const useOptimizedAnimations = () => {
  const prefersReducedMotion = useReducedMotion()
  
  return useMemo(() => ({
    containerVariants: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.1,
          duration: prefersReducedMotion ? 0.3 : 0.6
        }
      }
    },
    
    itemVariants: {
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: prefersReducedMotion ? 0.3 : 0.5,
          ease: [0.25, 0.46, 0.45, 0.94] as const
        }
      }
    }
  }), [prefersReducedMotion])
}

// Hook pour gérer la performance
const usePerformanceOptimization = () => {
  const [isInView, setIsInView] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true)
      setShouldAnimate(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return { isInView, shouldAnimate }
}

export default function BlogPage() {
  const animations = useOptimizedAnimations()
  const { isInView, shouldAnimate } = usePerformanceOptimization()
  const prefersReducedMotion = useReducedMotion()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Données structurées pour le SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog TIMMI - Conseils et Actualités",
    "description": "Découvrez nos conseils pour l'éducation, les méthodes d'apprentissage et les actualités de TIMMI.",
    "url": typeof window !== 'undefined' ? window.location.origin + '/blog' : '',
    "publisher": {
      "@type": "Organization",
      "name": "TIMMI",
      "url": typeof window !== 'undefined' ? window.location.origin : ''
    }
  }

  const categories = [
    { id: 'all', name: 'Tous les articles', count: 24 },
    { id: 'education', name: 'Éducation', count: 8 },
    { id: 'tips', name: 'Conseils', count: 6 },
    { id: 'news', name: 'Actualités', count: 5 },
    { id: 'methods', name: 'Méthodes', count: 5 }
  ]

  const featuredPost = {
    id: 1,
    title: 'Comment choisir le bon professeur particulier pour votre enfant ?',
    excerpt: 'Découvrez nos conseils d\'experts pour trouver le professeur idéal qui correspondra parfaitement aux besoins et à la personnalité de votre enfant.',
    content: 'Contenu complet de l\'article...',
    author: 'Dr. Marie Dubois',
    authorRole: 'Psychologue de l\'éducation',
    authorAvatar: '/images/authors/marie-dubois.jpg',
    publishedAt: '2024-01-15',
    readTime: '8 min',
    category: 'education',
    tags: ['professeur', 'choix', 'enfant', 'conseils'],
    image: '/images/blog/choisir-professeur.jpg',
    featured: true,
    views: 1250,
    likes: 89
  }

  const blogPosts = [
    {
      id: 1,
      title: 'Comment choisir le bon professeur particulier pour votre enfant ?',
      excerpt: 'Découvrez nos conseils d\'experts pour trouver le professeur idéal qui correspondra parfaitement aux besoins et à la personnalité de votre enfant.',
      author: 'Dr. Marie Dubois',
      authorRole: 'Psychologue de l\'éducation',
      authorAvatar: '/images/authors/marie-dubois.jpg',
      publishedAt: '2024-01-15',
      readTime: '8 min',
      category: 'education',
      tags: ['professeur', 'choix', 'enfant', 'conseils'],
      image: '/images/blog/choisir-professeur.jpg',
      featured: true,
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      title: 'Les 10 méthodes d\'apprentissage les plus efficaces en 2024',
      excerpt: 'Explorez les techniques d\'apprentissage modernes qui révolutionnent l\'éducation et aident les étudiants à mieux retenir et comprendre.',
      author: 'Prof. Jean Martin',
      authorRole: 'Spécialiste en pédagogie',
      authorAvatar: '/images/authors/jean-martin.jpg',
      publishedAt: '2024-01-12',
      readTime: '12 min',
      category: 'methods',
      tags: ['apprentissage', 'méthodes', 'pédagogie', 'efficacité'],
      image: '/images/blog/methodes-apprentissage.jpg',
      featured: false,
      views: 980,
      likes: 67
    },
    {
      id: 3,
      title: 'Comment motiver son enfant à faire ses devoirs ?',
      excerpt: 'Des stratégies pratiques et bienveillantes pour transformer le moment des devoirs en expérience positive et productive.',
      author: 'Sophie Leroy',
      authorRole: 'Coach parental',
      authorAvatar: '/images/authors/sophie-leroy.jpg',
      publishedAt: '2024-01-10',
      readTime: '6 min',
      category: 'tips',
      tags: ['motivation', 'devoirs', 'parentalité', 'conseils'],
      image: '/images/blog/motiver-enfant.jpg',
      featured: false,
      views: 1450,
      likes: 112
    },
    {
      id: 4,
      title: 'TIMMI lance de nouvelles fonctionnalités pour l\'apprentissage',
      excerpt: 'Découvrez les dernières améliorations de notre plateforme qui facilitent encore plus l\'apprentissage et la communication.',
      author: 'Équipe TIMMI',
      authorRole: 'Développement produit',
      authorAvatar: '/images/authors/equipe-timmi.jpg',
      publishedAt: '2024-01-08',
      readTime: '5 min',
      category: 'news',
      tags: ['nouveautés', 'plateforme', 'fonctionnalités', 'mise à jour'],
      image: '/images/blog/nouvelles-fonctionnalites.jpg',
      featured: false,
      views: 750,
      likes: 45
    },
    {
      id: 5,
      title: 'L\'importance du soutien scolaire personnalisé',
      excerpt: 'Pourquoi un accompagnement sur mesure est essentiel pour la réussite scolaire et comment l\'adapter à chaque enfant.',
      author: 'Dr. Pierre Moreau',
      authorRole: 'Directeur pédagogique',
      authorAvatar: '/images/authors/pierre-moreau.jpg',
      publishedAt: '2024-01-05',
      readTime: '10 min',
      category: 'education',
      tags: ['soutien scolaire', 'personnalisation', 'réussite', 'accompagnement'],
      image: '/images/blog/soutien-personnalise.jpg',
      featured: false,
      views: 1100,
      likes: 78
    },
    {
      id: 6,
      title: 'Comment gérer le stress des examens ?',
      excerpt: 'Des techniques éprouvées pour aider votre enfant à surmonter l\'anxiété liée aux examens et à performer au mieux.',
      author: 'Dr. Claire Bernard',
      authorRole: 'Psychologue clinicienne',
      authorAvatar: '/images/authors/claire-bernard.jpg',
      publishedAt: '2024-01-03',
      readTime: '7 min',
      category: 'tips',
      tags: ['stress', 'examens', 'anxiété', 'performance'],
      image: '/images/blog/gestion-stress.jpg',
      featured: false,
      views: 1350,
      likes: 95
    },
    {
      id: 7,
      title: 'Les avantages des cours particuliers en ligne',
      excerpt: 'Découvrez pourquoi l\'enseignement à distance peut être aussi efficace, voire plus, que les cours en présentiel.',
      author: 'Marc Lefebvre',
      authorRole: 'Professeur de mathématiques',
      authorAvatar: '/images/authors/marc-lefebvre.jpg',
      publishedAt: '2024-01-01',
      readTime: '9 min',
      category: 'methods',
      tags: ['cours en ligne', 'enseignement', 'distance', 'efficacité'],
      image: '/images/blog/cours-en-ligne.jpg',
      featured: false,
      views: 920,
      likes: 63
    },
    {
      id: 8,
      title: 'Comment créer un environnement d\'étude optimal ?',
      excerpt: 'Aménagez un espace de travail qui favorise la concentration et l\'apprentissage de votre enfant.',
      author: 'Isabelle Petit',
      authorRole: 'Ergonome spécialisée en éducation',
      authorAvatar: '/images/authors/isabelle-petit.jpg',
      publishedAt: '2023-12-28',
      readTime: '6 min',
      category: 'tips',
      tags: ['environnement', 'étude', 'concentration', 'aménagement'],
      image: '/images/blog/environnement-etude.jpg',
      featured: false,
      views: 800,
      likes: 52
    },
    {
      id: 9,
      title: 'TIMMI reçoit le prix de l\'innovation éducative 2024',
      excerpt: 'Notre plateforme a été récompensée pour son approche innovante de l\'enseignement personnalisé et sa technologie avancée.',
      author: 'Équipe TIMMI',
      authorRole: 'Communication',
      authorAvatar: '/images/authors/equipe-timmi.jpg',
      publishedAt: '2023-12-25',
      readTime: '4 min',
      category: 'news',
      tags: ['prix', 'innovation', 'récompense', 'reconnaissance'],
      image: '/images/blog/prix-innovation.jpg',
      featured: false,
      views: 650,
      likes: 38
    }
  ]

  // Filtrer les articles
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    return filtered
  }, [searchTerm, selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      education: 'bg-blue-500',
      tips: 'bg-green-500',
      news: 'bg-purple-500',
      methods: 'bg-orange-500'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-500'
  }

  const getCategoryName = (category: string) => {
    const names = {
      education: 'Éducation',
      tips: 'Conseils',
      news: 'Actualités',
      methods: 'Méthodes'
    }
    return names[category as keyof typeof names] || category
  }

  return (
    <PublicLayout>
      <Head title="Blog - TIMMI - Conseils et Actualités">
        <meta name="description" content="Découvrez nos conseils pour l'éducation, les méthodes d'apprentissage et les actualités de TIMMI." />
        <meta name="keywords" content="blog éducation, conseils parents, méthodes apprentissage, actualités TIMMI" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog - TIMMI - Conseils et Actualités" />
        <meta property="og:description" content="Découvrez nos conseils pour l'éducation, les méthodes d'apprentissage et les actualités de TIMMI." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Blog - TIMMI - Conseils et Actualités" />
        <meta property="twitter:description" content="Découvrez nos conseils pour l'éducation, les méthodes d'apprentissage et les actualités de TIMMI." />
        
        {/* Données structurées */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
          
          <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            variants={animations.containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="text-center max-w-4xl mx-auto">
              <motion.div variants={animations.itemVariants}>
                <Badge 
                  variant="secondary" 
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300 px-4 py-2 text-sm font-medium mb-6"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Conseils d'experts</span>
                  <div className="h-4 w-px bg-primary/30" />
                  <span className="text-xs opacity-90">Éducation</span>
                </Badge>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground mb-6"
                variants={animations.itemVariants}
              >
                Blog{' '}
                <motion.span 
                  className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary inline-block"
                  animate={prefersReducedMotion ? {} : { 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                >
                  TIMMI
                </motion.span>
              </motion.h1>

              <motion.p 
                className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
                variants={animations.itemVariants}
              >
                Découvrez nos conseils d'experts, méthodes d'apprentissage innovantes 
                et actualités pour accompagner l'éducation de vos enfants.
              </motion.p>

              {/* Barre de recherche */}
              <motion.div 
                className="max-w-2xl mx-auto relative"
                variants={animations.itemVariants}
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher un article..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg border-2 border-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Filtres par catégorie */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="ml-1">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article en vedette */}
        {selectedCategory === 'all' && !searchTerm && (
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
              >
                <div className="flex items-center gap-2 mb-8">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-2xl font-bold text-foreground">Article en vedette</h2>
                </div>
                
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-auto">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getCategoryColor(featuredPost.category)} text-white`}>
                          {getCategoryName(featuredPost.category)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(featuredPost.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                        {featuredPost.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{featuredPost.views} vues</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            <span>{featuredPost.likes} likes</span>
                          </div>
                        </div>
                        
                        <Button asChild>
                          <Link href={`/blog/${featuredPost.id}`}>
                            Lire l'article
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>
        )}

        {/* Liste des articles */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {searchTerm ? `Résultats pour "${searchTerm}"` : 'Tous les articles'}
                </h2>
                <div className="text-sm text-muted-foreground">
                  {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''}
                </div>
              </div>

              {paginatedPosts.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aucun article trouvé
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Essayez avec d'autres mots-clés ou explorez nos catégories.
                  </p>
                  <Button onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}>
                    Voir tous les articles
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                        <div className="relative h-48">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className={`${getCategoryColor(post.category)} text-white`}>
                              {getCategoryName(post.category)}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardHeader className="p-6">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          
                          <CardTitle className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                            {post.title}
                          </CardTitle>
                          
                          <CardDescription className="text-muted-foreground line-clamp-3">
                            {post.excerpt}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="p-6 pt-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                <span>{post.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                <span>{post.likes}</span>
                              </div>
                            </div>
                            
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/blog/${post.id}`}>
                                Lire
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                <Tag className="h-2 w-2 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center gap-2 mt-12"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Restez informé
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Recevez nos derniers conseils et actualités directement dans votre boîte email.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1"
                />
                <Button className="px-8">
                  S'abonner
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                Pas de spam, désabonnement possible à tout moment.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}
