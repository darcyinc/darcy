import { prisma } from '@/utils/api/prisma';
import requireAuthorization from '@/utils/api/requireAuthorization';
import { NextRequest } from 'next/server';

interface GetUserFollowersOptions {
  params: {
    handle: string;
  };
}

export type GetUserFollowersResponse = {
  displayName: string;
  handle: string;
  avatarUrl: string;
  bio?: string;
}[];

export async function GET(request: NextRequest, { params }: GetUserFollowersOptions) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 50);

  if (Number.isNaN(page) || Number.isNaN(limit)) {
    return new Response(
      JSON.stringify({
        error: 'invalid_query_parameters_type',
        message: 'Invalid type of query parameters type'
      }),
      {
        status: 400
      }
    );
  }

  if (page < 1) {
    return new Response(
      JSON.stringify({
        error: 'invalid_page_number',
        message: 'Invalid page number'
      }),
      {
        status: 400
      }
    );
  }

  if (limit < 1 || limit > 50) {
    return new Response(
      JSON.stringify({
        error: 'invalid_page_limit',
        message: 'Invalid page limit. Limit must be between 1 and 50'
      }),
      {
        status: 400
      }
    );
  }

  const authData = await requireAuthorization();

  if (params.handle === '@me') {
    if (!authData.authorized) return authData.response;

    const user = await prisma.user.findFirst({
      where: {
        auth: { email: authData.email }
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

    const followers = await prisma.user.findMany({
      where: {
        followingIds: {
          has: user.id
        }
      },
      take: limit,
      skip: (page - 1) * limit
    });

    return new Response(
      JSON.stringify(
        followers.map((user) => ({
          displayName: user.displayName,
          handle: user.handle,
          avatarUrl: user.avatarUrl,
          bio: user.bio
        }))
      )
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      handle: params.handle
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

  if (user.private) {
    return new Response(
      JSON.stringify({
        error: 'user_is_private',
        message: 'User account is private'
      }),
      {
        status: 403
      }
    );
  }

  const followers = await prisma.user.findMany({
    where: {
      followingIds: {
        has: user.id
      }
    },
    take: limit,
    skip: (page - 1) * limit
  });

  return new Response(
    JSON.stringify(
      followers.map((user) => ({
        displayName: user.displayName,
        handle: user.handle,
        avatarUrl: user.avatarUrl,
        bio: user.bio
      }))
    )
  );
}
