import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    // Charger les variables d'environnement
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
        esbuild: {
            jsx: 'automatic',
        },
        resolve: {
            alias: {
                'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            },
        },
        // Exposer les variables d'environnement liées au thème
        define: {
            'import.meta.env.VITE_THEME_DEFAULT': JSON.stringify(env.THEME_DEFAULT || 'default'),
            'import.meta.env.VITE_THEME_ALLOW_CHANGE': JSON.stringify(env.THEME_ALLOW_CHANGE !== 'false'),
            'import.meta.env.VITE_THEME_DEFAULT_DARK_MODE': JSON.stringify(env.THEME_DEFAULT_DARK_MODE === 'true'),
        },
    };
});
