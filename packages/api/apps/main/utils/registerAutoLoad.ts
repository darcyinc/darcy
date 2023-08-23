import path from 'node:path';

import fastifyAutoload from '@fastify/autoload';

import { DarcyFastifyInstance } from '..';

export async function registerAutoload(app: DarcyFastifyInstance, dir: string, options?: { encapsulate?: boolean }) {
  await app.register(fastifyAutoload, {
    dir: path.join(__dirname, dir),
    ...options
  });
}
