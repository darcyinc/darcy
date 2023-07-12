import { FastifyInstance, RouteOptions } from 'fastify';
import { verify } from 'jsonwebtoken';

import { APIUserDelete, APIUserDeletePayload } from '../../types';

export default function (fastify: FastifyInstance, _options: RouteOptions) {
  fastify.route<{
    Body: APIUserDeletePayload;
  }>({
    method: 'DELETE',
    url: '/@me',
    config: {
      requiresAuth: true
    },
    handler: async (req, res): Promise<APIUserDelete> => {
      // TODO: promisify this
      const id = verify(req.headers.authorization?.split(' ')[1] ?? '', 'test') as string;

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
