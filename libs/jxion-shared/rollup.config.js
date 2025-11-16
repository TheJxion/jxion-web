import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import scss from "rollup-plugin-scss";
import dts from "rollup-plugin-dts";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";

const external = ["vue", "react", "react-dom"];

export default [
  // Main bundle
  defineConfig({
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        entryFileNames: "index.js",
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
      {
        dir: "dist",
        entryFileNames: "index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      scss({
        output: "dist/styles.css",
        outputStyle: "compressed",
        include: ["src/**/*.scss"],
      }),
      postcss({
        extract: true,
        minimize: true,
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
        outDir: "dist",
      }),
    ],
  }),
  // Type definitions
  defineConfig({
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.scss$/, /\.css$/],
  }),
];
