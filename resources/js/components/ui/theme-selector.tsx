import React from 'react';
import { useTheme, ThemeColor, THEME_PRESETS } from '@/hooks/use-theme';
import { AnimatedDock } from '@/components/ui/animated-dock';
import { Palette, Sparkles, Droplets, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Récupération des variables d'environnement
const ALLOW_THEME_CHANGE = import.meta.env.VITE_THEME_ALLOW_CHANGE !== 'false';

// Définition des thèmes populaires avec leurs couleurs primaires et d'accentuation basée sur THEME_PRESETS
const POPULAR_THEMES = [
  { 
    ...THEME_PRESETS.default, // Océan Profond (blue + cyan)
    icon: <Droplets className="text-blue-300" size={22} />,
    description: "Bleu océanique"
  },
  { 
    ...THEME_PRESETS.classic_red, // Feu Ardent (red + orange)
    icon: <Flame className="text-red-300" size={22} />,
    description: "Rouge flamboyant"
  },
  { 
    ...THEME_PRESETS.ocean_breeze, // Brise Océanique (cyan + teal)
    icon: <Droplets className="text-cyan-300" size={22} />,
    description: "Cyan rafraîchissant"
  },
  { 
    ...THEME_PRESETS.nature_forest, // Forêt Mystique (emerald + lime)
    icon: <Sparkles className="text-emerald-300" size={22} />,
    description: "Vert émeraude"
  },
  { 
    name: "Personnalisé", 
    primary: "slate", 
    accent: "sky", 
    icon: <Palette className="text-slate-300" size={22} />,
    description: "Thème personnalisé"
  },
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
    // Garantir que le mode sombre/clair actuel est préservé
    const isDark = document.documentElement.classList.contains('dark');
    
    setTheme({
      ...currentTheme,
      primary,
      accent,
      name,
      // Forcer explicitement le mode clair/sombre actuel
      isDark: isDark
    });
  };

  // Version minimale du sélecteur de thème
  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {POPULAR_THEMES.map((theme, index) => (
          <motion.button
            key={index}
            onClick={() => ALLOW_THEME_CHANGE && applyTheme(theme.primary as ThemeColor, theme.accent as ThemeColor, theme.name)}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              "border-2 transition-all duration-300",
              currentTheme.primary === theme.primary && currentTheme.accent === theme.accent
                ? "border-white scale-110 shadow-lg" 
                : "border-white/30 hover:border-white/60",
              !ALLOW_THEME_CHANGE && "opacity-50 cursor-not-allowed"
            )}
            whileHover={ALLOW_THEME_CHANGE ? { scale: 1.1 } : {}}
            whileTap={ALLOW_THEME_CHANGE ? { scale: 0.95 } : {}}
            style={{ 
              background: `linear-gradient(135deg, var(--${theme.primary}-500), var(--${theme.accent}-500))` 
            }}
            title={ALLOW_THEME_CHANGE ? theme.name : "Changement de thème désactivé"}
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
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-white/80">Couleurs du thème</h3>
          <div className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
            {ALLOW_THEME_CHANGE ? "Préserve le mode clair/sombre" : "Changement désactivé"}
          </div>
        </div>
      )}
      
      <AnimatedDock
        className={cn(
          "bg-[color:var(--primary-800)]/40 border-[color:var(--primary-500)]/20",
          !ALLOW_THEME_CHANGE && "opacity-50 pointer-events-none"
        )}
        items={POPULAR_THEMES.map(theme => ({
          link: "#",
          Icon: theme.icon,
          onClick: () => ALLOW_THEME_CHANGE && applyTheme(theme.primary as ThemeColor, theme.accent as ThemeColor, theme.name)
        }))}
      />
      
      {showTitle && (
        <div className="mt-2 text-xs text-white/60 text-center">
          {currentTheme.name}
          {!ALLOW_THEME_CHANGE && (
            <div className="mt-1 text-xs text-amber-400">
              Le changement de thème est désactivé dans la configuration
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector; 