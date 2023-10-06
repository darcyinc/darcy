import compress from '@fastify/compress';
import cors from '@fastify/cors';
import { config } from 'dotenv';
import fastify from 'fastify';

import { setupPrisma } from '@/shared/lib/prisma';
import { registerAutoload } from '@/shared/lib/registerAutoLoad';

const app = fastify({
  logger: {
    enabled: process.env.NODE_ENV !== 'production',
    transport: {
      target: 'pino-pretty'
    }
  }
});

const PORT = Number(process.env.PORT ?? 3001);

config({ path: '../../.env' });

async function bootstrap() {
  await setupPrisma();

  await Promise.all([
    registerAutoload(app, './middlewares', { encapsulate: false }),
    registerAutoload(app, './routes'),
    app.register(compress),
    app.register(cors, {
      origin: process.env.NODE_ENV === 'production' ? process.env.WEBSITE_URL : '*',
      credentials: process.env.NODE_ENV === 'production' ? true : false,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  ]);

  await app.listen({ port: PORT, host: '0.0.0.0' });
}

void bootstrap();

export type DarcyFastifyInstance = typeof app;
