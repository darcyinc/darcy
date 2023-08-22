import { BadRequest } from 'http-errors';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { DarcyFastifyInstance } from '..';

export default async function (app: DarcyFastifyInstance) {
  app.setErrorHandler(async (error, _request, reply) => {
    console.log(error);

    if (error instanceof ZodError) {
      const validationError = fromZodError(error);

      return reply.send(BadRequest(validationError.message));
    }
  });
}
