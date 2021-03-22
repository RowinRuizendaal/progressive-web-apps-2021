import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import {uglify} from 'rollup-plugin-uglify';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    del({
      targets: 'dist/*',
    }),
    copy({
      targets: [{src: 'public/*', dest: 'dist/public'}],
    }), copy({
      targets: [{src: 'view', dest: 'dist'}],
    }), copy({
      targets: [{src: 'scratch', dest: 'dist'}],
    }),
    commonjs(),
    uglify(),
  ],
  external: ['express', 'path', 'axios', 'ejs'],
};
