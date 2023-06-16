import path from 'node:path';

import fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

global.prisma = new PrismaClient();
void global.prisma.$connect();

const app = fastify({
  logger: process.env.NODE_ENV === 'development',
});

async function main() {
  await app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
  });

  await app.register(cors, {
    origin:
      process.env.NODE_ENV === 'development' ? '*' : 'https://example.com',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
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
