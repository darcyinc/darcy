import { prisma } from '@/utils/api/prisma';
import requireAuthorization from '@/utils/api/requireAuthorization';
import { Post } from '@prisma/client';
import { NextRequest } from 'next/server';

interface CreatePostRequest {
  content: string;
  parentId?: string;
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as CreatePostRequest;
  if (!data.content)
    return new Response(JSON.stringify({ error: 'missing_post_content', message: 'Missing post content' }), { status: 400 });

  const cleanContent = data.content.trim();

  if (cleanContent.trim().length > 256)
    return new Response(JSON.stringify({ error: 'post_content_long', message: 'Content too long' }), { status: 400 });
  if (cleanContent.trim().length < 1)
    return new Response(JSON.stringify({ error: 'post_content_short', message: 'Content too short' }), { status: 400 });

  const authData = await requireAuthorization();
  if (!authData.authorized) return authData.response;

  const user = await prisma.user.findFirst({
    where: {
      auth: {
        email: authData.email
      }
    }
  });

  if (!user) {
    return new Response(
      JSON.stringify({
        error: 'user_not_found',
        message: 'User not found'
      }),
      {
        status: 404
      }
    );
  }

  let existingPost: Post | null = null;

  if (data.parentId) {
    existingPost = await prisma.post.findUnique({
      where: {
        id: data.parentId
      }
    });

    if (!existingPost)
      return new Response(
        JSON.stringify({
          error: 'post_not_found',
          message: 'Post not found'
        }),
        {
          status: 404
        }
      );
  }

  const post = await prisma.post.create({
    data: {
      content: cleanContent,
      authorId: user.id,
      parentId: existingPost?.id
    },
    include: {
      author: {
        select: {
          displayName: true,
          handle: true,
          avatarUrl: true
        }
      }
    }
  });

  return new Response(
    JSON.stringify({
      ...post,
      likedIds: undefined,
      likeCount: post.likedIds.length,
      hasLiked: false
    }),
    {
      status: 201
    }
  );
}
