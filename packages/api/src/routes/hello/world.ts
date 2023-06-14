import { FastifyInstance, RouteOptions } from 'fastify';

export default async function (
  fastify: FastifyInstance,
  _options: RouteOptions
) {
  fastify.get('/world', async function (_request, _reply) {
    return ['routes', 'are', 'fun'];
  });
}
