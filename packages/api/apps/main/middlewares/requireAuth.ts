import { Unauthorized } from 'http-errors';

import { verifyToken } from '@/shared/lib/jwt';
import { DarcyRouteConfig } from '@/shared/types/routeConfig';

import { DarcyFastifyInstance } from '..';

export default async function (app: DarcyFastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    const config = request.routeOptions.config as DarcyRouteConfig;

    if (config.requiresAuth) {
      const [type, token] = request.headers.authorization?.split('Bearer ') ?? [];

      if (!type) return reply.send(Unauthorized('Missing Authentication Header'));
      if (type !== 'Bearer') return reply.send(Unauthorized('Invalid Authentication Header'));

      try {
        const decodedToken = await verifyToken(token);
        if (!decodedToken.email || !decodedToken.updatedAt) return reply.send(Unauthorized('Invalid Token'));
      } catch {
        return reply.send(Unauthorized('Invalid Token'));
      }
    }
  });
}
