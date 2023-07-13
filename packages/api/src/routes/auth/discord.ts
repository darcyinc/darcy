import { FastifyInstance, RouteOptions } from 'fastify';

import { APIUserOauthAuthCreate, APIUserOauthAuthCreatePayload } from '../../types';
import generateHandleFromEmail from '../../utils/generateHandleFromEmail';
import { getDiscordToken, getDiscordUserData } from '../../utils/oauth2/discord';

export default async function (fastify: FastifyInstance, _options: RouteOptions) {
  fastify.route<{
    Body: Pick<APIUserOauthAuthCreatePayload, 'code'>;
  }>({
    method: 'POST',
    url: '/discord/callback',
    config: {
      requiresAuth: false
    },
    handler: async (req, res): Promise<APIUserOauthAuthCreate> => {
      const { code } = req.body;

      try {
        const token = await getDiscordToken(code);
        const userData = await getDiscordUserData(token);

        if (!userData.email || !userData.verified) {
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

        const user = await prisma.user.create({
          data: {
            auth: {
              create: {
                email: userData.email as string
              }
            },
            displayName: userData.username as string,
            handle: generateHandleFromEmail(userData.email as string)
          },
          include: {
            auth: true
          }
        });

        console.log(user);

        res.status(200);
        return { token: 'FAKE-TOKEN' };
      } catch {
        res.status(500);
        return { error: 'unknown_error' };
      }
    }
  });
}
