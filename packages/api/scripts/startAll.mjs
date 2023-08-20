import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';

const files = await readdir('./dist');

for (const file of files) {
  const path = `./dist/${file}`;

  if (!existsSync(`${path}/index.js`)) {
    console.log(`Skipping ${path} because it does not have an index.js file.`);
    continue;
  }

  spawn('node', ['index.js'], { stdio: 'inherit', cwd: path });
}
