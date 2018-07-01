import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

const dependencies = Object.keys(pkg.dependencies || {})
const devDependencies = Object.keys(pkg.devDependencies || {})
const peerDependencies = Object.keys(pkg.peerDependencies || {})

const banner =
  '/*!\n' +
  ' * ' + pkg.name + ' v' + pkg.version + '\n' +
  ' * (c) 2018 - Present, ' + pkg.author.name + '\n' +
  ' * Released under the ' + pkg.license + ' License.\n' +
  ' */'

export default {
  input: 'src/index.js',
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    babel(),
    uglify({
      output: {
        comments: (_, { value }) => value.includes(pkg.version),
      },
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  ],
  output: {
    banner,
    format: 'iife',
    name: 'FixedBox',
    globals: {
      react: 'React',
    },
  },
  external: [
    ...dependencies,
    ...devDependencies,
    ...peerDependencies,
  ],
}
