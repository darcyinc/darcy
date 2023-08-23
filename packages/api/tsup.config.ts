import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['apps/**/*.ts'],
  sourcemap: false,
  clean: true,
  dts: false,
  format: 'cjs',
  minify: true,
  target: 'node20'
});
