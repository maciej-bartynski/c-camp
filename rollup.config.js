import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sassImporter from 'node-sass-package-importer';
import scss from "rollup-plugin-scss";

export default {
  entry: "src/entry.js",
  dest: "build/main.js",
  format: "iife",
  sourceMap: "inline",
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    scss({
      failOnError: false,
      importer: sassImporter(),
      insert: false,
      outputStyle: "expanded",
      output: "build/main.css"
    }),
    commonjs(),
    babel({
      exclude: "node_modules/**"
    }),
    uglify.uglify()
  ]
};