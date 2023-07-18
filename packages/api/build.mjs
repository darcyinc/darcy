import { spawn } from 'child_process';
import { watch } from 'chokidar';
import * as esbuild from 'esbuild';
import fastGlob from 'fast-glob';
import { copyFile, rm } from 'fs/promises';

const ctx = await esbuild.context({
  entryPoints: await fastGlob('src/**/*.ts'),
  outdir: 'dist',
  target: 'node20',
  platform: 'node',
  minify: true,
  format: 'cjs'
});

await cleanupDist();
await build();

// if cmdline has --watch, then watch for changes
if (process.argv.includes('--watch')) {
  console.log('compiling...');

  let serverProcess = startServer();

  console.log('starting server & watching for changes...');

  watch(['src', '.env']).on('change', async () => {
    console.log('change detected - restarting server');

    serverProcess?.kill('SIGINT');

    build()
      .then(async () => {
        serverProcess = startServer();
      })
      .catch(() => {});
  });
} else process.exit(0);

function startServer() {
  return spawn('node', ['dist/index.js'], { stdio: 'inherit' });
}

async function build() {
  await ctx.rebuild();
  copyDotEnv();

  // generate types
  await spawn(/^win/.test(process.platform) ? 'pnpm.cmd' : 'pnpm', ['tsc']);
}

async function cleanupDist() {
  return rm('dist', { recursive: true }).catch(() => {});
}

async function copyDotEnv() {
  return copyFile('.env', 'dist/.env').catch(() => {});
}
