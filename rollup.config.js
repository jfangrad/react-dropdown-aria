import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

const config = {
  input: 'src/Dropdown.jsx',
  output: {
    format: 'cjs', // Consider making es?
    interop: false,
  },
  plugins: [
    resolve({
      extensions: ['.scss', '.js', '.jsx'],
    }),
  ],
  external: [
    'react',
    'react-dom',
    ...Object.keys(pkg.dependencies),
  ],
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
