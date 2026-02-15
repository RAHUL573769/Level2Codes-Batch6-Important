import babel from '@rollup/plugin-babel';

export default {
  input: 'aother.js',   // your file
  output: {
    file: 'bundle.js',
    format: 'esm',
  },
  plugins: [
    babel({ babelHelpers: 'bundled' })
  ]
};
