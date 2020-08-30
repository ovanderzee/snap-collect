// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const name = 'snapCollect'

export default {
  input: `src/index.js`,
  output: [
    {
      file: `dist/${name}.js`,
      format: 'umd',
      name: name,
      sourcemap: true,
    },
    {
      file: `module/${name}.js`,
      format: 'esm',
      name: name,
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    terser(),
  ],
}
