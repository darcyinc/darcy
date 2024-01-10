import { createToken } from '@/shared/lib/jwt';
import { DarcyRouteConfig } from '@/shared/types/routeConfig';
import generateHandleFromEmail from 'apps/auth-microservice/lib/handleFromEmail';
import { getDiscordToken, getDiscordUserData } from 'apps/auth-microservice/lib/oauth2/discord';

import { DarcyFastifyInstance } from '../..';

export default async function (app: DarcyFastifyInstance) {
  app.route<{
    Body: { code: string };
  }>({
    method: 'POST',
    url: '/discord/callback',
    config: { requiresAuth: false } as DarcyRouteConfig,
    handler: async (request, reply) => {
      const { code } = request.body;

      if (!code) {
        reply.status(400);
        return { error: 'missing_code' };
      }

      try {
        const token = await getDiscordToken(code);
        const userData = await getDiscordUserData(token);

        if (!userData.email || !userData.verified) {
          reply.status(400);

          return { error: 'no_email_associated' };
        }

        const existingUser = await prisma.userAuth.findFirst({
          where: {
            email: userData.email
          }
        });

        if (existingUser) {
          reply.status(200);
          return {
            token: await createToken(existingUser.email, existingUser.updatedAt.getTime())
          };
        }

        const newUser = await prisma.user.create({
          data: {
            auth: {
              create: {
                email: userData.email
              }
            },
            displayName: userData.username,
            handle: generateHandleFromEmail(userData.email)
          },
          include: {
            auth: true
          }
        });

        reply.status(200);

        if (!newUser.auth) {
          return { error: 'unknown_error' };
        }

        return {
          token: await createToken(newUser.auth.email, newUser.auth.updatedAt.getTime())
        };
      } catch {
        reply.status(500);
        return { error: 'unknown_error' };
      }
    }
  });
}
