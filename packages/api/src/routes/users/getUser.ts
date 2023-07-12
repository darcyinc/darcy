import { FastifyInstance, RouteOptions } from 'fastify';

import { APIGetBasicUser, APIGetUserPayload } from '../../types';

export default function (fastify: FastifyInstance, _options: RouteOptions) {
  fastify.route<{
    Params: APIGetUserPayload;
  }>({
    method: 'GET',
    url: '/:handle',
    config: {
      requiresAuth: false
    },
    handler: async (req, res): Promise<APIGetBasicUser> => {
      const user = await prisma.user.findFirst({
        where: {
          handle: req.params.handle
        },
        include: {
          auth: false,
          posts: true
        }
      });

      if (!user) {
        res.status(404);

        return { error: 'User not found' };
      }

      // TODO: this is a hack
      return { ...user, postsCount: 0, followingCount: 0, followersCount: 0 } as unknown as APIGetBasicUser;
    }
  });
}
