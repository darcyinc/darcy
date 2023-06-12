import { FastifyInstance } from 'fastify';

export interface RouteOptions {
  prefix: string | undefined;
}

export default async function (fastify: FastifyInstance, _opts: RouteOptions) {
  fastify.get('/', async function (_request, _reply) {
    return { hello: 'world' };
  });
}
