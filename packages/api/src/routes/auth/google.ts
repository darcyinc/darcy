import { FastifyInstance, RouteOptions } from 'fastify';

import { APIUserOauthAuthCreate, APIUserOauthAuthCreatePayload } from '../../types';
import { getGoogleToken, getGoogleUserData } from '../../utils/oauth2/google';
import generateHandleFromEmail from '../../utils/generateHandleFromEmail';

export default async function (fastify: FastifyInstance, _options: RouteOptions) {
  fastify.route<{
    Body: Pick<APIUserOauthAuthCreatePayload, 'code'>;
  }>({
    method: 'POST',
    url: '/google/callback',
    config: {
      requiresAuth: false
    },
    handler: async (req, res): Promise<APIUserOauthAuthCreate> => {
      const { code } = req.body;

      const token = await getGoogleToken(code);
      const userData = await getGoogleUserData(token);

      if (!userData.email || !userData.email_verified) {
        res.status(400);

        return { error: 'no_email_associated' };
      }

      const existingUser = await prisma.userAuth.findFirst({
        where: {
          email: userData.email as string
        }
      });

      if (existingUser) {
        res.status(200);
        return { token: 'FAKE-TOKEN' };
      }

      await prisma.user.create({
        data: {
          auth: {
            create: {
              email: userData.email as string
            }
          },
          avatar: userData.picture as string,
          displayName: userData.name as string,
          handle: generateHandleFromEmail(userData.email as string)
        },
        include: {
          auth: true
        }
      });

      res.status(200);
      return { token: 'FAKE-TOKEN' };

      // res.status(500);
      // return { error: 'unknown_error' };
    }
  });
}
