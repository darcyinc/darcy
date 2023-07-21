import { spawn } from 'node:child_process';
import { copyFile } from 'node:fs/promises';

import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/**/*.ts'],
  sourcemap: false,
  clean: true,
  dts: true,
  format: 'cjs',
  minify: true,
  target: 'node20',

  onSuccess: async () => {
    await Promise.allSettled([
      copyFile('./.env', './dist/.env'),
      options.watch ? spawn('node', ['dist/index.js'], { stdio: 'inherit' }) : undefined
    ]);
  }
}));
