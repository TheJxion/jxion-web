import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  input: "src/cli.ts",
  output: {
    dir: "dist",
    entryFileNames: "cli.js",
    format: "esm",
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
  ],
  external: [
    "commander",
    "inquirer",
    "chalk",
    "ora",
    "fs-extra",
    "execa",
    "child_process",
    "path",
  ],
});
