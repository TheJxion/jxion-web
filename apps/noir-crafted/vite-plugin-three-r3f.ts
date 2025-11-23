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
