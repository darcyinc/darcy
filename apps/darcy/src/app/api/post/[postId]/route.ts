import { prisma } from '@/utils/api/prisma';
import requireAuthorization from '@/utils/api/requireAuthorization';
import { NextRequest } from 'next/server';
import { GetPopularPostsResponse } from '../../popular-posts/route';

interface GetPostOptions {
  params: {
    postId: string;
  };
}

export type GetPostResponse = GetPopularPostsResponse & { hasLiked: true };

export async function GET(_request: NextRequest, { params }: GetPostOptions) {
  const authData = await requireAuthorization();

  let hasLiked = false;

  const post = await prisma.post.findUnique({
    where: {
      id: params.postId
    },
    include: {
      author: {
        select: {
          displayName: true,
          handle: true,
          avatarUrl: true,
          private: true
        }
      }
    }
  });

  if (!post) {
    return new Response('Post not found', {
      status: 404
    });
  }

  if (post.author.private) {
    if (!authData.authorized) return authData.response;

    // TODO
    return new Response('This post is private. You must follow the user to see it.', {
      status: 400
    });
  }

  if (authData.authorized) {
    const user = await prisma.user.findFirst({
      where: {
        auth: {
          email: authData.email
        }
      }
    });

    hasLiked = post?.likedIds.includes(user?.id ?? '');
  }

  return new Response(
    JSON.stringify({
      ...post,
      likedIds: undefined,
      likeCount: post.likedIds.length,
      hasLiked
    })
  );
}
