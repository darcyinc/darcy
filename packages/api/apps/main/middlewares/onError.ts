import { InternalServerError } from 'http-errors';

import { DarcyFastifyInstance } from '..';

export default async function (app: DarcyFastifyInstance) {
  app.setErrorHandler((_error, _request, reply) => {
    reply.send(InternalServerError());
  });
}
