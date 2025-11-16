import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import scss from "rollup-plugin-scss";
import dts from "rollup-plugin-dts";
import { rimraf } from "rimraf";

// Clean dist folder before build
await rimraf("dist");

export default [
  // Main bundle
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      scss({
        output: "dist/styles/index.css",
        outputStyle: "compressed",
        include: ["src/**/*.scss", "src/**/*.sass"],
      }),
    ],
    external: ["react", "vue", "svelte", "solid-js", "@angular/core"],
  },

  // Components bundle
  {
    input: "src/components/index.ts",
    output: [
      {
        file: "dist/components/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/components/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
    external: ["react", "vue", "svelte", "solid-js", "@angular/core"],
  },

  // Templates bundle
  {
    input: "src/templates/index.ts",
    output: [
      {
        file: "dist/templates/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/templates/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },

  // Tokens bundle
  {
    input: "src/tokens/index.ts",
    output: [
      {
        file: "dist/tokens/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/tokens/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },

  // Type definitions
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
    external: ["react", "vue", "svelte", "solid-js", "@angular/core"],
  },
];
