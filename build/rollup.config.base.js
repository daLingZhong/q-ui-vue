import cjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'
import typescript from "rollup-plugin-typescript";
import autoprefixer from 'autoprefixer'

import tsconfig from "../tsconfig.json";

export default {
  input: 'src/index.js', // 入口
  output: {
    name: 'q-ui',
    file: 'dist/q-ui.min.js', // 打包文件名
    format: 'umd', // 打包模块支持方案，可选 amd, cjs, es, iife, umd
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    cjs(),
    vue({
      typescript: tsconfig,
      postcss: [autoprefixer],
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      babelrc: false,
    }),
    typescript({
      tsconfig: false,
      experimentalDecorators: true,
      module: 'es2015'
    }),
  ],
  external: [ // 不被打包的库，比如在项目中会被引入
    'vue'
  ],
  globals: {
    vue: 'Vue'
  }
}
