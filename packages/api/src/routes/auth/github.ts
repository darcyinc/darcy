import { FastifyInstance, RouteOptions } from 'fastify';

import { APIUserOauthAuthCreate, APIUserOauthAuthCreatePayload } from '../../types';
import { getGithubToken, getGithubUserData } from '../../utils/oauth2/github';
import generateHandleFromEmail from '../../utils/generateHandleFromEmail';

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

      const token = await getGithubToken(code);
      const userData = await getGithubUserData(token);

      if (!userData.email) {
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
          avatar: (userData.avatar_url as string) ?? null,
          displayName: (userData.name ?? userData.login) as string,
          handle: generateHandleFromEmail(userData.email as string)
        },
        include: {
          auth: true
        }
      });

      console.log(user);

      res.status(200);
      return { token: 'FAKE-TOKEN' };

      // res.status(500);
      // return { error: 'unknown_error' };
    }
  });
}
