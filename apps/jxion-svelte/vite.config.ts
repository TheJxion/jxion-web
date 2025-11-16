import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import * as path from "path";

export default defineConfig({
  plugins: [
    svelte({
      inspector: false,
      preprocess: sveltePreprocess({
        typescript: true,
        scss: true,
      }),
    }),
  ],
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
    port: 3002,
    host: true,
    hmr: { overlay: false },
  },
});
