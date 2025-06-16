import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette, Sparkles, Check, X } from "lucide-react";
import { useTheme, ThemeColor } from "@/hooks/use-theme";

interface ColorPickerProps {
  color: string;
  label?: string;
  className?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  label,
  className
}) => {
  const { colorCategories, setTheme, currentTheme, getColorValue } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoveredColor, setHoveredColor] = React.useState<string | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05
      }
    },
    exit: { opacity: 0, scale: 0.95, y: -10 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 }
  };

  const handleColorChange = (colorName: ThemeColor) => {
    setTheme({
      ...currentTheme,
      primary: colorName,
      name: `Thème ${colorName}`,
    });
    setIsOpen(false);
  };

  // Fonction pour obtenir la couleur actuelle
  const getCurrentColor = (colorName: ThemeColor) => {
    return getColorValue(colorName, '500');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative"
        >
          <Button
            variant="outline"
            className={cn(
              "relative w-full h-14 justify-start text-left font-normal overflow-hidden",
              "border-2 border-white/20 hover:border-white/40",
              "glass hover:glass-strong",
              "transition-all duration-300 hover:shadow-lg",
              className
            )}
          >
            {/* Effet de brillance */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            
            <div className="relative flex items-center gap-3 z-10">
              <div className="relative">
                <div
                  className="h-8 w-8 rounded-xl border-2 border-white/30 shadow-lg overflow-hidden"
                  style={{ backgroundColor: color }}
                >
                  {/* Effet de brillance interne */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                </div>
                <motion.div 
                  className="absolute -top-1 -right-1 h-4 w-4 bg-accent-400/80 rounded-full shadow-sm flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Palette className="h-2 w-2 text-white" />
                </motion.div>
              </div>
              
              <div className="flex flex-col">
                <span className="font-medium text-white">
                  {label || "Palette de couleurs"}
                </span>
                <span className="text-xs text-white/70 uppercase tracking-wide">
                  {currentTheme.name || "Sélectionner"}
                </span>
              </div>
              
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="ml-auto"
              >
                <Sparkles className="h-4 w-4 text-accent-300" />
              </motion.div>
            </div>
          </Button>
        </motion.div>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0 border-0 shadow-2xl glass-strong rounded-2xl overflow-hidden">
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="p-6"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-lg flex items-center justify-center">
                  <Palette className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Sélecteur de couleur</h3>
                  <p className="text-xs text-white/70">Choisissez votre palette parfaite</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-white/10"
              >
                <X className="h-4 w-4 text-white/70" />
              </Button>
            </motion.div>

            {/* Color Preview */}
            <motion.div variants={itemVariants} className="mb-6">
              <div 
                className="h-16 w-full rounded-xl border-2 border-white/20 shadow-inner relative overflow-hidden transition-all duration-300"
                style={{ 
                  backgroundColor: hoveredColor || color,
                  boxShadow: `0 4px 20px ${hoveredColor || color}20`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
              </div>
              <p className="text-center text-sm text-white/70 mt-2 font-mono">
                {hoveredColor || color}
              </p>
            </motion.div>

            {/* Color Categories */}
            <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {Object.entries(colorCategories).map(([category, colors]) => (
                <motion.div key={category} variants={itemVariants} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                    <h4 className="font-medium text-sm text-white/90 capitalize px-2">
                      {category}
                    </h4>
                    <div className="h-px flex-1 bg-gradient-to-l from-white/20 to-transparent rounded-full" />
                  </div>
                  
                  <div className="grid grid-cols-8 gap-2">
                    {colors.map((colorName) => {
                      const colorValue = getCurrentColor(colorName);
                      return (
                        <motion.button
                          key={colorName}
                          className={cn(
                            "relative h-8 w-8 rounded-lg transition-all duration-200",
                            "border-2",
                            currentTheme.primary === colorName 
                              ? "border-white ring-2 ring-accent-400 shadow-lg scale-110" 
                              : "border-white/30 hover:border-white hover:scale-105 hover:shadow-md"
                          )}
                          style={{ 
                            backgroundColor: colorValue,
                            boxShadow: currentTheme.primary === colorName ? `0 4px 12px ${colorValue}40` : undefined
                          }}
                          onClick={() => handleColorChange(colorName)}
                          onMouseEnter={() => setHoveredColor(colorValue)}
                          onMouseLeave={() => setHoveredColor(null)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Effet de brillance */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-md" />
                          
                          {currentTheme.primary === colorName && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <Check className="h-3 w-3 text-white drop-shadow-md" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;