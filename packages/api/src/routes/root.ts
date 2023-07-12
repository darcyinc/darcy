import { FastifyInstance } from 'fastify';

export interface RouteOptions {
  prefix: string | undefined;
}

export default function (fastify: FastifyInstance, _options: RouteOptions) {
  fastify.get('/', () => 'Hello, world!');
}
