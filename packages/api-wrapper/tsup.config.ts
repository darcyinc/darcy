import { spawn } from 'child_process';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  sourcemap: false,
  clean: true,
  format: 'cjs',
  minify: true,
  target: 'node20',

  onSuccess: async () => {
    const promises = await Promise.all([
      spawn(/^win/.test(process.platform) ? 'pnpm.cmd' : 'pnpm', ['tsc'])
    ]);

    return () => promises.forEach((p) => p?.kill());
  }
}));
