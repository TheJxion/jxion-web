import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  // For SvelteKit to work correctly, we need to ensure it runs from the project directory
  const isProduction = mode === 'production';

  return {
    plugins: [sveltekit()],
    resolve: {
      alias: {
        '@jxion/core': path.resolve(__dirname, '../../libs/jxion-core/src'),
        '@jxion/design': path.resolve(__dirname, '../../libs/jxion-design/src'),
        '@jxion/shared': path.resolve(__dirname, '../../libs/jxion-shared/src'),
        '@jxion/ui': path.resolve(__dirname, '../../libs/jxion-ui/src'),
        // Stub framework-specific modules that aren't available in SvelteKit
        'next/link': path.resolve(__dirname, './src/lib/stubs/next-link.ts'),
        'next/image': path.resolve(__dirname, './src/lib/stubs/next-image.ts'),
        'vue-router': path.resolve(__dirname, './src/lib/stubs/vue-router.ts'),
      },
    },
    optimizeDeps: {
      exclude: ['next/link', 'next/image', 'vue-router'],
      include: ['gsap', 'gsap/ScrollTrigger'],
    },
    ssr: {
      noExternal: [/@jxion\/core/, /@jxion\/shared/],
      external: [
        'next/link',
        'next/image',
        'vue-router',
        'gsap',
        'gsap/ScrollTrigger',
      ],
    },
    build: {
      commonjsOptions: {
        include: [/@jxion\/core/, /@jxion\/shared/, /node_modules/],
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
