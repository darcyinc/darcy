import { DarcyRouteConfig } from '@/shared/types/routeConfig';
import { requestMicroservice } from 'apps/main/utils/microserviceRequest';

import { DarcyFastifyInstance } from '../..';

export default async function (app: DarcyFastifyInstance) {
  app.route<{
    Params: { id: string };
  }>({
    method: 'GET',
    url: '/:id',
    config: { requiresAuth: false } as DarcyRouteConfig,
    handler: async (request, reply) => {
      const data = await requestMicroservice({
        microservice: 'users',
        path: `/users/${request.params.id}`,
        method: 'GET',
        reply
      });

      reply.send(data);
    }
  });
}
