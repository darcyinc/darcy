import { FastifyInstance, RouteOptions } from 'fastify';

import {
  getDiscordToken,
  getDiscordUserData,
} from '../../utils/oauth2/discord';

export default async function (
  fastify: FastifyInstance,
  _options: RouteOptions,
) {
  fastify.route<{
    Querystring: {
      code: string;
      state: string;
    };
  }>({
    method: 'POST',
    url: '/discord/callback',
    config: {
      requiresAuth: false,
    },
    handler: async (request, reply) => {
      const { code } = request.query;

      try {
        const token = await getDiscordToken(code);
        const userData = await getDiscordUserData(token);

        if (!userData.email) {
          return reply.send(400).send({
            error: 'no_email_associated',
          });
        }

        reply.send({
          token: 'FAKE-TOKEN',
          // TODO: remove
          userData,
        });
      } catch {
        return reply.send(500);
      }
    },
  });
}
