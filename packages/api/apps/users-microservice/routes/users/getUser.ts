import { NotFound } from 'http-errors';

import { DarcyRouteConfig } from '@/shared/types/routeConfig';

import { DarcyFastifyInstance } from '../../';

export default async function (app: DarcyFastifyInstance) {
  app.route<{
    Params: { handle: string };
    Querystring: { recentPosts: boolean };
  }>({
    method: 'GET',
    url: '/:handle',
    config: { requiresAuth: false } as DarcyRouteConfig,
    handler: async (request, reply) => {
      const user = await prisma.user.findFirst({
        where: { handle: request.params.handle },
        include: {
          posts: request.query.recentPosts
            ? {
                take: 5,
                orderBy: { createdAt: 'desc' }
              }
            : false
        }
      });

      if (!user) return reply.send(NotFound('User not found'));

      return reply.status(200).send(user);
    }
  });
}
