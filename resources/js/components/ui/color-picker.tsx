import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Palette, 
  Sparkles, 
  Check, 
  X, 
  Heart,
  HeartOff,
  Copy,
  Shuffle,
  Search,
  Contrast,
  Settings,
  History,
  Paintbrush,
  Layers,
  Droplets,
  Star,
  Flame
} from "lucide-react";
import { useTheme, ThemeColor } from "@/hooks/use-theme";

// Types étendus
interface CustomColor {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
  isFavorite: boolean;
}

interface ColorHistory {
  color: string;
  timestamp: Date;
  mode: ColorPickerMode;
}

interface GradientColor {
  id: string;
  name: string;
  gradient: string;
  colors: string[];
}

// Nouvelles collections de couleurs tendance
interface ColorCollection {
  name: string;
  description: string;
  colors: string[];
  icon: React.ElementType;
}

const TRENDING_COLLECTIONS: ColorCollection[] = [
  {
    name: "Neo Pastel",
    description: "Couleurs pastel modernes avec une touche de vivacité",
    colors: ["#FFD6E0", "#FFEFCF", "#C1FFC1", "#C1F0FF", "#E0C1FF"],
    icon: Droplets
  },
  {
    name: "Tech Neon",
    description: "Palette néon vibrante pour interfaces futuristes",
    colors: ["#00FFFF", "#FF00FF", "#FE53BB", "#08F7FE", "#09FBD3"],
    icon: Flame
  },
  {
    name: "Earthy Tones",
    description: "Couleurs naturelles et apaisantes",
    colors: ["#D4A373", "#CCD5AE", "#E9EDC9", "#FAEDCD", "#FEFAE0"],
    icon: Layers
  },
  {
    name: "Midnight",
    description: "Tons sombres et élégants",
    colors: ["#0F172A", "#1E293B", "#334155", "#475569", "#64748B"],
    icon: Star
  }
];

type ColorPickerMode = 'primary' | 'accent' | 'both' | 'custom' | 'gradient';
type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv';
type ViewMode = 'grid' | 'list' | 'wheel';

interface ColorPickerProps {
  color: string;
  label?: string;
  className?: string;
  mode?: ColorPickerMode;
  format?: ColorFormat;
  showFavorites?: boolean;
  showHistory?: boolean;
  showCustomColors?: boolean;
  showGradients?: boolean;
  showAccessibility?: boolean;
  showTrendingCollections?: boolean;
  maxHistoryItems?: number;
  onColorChange?: (color: string, mode: ColorPickerMode) => void;
  onFormatChange?: (format: ColorFormat) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'embedded';
}

// Hook personnalisé pour la gestion des couleurs
const useColorManager = () => {
  const [customColors, setCustomColors] = React.useState<CustomColor[]>([]);
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [history, setHistory] = React.useState<ColorHistory[]>([]);
  const [gradients] = React.useState<GradientColor[]>([
    {
      id: '1',
      name: 'Sunset',
      gradient: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
      colors: ['#ff6b6b', '#ffd93d']
    },
    {
      id: '2',
      name: 'Ocean',
      gradient: 'linear-gradient(45deg, #667eea, #764ba2)',
      colors: ['#667eea', '#764ba2']
    },
    {
      id: '3',
      name: 'Forest',
      gradient: 'linear-gradient(45deg, #11998e, #38ef7d)',
      colors: ['#11998e', '#38ef7d']
    }
  ]);

  // Gestion des couleurs personnalisées
  const addCustomColor = React.useCallback((color: string, name: string) => {
    const newColor: CustomColor = {
      id: Date.now().toString(),
      name,
      value: color,
      createdAt: new Date(),
      isFavorite: false
    };
    setCustomColors(prev => [newColor, ...prev]);
  }, []);

  const removeCustomColor = React.useCallback((id: string) => {
    setCustomColors(prev => prev.filter(c => c.id !== id));
  }, []);

  // Gestion des favoris
  const toggleFavorite = React.useCallback((color: string) => {
    setFavorites(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  }, []);

  // Gestion de l'historique
  const addToHistory = React.useCallback((color: string, mode: ColorPickerMode) => {
    setHistory(prev => {
      const newHistory = [{ color, timestamp: new Date(), mode }, ...prev];
      return newHistory.slice(0, 50); // Limite à 50 éléments
    });
  }, []);

  const clearHistory = React.useCallback(() => {
    setHistory([]);
  }, []);

  // Ajout des collections tendance
  const applyTrendingCollection = React.useCallback((collection: ColorCollection, mode: ColorPickerMode) => {
    // Ajoute toutes les couleurs de la collection à l'historique
    collection.colors.forEach(color => {
      addToHistory(color, mode);
    });
  }, [addToHistory]);

  return {
    customColors,
    favorites,
    history,
    gradients,
    addCustomColor,
    removeCustomColor,
    toggleFavorite,
    addToHistory,
    clearHistory,
    applyTrendingCollection
  };
};

// Utilitaires de couleur
const colorUtils = {
  hexToRgb: (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  rgbToHsl: (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h! /= 6;
    }

    return {
      h: Math.round(h! * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  },

  getContrastRatio: (color1: string, color2: string) => {
    const getLuminance = (color: string) => {
      const rgb = colorUtils.hexToRgb(color);
      if (!rgb) return 0;
      
      const { r, g, b } = rgb;
      const [rs, gs, bs] = [r, g, b].map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  },

  formatColor: (color: string, format: ColorFormat) => {
    const rgb = colorUtils.hexToRgb(color);
    if (!rgb) return color;
    const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);

    switch (format) {
      case 'rgb':
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case 'hsl':
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      default:
        return color;
    }
  },

  generateRandomColor: () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  },

  generateHarmoniousColors: (baseColor: string, count: number = 5) => {
    const rgb = colorUtils.hexToRgb(baseColor);
    if (!rgb) return [baseColor];
    
    const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors = [baseColor];
    
    for (let i = 1; i < count; i++) {
      const newHue = (hsl.h + (360 / count) * i) % 360;
      const newColor = `hsl(${newHue}, ${hsl.s}%, ${hsl.l}%)`;
      colors.push(newColor);
    }
    
    return colors;
  }
};

// Composant principal amélioré
const EnhancedColorPicker: React.FC<ColorPickerProps> = ({
  color,
  label,
  className,
  mode = 'primary',
  format = 'hex',
  showFavorites = true,
  showHistory = true,
  showCustomColors = true,
  showAccessibility = false,
  showTrendingCollections = true,
  maxHistoryItems = 10,
  onColorChange,
  onFormatChange,
  disabled = false,
  size = 'md',
  variant = 'default'
}) => {
  const { colorCategories, setTheme, currentTheme, getColorValue } = useTheme();
  const colorManager = useColorManager();
  const prefersReducedMotion = useReducedMotion();
  
  // États locaux
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoveredColor, setHoveredColor] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFormat, setSelectedFormat] = React.useState<ColorFormat>(format);
  const [activeTab, setActiveTab] = React.useState('colors');
  const [customColorName, setCustomColorName] = React.useState('');
  const [showColorInput, setShowColorInput] = React.useState(false);
  const [colorInputValue, setColorInputValue] = React.useState('');

  // Animations optimisées
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.95, 
      y: prefersReducedMotion ? 0 : -10 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.2,
        staggerChildren: prefersReducedMotion ? 0 : 0.03
      }
    },
    exit: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.95, 
      y: prefersReducedMotion ? 0 : -10 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 5 },
    visible: { opacity: 1, y: 0 }
  };

  // Gestion des changements de couleur
  const handleColorChange = React.useCallback((colorName: ThemeColor | string, isCustom = false) => {
    let newColor: string;
    
    if (isCustom) {
      newColor = colorName as string;
    } else {
      newColor = getColorValue(colorName as ThemeColor, '500');
    }

    // Application selon le mode
    if (!isCustom && (mode === 'primary' || mode === 'both')) {
      setTheme({
        ...currentTheme,
        primary: colorName as ThemeColor,
        accent: mode === 'both' ? (colorName as ThemeColor) : currentTheme.accent,
        name: `Thème ${colorName}`,
      });
    } else if (!isCustom && mode === 'accent') {
      setTheme({
        ...currentTheme,
        accent: colorName as ThemeColor,
        name: currentTheme.name,
      });
    }

    // Ajout à l'historique
    colorManager.addToHistory(newColor, mode);
    
    // Callback externe
    onColorChange?.(newColor, mode);
    
    if (mode !== 'custom') {
      setIsOpen(false);
    }
  }, [mode, currentTheme, setTheme, getColorValue, colorManager, onColorChange]);

  // Gestion du format
  const handleFormatChange = React.useCallback((newFormat: ColorFormat) => {
    setSelectedFormat(newFormat);
    onFormatChange?.(newFormat);
  }, [onFormatChange]);

  // Filtrage des couleurs
  const filteredColors = React.useMemo(() => {
    if (!searchQuery) return colorCategories;
    
    const filtered: typeof colorCategories = {};
    Object.entries(colorCategories).forEach(([category, colors]) => {
      const matchingColors = colors.filter(color => 
        color.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingColors.length > 0) {
        filtered[category] = matchingColors;
      }
    });
    
    return filtered;
  }, [colorCategories, searchQuery]);

  // Couleur affichée
  const displayedColor = React.useMemo(() => {
    if (mode === 'primary') {
      return getColorValue(currentTheme.primary, '500');
    } else if (mode === 'accent') {
      return getColorValue(currentTheme.accent, '500');
    } else if (mode === 'custom') {
      return color;
    } else {
      return getColorValue(currentTheme.primary, '500');
    }
  }, [currentTheme, getColorValue, mode, color]);

  // Vérification de sélection
  const isColorSelected = React.useCallback((colorName: ThemeColor | string, isCustom = false) => {
    if (isCustom) {
      return color === colorName;
    }
    
    if (mode === 'primary') return currentTheme.primary === colorName;
    if (mode === 'accent') return currentTheme.accent === colorName;
    if (mode === 'both') return currentTheme.primary === colorName && currentTheme.accent === colorName;
    return false;
  }, [mode, currentTheme, color]);

  // Copier couleur
  const copyColor = React.useCallback(async (colorValue: string) => {
    try {
      const formattedColor = colorUtils.formatColor(colorValue, selectedFormat);
      await navigator.clipboard.writeText(formattedColor);
      // Vous pourriez ajouter une notification toast ici
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  }, [selectedFormat]);

  // Ajout couleur personnalisée
  const handleAddCustomColor = React.useCallback(() => {
    if (colorInputValue && customColorName) {
      colorManager.addCustomColor(colorInputValue, customColorName);
      setColorInputValue('');
      setCustomColorName('');
      setShowColorInput(false);
    }
  }, [colorInputValue, customColorName, colorManager]);

  // Tailles
  const sizes = {
    sm: { button: 'h-10', color: 'h-6 w-6', icon: 'h-3 w-3' },
    md: { button: 'h-14', color: 'h-8 w-8', icon: 'h-4 w-4' },
    lg: { button: 'h-16', color: 'h-10 w-10', icon: 'h-5 w-5' }
  };

  const currentSize = sizes[size];

  // Rendu du bouton déclencheur
  const renderTriggerButton = () => (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      className="relative"
    >
      <Button
        variant="outline"
        disabled={disabled}
        className={cn(
          `relative w-full ${currentSize.button} justify-start text-left font-normal overflow-hidden`,
          "border-2 border-white/20 hover:border-white/40",
          "glass hover:glass-strong",
          "transition-all duration-300 hover:shadow-lg",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {/* Effet de brillance */}
        {!prefersReducedMotion && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        )}
        
        <div className="relative flex items-center gap-3 z-10">
          <div className="relative">
            <div
              className={cn(
                `${currentSize.color} rounded-xl border-2 border-white/30 shadow-lg overflow-hidden`,
                "transition-all duration-300"
              )}
              style={{ backgroundColor: displayedColor }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <motion.div 
              className={cn(
                "absolute -top-1 -right-1 bg-[color:var(--accent-400)]/80 rounded-full shadow-sm flex items-center justify-center",
                size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
              )}
              whileHover={prefersReducedMotion ? {} : { scale: 1.2, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Palette className={cn(currentSize.icon, "text-white")} />
            </motion.div>
          </div>
          
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-medium text-white truncate">
              {label || (mode === 'primary' ? "Couleur primaire" : 
                        mode === 'accent' ? "Couleur d'accent" : 
                        mode === 'custom' ? "Couleur personnalisée" :
                        mode === 'gradient' ? "Dégradé" : "Palette de couleurs")}
            </span>
            <span className="text-xs text-white/70 uppercase tracking-wide truncate">
              {colorUtils.formatColor(displayedColor, selectedFormat)}
            </span>
          </div>
          
          {!prefersReducedMotion && (
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="ml-auto"
            >
              <Sparkles className={cn(currentSize.icon, "text-[color:var(--accent-300)]")} />
            </motion.div>
          )}
        </div>
      </Button>
    </motion.div>
  );

  // Rendu des couleurs en grille
  const renderColorGrid = (colors: ThemeColor[] | CustomColor[], category?: string, isCustom = false) => (
    <div className="grid grid-cols-8 gap-2">
      {colors.map((colorItem) => {
        const colorName = isCustom ? (colorItem as CustomColor).value : colorItem as ThemeColor;
        const colorValue = isCustom ? (colorItem as CustomColor).value : getColorValue(colorItem as ThemeColor, '500');
        const isSelected = isColorSelected(colorName, isCustom);
        const isFavorite = colorManager.favorites.includes(colorValue);
        
        return (
          <div key={isCustom ? (colorItem as CustomColor).id : colorItem as string} className="relative group">
            <motion.button
              className={cn(
                "relative h-8 w-8 rounded-lg transition-all duration-200",
                "border-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-400)]",
                isSelected
                  ? "border-white ring-2 ring-[color:var(--accent-400)] shadow-lg scale-110" 
                  : "border-white/30 hover:border-white hover:scale-105 hover:shadow-md"
              )}
              style={{ 
                backgroundColor: colorValue,
                boxShadow: isSelected ? `0 4px 12px ${colorValue}40` : undefined
              }}
              onClick={() => handleColorChange(colorName, isCustom)}
              onMouseEnter={() => setHoveredColor(colorValue)}
              onMouseLeave={() => setHoveredColor(null)}
              whileHover={prefersReducedMotion ? {} : { y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              title={isCustom ? (colorItem as CustomColor).name : colorItem as string}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-md" />
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className="h-3 w-3 text-white drop-shadow-md" />
                </motion.div>
              )}
            </motion.button>

            {/* Actions rapides */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <motion.button
                className="h-4 w-4 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  copyColor(colorValue);
                }}
                whileHover={{ scale: 1.1 }}
                title="Copier"
              >
                <Copy className="h-2 w-2 text-gray-700" />
              </motion.button>
              
              <motion.button
                className="h-4 w-4 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  colorManager.toggleFavorite(colorValue);
                }}
                whileHover={{ scale: 1.1 }}
                title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                {isFavorite ? (
                  <Heart className="h-2 w-2 text-red-500 fill-current" />
                ) : (
                  <HeartOff className="h-2 w-2 text-gray-700" />
                )}
              </motion.button>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Rendu de l'aperçu de couleur
  const renderColorPreview = () => (
    <motion.div variants={itemVariants} className="mb-6 space-y-4">
      <div 
        className="h-20 w-full rounded-xl border-2 border-white/20 shadow-inner relative overflow-hidden transition-all duration-300"
        style={{ 
          backgroundColor: hoveredColor || displayedColor,
          boxShadow: `0 4px 20px ${hoveredColor || displayedColor}20`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
        
        {/* Informations sur la couleur */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
          <div className="text-white/90 text-xs space-y-1">
            <div className="font-mono bg-black/20 rounded px-2 py-1">
              {colorUtils.formatColor(hoveredColor || displayedColor, selectedFormat)}
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 px-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40"
              onClick={() => copyColor(hoveredColor || displayedColor)}
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 px-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40"
              onClick={() => colorManager.toggleFavorite(hoveredColor || displayedColor)}
            >
              {colorManager.favorites.includes(hoveredColor || displayedColor) ? (
                <Heart className="h-3 w-3 fill-current" />
              ) : (
                <HeartOff className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Sélecteur de format */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/70">Format:</span>
        <div className="flex gap-1">
          {(['hex', 'rgb', 'hsl', 'hsv'] as ColorFormat[]).map((fmt) => (
            <Button
              key={fmt}
              size="sm"
              variant={selectedFormat === fmt ? "default" : "ghost"}
              className="h-6 px-2 text-xs"
              onClick={() => handleFormatChange(fmt)}
            >
              {fmt.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Informations d'accessibilité */}
      {showAccessibility && (
        <div className="text-xs text-white/70 space-y-1">
          <div className="flex justify-between">
            <span>Contraste (blanc):</span>
            <span className={
              colorUtils.getContrastRatio(hoveredColor || displayedColor, '#ffffff') >= 4.5 
                ? 'text-green-400' : 'text-red-400'
            }>
              {colorUtils.getContrastRatio(hoveredColor || displayedColor, '#ffffff').toFixed(2)}:1
            </span>
          </div>
          <div className="flex justify-between">
            <span>Contraste (noir):</span>
            <span className={
              colorUtils.getContrastRatio(hoveredColor || displayedColor, '#000000') >= 4.5 
                ? 'text-green-400' : 'text-red-400'
            }>
              {colorUtils.getContrastRatio(hoveredColor || displayedColor, '#000000').toFixed(2)}:1
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );

  // Rendu des collections tendance
  const renderTrendingCollections = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Collections tendance</h3>
        <Button
          size="sm"
          variant="ghost"
          className="text-white/60 hover:text-white"
        >
          <Paintbrush className="h-3 w-3 mr-1" />
          Explorer
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {TRENDING_COLLECTIONS.map((collection, index) => {
          const IconComponent = collection.icon;
          return (
            <motion.div
              key={index}
              className="p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors cursor-pointer group"
              whileHover={{ y: -2 }}
              onClick={() => colorManager.applyTrendingCollection(collection, mode)}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded-md bg-white/15">
                  <IconComponent className="h-3.5 w-3.5 text-white" />
                </div>
                <h4 className="text-sm font-medium text-white">{collection.name}</h4>
              </div>
              <div className="flex mb-2">
                {collection.colors.map((clr, i) => (
                  <div
                    key={i}
                    className="h-4 w-full first:rounded-l-sm last:rounded-r-sm border-r border-white/5 last:border-0"
                    style={{ backgroundColor: clr }}
                  />
                ))}
              </div>
              <p className="text-xs text-white/60 line-clamp-1">{collection.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  // Rendu du composant selon la variante
  if (variant === 'minimal') {
    return (
      <div className={cn("flex flex-wrap gap-1", className)}>
        {Object.entries(colorCategories).slice(0, 2).map(([category, colors]) => (
          <div key={category} className="flex gap-1">
            {colors.slice(0, 5).map((colorItem) => {
              const colorValue = getColorValue(colorItem as ThemeColor, '500');
              const isSelected = isColorSelected(colorItem as ThemeColor);
              
              return (
                <motion.button
                  key={colorItem}
                  className={cn(
                    "h-6 w-6 rounded-full transition-all duration-200",
                    "border-2 focus:outline-none",
                    isSelected
                      ? "border-white ring-2 ring-[color:var(--accent-400)] scale-110" 
                      : "border-white/30 hover:border-white hover:scale-105"
                  )}
                  style={{ backgroundColor: colorValue }}
                  onClick={() => handleColorChange(colorItem as ThemeColor)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                />
              );
            })}
          </div>
        ))}
        
        <motion.button
          onClick={() => handleColorChange(colorUtils.generateRandomColor(), true)}
          className="h-6 w-6 rounded-full bg-gradient-to-r from-[color:var(--accent-500)] to-[color:var(--primary-500)] border-2 border-white/30 flex items-center justify-center"
          whileHover={{ y: -2, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Shuffle className="h-3 w-3 text-white" />
        </motion.button>
      </div>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {renderTriggerButton()}
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-0 border-0 shadow-2xl glass-strong rounded-2xl overflow-hidden">
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="p-6"
          >
            {/* Header avec contrôles */}
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-br from-[color:var(--accent-400)] to-[color:var(--accent-600)] rounded-lg flex items-center justify-center">
                  <Palette className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    {mode === 'primary' ? "Couleur primaire" : 
                     mode === 'accent' ? "Couleur d'accent" : 
                     mode === 'custom' ? "Couleur personnalisée" :
                     mode === 'gradient' ? "Dégradé" : "Palette de couleurs"}
                  </h3>
                  <p className="text-xs text-white/70">Choisissez votre couleur</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleColorChange(colorUtils.generateRandomColor(), true)}
                  className="h-8 w-8 rounded-full hover:bg-white/10"
                  title="Couleur aléatoire"
                >
                  <Shuffle className="h-4 w-4 text-white/70" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full hover:bg-white/10"
                >
                  <X className="h-4 w-4 text-white/70" />
                </Button>
              </div>
            </motion.div>

            {/* Aperçu de couleur */}
            {renderColorPreview()}

            {/* Barre de recherche */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  type="text"
                  placeholder="Rechercher une couleur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[color:var(--accent-400)]"
                />
              </div>
            </motion.div>

            {/* Tabs pour organiser le contenu */}
            <motion.div variants={itemVariants}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-white/10 rounded-lg p-1 mb-4">
                  <TabsTrigger value="colors" className="text-xs data-[state=active]:bg-[color:var(--accent-500)] data-[state=active]:text-white">
                    Couleurs
                  </TabsTrigger>
                  {showTrendingCollections && (
                    <TabsTrigger value="trending" className="text-xs data-[state=active]:bg-[color:var(--accent-500)] data-[state=active]:text-white">
                      Tendances
                    </TabsTrigger>
                  )}
                  {showFavorites && (
                    <TabsTrigger value="favorites" className="text-xs data-[state=active]:bg-[color:var(--accent-500)] data-[state=active]:text-white">
                      Favoris
                    </TabsTrigger>
                  )}
                  {showCustomColors && (
                    <TabsTrigger value="custom" className="text-xs data-[state=active]:bg-[color:var(--accent-500)] data-[state=active]:text-white">
                      Perso
                    </TabsTrigger>
                  )}
                  {showHistory && (
                    <TabsTrigger value="history" className="text-xs data-[state=active]:bg-[color:var(--accent-500)] data-[state=active]:text-white">
                      Historique
                    </TabsTrigger>
                  )}
                </TabsList>

                {/* Onglet Couleurs */}
                <TabsContent value="colors" className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  {Object.entries(filteredColors).map(([category, colors]) => (
                    <motion.div key={category} variants={itemVariants} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                        <h4 className="font-medium text-sm text-white/90 capitalize px-2">
                          {category}
                        </h4>
                        <div className="h-px flex-1 bg-gradient-to-l from-white/20 to-transparent rounded-full" />
                      </div>
                      {renderColorGrid(colors, category)}
                    </motion.div>
                  ))}
                </TabsContent>

                {/* Nouvel onglet Collections tendance */}
                {showTrendingCollections && (
                  <TabsContent value="trending" className="space-y-4 max-h-80 overflow-y-auto">
                    {renderTrendingCollections()}
                  </TabsContent>
                )}

                {/* Autres onglets existants */}
                {showFavorites && (
                  <TabsContent value="favorites" className="space-y-4 max-h-80 overflow-y-auto">
                    {colorManager.favorites.length === 0 ? (
                      <div className="text-center py-8 text-white/60">
                        <Heart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Aucune couleur favorite</p>
                        <p className="text-xs mt-1">Cliquez sur ❤️ pour ajouter des couleurs</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-8 gap-2">
                        {colorManager.favorites.map((favoriteColor, index) => (
                          <div key={index} className="relative group">
                            <motion.button
                              className="relative h-8 w-8 rounded-lg border-2 border-white/30 hover:border-white hover:scale-105 transition-all duration-200"
                              style={{ backgroundColor: favoriteColor }}
                              onClick={() => handleColorChange(favoriteColor, true)}
                              whileHover={prefersReducedMotion ? {} : { y: -2 }}
                              title={colorUtils.formatColor(favoriteColor, selectedFormat)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-md" />
                            </motion.button>
                            
                            <motion.button
                              className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                colorManager.toggleFavorite(favoriteColor);
                              }}
                              whileHover={{ scale: 1.1 }}
                              title="Retirer des favoris"
                            >
                              <X className="h-2 w-2 text-white" />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                )}

                {/* Onglet Couleurs personnalisées */}
                {showCustomColors && (
                  <TabsContent value="custom" className="space-y-4 max-h-80 overflow-y-auto">
                    {/* Formulaire d'ajout */}
                    <div className="space-y-3 p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-4 w-4 text-[color:var(--accent-400)]" />
                        <span className="text-sm font-medium text-white">Créer une couleur</span>
                      </div>
                      
                      {!showColorInput ? (
                        <Button
                          variant="outline"
                          onClick={() => setShowColorInput(true)}
                          className="w-full border-white/20 text-white hover:bg-white/10"
                        >
                          <Palette className="h-4 w-4 mr-2" />
                          Ajouter une couleur
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={colorInputValue}
                              onChange={(e) => setColorInputValue(e.target.value)}
                              className="w-16 h-10 p-1 border-white/20"
                            />
                            <Input
                              type="text"
                              placeholder="Nom de la couleur"
                              value={customColorName}
                              onChange={(e) => setCustomColorName(e.target.value)}
                              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={handleAddCustomColor}
                              disabled={!colorInputValue || !customColorName}
                              className="flex-1"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Ajouter
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setShowColorInput(false);
                                setColorInputValue('');
                                setCustomColorName('');
                              }}
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Liste des couleurs personnalisées */}
                    {colorManager.customColors.length === 0 ? (
                      <div className="text-center py-8 text-white/60">
                        <Palette className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Aucune couleur personnalisée</p>
                        <p className="text-xs mt-1">Créez vos propres couleurs</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {colorManager.customColors.map((customColor) => (
                          <div
                            key={customColor.id}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg group hover:bg-white/10 transition-colors"
                          >
                            <div
                              className="h-8 w-8 rounded-lg border-2 border-white/30 flex-shrink-0"
                              style={{ backgroundColor: customColor.value }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-white truncate">{customColor.name}</p>
                              <p className="text-xs text-white/60 font-mono">
                                {colorUtils.formatColor(customColor.value, selectedFormat)}
                              </p>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleColorChange(customColor.value, true)}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyColor(customColor.value)}
                                className="h-8 w-8 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => colorManager.removeCustomColor(customColor.id)}
                                className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                )}

                {/* Onglet Historique */}
                {showHistory && (
                  <TabsContent value="history" className="space-y-4 max-h-80 overflow-y-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Historique récent</span>
                      {colorManager.history.length > 0 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={colorManager.clearHistory}
                          className="text-white/60 hover:text-white"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Effacer
                        </Button>
                      )}
                    </div>

                    {colorManager.history.length === 0 ? (
                      <div className="text-center py-8 text-white/60">
                        <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Aucun historique</p>
                        <p className="text-xs mt-1">Vos couleurs récentes apparaîtront ici</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {colorManager.history.slice(0, maxHistoryItems).map((historyItem, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg group hover:bg-white/10 transition-colors cursor-pointer"
                            onClick={() => handleColorChange(historyItem.color, true)}
                          >
                            <div
                              className="h-8 w-8 rounded-lg border-2 border-white/30 flex-shrink-0"
                              style={{ backgroundColor: historyItem.color }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-white font-mono text-sm">
                                {colorUtils.formatColor(historyItem.color, selectedFormat)}
                              </p>
                              <p className="text-xs text-white/60">
                                {historyItem.timestamp.toLocaleTimeString()} • {historyItem.mode}
                              </p>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyColor(historyItem.color);
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  colorManager.toggleFavorite(historyItem.color);
                                }}
                                className="h-8 w-8 p-0"
                              >
                                {colorManager.favorites.includes(historyItem.color) ? (
                                  <Heart className="h-3 w-3 fill-current text-red-400" />
                                ) : (
                                  <HeartOff className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                )}
              </Tabs>
            </motion.div>

            {/* Actions rapides en bas */}
            <motion.div variants={itemVariants} className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const harmonious = colorUtils.generateHarmoniousColors(displayedColor);
                      harmonious.forEach(color => colorManager.addToHistory(color, mode));
                    }}
                    className="text-white/70 hover:text-white"
                    title="Générer des couleurs harmonieuses"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Harmonies
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyColor(displayedColor)}
                    className="text-white/70 hover:text-white"
                    title="Copier la couleur actuelle"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copier
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  {showAccessibility && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white/70 hover:text-white"
                      title="Informations d'accessibilité"
                    >
                      <Contrast className="h-3 w-3" />
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white/70 hover:text-white"
                    title="Paramètres"
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
};

// Composant d'exportation avec toutes les optimisations
const ColorPicker = React.memo(EnhancedColorPicker);

export default ColorPicker;

// Types exportés pour utilisation externe
export type {
  ColorPickerProps,
  ColorPickerMode,
  ColorFormat,
  ViewMode,
  CustomColor,
  ColorHistory,
  GradientColor,
  ColorCollection
};

// Utilitaires exportés
export { colorUtils, TRENDING_COLLECTIONS };