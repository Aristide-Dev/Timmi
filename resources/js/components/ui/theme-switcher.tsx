import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

interface ThemeSwitcherProps {
  variant?: 'default' | 'outline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = 'default',
  size = 'md',
  className
}) => {
  const { currentTheme, toggleDarkMode } = useTheme();
  const isDark = currentTheme?.isDark || false;

  // Définition des tailles
  const sizes = {
    sm: "h-8 w-16",
    md: "h-9 w-20",
    lg: "h-10 w-24"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  // Rendu du switcher minimal (juste deux boutons)
  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <motion.button
          onClick={() => isDark && toggleDarkMode()}
          className={cn(
            "p-2 rounded-lg transition-all duration-300",
            !isDark 
              ? "bg-white/20 backdrop-blur-sm text-yellow-300" 
              : "bg-transparent text-white/50 hover:text-white/80 hover:bg-white/10"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Mode clair"
          title="Mode clair"
        >
          <Sun className={iconSizes[size]} />
        </motion.button>
        
        <motion.button
          onClick={() => !isDark && toggleDarkMode()}
          className={cn(
            "p-2 rounded-lg transition-all duration-300",
            isDark 
              ? "bg-white/20 backdrop-blur-sm text-blue-300" 
              : "bg-transparent text-white/50 hover:text-white/80 hover:bg-white/10"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Mode sombre"
          title="Mode sombre"
        >
          <Moon className={iconSizes[size]} />
        </motion.button>
      </div>
    );
  }

  // Rendu du switcher par défaut (style toggle)
  return (
    <div 
      className={cn(
        "relative rounded-full cursor-pointer transition-all duration-300",
        sizes[size],
        variant === 'default' 
          ? "bg-gradient-to-r from-blue-900/80 to-indigo-900/80 p-1" 
          : "border-2 border-white/20 p-0.5",
        className
      )}
      onClick={toggleDarkMode}
    >
      <motion.div 
        className={cn(
          "absolute top-0 bottom-0 rounded-full aspect-square flex items-center justify-center",
          "shadow-lg transition-colors",
          variant === 'default' 
            ? "bg-gradient-to-br from-white/90 to-white/70" 
            : "bg-white/20 backdrop-blur-sm"
        )}
        animate={{ 
          left: isDark ? "50%" : "0%",
          backgroundColor: isDark ? "rgba(37, 99, 235, 0.2)" : "rgba(255, 255, 255, 0.9)"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon className={cn(iconSizes[size], "text-blue-300")} />
        ) : (
          <Sun className={cn(iconSizes[size], "text-yellow-500")} />
        )}
      </motion.div>
      
      {/* Effet de glassmorphism subtil */}
      <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-[1px]" />
      
      {/* Positions des icônes statiques */}
      <div className="relative h-full w-full flex items-center">
        <div className={cn("flex-1 flex justify-center", isDark && "opacity-40")}>
          <Sun className={cn(iconSizes[size], "text-yellow-300")} />
        </div>
        <div className={cn("flex-1 flex justify-center", !isDark && "opacity-40")}>
          <Moon className={cn(iconSizes[size], "text-blue-300")} />
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher; 