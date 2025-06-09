import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "muid.js",
    output: [
      {
        file: "dist/muid.umd.js",
        format: "umd",
        name: "Muid",
        exports: "named",
        sourcemap: true,
      },
      {
        file: "dist/muid.esm.js",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [resolve(), commonjs(), terser()],
  },
  {
    input: "muid.d.ts",
    output: {
      file: "dist/muid.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];
