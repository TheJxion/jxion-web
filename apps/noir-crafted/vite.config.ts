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
        // Note: use-sync-external-store/shim/with-selector is handled in vite-plugin-three-r3f.ts
        // to avoid circular dependency when the stub imports from itself
        // Fix for react-reconciler/constants - CommonJS to ES module conversion
        'react-reconciler/constants': path.resolve(
          __dirname,
          './src/lib/stubs/react-reconciler-constants-fix.ts',
        ),
        // Note: react-reconciler is handled ONLY in vite-plugin-three-r3f.ts
        // to avoid circular dependency issues with alias resolution
        // Fix for stats.js - CommonJS to ES module conversion with default export
        // @react-three/drei's Stats component tries to import it as default
        'stats.js': path.resolve(__dirname, './src/lib/stubs/stats-js-fix.ts'),
        // Fix for scheduler - CommonJS to ES module conversion
        // @react-three/fiber needs unstable_IdlePriority and other exports as ES modules
        scheduler: path.resolve(__dirname, './src/lib/stubs/scheduler-fix.ts'),
      },
      // Ensure proper module resolution for React dependencies
      // CRITICAL: Force using root-level packages, not nested ones in @react-three/fiber
      dedupe: [
        'react',
        'react-dom',
        // CRITICAL: Dedupe scheduler to root-level to ensure @react-three/fiber uses the same version
        // This prevents nested scheduler from being loaded, which causes CommonJS transformation issues
        // We use scheduler@0.25.0 (required by react-reconciler and @react-three/fiber)
        // react-dom will work with 0.25.0 as it's backward compatible
        'scheduler',
        'use-sync-external-store',
        'use-sync-external-store/shim',
        'use-sync-external-store/shim/with-selector',
        'react-reconciler', // Force root-level react-reconciler
      ],
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
        // CRITICAL: react-reconciler must NOT be pre-bundled
        // It needs React's ReactSharedInternals which is only available at runtime
        // The CommonJS transformation will be handled by Vite's build process
        'react-reconciler',
        'react-reconciler/constants',
        // Note: @gsap/react is installed but not used - consider removing from package.json
        // Note: use-sync-external-store/shim/with-selector is included in optimizeDeps.include
        // to ensure CommonJS transformation when the stub imports from itself
        // Note: scheduler is deduped to root-level to avoid nested version conflicts
      ],
      include: [
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/ScrollSmoother',
        'gsap/SplitText',
        'three', // Pre-bundle Three.js FIRST - critical for React Three Fiber
        'react', // Ensure React is pre-bundled
        'react-dom', // Ensure React DOM is pre-bundled
        'react/jsx-runtime', // Ensure JSX runtime is pre-bundled
        // CRITICAL: scheduler MUST be pre-bundled to ensure CommonJS to ES module transformation
        // This ensures all packages use the same transformed scheduler module
        // We dedupe to scheduler@0.25.0 (required by react-reconciler and @react-three/fiber)
        'scheduler',
        'use-sync-external-store', // Fix for React 18 compatibility
        'use-sync-external-store/shim', // Include shim version
        // Note: use-sync-external-store/shim/with-selector needs to be included for CommonJS transformation
        // The plugin handles routing to our stub, but when the stub imports from itself,
        // the actual module needs to be pre-bundled and transformed
        'use-sync-external-store/shim/with-selector',
        // Note: react-reconciler is EXCLUDED from pre-bundling (see optimizeDeps.exclude)
        // It needs React's ReactSharedInternals which is only available at runtime
        // Vite's build process will handle CommonJS to ES module transformation
      ],
      // Ensure Three.js is loaded before React Three Fiber
      esbuildOptions: {
        define: {
          global: 'globalThis',
          // Ensure React is available during pre-bundling
          'process.env.NODE_ENV': JSON.stringify('development'),
        },
        // Handle CommonJS modules properly
        plugins: [],
        // Ensure React is available when react-reconciler is pre-bundled
        // This allows react-reconciler to access ReactSharedInternals
        external: [],
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
        'react/jsx-runtime', // External during SSR - CommonJS module
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
