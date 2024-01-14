import { prisma } from '@/utils/api/prisma';
import { Post } from '@prisma/client';
import { NextRequest } from 'next/server';

export interface GetPopularPostsResponse extends Post {
  author: {
    displayName: string;
    handle: string;
    avatarUrl: string;
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 50);

  if (Number.isNaN(page) || Number.isNaN(limit)) {
    return new Response(
      JSON.stringify({
        error: 'Invalid query parameters'
      }),
      {
        status: 400
      }
    );
  }

  if (page < 1) {
    return new Response(
      JSON.stringify({
        error: 'Invalid page number'
      }),
      {
        status: 400
      }
    );
  }

  if (limit < 1 || limit > 50) {
    return new Response(
      JSON.stringify({
        error: 'Invalid limit. Must be between 1 and 50'
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
          avatarUrl: true
        }
      }
    },
    orderBy: {
      likeCount: 'desc'
    },
    take: limit,
    skip: (page - 1) * limit
  });

  return new Response(JSON.stringify(popularPosts));
}
