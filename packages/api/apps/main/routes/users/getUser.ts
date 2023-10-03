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
    handler: async (_, reply) => {
      const data = requestMicroservice({
        microservice: 'users',
        path: `/${reply.request.params.id}`,
        method: 'GET',
        reply
      });

      reply.send(data);
    }
  });
}
