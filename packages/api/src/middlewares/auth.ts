import { FastifyInstance, RouteOptions } from 'fastify';

export default async function (
  fastify: FastifyInstance,
  _options: RouteOptions,
) {
  // if the route has config.requiresAuth = true, then check if the user is Authorization header is present
  fastify.addHook('onRequest', async (request, reply) => {
    const config = request.routeConfig as { requiresAuth?: boolean };

    if (
      config.requiresAuth &&
      (!request.headers.authorization ||
        !request.headers.authorization.startsWith('Bearer '))
    ) {
      reply.code(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Missing Authorization header',
      });
      return;
    }
  });
}
