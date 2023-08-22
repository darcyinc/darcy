import 'dotenv/config';

import compress from '@fastify/compress';
import cors from '@fastify/cors';
import fastify from 'fastify';

import { setupPrisma } from '../shared/lib/prisma';

import { registerAutoload } from './utils/registerAutoLoad';

const app = fastify({
  logger: {
    enabled: process.env.NODE_ENV !== 'production',
    transport: {
      target: 'pino-pretty'
    }
  }
});

const PORT = Number(process.env.PORT ?? 3001);

async function bootstrap() {
  await setupPrisma();

  await Promise.all([
    registerAutoload(app, './middlewares', { encapsulate: false }),
    registerAutoload(app, './routes'),
    app.register(compress),
    app.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    })
  ]);

  await app.listen({ port: PORT, host: '0.0.0.0' });
}

void bootstrap();

export type DarcyFastifyInstance = typeof app;
