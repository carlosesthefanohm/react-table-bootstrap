import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy'
import scss from 'rollup-plugin-scss'
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: "src/index.js",
  output: [
    {
      name: 'index.js',
      file: "dist/index.js",
      format: "iife",
      sourcemap: true,
    },
    {
      file: "dist/index.modern.js",
      format: "esm",
      sourcemap: true,
    }
  ],
  plugins: [
    babel({
      presets: ["@babel/preset-react"],
      babelHelpers: 'bundled'
    }),
    commonjs(),
    scss({
      include: ["/**/*.css", "/**/*.scss", "/**/*.sass"],
      output: "dist/index.css",
      failOnError: true,
    }),
    copy({
      targets: [
        {
          src: 'src/index.scss',
          dest: 'dist',
        },
      ],
      verbose: true,
      flatten: false,
    }),
    peerDepsExternal(),
  ]
};