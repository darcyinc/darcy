import { DarcyRouteConfig } from '@/shared/types/routeConfig';

import { DarcyFastifyInstance } from '..';

export default async function (app: DarcyFastifyInstance) {
  app.route({
    method: 'GET',
    url: '/',
    config: { requiresAuth: false } as DarcyRouteConfig,
    handler: async (_request, reply) => {
      reply.send({ hello: 'world!' });
    }
  });
}
