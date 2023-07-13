import { FastifyInstance, RouteOptions } from 'fastify';

import { APIUserDelete, APIUserDeletePayload } from '../../types';
import { verify } from '../../utils/asyncJwt';

export default async function (fastify: FastifyInstance, _options: RouteOptions) {
  fastify.route<{
    Body: APIUserDeletePayload;
  }>({
    method: 'DELETE',
    url: '/@me',
    config: {
      requiresAuth: true
    },
    handler: async (req, res): Promise<APIUserDelete> => {
      const id = await verify(req.headers.authorization?.split(' ')[1] ?? '');

      const user = await prisma.user.findFirst({ where: { id } });

      if (!user) {
        res.status(404);
        return { done: false };
      }

      const deleteAuthPromise = prisma.userAuth.delete({ where: { userId: id } });
      const deleteUserPromise = prisma.user.delete({ where: { id } });

      await Promise.all([deleteAuthPromise, deleteUserPromise]);

      res.status(200);
      return { done: true };
    }
  });
}
