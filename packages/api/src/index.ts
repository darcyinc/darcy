import path from 'node:path';

import fastify from 'fastify';
import AutoLoad from '@fastify/autoload';

const app = fastify({
  logger: process.env.NODE_ENV === 'development',
});

async function main() {
  await app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
  });

  app.listen({ port: Number(process.env.PORT) || 3001 }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }

    app.log.info(`Server listening at ${address}`);
  });
}

void main();
