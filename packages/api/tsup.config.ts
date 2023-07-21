import { spawn } from 'child_process';
import { copyFile } from 'fs/promises';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/**/*.ts'],
  sourcemap: false,
  clean: true,
  format: 'cjs',
  minify: true,
  target: 'node20',

  onSuccess: async () => {
    await Promise.allSettled([
      spawn(/^win/.test(process.platform) ? 'pnpm.cmd' : 'pnpm', ['tsc']),
      copyFile('./.env', './dist/.env'),
      options.watch ? spawn('node', ['dist/index.js'], { stdio: 'inherit' }) : undefined
    ]);
  }
}));
