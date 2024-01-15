import { prisma } from '@/utils/api/prisma';
import { NextRequest } from 'next/server';

export interface GetPopularPostsResponse {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  commentCount: number;
  likeCount: number;
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
    take: limit,
    skip: (page - 1) * limit
  });

  return new Response(
    JSON.stringify(
      popularPosts
        .sort((a, b) => b.likedIds.length - a.likedIds.length)
        .map((post) => ({
          ...post,
          authorId: undefined,
          likedIds: undefined,
          likeCount: post.likedIds.length
        }))
    )
  );
}
