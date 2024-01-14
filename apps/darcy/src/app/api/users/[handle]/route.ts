import { prisma } from '@/utils/api/prisma';
import requireAuthorization from '@/utils/api/requireAuthorization';

export async function GET(_request: Request, { params }: { params: { handle: string } }) {
  if (params.handle === '@me') {
    const authData = await requireAuthorization();

    if (!authData.authorized) return authData.response;

    const user = await prisma.user.findFirstOrThrow({
      where: { auth: { email: authData.email } }
    });

    return new Response(JSON.stringify(user));
  }

  const user = await prisma.user.findFirst({
    where: { handle: params.handle }
  });

  if (!user) {
    return new Response(
      JSON.stringify({
        error: 'User not found'
      }),
      {
        status: 404
      }
    );
  }

  return new Response(JSON.stringify(user));
}
