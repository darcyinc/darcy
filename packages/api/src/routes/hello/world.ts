import { FastifyInstance, RouteOptions } from 'fastify';

export default async function (fastify: FastifyInstance, _opts: RouteOptions) {
  fastify.get('/world', async function (_request, _reply) {
    return ['routes', 'are', 'fun'];
  });
}
