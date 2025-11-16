import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@jxion/core": path.resolve(__dirname, "../../libs/jxion-core/src"),
      "@jxion/shared": path.resolve(__dirname, "../../libs/jxion-shared/src"),
      "@jxion/design": path.resolve(__dirname, "../../libs/jxion-design/src"),
    },
  },
  build: {
    commonjsOptions: {
      include: [/@jxion\/core/, /@jxion\/shared/, /node_modules/],
    },
  },
  server: {
    port: 3000,
    host: true
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  }
})
