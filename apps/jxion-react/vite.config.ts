import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
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
    port: 3001,
    host: true,
  },
});
