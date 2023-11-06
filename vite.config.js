import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        legacy({
            targets: ['defaults', '>0.2%', 'IE 9-11'],
            additionalLegacyPolyfills: [
                'custom-event-polyfill',
                'ie11-crypto-polyfill',
                'resize-observer-polyfill-lite',
            ],
        }),
    ],
    root: './src',
    publicDir: 'static',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
});