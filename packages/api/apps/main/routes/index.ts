import { DarcyFastifyInstance } from '..';

export default async function (app: DarcyFastifyInstance) {
  app.get('/', (_request, reply) => {
    reply.send({ hello: 'world!' });
  });
}
