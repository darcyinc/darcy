import path from 'node:path';

import autoload from '@fastify/autoload';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';

global.prisma = new PrismaClient();
void global.prisma.$connect();

const app = fastify({
  logger: process.env.NODE_ENV === 'development'
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

  app.listen({ port: Number(process.env.PORT) || 3001 }, (error, address) => {
    if (error) {
      app.log.error(error);
      process.exit(1);
    }

    app.log.info(`Server listening at ${address}`);
  });
}

void main();

export * from '@prisma/client';
