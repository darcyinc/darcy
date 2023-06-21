import { FastifyInstance, RouteOptions } from 'fastify';

export default async function (
  fastify: FastifyInstance,
  _options: RouteOptions
) {
  fastify.route({
    method: 'GET',
    url: '/hey',
    config: {
      requiresAuth: true,
    },
    handler: async () => {
      return 'hey';
    },
  });
}
