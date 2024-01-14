import { prisma } from '@/utils/api/prisma';
import requireAuthorization from '@/utils/api/requireAuthorization';
import { NextRequest } from 'next/server';

export interface CreatePostRequest {
  content: string;
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as CreatePostRequest;
  if (!data.content) return new Response('Missing content', { status: 400 });

  const cleanContent = data.content.trim();

  if (cleanContent.trim().length > 256) return new Response('Content too long', { status: 400 });
  if (cleanContent.trim().length < 1) return new Response('Content too short', { status: 400 });

  const authData = await requireAuthorization();
  if (!authData.authorized) return authData.response;

  const user = await prisma.user.findFirstOrThrow({
    where: {
      auth: {
        email: authData.email
      }
    }
  });

  const post = await prisma.post.create({
    data: {
      content: cleanContent,
      authorId: user.id
    }
  });

  return new Response(JSON.stringify(post));
}
