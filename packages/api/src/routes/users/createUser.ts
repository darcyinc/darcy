import { FastifyInstance, RouteOptions } from 'fastify';
import jwt, { sign } from 'jsonwebtoken';

export default async function (fastify: FastifyInstance, _options: RouteOptions) {
  fastify.route<{
    Body: {
      email: string;
      // If user was authenticated with oauth, we'll have a name
      name?: string;
    };
  }>({
    method: 'PUT',
    url: '/:handle',
    config: {
      requiresAuth: false
    },
    handler: async (request, reply) => {
      const { name, email } = request.body;

      if (!email) {
        return reply.status(400).send({
          error: 'Missing email'
        });
      }

      const user = await prisma.userAuth.findFirst({
        where: { email }
      });

      if (user) {
        return reply.status(400).send({
          error: 'User with that email already exists'
        });
      }

      const newUser = await prisma.user.create({
        data: {
          handle: Math.random().toString(36).slice(2, 15),
          displayName: name?.slice(0, 24) ?? 'DarcyUser',
          auth: {
            create: {
              email
            }
          }
        }
      });

      const token = sign(newUser.id, 'test');

      return reply.status(200).send({
        token
      });
    }
  });
}
