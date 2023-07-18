import { spawn } from 'child_process';
import { watch } from 'chokidar';
import * as esbuild from 'esbuild';
import fastGlob from 'fast-glob';

const ctx = await esbuild.context({
  entryPoints: await fastGlob('src/**/*.ts'),
  outdir: 'dist',
  target: 'node20',
  platform: 'node',
  minify: true,
  sourcemap: false,
  format: 'cjs'
});

await build();

// if cmdline has --watch, then watch for changes
if (process.argv.includes('--watch')) {
  console.log('compiling...');

  let serverProcess = startServer();

  console.log('starting server & watching for changes...');

  watch(['src', '.env']).on('change', async () => {
    console.log('change detected - building');

    serverProcess?.kill('SIGINT');
    await build().catch(() => {});

    serverProcess = startServer();
  });
} else process.exit(0);

async function build() {
  await ctx.rebuild();
  // generate types
  await spawn(/^win/.test(process.platform) ? 'pnpm.cmd' : 'pnpm', ['tsc']);
}

function startServer() {
  return spawn('node', ['dist/index.js'], { stdio: 'inherit' });
}
