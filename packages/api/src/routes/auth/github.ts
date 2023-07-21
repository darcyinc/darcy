import { FastifyInstance, RouteOptions } from 'fastify';

import { APIUserOauthAuthCreate, APIUserOauthAuthCreatePayload } from '../../types';
import generateHandleFromEmail from '../../utils/generateHandleFromEmail';
import { getGithubToken, getGithubUserData, userEmailIsVerified } from '../../utils/oauth2/github';

export default async function (fastify: FastifyInstance, _options: RouteOptions) {
  fastify.route<{
    Body: Pick<APIUserOauthAuthCreatePayload, 'code'>;
  }>({
    method: 'POST',
    url: '/github/callback',
    config: {
      requiresAuth: false
    },
    handler: async (req, res): Promise<APIUserOauthAuthCreate> => {
      const { code } = req.body;

      try {
        const token = await getGithubToken(code);
        const userData = await getGithubUserData(token);

        const emailIsVerified = await userEmailIsVerified(token, userData.email as string);

        if (!userData.email || !emailIsVerified) {
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
            avatar: userData.avatar_url as string,
            displayName: (userData.name ?? userData.login) as string,
            handle: generateHandleFromEmail(userData.email as string)
          },
          include: {
            auth: true
          }
        });

        res.status(200);
        return { token: 'FAKE-TOKEN' };
      } catch {
        res.status(500);
        return { error: 'unknown_error' };
      }
    }
  });
}
