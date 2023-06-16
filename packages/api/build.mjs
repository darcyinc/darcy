import { spawn } from "child_process";
import chokidar from "chokidar";
import * as esbuild from "esbuild";
import fastGlob from "fast-glob";
import fs from "fs/promises";

const ctx = await esbuild.context({
  entryPoints: [...await fastGlob("src/**/*.ts")],
  outdir: "dist",
  target: "node20",
  platform: "node",
  minify: true,
  sourcemap: false,
  format: "cjs",
});

await cleanupDist();

// if cmdline has --watch, then watch for changes
if (process.argv.includes("--watch")) {
  console.log("compiling...");

  await ctx.rebuild();

  let serverProcess = startServer();

  console.log("starting server & watching for changes...");

  chokidar.watch("src").on("change", () => {
    console.log("change detected - restarting server");
    ctx.rebuild().then(() => {
      copyDotEnv()
      if (serverProcess) serverProcess.kill('SIGINT');

      serverProcess = startServer();
    });
  });
  
} else {
  await ctx.rebuild();
  copyDotEnv()
  process.exit(0);
}

function startServer() {
  return spawn("node",  ['dist/index.js'], { stdio: "inherit" })
}

function cleanupDist() {
  return fs.rm("dist", { recursive: true, force: true });
}

function copyDotEnv() {
  return fs.copyFile(".env", "dist/.env");
}