/* eslint-disable no-undef */
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import ts from "typescript";
import packageJson from "./package.json";

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: "./index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({
      namedExports: {
        '../../node_modules/react-is/index.js': ['typeOf', 'isElement', 'isValidElementType']
      }
    }),
    typescript({
      typescript: ts,
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
        },
        // For some reason rollup-plugin-typescript2 doesn't generate declarations for
        // utils/types.ts without explicitly putting it in the include list
        include: ['index.ts', 'utils'],
      }
    }),
    isProduction &&
    terser({
      sourcemap: true,
    }),
  ]
};
