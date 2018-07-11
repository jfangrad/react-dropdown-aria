import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';
import scss from 'rollup-plugin-scss';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const config = {
  input: 'src/Dropdown.jsx',
  output: {
    format: 'cjs',
    interop: false,
    strict: false,
  },
  plugins: [
    buble,
    scss({ output: 'dist/bundle.css' }),
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
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true,
          },
        ],
      ],
    }),
    uglify({
      mangle: {
        properties: { regex: /^\$/ },
      },
      compress: {
        pure_getters: true,
      },
    }),
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
