import { FastifyInstance, RouteOptions } from 'fastify';
import { verify } from 'jsonwebtoken';

export default async function (fastify: FastifyInstance, _options: RouteOptions) {
  fastify.route<{
    Body: {
      email: string;
    };
  }>({
    method: 'DELETE',
    url: '/@me',
    config: {
      requiresAuth: true
    },
    handler: async (request) => {
      const decryptedUserId = verify(request.headers.authorization?.split(' ')[1] ?? '', 'test') as string;

      const user = await prisma.user.findFirst({
        where: { id: decryptedUserId }
      });

      if (!user) {
        return { done: false };
      }

      await prisma.userAuth.delete({
        where: { userId: decryptedUserId }
      });

      await prisma.user.delete({
        where: { id: decryptedUserId }
      });

      return { done: true };
    }
  });
}
