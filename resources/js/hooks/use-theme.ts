import { useState, useEffect, useCallback } from 'react';

// Types pour les thèmes disponibles (16 couleurs)
export type ThemeColor = 
  | 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan' | 'red' | 'yellow'
  | 'indigo' | 'emerald' | 'rose' | 'teal' | 'amber' | 'violet' | 'lime' | 'slate'
  | 'gray' | 'zinc' | 'stone';

export interface ThemeConfig {
  primary: ThemeColor;
  accent: ThemeColor;
  name: string;
  isDark?: boolean;
}

// Configurations de thèmes prédéfinis étendues
export const THEME_PRESETS: Record<string, ThemeConfig> = {
  default: {
    primary: 'blue',
    accent: 'purple',
    name: 'Thème par Défaut'
  },
  nature: {
    primary: 'green',
    accent: 'emerald',
    name: 'Thème Nature'
  },
  sunset: {
    primary: 'orange',
    accent: 'red',
    name: 'Thème Coucher de Soleil'
  },
  ocean: {
    primary: 'cyan',
    accent: 'teal',
    name: 'Thème Océan'
  },
  galaxy: {
    primary: 'purple',
    accent: 'violet',
    name: 'Thème Galaxie'
  },
  forest: {
    primary: 'emerald',
    accent: 'lime',
    name: 'Thème Forêt'
  },
  sunrise: {
    primary: 'amber',
    accent: 'yellow',
    name: 'Thème Lever de Soleil'
  },
  cherry: {
    primary: 'rose',
    accent: 'pink',
    name: 'Thème Cerisier'
  },
  midnight: {
    primary: 'indigo',
    accent: 'slate',
    name: 'Thème Minuit',
    isDark: true
  },
  volcanic: {
    primary: 'red',
    accent: 'orange',
    name: 'Thème Volcanique'
  },
  arctic: {
    primary: 'slate',
    accent: 'cyan',
    name: 'Thème Arctique'
  },
  tropical: {
    primary: 'lime',
    accent: 'emerald',
    name: 'Thème Tropical'
  }
};

// Palettes de couleurs OKLCH étendues (16 couleurs)
const COLOR_PALETTES: Record<ThemeColor, Record<string, string>> = {
  // Couleurs existantes
  blue: {
    '50': 'oklch(0.98 0.015 250)',
    '100': 'oklch(0.95 0.03 250)',
    '200': 'oklch(0.9 0.06 250)',
    '300': 'oklch(0.8 0.09 250)',
    '400': 'oklch(0.65 0.12 250)',
    '500': 'oklch(0.5 0.15 250)',
    '600': 'oklch(0.4 0.18 250)',
    '700': 'oklch(0.3 0.15 250)',
    '800': 'oklch(0.22 0.12 250)',
    '900': 'oklch(0.16 0.09 250)',
    '950': 'oklch(0.1 0.06 250)',
  },
  purple: {
    '50': 'oklch(0.98 0.02 280)',
    '100': 'oklch(0.95 0.04 280)',
    '200': 'oklch(0.9 0.08 280)',
    '300': 'oklch(0.8 0.12 280)',
    '400': 'oklch(0.65 0.16 280)',
    '500': 'oklch(0.5 0.2 280)',
    '600': 'oklch(0.4 0.2 280)',
    '700': 'oklch(0.3 0.18 280)',
    '800': 'oklch(0.22 0.15 280)',
    '900': 'oklch(0.16 0.12 280)',
    '950': 'oklch(0.1 0.08 280)',
  },
  green: {
    '50': 'oklch(0.98 0.02 140)',
    '100': 'oklch(0.95 0.04 140)',
    '200': 'oklch(0.9 0.08 140)',
    '300': 'oklch(0.8 0.12 140)',
    '400': 'oklch(0.65 0.16 140)',
    '500': 'oklch(0.5 0.2 140)',
    '600': 'oklch(0.4 0.2 140)',
    '700': 'oklch(0.3 0.18 140)',
    '800': 'oklch(0.22 0.15 140)',
    '900': 'oklch(0.16 0.12 140)',
    '950': 'oklch(0.1 0.08 140)',
  },
  orange: {
    '50': 'oklch(0.98 0.02 60)',
    '100': 'oklch(0.95 0.04 60)',
    '200': 'oklch(0.9 0.08 60)',
    '300': 'oklch(0.8 0.12 60)',
    '400': 'oklch(0.65 0.16 60)',
    '500': 'oklch(0.5 0.2 60)',
    '600': 'oklch(0.4 0.2 60)',
    '700': 'oklch(0.3 0.18 60)',
    '800': 'oklch(0.22 0.15 60)',
    '900': 'oklch(0.16 0.12 60)',
    '950': 'oklch(0.1 0.08 60)',
  },
  pink: {
    '50': 'oklch(0.98 0.02 340)',
    '100': 'oklch(0.95 0.04 340)',
    '200': 'oklch(0.9 0.08 340)',
    '300': 'oklch(0.8 0.12 340)',
    '400': 'oklch(0.65 0.16 340)',
    '500': 'oklch(0.5 0.2 340)',
    '600': 'oklch(0.4 0.2 340)',
    '700': 'oklch(0.3 0.18 340)',
    '800': 'oklch(0.22 0.15 340)',
    '900': 'oklch(0.16 0.12 340)',
    '950': 'oklch(0.1 0.08 340)',
  },
  cyan: {
    '50': 'oklch(0.98 0.02 200)',
    '100': 'oklch(0.95 0.04 200)',
    '200': 'oklch(0.9 0.08 200)',
    '300': 'oklch(0.8 0.12 200)',
    '400': 'oklch(0.65 0.16 200)',
    '500': 'oklch(0.5 0.2 200)',
    '600': 'oklch(0.4 0.2 200)',
    '700': 'oklch(0.3 0.18 200)',
    '800': 'oklch(0.22 0.15 200)',
    '900': 'oklch(0.16 0.12 200)',
    '950': 'oklch(0.1 0.08 200)',
  },
  red: {
    '50': 'oklch(0.98 0.02 20)',
    '100': 'oklch(0.95 0.04 20)',
    '200': 'oklch(0.9 0.08 20)',
    '300': 'oklch(0.8 0.12 20)',
    '400': 'oklch(0.65 0.16 20)',
    '500': 'oklch(0.5 0.2 20)',
    '600': 'oklch(0.4 0.2 20)',
    '700': 'oklch(0.3 0.18 20)',
    '800': 'oklch(0.22 0.15 20)',
    '900': 'oklch(0.16 0.12 20)',
    '950': 'oklch(0.1 0.08 20)',
  },
  yellow: {
    '50': 'oklch(0.98 0.02 90)',
    '100': 'oklch(0.95 0.04 90)',
    '200': 'oklch(0.9 0.08 90)',
    '300': 'oklch(0.8 0.12 90)',
    '400': 'oklch(0.65 0.16 90)',
    '500': 'oklch(0.5 0.2 90)',
    '600': 'oklch(0.4 0.2 90)',
    '700': 'oklch(0.3 0.18 90)',
    '800': 'oklch(0.22 0.15 90)',
    '900': 'oklch(0.16 0.12 90)',
    '950': 'oklch(0.1 0.08 90)',
  },
  // Nouvelles couleurs
  indigo: {
    '50': 'oklch(0.98 0.02 260)',
    '100': 'oklch(0.95 0.04 260)',
    '200': 'oklch(0.9 0.08 260)',
    '300': 'oklch(0.8 0.12 260)',
    '400': 'oklch(0.65 0.16 260)',
    '500': 'oklch(0.5 0.2 260)',
    '600': 'oklch(0.4 0.2 260)',
    '700': 'oklch(0.3 0.18 260)',
    '800': 'oklch(0.22 0.15 260)',
    '900': 'oklch(0.16 0.12 260)',
    '950': 'oklch(0.1 0.08 260)',
  },
  emerald: {
    '50': 'oklch(0.98 0.02 160)',
    '100': 'oklch(0.95 0.04 160)',
    '200': 'oklch(0.9 0.08 160)',
    '300': 'oklch(0.8 0.12 160)',
    '400': 'oklch(0.65 0.16 160)',
    '500': 'oklch(0.5 0.2 160)',
    '600': 'oklch(0.4 0.2 160)',
    '700': 'oklch(0.3 0.18 160)',
    '800': 'oklch(0.22 0.15 160)',
    '900': 'oklch(0.16 0.12 160)',
    '950': 'oklch(0.1 0.08 160)',
  },
  rose: {
    '50': 'oklch(0.98 0.02 350)',
    '100': 'oklch(0.95 0.04 350)',
    '200': 'oklch(0.9 0.08 350)',
    '300': 'oklch(0.8 0.12 350)',
    '400': 'oklch(0.65 0.16 350)',
    '500': 'oklch(0.5 0.2 350)',
    '600': 'oklch(0.4 0.2 350)',
    '700': 'oklch(0.3 0.18 350)',
    '800': 'oklch(0.22 0.15 350)',
    '900': 'oklch(0.16 0.12 350)',
    '950': 'oklch(0.1 0.08 350)',
  },
  teal: {
    '50': 'oklch(0.98 0.02 180)',
    '100': 'oklch(0.95 0.04 180)',
    '200': 'oklch(0.9 0.08 180)',
    '300': 'oklch(0.8 0.12 180)',
    '400': 'oklch(0.65 0.16 180)',
    '500': 'oklch(0.5 0.2 180)',
    '600': 'oklch(0.4 0.2 180)',
    '700': 'oklch(0.3 0.18 180)',
    '800': 'oklch(0.22 0.15 180)',
    '900': 'oklch(0.16 0.12 180)',
    '950': 'oklch(0.1 0.08 180)',
  },
  amber: {
    '50': 'oklch(0.98 0.02 75)',
    '100': 'oklch(0.95 0.04 75)',
    '200': 'oklch(0.9 0.08 75)',
    '300': 'oklch(0.8 0.12 75)',
    '400': 'oklch(0.65 0.16 75)',
    '500': 'oklch(0.5 0.2 75)',
    '600': 'oklch(0.4 0.2 75)',
    '700': 'oklch(0.3 0.18 75)',
    '800': 'oklch(0.22 0.15 75)',
    '900': 'oklch(0.16 0.12 75)',
    '950': 'oklch(0.1 0.08 75)',
  },
  violet: {
    '50': 'oklch(0.98 0.02 300)',
    '100': 'oklch(0.95 0.04 300)',
    '200': 'oklch(0.9 0.08 300)',
    '300': 'oklch(0.8 0.12 300)',
    '400': 'oklch(0.65 0.16 300)',
    '500': 'oklch(0.5 0.2 300)',
    '600': 'oklch(0.4 0.2 300)',
    '700': 'oklch(0.3 0.18 300)',
    '800': 'oklch(0.22 0.15 300)',
    '900': 'oklch(0.16 0.12 300)',
    '950': 'oklch(0.1 0.08 300)',
  },
  lime: {
    '50': 'oklch(0.98 0.02 120)',
    '100': 'oklch(0.95 0.04 120)',
    '200': 'oklch(0.9 0.08 120)',
    '300': 'oklch(0.8 0.12 120)',
    '400': 'oklch(0.65 0.16 120)',
    '500': 'oklch(0.5 0.2 120)',
    '600': 'oklch(0.4 0.2 120)',
    '700': 'oklch(0.3 0.18 120)',
    '800': 'oklch(0.22 0.15 120)',
    '900': 'oklch(0.16 0.12 120)',
    '950': 'oklch(0.1 0.08 120)',
  },
  slate: {
    '50': 'oklch(0.98 0.005 240)',
    '100': 'oklch(0.95 0.01 240)',
    '200': 'oklch(0.9 0.015 240)',
    '300': 'oklch(0.8 0.02 240)',
    '400': 'oklch(0.65 0.025 240)',
    '500': 'oklch(0.5 0.03 240)',
    '600': 'oklch(0.4 0.03 240)',
    '700': 'oklch(0.3 0.025 240)',
    '800': 'oklch(0.22 0.02 240)',
    '900': 'oklch(0.16 0.015 240)',
    '950': 'oklch(0.1 0.01 240)',
  },
  // Nouvelles couleurs neutres
  gray: {
    '50': 'oklch(0.98 0.003 240)',
    '100': 'oklch(0.95 0.006 240)',
    '200': 'oklch(0.9 0.009 240)',
    '300': 'oklch(0.8 0.012 240)',
    '400': 'oklch(0.65 0.015 240)',
    '500': 'oklch(0.5 0.018 240)',
    '600': 'oklch(0.4 0.018 240)',
    '700': 'oklch(0.3 0.015 240)',
    '800': 'oklch(0.22 0.012 240)',
    '900': 'oklch(0.16 0.009 240)',
    '950': 'oklch(0.1 0.006 240)',
  },
  zinc: {
    '50': 'oklch(0.98 0.004 220)',
    '100': 'oklch(0.95 0.008 220)',
    '200': 'oklch(0.9 0.012 220)',
    '300': 'oklch(0.8 0.016 220)',
    '400': 'oklch(0.65 0.02 220)',
    '500': 'oklch(0.5 0.024 220)',
    '600': 'oklch(0.4 0.024 220)',
    '700': 'oklch(0.3 0.02 220)',
    '800': 'oklch(0.22 0.016 220)',
    '900': 'oklch(0.16 0.012 220)',
    '950': 'oklch(0.1 0.008 220)',
  },
  stone: {
    '50': 'oklch(0.98 0.004 80)',
    '100': 'oklch(0.95 0.008 80)',
    '200': 'oklch(0.9 0.012 80)',
    '300': 'oklch(0.8 0.016 80)',
    '400': 'oklch(0.65 0.02 80)',
    '500': 'oklch(0.5 0.024 80)',
    '600': 'oklch(0.4 0.024 80)',
    '700': 'oklch(0.3 0.02 80)',
    '800': 'oklch(0.22 0.016 80)',
    '900': 'oklch(0.16 0.012 80)',
    '950': 'oklch(0.1 0.008 80)',
  },
};

// Catégories de couleurs
export const COLOR_CATEGORIES = {
  'Primaires': ['blue', 'red', 'yellow'] as ThemeColor[],
  'Secondaires': ['purple', 'green', 'orange'] as ThemeColor[],
  'Tertiaires': ['indigo', 'teal', 'rose', 'amber'] as ThemeColor[],
  'Neutres': ['slate', 'gray', 'zinc', 'stone'] as ThemeColor[],
  'Spéciales': ['cyan', 'emerald', 'violet', 'lime'] as ThemeColor[],
};

const STORAGE_KEY = 'myapp-theme';
const RECENT_THEMES_KEY = 'myapp-recent-themes';

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(THEME_PRESETS.default);
  const [recentThemes, setRecentThemes] = useState<ThemeConfig[]>([]);
  const [colorCategories] = useState<Record<string, ThemeColor[]>>({
    'Primaires': ['blue', 'red', 'yellow'] as ThemeColor[],
    'Secondaires': ['purple', 'green', 'orange'] as ThemeColor[],
    'Tertiaires': ['indigo', 'teal', 'rose', 'amber'] as ThemeColor[],
    'Neutres': ['slate', 'gray', 'zinc', 'stone'] as ThemeColor[],
    'Spéciales': ['cyan', 'emerald', 'violet', 'lime'] as ThemeColor[],
  });

  // Charger le thème et les thèmes récents depuis localStorage au démarrage
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const savedRecentThemes = localStorage.getItem(RECENT_THEMES_KEY);
    
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setCurrentTheme(parsedTheme);
        applyTheme(parsedTheme);
      } catch (error) {
        console.warn('Erreur lors du chargement du thème sauvegardé:', error);
      }
    }

    if (savedRecentThemes) {
      try {
        const parsedRecentThemes = JSON.parse(savedRecentThemes);
        setRecentThemes(parsedRecentThemes);
      } catch (error) {
        console.warn('Erreur lors du chargement des thèmes récents:', error);
      }
    }
  }, []);

  const updateCSSVariables = useCallback((theme: ThemeConfig) => {
    const root = document.documentElement;
    const primaryPalette = COLOR_PALETTES[theme.primary];
    const accentPalette = COLOR_PALETTES[theme.accent];

    // Mise à jour des variables CSS pour les couleurs primaires
    Object.entries(primaryPalette).forEach(([shade, value]) => {
      const rgbValue = oklchToRgb(value);
      root.style.setProperty(`--primary-rgb-${shade}`, rgbValue);
    });

    // Mise à jour des variables CSS pour les couleurs d'accent
    Object.entries(accentPalette).forEach(([shade, value]) => {
      const rgbValue = oklchToRgb(value);
      root.style.setProperty(`--accent-rgb-${shade}`, rgbValue);
    });

    // Mise à jour du mode sombre/clair
    if (theme.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  // Fonction pour convertir OKLCH en RGB
  const oklchToRgb = (oklch: string): string => {
    // Extraction des valeurs OKLCH
    const match = oklch.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
    if (!match) return '0, 0, 0';

    const [, l, c, h] = match.map(Number);
    
    // Conversion OKLCH vers RGB (approximation simplifiée)
    const hRad = h * Math.PI / 180;
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);
    
    // Conversion Lab vers RGB (approximation)
    const r = Math.round(255 * (l + a));
    const g = Math.round(255 * (l - 0.5 * a - 0.866 * b));
    const b_ = Math.round(255 * (l - 0.5 * a + 0.866 * b));
    
    return `${Math.max(0, Math.min(255, r))}, ${Math.max(0, Math.min(255, g))}, ${Math.max(0, Math.min(255, b_))}`;
  };

  // Initialisation au montage
  useEffect(() => {
    updateCSSVariables(currentTheme);
  }, [currentTheme, updateCSSVariables]);

  // Fonction pour appliquer le thème aux variables CSS
  const applyTheme = useCallback((theme: ThemeConfig) => {
    const root = document.documentElement;
    const primaryColors = COLOR_PALETTES[theme.primary];
    const accentColors = COLOR_PALETTES[theme.accent];

    // Appliquer les couleurs primary
    Object.entries(primaryColors).forEach(([variant, color]) => {
      root.style.setProperty(`--primary-${variant}`, color);
    });

    // Appliquer les couleurs accent
    Object.entries(accentColors).forEach(([variant, color]) => {
      root.style.setProperty(`--accent-${variant}`, color);
    });

    // Mettre à jour les couleurs principales
    root.style.setProperty('--primary', primaryColors['500']);
    root.style.setProperty('--accent', accentColors['500']);

    // Ajouter un attribut data pour les transitions et le mode sombre
    root.setAttribute('data-theme', `${theme.primary}-${theme.accent}`);
    
    if (theme.isDark) {
      root.setAttribute('data-theme-mode', 'dark');
    } else {
      root.removeAttribute('data-theme-mode');
    }
  }, []);

  // Fonction pour ajouter un thème aux récents
  const addToRecentThemes = useCallback((theme: ThemeConfig) => {
    setRecentThemes(prev => {
      const filtered = prev.filter(t => 
        t.primary !== theme.primary || t.accent !== theme.accent
      );
      const newRecent = [theme, ...filtered].slice(0, 5); // Garder les 5 derniers
      localStorage.setItem(RECENT_THEMES_KEY, JSON.stringify(newRecent));
      return newRecent;
    });
  }, []);

  // Fonction pour changer le thème
  const changeTheme = useCallback((newTheme: ThemeConfig) => {
    setCurrentTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTheme));
    addToRecentThemes(newTheme);
  }, [applyTheme, addToRecentThemes]);

  // Fonction pour générer un thème aléatoire
  const generateRandomTheme = useCallback((): ThemeConfig => {
    const colors = Object.keys(COLOR_PALETTES) as ThemeColor[];
    const primary = colors[Math.floor(Math.random() * colors.length)];
    let accent;
    do {
      accent = colors[Math.floor(Math.random() * colors.length)];
    } while (accent === primary);

    return {
      primary,
      accent,
      name: `Thème Aléatoire`,
      isDark: Math.random() > 0.5
    };
  }, []);

  // Fonction pour réinitialiser au thème par défaut
  const resetTheme = useCallback(() => {
    changeTheme(THEME_PRESETS.default);
  }, [changeTheme]);

  // Fonction pour obtenir la valeur d'une couleur
  const getColorValue = (colorName: ThemeColor, shade: string = '500'): string => {
    const palette = COLOR_PALETTES[colorName];
    if (!palette) {
      console.warn(`Palette non trouvée pour la couleur ${colorName}`);
      return COLOR_PALETTES.blue[shade]; // Fallback sur bleu
    }
    return palette[shade];
  };

  // Fonction pour basculer le mode sombre/clair
  const toggleDarkMode = useCallback(() => {
    const newTheme = {
      ...currentTheme,
      isDark: !currentTheme.isDark
    };
    changeTheme(newTheme);
  }, [currentTheme, changeTheme]);

  return {
    currentTheme,
    colorCategories,
    recentThemes,
    setTheme: changeTheme,
    toggleDarkMode,
    getColorValue,
    generateRandomTheme,
    resetTheme,
  };
}

export default useTheme;