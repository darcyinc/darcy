import { spawn } from 'child_process';
import { watch } from 'chokidar';
import * as esbuild from 'esbuild';
import fastGlob from 'fast-glob';
import { copyFile, rm } from 'fs/promises';

const ctx = await esbuild.context({
  entryPoints: [...(await fastGlob('src/**/*.ts'))],
  outdir: 'dist',
  target: 'node20',
  platform: 'node',
  minify: true,
  sourcemap: false,
  format: 'cjs',
});

await cleanupDist();

// if cmdline has --watch, then watch for changes
if (process.argv.includes('--watch')) {
  console.log('compiling...');

  await ctx.rebuild();

  let serverProcess = startServer();

  console.log('starting server & watching for changes...');

  watch(['src', '.env']).on('change', async () => {
    console.log('change detected - restarting server');

    serverProcess?.kill('SIGINT');
    await cleanupDist();

    ctx.rebuild().then(async () => {
      await copyDotEnv();

      serverProcess = startServer();
    }).catch(() => {});
  });
} else {
  await ctx.rebuild();
  await copyDotEnv();
  process.exit(0);
}

function startServer() {
  return spawn('node', ['dist/index.js'], { stdio: 'inherit' });
}

async function cleanupDist() {
  return rm('dist', { recursive: true }).catch(() => {});
}

async function copyDotEnv() {
  return copyFile('.env', 'dist/.env');
}
