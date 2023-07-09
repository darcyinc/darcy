import { FastifyInstance, RouteOptions } from 'fastify';

export default async function (
  fastify: FastifyInstance,
  _options: RouteOptions,
) {
  fastify.route<{
    Params: {
      handle: string;
    };
  }>({
    method: 'GET',
    url: '/:handle',
    config: {
      requiresAuth: false,
    },
    handler: async (request, reply) => {
      const user = await prisma.user.findFirst({
        where: {
          handle: request.params.handle,
        },
        include: {
          auth: false,
          posts: false,
        },
      });

      if (!user) {
        return reply.status(404).send({
          error: 'User not found',
        });
      }

      return user;
    },
  });
}
