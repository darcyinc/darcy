import compress from '@fastify/compress';
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
    app.register(compress)
  ]);

  await app.listen({ port: PORT, host: '0.0.0.0' });
}

void bootstrap();

export type DarcyFastifyInstance = typeof app;
