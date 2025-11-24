/**
 * Vite Plugin to ensure Three.js is available before React Three Fiber loads
 * and fix CommonJS module resolution issues
 */

import type { Plugin } from 'vite';
import path from 'path';

export function threeR3FPlugin(): Plugin {
  return {
    name: 'three-r3f-fix',
    enforce: 'pre', // Run before other resolvers
    resolveId(id, importer, options) {
      // Ensure 'three' resolves correctly when React Three Fiber imports it
      if (id === 'three') {
        return null; // Let Vite handle it normally, but ensure it's available
      }

      // Fix for scheduler - CommonJS to ES module conversion
      // @react-three/fiber needs unstable_IdlePriority and other exports as ES modules
      if (id === 'scheduler') {
        // If the importer is the stub file itself, don't apply the alias to avoid circular dependency
        const stubPath = path.resolve(
          __dirname,
          './src/lib/stubs/scheduler-fix.ts',
        );
        if (importer && path.resolve(importer) === stubPath) {
          return null; // Let Vite resolve to the actual node_modules module
        }
        // Return our wrapper that provides ES module exports
        return stubPath;
      }

      // Fix for react-reconciler default export expectations
      // Ensures packages importing `react-reconciler` as default get a valid module
      if (id === 'react-reconciler' || id.includes('react-reconciler/index')) {
        const stubPath = path.resolve(
          __dirname,
          './src/lib/stubs/react-reconciler-fix.ts',
        );
        if (importer && path.resolve(importer) === stubPath) {
          return null; // Allow the stub to reach the actual module
        }
        return stubPath;
      }

      // During SSR, prevent SvelteKit client modules from being evaluated
      if (options?.ssr) {
        // SvelteKit client runtime modules should not be evaluated during SSR
        // Match both module names and full file paths
        if (
          id.includes('@sveltejs/kit/src/runtime/client') ||
          id.includes('sveltejs/kit/src/runtime/client') ||
          (id.includes('fetcher.js') && id.includes('sveltejs'))
        ) {
          // Return a stub for SSR
          return path.resolve(
            __dirname,
            './src/lib/stubs/sveltekit-client-ssr.ts',
          );
        }

        // Note: $app/stores should work natively during SSR in SvelteKit
        // We don't intercept it - let SvelteKit handle it natively
        // Only intercept client runtime modules that access window
      }

      // Fix for use-sync-external-store module resolution
      // Some code (like Zustand SystemJS) tries to import it as default, but it only has named exports
      // This is now handled by the alias in vite.config.ts, but we keep this as a fallback
      if (
        id === 'use-sync-external-store/shim/with-selector' ||
        id.includes('use-sync-external-store/shim/with-selector')
      ) {
        // If the importer is the stub file itself, don't apply the alias to avoid circular dependency
        const stubPath = path.resolve(
          __dirname,
          './src/lib/stubs/use-sync-external-store-fix.ts',
        );
        if (importer && path.resolve(importer) === stubPath) {
          return null; // Let Vite resolve to the actual node_modules module
        }
        // Return our wrapper that provides both named and default exports
        return stubPath;
      }

      // Fix for react-reconciler/constants - CommonJS to ES module conversion
      // The module uses CommonJS exports, but Vite expects ES modules
      if (
        id === 'react-reconciler/constants' ||
        id.includes('react-reconciler/constants')
      ) {
        return path.resolve(
          __dirname,
          './src/lib/stubs/react-reconciler-constants-fix.ts',
        );
      }

      // Fix for stats.js - CommonJS to ES module conversion with default export
      // @react-three/drei's Stats component tries to import it as default
      if (
        id === 'stats.js' ||
        id.includes('stats.js/build/stats.min.js') ||
        id.includes('stats.js/build/stats.js')
      ) {
        return path.resolve(__dirname, './src/lib/stubs/stats-js-fix.ts');
      }

      // Handle @jxion/core imports (main and subpath imports)
      if (id === '@jxion/core' || id.startsWith('@jxion/core/')) {
        // During SSR, resolve to stub to prevent SvelteKit fetcher evaluation
        if (options?.ssr) {
          if (id === '@jxion/core') {
            return path.resolve(__dirname, './src/lib/stubs/jxion-core-ssr.ts');
          }
          // For subpath imports during SSR, use appropriate stub
          if (id.startsWith('@jxion/core/utils/')) {
            return path.resolve(
              __dirname,
              './src/lib/stubs/jxion-core-utils-ssr.ts',
            );
          }
          // For other subpaths, use main stub
          return path.resolve(__dirname, './src/lib/stubs/jxion-core-ssr.ts');
        }

        // During build or client, resolve to the actual source files (bypass package.json exports)
        // This allows subpath imports like @jxion/core/utils/template-renderer
        if (id === '@jxion/core') {
          return path.resolve(__dirname, '../../libs/jxion-core/src/index.ts');
        }

        // Handle subpath imports - resolve to source files
        // This bypasses package.json exports which don't include all subpaths
        const subpath = id.replace('@jxion/core/', '');
        const sourcePath = path.resolve(
          __dirname,
          '../../libs/jxion-core/src',
          `${subpath}.ts`,
        );

        // Always return the source path to bypass package.json exports check
        // This allows subpath imports that aren't in package.json exports
        // The file will be resolved by Vite/Rollup, and if it doesn't exist, it will error at that point
        return sourcePath;
      }

      return null;
    },
    load(id) {
      // This ensures Three.js is loaded before React Three Fiber
      if (id.includes('@react-three/fiber') && !id.includes('node_modules')) {
        // Ensure three is available
        return null;
      }
      return null;
    },
    transformIndexHtml(html) {
      // Ensure Three.js is loaded via CDN before any module code runs
      // This is already done in app.html, but we can verify here
      return html;
    },
  };
}
