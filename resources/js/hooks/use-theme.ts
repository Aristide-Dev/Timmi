import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        return 'light';
        // Récupérer le thème du localStorage ou utiliser la préférence système
        const storedTheme = localStorage.getItem('theme') as Theme;
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        // Mettre à jour la classe sur le document
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);

        // Sauvegarder dans le localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    return { theme, setTheme };
}
