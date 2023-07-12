import { FastifyInstance, RouteOptions } from 'fastify';
import { sign } from 'jsonwebtoken';

import { APIUserCreatePayload, APIUserOauthAuthCreate } from '../../types';

export default function (fastify: FastifyInstance, _options: RouteOptions) {
  fastify.route<{
    Body: APIUserCreatePayload;
  }>({
    method: 'PUT',
    url: '/:handle',
    config: {
      requiresAuth: false
    },
    handler: async (req, res): Promise<APIUserOauthAuthCreate> => {
      const { name, email } = req.body;

      if (!email) {
        res.status(400);
        return { error: 'Missing email' };
      }

      const user = await prisma.userAuth.findFirst({
        where: { email }
      });

      if (user) {
        res.status(400);
        return { error: 'User with that email already exists' };
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

      // TODO: promisify this
      const token = sign(newUser.id, 'test');

      res.status(200);
      return { token };
    }
  });
}
