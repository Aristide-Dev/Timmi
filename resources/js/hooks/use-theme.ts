import { useCallback, useEffect, useState } from 'react';

// Récupération des variables d'environnement
const DEFAULT_THEME_KEY = import.meta.env.VITE_THEME_DEFAULT || 'default';
const ALLOW_THEME_CHANGE = import.meta.env.VITE_THEME_ALLOW_CHANGE !== false;
const DEFAULT_DARK_MODE = import.meta.env.VITE_THEME_DEFAULT_DARK_MODE === true;

console.log('VITE_THEME_ALLOW_CHANGE', import.meta.env.VITE_THEME_ALLOW_CHANGE);
console.log('VITE_THEME_DEFAULT', import.meta.env.VITE_THEME_DEFAULT);
console.log('VITE_THEME_DEFAULT_DARK_MODE', import.meta.env.VITE_THEME_DEFAULT_DARK_MODE);


// Types pour les thèmes disponibles (16 couleurs)
export type ThemeColor =
    | 'blue'
    | 'purple'
    | 'green'
    | 'orange'
    | 'pink'
    | 'cyan'
    | 'red'
    | 'yellow'
    | 'indigo'
    | 'emerald'
    | 'rose'
    | 'teal'
    | 'amber'
    | 'violet'
    | 'lime'
    | 'slate'
    | 'gray'
    | 'white'
    | 'zinc'
    | 'stone'
    | 'sky'
    | 'fuchsia'
    | 'mint'
    | 'makity_purple'
    | 'makity_yellow'
    | 'makity_purple'
    ;

export interface ThemeConfig {
    primary: ThemeColor;
    accent: ThemeColor;
    name: string;
    isDark?: boolean;
    category?: 'nature' | 'urban' | 'cosmic' | 'seasons' | 'premium' | 'classic' | 'modern' | 'makity_theme' | 'makity_white' | 'makity_yellow';
    gradient?: boolean;
}

// Configurations de thèmes prédéfinis étendues
export const THEME_PRESETS: Record<string, ThemeConfig> = {
    // Classiques
    default: {
        primary: 'blue',
        accent: 'cyan',
        name: 'Océan Profond',
        category: 'classic',
    },
    classic_red: {
        primary: 'red',
        accent: 'orange',
        name: 'Feu Ardent',
        category: 'classic',
    },
    classic_green: {
        primary: 'green',
        accent: 'emerald',
        name: 'Forêt Enchantée',
        category: 'classic',
    },
    royal_purple: {
        primary: 'purple',
        accent: 'violet',
        name: 'Majesté Royale',
        category: 'premium',
    },

    // Nature
    nature_forest: {
        primary: 'emerald',
        accent: 'lime',
        name: 'Forêt Mystique',
        category: 'nature',
        gradient: true,
    },
    ocean_breeze: {
        primary: 'cyan',
        accent: 'teal',
        name: 'Brise Océanique',
        category: 'nature',
    },
    sunset_glow: {
        primary: 'orange',
        accent: 'amber',
        name: 'Éclat du Couchant',
        category: 'nature',
        gradient: true,
    },
    cherry_blossom: {
        primary: 'rose',
        accent: 'pink',
        name: 'Fleur de Cerisier',
        category: 'nature',
    },
    mint_fresh: {
        primary: 'mint',
        accent: 'emerald',
        name: 'Fraîcheur Menthe',
        category: 'nature',
    },

    // Saisons
    spring_bloom: {
        primary: 'emerald',
        accent: 'rose',
        name: 'Floraison Printanière',
        category: 'seasons',
        gradient: true,
    },
    summer_sky: {
        primary: 'sky',
        accent: 'yellow',
        name: "Ciel d'Été",
        category: 'seasons',
    },
    autumn_leaves: {
        primary: 'amber',
        accent: 'red',
        name: "Feuilles d'Automne",
        category: 'seasons',
        gradient: true,
    },
    winter_frost: {
        primary: 'slate',
        accent: 'cyan',
        name: 'Givre Hivernal',
        category: 'seasons',
    },

    // Cosmique
    galaxy_nebula: {
        primary: 'purple',
        accent: 'fuchsia',
        name: 'Nébuleuse Galactique',
        category: 'cosmic',
        gradient: true,
    },
    starlight: {
        primary: 'indigo',
        accent: 'violet',
        name: 'Lumière Stellaire',
        category: 'cosmic',
    },
    aurora_borealis: {
        primary: 'teal',
        accent: 'violet',
        name: 'Aurore Boréale',
        category: 'cosmic',
        gradient: true,
    },
    cosmic_dust: {
        primary: 'slate',
        accent: 'purple',
        name: 'Poussière Cosmique',
        category: 'cosmic',
    },

    // Urbain moderne
    neon_city: {
        primary: 'fuchsia',
        accent: 'cyan',
        name: 'Ville Néon',
        category: 'urban',
        gradient: true,
    },
    cyberpunk: {
        primary: 'violet',
        accent: 'lime',
        name: 'Cyberpunk 2077',
        category: 'urban',
    },
    midnight_blue: {
        primary: 'indigo',
        accent: 'sky',
        name: 'Bleu Minuit',
        category: 'urban',
    },
    electric_pink: {
        primary: 'pink',
        accent: 'purple',
        name: 'Rose Électrique',
        category: 'modern',
        gradient: true,
    },

    // Premium
    gold_luxury: {
        primary: 'amber',
        accent: 'yellow',
        name: 'Luxe Doré',
        category: 'premium',
        gradient: true,
    },
    platinum_elite: {
        primary: 'slate',
        accent: 'zinc',
        name: 'Élite Platine',
        category: 'premium',
    },
    emerald_prestige: {
        primary: 'emerald',
        accent: 'teal',
        name: 'Prestige Émeraude',
        category: 'premium',
    },
    ruby_excellence: {
        primary: 'red',
        accent: 'rose',
        name: 'Excellence Rubis',
        category: 'premium',
        gradient: true,
    },

    // Thème 7MAKITY
    makity_theme: {
        primary: 'makity_purple',
        accent: 'makity_yellow',
        name: '7MAKITY',
        category: 'premium',
        gradient: true,
    },
    makity_white: {
        primary: 'white',
        accent: 'makity_purple',
        name: '7MAKITY Blanc',
        category: 'premium',
        gradient: true,
    },
    makity_yellow: {
        primary: 'makity_yellow',
        accent: 'makity_purple',
        name: '7MAKITY Jaune Moutarde',
        category: 'premium',
        gradient: true,
    },

};

// Palettes de couleurs OKLCH étendues (16 couleurs)
// Palettes de couleurs OKLCH étendues (22 couleurs)
const COLOR_PALETTES: Record<ThemeColor, Record<string, string>> = {
    // Couleurs existantes améliorées
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
    white: {
        '50': 'oklch(0.98 0.003 0)',
        '100': 'oklch(0.95 0.006 0)',
        '200': 'oklch(0.9 0.009 0)',
        '300': 'oklch(0.8 0.012 0)',
        '400': 'oklch(0.65 0.015 0)',
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
    // Nouvelles couleurs
    sky: {
        '50': 'oklch(0.98 0.015 220)',
        '100': 'oklch(0.95 0.03 220)',
        '200': 'oklch(0.9 0.06 220)',
        '300': 'oklch(0.8 0.09 220)',
        '400': 'oklch(0.65 0.12 220)',
        '500': 'oklch(0.5 0.15 220)',
        '600': 'oklch(0.4 0.18 220)',
        '700': 'oklch(0.3 0.15 220)',
        '800': 'oklch(0.22 0.12 220)',
        '900': 'oklch(0.16 0.09 220)',
        '950': 'oklch(0.1 0.06 220)',
    },
    fuchsia: {
        '50': 'oklch(0.98 0.02 320)',
        '100': 'oklch(0.95 0.04 320)',
        '200': 'oklch(0.9 0.08 320)',
        '300': 'oklch(0.8 0.12 320)',
        '400': 'oklch(0.65 0.16 320)',
        '500': 'oklch(0.5 0.2 320)',
        '600': 'oklch(0.4 0.2 320)',
        '700': 'oklch(0.3 0.18 320)',
        '800': 'oklch(0.22 0.15 320)',
        '900': 'oklch(0.16 0.12 320)',
        '950': 'oklch(0.1 0.08 320)',
    },
    mint: {
        '50': 'oklch(0.98 0.02 150)',
        '100': 'oklch(0.95 0.04 150)',
        '200': 'oklch(0.9 0.08 150)',
        '300': 'oklch(0.8 0.12 150)',
        '400': 'oklch(0.65 0.16 150)',
        '500': 'oklch(0.5 0.2 150)',
        '600': 'oklch(0.4 0.2 150)',
        '700': 'oklch(0.3 0.18 150)',
        '800': 'oklch(0.22 0.15 150)',
        '900': 'oklch(0.16 0.12 150)',
        '950': 'oklch(0.1 0.08 150)',
    },
    // Couleurs 7MAKITY personnalisées
    makity_purple: {
        '50': 'oklch(0.98 0.02 285)',
        '100': 'oklch(0.95 0.04 285)',
        '200': 'oklch(0.9 0.08 285)',
        '300': 'oklch(0.8 0.12 285)',
        '400': 'oklch(0.65 0.16 285)',
        '500': 'oklch(0.35 0.18 285)', // Violet foncé #570E6C équivalent
        '600': 'oklch(0.3 0.2 285)',
        '700': 'oklch(0.25 0.18 285)',
        '800': 'oklch(0.2 0.15 285)',
        '900': 'oklch(0.15 0.12 285)',
        '950': 'oklch(0.1 0.08 285)',
    },
    makity_yellow: {
        '50': 'oklch(0.98 0.02 80)',
        '100': 'oklch(0.95 0.04 80)',
        '200': 'oklch(0.9 0.08 80)',
        '300': 'oklch(0.8 0.12 80)',
        '400': 'oklch(0.75 0.16 80)',
        '500': 'oklch(0.7 0.18 80)', // Jaune moutarde #FDB912 équivalent
        '600': 'oklch(0.6 0.16 80)',
        '700': 'oklch(0.5 0.14 80)',
        '800': 'oklch(0.4 0.12 80)',
        '900': 'oklch(0.3 0.1 80)',
        '950': 'oklch(0.2 0.08 80)',
    },
};

// Catégories de couleurs étendues
export const THEME_CATEGORIES = {
    Classiques: Object.keys(THEME_PRESETS).filter((key) => THEME_PRESETS[key].category === 'classic'),
    Nature: Object.keys(THEME_PRESETS).filter((key) => THEME_PRESETS[key].category === 'nature'),
    Saisons: Object.keys(THEME_PRESETS).filter((key) => THEME_PRESETS[key].category === 'seasons'),
    Cosmique: Object.keys(THEME_PRESETS).filter((key) => THEME_PRESETS[key].category === 'cosmic'),
    Urbain: Object.keys(THEME_PRESETS).filter((key) => THEME_PRESETS[key].category === 'urban'),
    Premium: Object.keys(THEME_PRESETS).filter((key) => THEME_PRESETS[key].category === 'premium'),
    Moderne: Object.keys(THEME_PRESETS).filter((key) => THEME_PRESETS[key].category === 'modern'),
    Makity: Object.keys(THEME_PRESETS).filter((key) => THEME_PRESETS[key].category === 'makity_theme'),   
    Makity_Gris: Object.keys(THEME_PRESETS).filter((key) => THEME_PRESETS[key].category === 'makity_white'),   
    Makity_Jaune: Object.keys(THEME_PRESETS).filter((key) => THEME_PRESETS[key].category === 'makity_yellow'),   
};

const STORAGE_KEY = 'myapp-theme';
const RECENT_THEMES_KEY = 'myapp-recent-themes';

export function useTheme() {
    // Utiliser le thème par défaut défini dans .env ou fallback sur 'default'
    const defaultThemeConfig = THEME_PRESETS[DEFAULT_THEME_KEY] || THEME_PRESETS.default;

    // Appliquer le mode sombre par défaut si spécifié dans .env
    if (DEFAULT_DARK_MODE !== undefined) {
        defaultThemeConfig.isDark = DEFAULT_DARK_MODE;
    }

    const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(defaultThemeConfig);
    const [recentThemes, setRecentThemes] = useState<ThemeConfig[]>([]);
    const [colorCategories] = useState<Record<string, ThemeColor[]>>({
        Primaires: ['blue', 'red', 'yellow'] as ThemeColor[],
        Secondaires: ['purple', 'green', 'orange'] as ThemeColor[],
        Tertiaires: ['indigo', 'teal', 'rose', 'amber'] as ThemeColor[],
        Neutres: ['slate', 'gray', 'zinc', 'stone'] as ThemeColor[],
        Spéciales: ['cyan', 'emerald', 'violet', 'lime'] as ThemeColor[],
        '7MAKITY': ['makity_purple', 'makity_yellow', 'makity_white'] as ThemeColor[],
    });

    // Charger le thème et les thèmes récents depuis localStorage au démarrage
    useEffect(() => {
        // Si le changement de thème est désactivé, toujours utiliser le thème par défaut de la config
        if (!ALLOW_THEME_CHANGE) {
            setCurrentTheme(defaultThemeConfig);
            applyTheme(defaultThemeConfig);
            return;
        }

        const savedTheme = localStorage.getItem(STORAGE_KEY);
        const savedRecentThemes = localStorage.getItem(RECENT_THEMES_KEY);

        // Charger le thème sauvegardé seulement si le changement de thème est autorisé
        if (savedTheme) {
            try {
                const parsedTheme = JSON.parse(savedTheme);
                setCurrentTheme(parsedTheme);
                applyTheme(parsedTheme);
            } catch (error) {
                console.warn('Erreur lors du chargement du thème sauvegardé:', error);
                // En cas d'erreur, utiliser le thème par défaut
                setCurrentTheme(defaultThemeConfig);
                applyTheme(defaultThemeConfig);
            }
        } else {
            // Appliquer le thème par défaut défini dans .env
            setCurrentTheme(defaultThemeConfig);
            applyTheme(defaultThemeConfig);
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
            // Définir aussi directement les variables de couleur pour faciliter l'accès
            root.style.setProperty(`--primary-${shade}`, `rgb(${rgbValue})`);
        });

        // Mise à jour des variables CSS pour les couleurs d'accent
        Object.entries(accentPalette).forEach(([shade, value]) => {
            const rgbValue = oklchToRgb(value);
            root.style.setProperty(`--accent-rgb-${shade}`, rgbValue);
            // Définir aussi directement les variables de couleur pour faciliter l'accès
            root.style.setProperty(`--accent-${shade}`, `rgb(${rgbValue})`);
        });

        // Mise à jour du mode sombre/clair
        if (theme.isDark) {
            root.classList.add('dark');
            root.setAttribute('data-theme', 'dark');
        } else {
            root.classList.remove('dark');
            root.setAttribute('data-theme', 'light');
        }
    }, []);

    // Fonction pour convertir OKLCH en RGB
    const oklchToRgb = (oklch: string): string => {
        // Extraction des valeurs OKLCH
        const match = oklch.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
        if (!match) return '0, 0, 0';

        const [, l, c, h] = match.map(Number);

        // Conversion OKLCH vers RGB améliorée
        // Utilisation d'une approche plus précise pour la conversion
        let r, g, b;

        // Conversion basée sur l'angle de teinte
        const hue = h % 360; // Normaliser l'angle entre 0 et 360

        if (hue >= 0 && hue < 60) {
            // Rouge à jaune
            r = l + c * 0.9;
            g = l + c * 0.5 * (hue / 60);
            b = l - c * 0.3;
        } else if (hue >= 60 && hue < 120) {
            // Jaune à vert
            r = l + c * 0.9 * (1 - (hue - 60) / 60);
            g = l + c * 0.5;
            b = l - c * 0.3;
        } else if (hue >= 120 && hue < 180) {
            // Vert à cyan
            r = l - c * 0.4;
            g = l + c * 0.5;
            b = l + c * 0.5 * ((hue - 120) / 60);
        } else if (hue >= 180 && hue < 240) {
            // Cyan à bleu
            r = l - c * 0.4;
            g = l + c * 0.5 * (1 - (hue - 180) / 60);
            b = l + c * 0.9;
        } else if (hue >= 240 && hue < 300) {
            // Bleu à magenta
            r = l + c * 0.5 * ((hue - 240) / 60);
            g = l - c * 0.3;
            b = l + c * 0.9;
        } else {
            // Magenta à rouge
            r = l + c * 0.9;
            g = l - c * 0.3;
            b = l + c * 0.9 * (1 - (hue - 300) / 60);
        }

        // Conversion en valeurs RGB 0-255 avec limitation
        const red = Math.max(0, Math.min(255, Math.round(r * 255)));
        const green = Math.max(0, Math.min(255, Math.round(g * 255)));
        const blue = Math.max(0, Math.min(255, Math.round(b * 255)));

        return `${red}, ${green}, ${blue}`;
    };

    // Initialisation au montage
    useEffect(() => {
        updateCSSVariables(currentTheme);
    }, [currentTheme, updateCSSVariables]);

    // Surveillance des changements de thème pour forcer le thème par défaut si nécessaire
    useEffect(() => {
        if (!ALLOW_THEME_CHANGE) {
            // Si le changement de thème est désactivé, toujours forcer le thème par défaut
            if (
                currentTheme.primary !== defaultThemeConfig.primary ||
                currentTheme.accent !== defaultThemeConfig.accent ||
                currentTheme.isDark !== defaultThemeConfig.isDark
            ) {
                console.warn('Tentative de changement de thème détectée. Restauration du thème par défaut.');
                setCurrentTheme(defaultThemeConfig);
                updateCSSVariables(defaultThemeConfig);
            }
        }
    }, [currentTheme, defaultThemeConfig, updateCSSVariables]);

    // Fonction pour appliquer le thème aux variables CSS
    const applyTheme = useCallback(
        (theme: ThemeConfig) => {
            const root = document.documentElement;
            updateCSSVariables(theme);

            // Ajouter un attribut data pour les transitions et le thème
            root.setAttribute('data-theme', `${theme.primary}-${theme.accent}`);

            // Gestion cohérente du mode clair/sombre
            // Seulement si isDark est explicitement défini dans le thème
            if (theme.isDark !== undefined) {
                if (theme.isDark) {
                    root.classList.add('dark');
                    root.setAttribute('data-theme-mode', 'dark');
                } else {
                    root.classList.remove('dark');
                    root.setAttribute('data-theme-mode', 'light');
                }
            }
        },
        [updateCSSVariables],
    );

    // Fonction pour ajouter un thème aux récents
    const addToRecentThemes = useCallback((theme: ThemeConfig) => {
        setRecentThemes((prev) => {
            const filtered = prev.filter((t) => t.primary !== theme.primary || t.accent !== theme.accent);
            const newRecent = [theme, ...filtered].slice(0, 5); // Garder les 5 derniers
            localStorage.setItem(RECENT_THEMES_KEY, JSON.stringify(newRecent));
            return newRecent;
        });
    }, []);

    // Fonction pour changer le thème
    const changeTheme = useCallback(
        (newTheme: ThemeConfig) => {
            // Vérifier si le changement de thème est autorisé
            if (!ALLOW_THEME_CHANGE) {
                console.warn('Le changement de thème est désactivé dans la configuration.');
                return;
            }

            // Lorsqu'on change juste les couleurs, on préserve explicitement le mode actuel
            // sauf si isDark est explicitement défini dans le nouveau thème
            const updatedTheme = {
                ...newTheme,
                isDark: newTheme.isDark === undefined ? document.documentElement.classList.contains('dark') : newTheme.isDark,
            };

            setCurrentTheme(updatedTheme);
            applyTheme(updatedTheme);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTheme));
            addToRecentThemes(updatedTheme);
        },
        [applyTheme, addToRecentThemes],
    );

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
            isDark: currentTheme.isDark,
        };
    }, [currentTheme.isDark]);

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
        // Vérifier si le changement de thème est autorisé
        if (!ALLOW_THEME_CHANGE) {
            console.warn('Le changement de thème est désactivé dans la configuration.');
            return;
        }

        const newTheme = {
            ...currentTheme,
            isDark: !currentTheme.isDark,
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
