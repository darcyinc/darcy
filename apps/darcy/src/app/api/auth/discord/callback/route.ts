import generateHandleFromEmail from '@/utils/api/auth/generateHandleFromEmail';
import { getDiscordToken, getDiscordUserData } from '@/utils/api/auth/oauth/discord';
import { prisma } from '@/utils/api/prisma';
import { createToken } from '@/utils/api/tokenJwt';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { code } = (await request.json()) as { code?: string };

  if (!code) {
    return new Response(JSON.stringify({ error: 'missing_code', message: 'Missing authentication code' }), {
      status: 400
    });
  }

  try {
    const token = await getDiscordToken(code);
    const userData = await getDiscordUserData(token);

    if (!userData.email || !userData.verified) {
      return new Response(
        JSON.stringify({ error: 'no_email_associated', message: 'No email associated with account in selected provider' }),
        {
          status: 400
        }
      );
    }

    const existingUser = await prisma.userAuth.findFirst({
      where: {
        email: userData.email
      }
    });

    if (existingUser) {
      cookies().set({
        name: 'darcy_token',
        value: await createToken(existingUser.email, existingUser.updatedAt.getTime())
      });

      return new Response();
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

    if (!newUser.auth) {
      return new Response(JSON.stringify({ error: 'unknown_error', message: 'Unknown error' }), {
        status: 500
      });
    }

    cookies().set({
      name: 'darcy_token',
      value: await createToken(newUser.auth.email, newUser.auth.updatedAt.getTime()),
      httpOnly: true
    });

    return new Response();
  } catch {
    return new Response(JSON.stringify({ error: 'unknown_error', message: 'Unknown error' }), {
      status: 500
    });
  }
}
