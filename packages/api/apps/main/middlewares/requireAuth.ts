import { Unauthorized } from 'http-errors';

import { DarcyRouteConfig } from '@/shared/types/routeConfig';

import { DarcyFastifyInstance } from '..';

export default async function (app: DarcyFastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    const config = request.routeOptions.config as DarcyRouteConfig;

    if (config.requiresAuth) {
      if (!request.headers.authorization) return reply.send(Unauthorized('Missing Authentication Header'));
      if (!request.headers.authorization.startsWith('Bearer ')) return reply.send(Unauthorized('Invalid Authentication Header'));
    }
  });
}
