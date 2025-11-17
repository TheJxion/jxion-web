import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@jxion/core': path.resolve(
        __dirname,
        '../../libs/jxion-core/src/index.ts'
      ),
      '@jxion/design': path.resolve(__dirname, '../../libs/jxion-design/src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Allow SCSS to resolve @jxion/design imports
        // The alias already points to /src, so imports should be relative to that
        includePaths: [path.resolve(__dirname, '../../libs/jxion-design/src')],
        // Silence deprecation warning
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  optimizeDeps: {
    include: ['@jxion/core'],
  },
  build: {
    commonjsOptions: {
      include: [/@jxion\/core/, /node_modules/],
    },
  },
  server: {
    port: 3002,
    host: true,
    strictPort: true, // Fail if port is already in use instead of trying next port
  },
});
