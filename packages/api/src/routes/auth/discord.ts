import { FastifyInstance, RouteOptions } from 'fastify';
import {
  DISCORD_AUTH_URL,
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
    method: 'GET',
    url: '/discord/callback',
    config: {
      requiresAuth: false,
    },
    handler: async (request, reply) => {
      const { code } = request.query;

      if (!code) return reply.redirect(DISCORD_AUTH_URL);

      try {
        const token = await getDiscordToken(code);
        const userData = await getDiscordUserData(token);

        reply.send(userData);
      } catch {
        return reply.redirect(DISCORD_AUTH_URL);
      }
    },
  });
}
