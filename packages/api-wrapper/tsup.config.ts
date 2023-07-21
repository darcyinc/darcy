import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['src/index.ts'],
  sourcemap: false,
  clean: true,
  dts: true,
  format: 'cjs',
  minify: true,
  target: 'node20'
}));
