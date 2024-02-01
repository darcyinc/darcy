import { prisma } from '@/utils/api/prisma';
import requireAuthorization from '@/utils/api/requireAuthorization';
import { User } from '@prisma/client';
import { NextRequest } from 'next/server';
import { GetPostResponse } from '../post/[postId]/route';

export type GetPopularPostsResponse = GetPostResponse[];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 50);

  if (Number.isNaN(page) || Number.isNaN(limit)) {
    return new Response(
      JSON.stringify({
        error: 'invalid_get_posts_params',
        message: 'Invalid query parameters. page and limit must be numbers.'
      }),
      {
        status: 400
      }
    );
  }

  if (page < 1) {
    return new Response(
      JSON.stringify({
        error: 'invalid_get_posts_page',
        message: 'Invalid page number. Must be a positive integer.'
      }),
      {
        status: 400
      }
    );
  }

  if (limit < 1 || limit > 50) {
    return new Response(
      JSON.stringify({
        error: 'invalid_get_posts_limit',
        message: 'Invalid limit. Must be between 1 and 50'
      }),
      {
        status: 400
      }
    );
  }

  const popularPosts = await prisma.post.findMany({
    where: {
      parentId: null,
      author: {
        private: false
      }
    },
    include: {
      author: {
        select: {
          displayName: true,
          handle: true,
          avatarUrl: true,
          verified: true
        }
      }
    },
    take: limit,
    skip: (page - 1) * limit
  });

  const authData = await requireAuthorization();

  let user: User | null = null;

  if (authData.authorized) {
    user = await prisma.user.findFirst({
      where: {
        auth: {
          email: authData.email
        }
      }
    });
  }

  return new Response(
    JSON.stringify(
      popularPosts
        .sort((a, b) => b.likedIds.length - a.likedIds.length)
        .map((post) => ({
          ...post,
          authorId: undefined,
          likedIds: undefined,
          likeCount: post.likedIds.length,
          hasLiked: user ? post.likedIds.includes(user.id) : false
        }))
    )
  );
}
