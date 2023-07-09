import { FastifyInstance } from 'fastify';

export interface RouteOptions {
  prefix: string | undefined;
}

export default async function (fastify: FastifyInstance, _options: RouteOptions) {
  fastify.get('/', async function (_request, _reply) {
    const user = await prisma.user.create({
      data: {
        displayName: 'John Doe',
        handle: 'johndoe',
        auth: {
          create: {
            email: 'test@test.com',
            passwordHash: 'test'
          }
        }
      }
    });
    return user;
  });
}
