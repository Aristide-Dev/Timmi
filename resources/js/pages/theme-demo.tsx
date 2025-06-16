import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Eye, 
  Sparkles, 
  Heart, 
  Zap, 
  Settings, 
  RefreshCw, 
  Check,
  Wand2,
  Save,
  Moon,
  Sun,
  Layers,
  Brush
} from 'lucide-react';
import PublicLayout from '@/layouts/public-layout'
import { useTheme, ThemeColor, ThemeConfig } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

interface ColorPalette {
  name: string;
  description: string;
  icon: (props: { className?: string }) => React.ReactElement;
  gradient: string;
  variants: string[];
}

interface ExtendedThemeConfig extends ThemeConfig {
  emoji?: string;
}

const defaultPalettes: ColorPalette[] = [
  {
    name: 'Primary',
    description: 'Couleur principale pour les éléments clés',
    icon: (props) => <Zap {...props} />,
    gradient: 'from-[var(--primary-500)] to-[var(--primary-700)]',
    variants: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
  },
  {
    name: 'Secondary',
    description: 'Couleurs neutres pour l\'équilibre',
    icon: (props) => <Layers {...props} />,
    gradient: 'from-slate-500 to-slate-700',
    variants: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
  },
  {
    name: 'Accent',
    description: 'Couleurs vives pour les points focaux',
    icon: (props) => <Sparkles {...props} />,
    gradient: 'from-[var(--accent-500)] to-[var(--accent-700)]',
    variants: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
  }
];

const themePresets: Record<string, ExtendedThemeConfig> = {
  'moderne-bleu': { name: 'Moderne Bleu', primary: 'blue', accent: 'purple', emoji: '🔵' },
  'nature-zen': { name: 'Nature Zen', primary: 'green', accent: 'cyan', emoji: '🌿' },
  'sunset-vibrant': { name: 'Sunset Vibrant', primary: 'orange', accent: 'pink', emoji: '🌅' },
  'royal-purple': { name: 'Royal Purple', primary: 'purple', accent: 'blue', emoji: '👑' },
  'ocean-deep': { name: 'Ocean Deep', primary: 'cyan', accent: 'blue', emoji: '🌊' },
  'crimson-bold': { name: 'Crimson Bold', primary: 'red', accent: 'orange', emoji: '🔥' }
};

const allColors: ThemeColor[] = [
  'blue',
  'purple',
  'green',
  'orange',
  'pink',
  'cyan',
  'red',
  'yellow',
  'indigo',
  'emerald',
  'rose',
  'teal',
  'amber',
  'violet',
  'lime',
  'slate'
];

export default function EnhancedThemeDemo() {
  const { 
    currentTheme,
    setTheme,
    createCustomTheme,
    generateRandomTheme
  } = useTheme();
  
  const [darkMode, setDarkMode] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [customPrimary, setCustomPrimary] = useState<ThemeColor>('blue');
  const [customAccent, setCustomAccent] = useState<ThemeColor>('purple');
  const [customName, setCustomName] = useState('Mon Thème Personnalisé');
  const [animationKey, setAnimationKey] = useState(0);

  const utilityClasses = [
    {
      category: 'Glassmorphism',
      icon: Eye,
      classes: [
        { name: 'glass-light', description: 'Effet verre ultra-léger' },
        { name: 'glass-medium', description: 'Effet verre équilibré' },
        { name: 'glass-strong', description: 'Effet verre prononcé' }
      ]
    },
    {
      category: 'Dégradés Dynamiques',
      icon: Brush,
      classes: [
        { name: 'gradient-primary', description: 'Dégradé principal animé' },
        { name: 'gradient-rainbow', description: 'Dégradé arc-en-ciel' },
        { name: 'gradient-sunset', description: 'Dégradé coucher de soleil' }
      ]
    },
    {
      category: 'Effets Lumineux',
      icon: Zap,
      classes: [
        { name: 'glow-soft', description: 'Lueur douce et subtile' },
        { name: 'glow-intense', description: 'Lueur intense et vibrante' },
        { name: 'glow-pulse', description: 'Lueur pulsante animée' }
      ]
    },
    {
      category: 'Ombres Artistiques',
      icon: Layers,
      classes: [
        { name: 'shadow-colored', description: 'Ombres colorées douces' },
        { name: 'shadow-dramatic', description: 'Ombres dramatiques' },
        { name: 'shadow-floating', description: 'Effet de flottement' }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleThemeChange = (preset: ThemeConfig) => {
    setTheme({
      ...preset,
      isDark: darkMode
    });
    setAnimationKey(prev => prev + 1);
  };

  const handleCustomThemeApply = () => {
    const newTheme = createCustomTheme(
      customPrimary,
      customAccent,
      customName,
      darkMode
    );
    setAnimationKey(prev => prev + 1);
    return newTheme;
  };

  const handleRandomTheme = () => {
    const newTheme = generateRandomTheme();
    setAnimationKey(prev => prev + 1);
    return newTheme;
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    setTheme({
      ...currentTheme,
      isDark: !darkMode
    });
  };

  const getColorValue = (color: ThemeColor): ColorValue => {
    const colorMap: Record<ThemeColor, ColorValue> = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', hue: '220deg' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-600', hue: '270deg' },
      green: { bg: 'bg-green-500', text: 'text-green-600', hue: '142deg' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-600', hue: '25deg' },
      pink: { bg: 'bg-pink-500', text: 'text-pink-600', hue: '330deg' },
      cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', hue: '190deg' },
      red: { bg: 'bg-red-500', text: 'text-red-600', hue: '0deg' },
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', hue: '60deg' },
      indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', hue: '240deg' },
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', hue: '160deg' },
      rose: { bg: 'bg-rose-500', text: 'text-rose-600', hue: '350deg' },
      teal: { bg: 'bg-teal-500', text: 'text-teal-600', hue: '180deg' },
      amber: { bg: 'bg-amber-500', text: 'text-amber-600', hue: '45deg' },
      violet: { bg: 'bg-violet-500', text: 'text-violet-600', hue: '280deg' },
      lime: { bg: 'bg-lime-500', text: 'text-lime-600', hue: '90deg' },
      slate: { bg: 'bg-slate-500', text: 'text-slate-600', hue: '210deg' }
    };
    return colorMap[color];
  };

  return (
    <PublicLayout>
        <div className={`min-h-screen transition-all duration-1000 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'}`}>
        {/* Background Animation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div 
            key={animationKey}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-full animate-spin"
            style={{ animation: 'spin 20s linear infinite' }}
            />
            <div 
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-emerald-400/10 via-cyan-400/10 to-blue-400/10 rounded-full"
            style={{ animation: 'spin 25s linear infinite reverse' }}
            />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                <Palette className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">Système de Design Avancé</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Design
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                System
                </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed">
                Découvrez une palette de couleurs révolutionnaire avec des effets visuels de pointe, 
                des animations fluides et des composants interactifs pour créer des expériences utilisateur exceptionnelles.
            </p>

            {/* Mode Toggle */}
            <div className="flex justify-center mb-12">
                <button
                onClick={handleDarkModeToggle}
                className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
                <span className="font-medium text-slate-700">
                    {darkMode ? 'Mode Clair' : 'Mode Sombre'}
                </span>
                </button>
            </div>
            </div>

            {/* Theme Control Panel */}
            <div className="mb-20">
            <div className={`backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-white/20'} transition-all duration-500`}>
                <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                    <Settings className="text-white w-6 h-6" />
                    </div>
                    <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        Contrôle du Thème
                    </h2>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Thème actuel: {currentTheme.name}
                    </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button 
                      className="p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                      onClick={() => handleCustomThemeApply()}
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                      onClick={() => handleRandomTheme()}
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setShowCustomizer(!showCustomizer)}
                      className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <Wand2 className="w-5 h-5" />
                    </button>
                </div>
                </div>

                {/* Theme Presets */}
                <div className="mb-8">
                <h3 className={`text-lg font-semibold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Thèmes Prédéfinis
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(themePresets).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => handleThemeChange(preset)}
                      className={`
                        group relative p-6 rounded-2xl transition-all duration-500 hover:scale-105
                        ${currentTheme.name === preset.name 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-2xl' 
                          : darkMode 
                            ? 'bg-slate-700/50 hover:bg-slate-600/50 text-white' 
                            : 'bg-white/60 hover:bg-white/80 text-slate-800'
                        }
                        backdrop-blur-sm border border-white/20 hover:shadow-xl
                      `}
                    >
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {preset.emoji}
                      </div>
                      <div className="font-semibold text-sm mb-1">{preset.name}</div>
                      <div className="text-xs opacity-70">
                        {preset.primary} • {preset.accent}
                      </div>
                      
                      {currentTheme.name === preset.name && (
                        <div className="absolute -top-2 -right-2 bg-white text-blue-600 rounded-full p-1 shadow-lg animate-bounce">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                </div>

                {/* Customizer */}
                {showCustomizer && (
                <div className={`border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'} pt-8 transition-all duration-500`}>
                    <h3 className={`text-lg font-semibold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    <Wand2 className="w-5 h-5 text-purple-500" />
                    Créateur de Thème Personnalisé
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <label className={`block text-sm font-medium mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Couleur Principale
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                        {allColors.map((color) => {
                            const colorValue = getColorValue(color);
                            return (
                            <button
                                key={color}
                                onClick={() => setCustomPrimary(color)}
                                className={`
                                relative aspect-square rounded-xl transition-all duration-300 hover:scale-110
                                ${colorValue.bg} ${customPrimary === color ? 'ring-4 ring-white shadow-2xl scale-110' : 'hover:shadow-lg'}
                                `}
                                title={color}
                            >
                                {customPrimary === color && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Check className="w-5 h-5 text-white drop-shadow-lg" />
                                </div>
                                )}
                            </button>
                            );
                        })}
                        </div>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Couleur Accent
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                        {allColors.map((color) => {
                            const colorValue = getColorValue(color);
                            return (
                            <button
                                key={color}
                                onClick={() => setCustomAccent(color)}
                                className={`
                                relative aspect-square rounded-xl transition-all duration-300 hover:scale-110
                                ${colorValue.bg} ${customAccent === color ? 'ring-4 ring-white shadow-2xl scale-110' : 'hover:shadow-lg'}
                                `}
                                title={color}
                            >
                                {customAccent === color && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Check className="w-5 h-5 text-white drop-shadow-lg" />
                                </div>
                                )}
                            </button>
                            );
                        })}
                        </div>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Nom du Thème
                        </label>
                        <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        className={`
                            w-full px-4 py-3 rounded-xl border transition-all duration-300 mb-4
                            ${darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white focus:border-purple-500' 
                            : 'bg-white/80 border-slate-300 text-slate-800 focus:border-purple-500'
                            }
                            focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-sm
                        `}
                        placeholder="Mon Thème Personnalisé"
                        />
                        <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                        <Save className="w-5 h-5" />
                        Appliquer le Thème
                        </button>
                    </div>
                    </div>
                </div>
                )}
            </div>
            </div>

            {/* Color Palettes */}
            <div className="mb-20">
            <h2 className={`text-4xl font-bold mb-12 flex items-center gap-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                <Palette className="text-white w-8 h-8" />
                </div>
                Palettes de Couleurs
            </h2>

            <div className="grid gap-8">
                {defaultPalettes.map((palette) => (
                <div
                    key={palette.name}
                    className={cn(
                      "backdrop-blur-xl rounded-3xl p-8 shadow-2xl border transition-all duration-500 hover:shadow-3xl",
                      darkMode ? "bg-slate-800/90 border-slate-700" : "bg-white/90 border-white/20"
                    )}
                >
                    <div className="flex items-center gap-4 mb-8">
                    <div className={cn(
                      "p-4 rounded-2xl",
                      palette.name === "Primary" && "bg-[var(--primary-500)]",
                      palette.name === "Secondary" && "bg-slate-500",
                      palette.name === "Accent" && "bg-[var(--accent-500)]"
                    )}>
                        <palette.icon className="text-white w-8 h-8" />
                    </div>
                    <div>
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {palette.name}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {palette.description}
                        </p>
                    </div>
                    </div>

                    <div className="grid grid-cols-11 gap-3 mb-6">
                    {palette.variants.map((variant, idx) => {
                      const bgColor = palette.name === 'Primary'
                        ? `bg-[var(--primary-${variant})]`
                        : palette.name === 'Secondary'
                        ? `bg-slate-${variant}`
                        : `bg-[var(--accent-${variant})]`;
                      
                      return (
                        <div
                          key={variant}
                          className={cn(
                            "aspect-square rounded-xl cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:z-10 relative group",
                            bgColor
                          )}
                          style={{
                            animationDelay: `${idx * 0.05}s`
                          }}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-all duration-300 flex items-center justify-center">
                            <span className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {variant}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {palette.name === "Primary" ? (
                        <>
                          <span className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--primary-100)] text-[var(--primary-800)] transition-all duration-500 hover:scale-105">
                            var(--primary-100)
                          </span>
                          <span className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--primary-500)] text-white transition-all duration-500 hover:scale-105">
                            var(--primary-500)
                          </span>
                          <span className="px-4 py-2 rounded-full text-sm font-medium border-2 border-[var(--primary-300)] text-[var(--primary-700)] transition-all duration-500 hover:scale-105">
                            border-primary-300
                          </span>
                        </>
                      ) : palette.name === "Secondary" ? (
                        <>
                          <span className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-800 transition-all duration-500 hover:scale-105">
                            bg-slate-100
                          </span>
                          <span className="px-4 py-2 rounded-full text-sm font-medium bg-slate-500 text-white transition-all duration-500 hover:scale-105">
                            bg-slate-500
                          </span>
                          <span className="px-4 py-2 rounded-full text-sm font-medium border-2 border-slate-300 text-slate-700 transition-all duration-500 hover:scale-105">
                            border-slate-300
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--accent-100)] text-[var(--accent-800)] transition-all duration-500 hover:scale-105">
                            var(--accent-100)
                          </span>
                          <span className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--accent-500)] text-white transition-all duration-500 hover:scale-105">
                            var(--accent-500)
                          </span>
                          <span className="px-4 py-2 rounded-full text-sm font-medium border-2 border-[var(--accent-300)] text-[var(--accent-700)] transition-all duration-500 hover:scale-105">
                            border-accent-300
                          </span>
                        </>
                      )}
                    </div>
                </div>
                ))}
            </div>
            </div>

            {/* Utility Classes */}
            <div className="mb-20">
            <h2 className={`text-4xl font-bold mb-12 flex items-center gap-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl">
                <Sparkles className="text-white w-8 h-8" />
                </div>
                Classes Utilitaires
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
                {utilityClasses.map((category) => (
                <div
                    key={category.category}
                    className={`
                    backdrop-blur-xl rounded-3xl p-8 shadow-2xl border transition-all duration-500 hover:shadow-3xl
                    ${darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-white/20'}
                    `}
                >
                    <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                        <category.icon className="text-white w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {category.category}
                    </h3>
                    </div>
                    
                    <div className="space-y-6">
                    {category.classes.map((utilityClass) => (
                        <div key={utilityClass.name} className="flex items-center gap-6 group">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="flex-1">
                            <code className="text-purple-600 font-mono text-sm font-semibold bg-purple-50 px-3 py-1 rounded-lg">
                            .{utilityClass.name}
                            </code>
                            <p className={`text-sm mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            {utilityClass.description}
                            </p>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                ))}
            </div>
            </div>

            {/* Practical Examples */}
            <div>
            <h2 className={`text-4xl font-bold mb-12 flex items-center gap-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
                <Eye className="text-white w-8 h-8" />
                </div>
                Exemples Pratiques
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 - Primary */}
                <div className={`
                group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:scale-105 cursor-pointer
                ${darkMode ? 'bg-slate-800/90' : 'bg-white/90'} backdrop-blur-xl shadow-2xl border border-white/20
                hover:shadow-3xl
                `}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="text-white w-8 h-8" />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    Interface Principale
                    </h3>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Composant utilisant la palette primary avec des effets de glassmorphism et des animations fluides.
                    </p>
                </div>
                </div>

                {/* Card 2 - Accent */}
                <div className={`
                group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:scale-105 cursor-pointer
                ${darkMode ? 'bg-slate-800/90' : 'bg-white/90'} backdrop-blur-xl shadow-2xl border border-white/20
                hover:shadow-3xl
                `}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="text-white w-8 h-8" />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    Accent Moderne
                    </h3>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Élément d'accent avec des couleurs vibrantes et des effets lumineux pour captiver l'attention.
                    </p>
                </div>
                </div>

                {/* Card 3 - Success */}
                <div className={`
                group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:scale-105 cursor-pointer
                ${darkMode ? 'bg-slate-800/90' : 'bg-white/90'} backdrop-blur-xl shadow-2xl border border-white/20
                hover:shadow-3xl
                `}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="text-white w-8 h-8" />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    Feedback Positif
                    </h3>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Composants de succès avec des animations douces et des transitions élégantes.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </PublicLayout>
  );
}

interface ColorValue {
  bg: string;
  text: string;
  hue: string;
}

