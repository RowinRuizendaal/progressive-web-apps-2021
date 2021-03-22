import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import purgecss from 'rollup-plugin-purgecss';
import CleanCSS from 'clean-css';
import uglify from 'uglify-js';
import fs from 'fs';
import path from 'path';


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
      targets: [{
        src: 'public/*',
        dest: 'dist/public',
      },
      {
        src: 'view',
        dest: 'dist',
      },
      {
        src: 'scratch',
        dest: 'dist',
      },
      {
        src: 'public/css/*',
        dest: 'dist/public/css',
        transform: (contents) => new CleanCSS().minify(contents).styles,
      },
      {
        src: 'public/swiper-interaction.js',
        dest: 'dist/public',
        transform: () => uglify.minify(fs.readFileSync(path.join(__dirname, 'public', 'swiper-interaction.js'), 'utf8'), {}).code,
      },
      {
        src: 'public/service-worker.js',
        dest: 'dist/public',
        transform: () => uglify.minify(fs.readFileSync(path.join(__dirname, 'public', 'service-worker.js'), 'utf8'), {}).code,
      },
      ],
    }),
    commonjs(),
    purgecss({
      content: ['**/*.html'],
      css: ['**/*.css'],
    }),
  ],
  external: ['express', 'path', 'axios', 'ejs'],
};
