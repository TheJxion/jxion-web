import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

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
  server: {
    port: 3002,
    host: true,
    hmr: { overlay: false },
  },
});
