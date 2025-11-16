import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import * as path from "path";

export default defineConfig({
  plugins: [solid()],
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
    port: 3004,
    host: true,
  },
});
