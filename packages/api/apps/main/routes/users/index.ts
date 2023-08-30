import { request } from 'undici';

import { DarcyRouteConfig } from '@/shared/types/routeConfig';
import { UsersMicroserviceUrl } from 'apps/main/utils/constants';

import { DarcyFastifyInstance } from '../../';

export default async function (app: DarcyFastifyInstance) {
  app.route({
    method: 'GET',
    url: '/:id',
    config: { requiresAuth: false } as DarcyRouteConfig,
    handler: async (_, reply) => {
      const { statusCode, headers, body } = await request(`${UsersMicroserviceUrl}/users/@me`);
      reply.status(statusCode);

      for (const [key, value] of Object.entries(headers)) {
        reply.header(key, value);
      }

      reply.send(body);
    }
  });
}
