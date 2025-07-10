import type { Config } from 'tailwindcss';

export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'timmi': {
                    'success-soft': 'var(--timmi-success-soft)',
                    'warning-soft': 'var(--timmi-warning-soft)',
                    'info-soft': 'var(--timmi-info-soft)',
                },
            },
        },
    },
    plugins: [],
} satisfies Config; 