import 'dotenv/config';

import path from 'node:path';

import autoload from '@fastify/autoload';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';

global.prisma = new PrismaClient();

const app = fastify({
  logger: {
    enabled: process.env.NODE_ENV !== 'production',
    transport: {
      target: 'pino-pretty'
    }
  }
});

async function main() {
  await app.register(autoload, {
    dir: path.join(__dirname, 'middlewares'),
    encapsulate: false
  });

  await app.register(autoload, {
    dir: path.join(__dirname, 'routes')
  });

  await app.register(cors, {
    origin: process.env.WEBSITE_URL,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
  });

  app.listen({ port: Number(process.env.PORT) || 3001, host: '0.0.0.0' }, (error, address) => {
    if (error) throw error;

    app.log.info(`Server listening at ${address}`);
  });
}

main();

export * from './types';
