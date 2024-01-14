import { prisma } from '@/utils/api/prisma';
import requireAuthorization from '@/utils/api/requireAuthorization';
import { NextRequest } from 'next/server';

interface RecentPostOptions {
  params: {
    handle: string;
  };
}

export async function GET(request: NextRequest, { params }: RecentPostOptions) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 50);
  const postType = searchParams.get('type') ?? 'posts';

  if (postType !== 'posts' && postType !== 'replies') {
    return new Response(
      JSON.stringify({
        error: 'Invalid post type'
      }),
      {
        status: 400
      }
    );
  }

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

  if (params.handle === '@me') {
    const authData = await requireAuthorization();

    if (!authData.authorized) return authData.response;

    const user = await prisma.user.findFirstOrThrow({
      where: {
        auth: { email: authData.email }
      },
      include: {
        posts: {
          where: {
            // if postType is posts, we want to get all posts
            // if postType is replies, we want to get all replies
            parentId: postType === 'posts' ? null : { not: null }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: limit,
          skip: (page - 1) * limit
        }
      }
    });

    return new Response(JSON.stringify(user.posts));
  }

  const user = await prisma.user.findFirst({
    where: {
      handle: params.handle
    },
    include: {
      posts: {
        where: {
          // if postType is posts, we want to get all posts
          // if postType is replies, we want to get all replies
          parentId: postType === 'posts' ? null : { not: null }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: limit,
        skip: (page - 1) * limit
      }
    }
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

  // TODO: handle private accounts
  if (user.private) {
    return new Response(
      JSON.stringify({
        error: 'User account is private'
      }),
      {
        status: 403
      }
    );
  }

  return new Response(JSON.stringify(user.posts));
}
