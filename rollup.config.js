import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import scss from 'rollup-plugin-scss';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglifycss from 'uglifycss';
import { writeFileSync } from 'fs';
import path from 'path';

const config = {
  input: 'src/Dropdown.jsx',
  output: {
    format: 'cjs', // Consider making es?
    interop: false,
  },
  plugins: [
    scss({
      output: (style) => {
        const uglified = uglifycss.processString(style);
        writeFileSync(path.join(__dirname, 'dist/react-aria-dropdown.min.css'), uglified);
      },
    }),
    resolve({
      extensions: ['.scss', '.js', '.jsx'],
    }),
    commonjs({
      namedExports: {
        'node_modules/classnames/index.js': ['classnames'],
      },
    }),
  ],
  external: ['react', 'prop-types'],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    babel({
      babelrc: false,
      presets: [
        'env',
        'react',
        'stage-2',
      ],
      plugins: ['transform-react-remove-prop-types'],
    }),
    uglify({}, minify),
  );
} else {
  config.plugins.push(
    babel({
      babelrc: false,
      presets: ['react', 'stage-2'],
    }),
  );
}

export default config;
