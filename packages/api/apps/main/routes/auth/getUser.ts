import { DarcyRouteConfig } from '@/shared/types/routeConfig';
import { requestMicroservice } from 'apps/main/utils/microserviceRequest';

import { DarcyFastifyInstance } from '../..';

export default async function (app: DarcyFastifyInstance) {
  app.route<{
    Params: { service: string };
  }>({
    method: 'POST',
    url: '/:service/callback',
    config: { requiresAuth: false } as DarcyRouteConfig,
    handler: async (request, reply) => {
      const data = requestMicroservice({
        microservice: 'auth',
        path: `/${request.params.service}`,
        method: 'POST',
        data: request.body,
        reply
      });

      reply.send(data);
    }
  });
}
