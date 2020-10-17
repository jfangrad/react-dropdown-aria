/* eslint-disable no-undef */
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import ts from "typescript";
import packageJson from "./package.json";

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript({
    typescript: ts,
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: true,
      },
    }
  }),
];

if (isProduction) {
  plugins.push(
    terser({
      sourcemap: true,
    })
  );
}

export default {
  input: "./src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      // sourcemap: true,
      exports: 'named'
    },
    {
      file: packageJson.module,
      format: "esm",
      // sourcemap: true,
      exports: 'named'
    }
  ],
  plugins,
};
