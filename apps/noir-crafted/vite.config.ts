import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { threeR3FPlugin } from './vite-plugin-three-r3f';

export default defineConfig(({ mode }) => {
  // For SvelteKit to work correctly, we need to ensure it runs from the project directory
  const isProduction = mode === 'production';

  return {
    plugins: [threeR3FPlugin(), sveltekit()],
    resolve: {
      alias: {
        // @jxion/core handled by vite-plugin-three-r3f (uses stub during SSR, real module on client)
        '@jxion/design': path.resolve(__dirname, '../../libs/jxion-design/src'),
        '@jxion/shared': path.resolve(__dirname, '../../libs/jxion-shared/src'),
        '@jxion/ui': path.resolve(__dirname, '../../libs/jxion-ui/src'),
        // Stub framework-specific modules that aren't available in SvelteKit
        'next/link': path.resolve(__dirname, './src/lib/stubs/next-link.ts'),
        'next/image': path.resolve(__dirname, './src/lib/stubs/next-image.ts'),
        'vue-router': path.resolve(__dirname, './src/lib/stubs/vue-router.ts'),
      },
      // Ensure proper module resolution for React dependencies
      dedupe: ['react', 'react-dom'],
      // Fix for CommonJS modules like use-sync-external-store
      conditions: ['import', 'module', 'browser', 'default'],
      // Ensure CommonJS modules are handled correctly
      mainFields: ['module', 'main', 'browser'],
    },
    optimizeDeps: {
      exclude: [
        'next/link',
        'next/image',
        'vue-router',
        '@react-three/fiber', // Don't pre-bundle - load dynamically after Three.js
        '@react-three/drei', // Don't pre-bundle - load dynamically after Three.js
      ],
      include: [
        'gsap',
        'gsap/ScrollTrigger',
        'three', // Pre-bundle Three.js FIRST - critical for React Three Fiber
      ],
      // Ensure Three.js is loaded before React Three Fiber
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        // Handle CommonJS modules properly
        plugins: [],
      },
      // Force pre-bundling order - Three.js must be bundled before React Three Fiber
      entries: [],
    },
    ssr: {
      // @jxion/core uses SvelteKit's fetcher which accesses window - must be external during SSR
      noExternal: [/@jxion\/shared/],
      external: [
        'next/link',
        'next/image',
        'vue-router',
        'gsap',
        'gsap/ScrollTrigger',
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        '@jxion/core', // External during SSR to avoid window access
      ],
    },
    build: {
      commonjsOptions: {
        include: [/@jxion\/core/, /@jxion\/shared/, /node_modules/],
        transformMixedEsModules: true, // Handle mixed ES/CommonJS modules
      },
      rollupOptions: {
        output: {
          // Ensure proper module format
          format: 'es',
        },
      },
    },
    server: {
      port: 5173,
      host: true,
      strictPort: true, // Fail if port is already in use instead of trying next port
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
    },
  };
});
