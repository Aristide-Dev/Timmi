import React from 'react';
import { useTheme, ThemeColor } from '@/hooks/use-theme';
import { AnimatedDock } from '@/components/ui/animated-dock';
import { Palette, Sparkles, Star, Droplets, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Définition des thèmes populaires avec leurs couleurs primaires et d'accentuation
const POPULAR_THEMES = [
  { 
    name: "Océan Profond", 
    primary: "blue", 
    accent: "cyan", 
    icon: <Droplets className="text-blue-300" size={22} />,
    description: "Thème bleu apaisant"
  },
  { 
    name: "Feu Ardent", 
    primary: "red", 
    accent: "orange", 
    icon: <Flame className="text-red-300" size={22} />,
    description: "Thème rouge énergique"
  },
  { 
    name: "Nature", 
    primary: "emerald", 
    accent: "lime", 
    icon: <Sparkles className="text-emerald-300" size={22} />,
    description: "Thème vert naturel"
  },
  { 
    name: "Royal", 
    primary: "purple", 
    accent: "violet", 
    icon: <Star className="text-purple-300" size={22} />,
    description: "Thème violet élégant"
  },
  { 
    name: "Personnalisé", 
    primary: "slate", 
    accent: "sky", 
    icon: <Palette className="text-slate-300" size={22} />,
    description: "Thème personnalisé"
  }
];

interface ThemeSelectorProps {
  className?: string;
  variant?: 'default' | 'minimal';
  showTitle?: boolean;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  className,
  variant = 'default',
  showTitle = true
}) => {
  const { setTheme, currentTheme } = useTheme();

  // Fonction pour appliquer un thème complet sans modifier le mode clair/sombre
  const applyTheme = (primary: ThemeColor, accent: ThemeColor, name: string) => {
    setTheme({
      ...currentTheme,
      primary,
      accent,
      name,
      // Préserver explicitement le mode clair/sombre actuel
      isDark: currentTheme.isDark
    });
  };

  // Version minimale du sélecteur de thème
  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {POPULAR_THEMES.map((theme, index) => (
          <motion.button
            key={index}
            onClick={() => applyTheme(theme.primary as ThemeColor, theme.accent as ThemeColor, theme.name)}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              "border-2 transition-all duration-300",
              currentTheme.primary === theme.primary && currentTheme.accent === theme.accent
                ? "border-white scale-110 shadow-lg" 
                : "border-white/30 hover:border-white/60"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              background: `linear-gradient(135deg, var(--${theme.primary}-500), var(--${theme.accent}-500))` 
            }}
            title={theme.name}
          >
            {theme.icon}
          </motion.button>
        ))}
      </div>
    );
  }

  // Version complète avec AnimatedDock
  return (
    <div className={cn("space-y-2", className)}>
      {showTitle && (
        <h3 className="text-sm font-medium text-white/80 mb-2">Thèmes de couleurs</h3>
      )}
      
      <AnimatedDock
        className="bg-[color:var(--primary-800)]/40 border-[color:var(--primary-500)]/20"
        items={POPULAR_THEMES.map(theme => ({
          link: "#",
          Icon: theme.icon,
          onClick: () => applyTheme(theme.primary as ThemeColor, theme.accent as ThemeColor, theme.name)
        }))}
      />
      
      {showTitle && (
        <div className="mt-2 text-xs text-white/60 text-center">
          {currentTheme.name}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector; 