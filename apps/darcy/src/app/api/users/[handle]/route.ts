import { prisma } from '@/utils/api/prisma';
import requireAuthorization from '@/utils/api/requireAuthorization';
import { $Enums } from '@prisma/client';
import { NextRequest } from 'next/server';

interface GetUserOptions {
  params: {
    handle: string;
  };
}

export interface GetUserResponse {
  handle: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string | null;
  verified: $Enums.VerifiedType;
  createdAt: string;
  updatedAt: string;
  job: string | null;
  location: string | null;
  website: string | null;
  birthday: string | null;
  postCount: number;
  followersCount: number;
  followingCount: number;
}

export async function GET(_request: NextRequest, { params }: GetUserOptions) {
  if (params.handle === '@me') {
    const authData = await requireAuthorization();

    if (!authData.authorized) return authData.response;

    const user = await prisma.user.findFirst({
      where: { auth: { email: authData.email } }
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

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: user.id
        }
      }
    });

    return new Response(
      JSON.stringify({ ...user, followersCount, followingCount: user.followingIds.length, followingIds: undefined, id: undefined })
    );
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

  const followersCount = await prisma.user.count({
    where: {
      followingIds: {
        has: user.id
      }
    }
  });

  return new Response(
    JSON.stringify({ ...user, followersCount, followingCount: user.followingIds.length, followingIds: undefined, id: undefined })
  );
}

export async function PATCH(request: NextRequest, { params }: GetUserOptions) {
  if (params.handle === '@me') {
    const data = (await request.json()) as {
      displayName?: string;
      handle?: string;
      bio?: string;
    };

    const authData = await requireAuthorization();

    if (!authData.authorized) return authData.response;

    const user = await prisma.user.findFirst({
      where: { auth: { email: authData.email } }
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

    if (data.handle && data.handle?.length > 16) {
      return new Response(
        JSON.stringify({
          error: 'Handle must be less than 16 characters'
        }),
        {
          status: 400
        }
      );
    }

    if (data.displayName && data.displayName?.length > 32) {
      return new Response(
        JSON.stringify({
          error: 'Display name must be less than 32 characters'
        }),
        {
          status: 400
        }
      );
    }

    if (data.bio && data.bio?.length > 120) {
      return new Response(
        JSON.stringify({
          error: 'Bio must be less than 120 characters'
        }),
        {
          status: 400
        }
      );
    }

    const handleExists = await prisma.user.findFirst({
      where: { handle: data.handle }
    });

    if (handleExists && data.handle !== user.handle) {
      return new Response(
        JSON.stringify({
          error: 'Handle is being used by another user'
        }),
        {
          status: 400
        }
      );
    }

    const [newUser, followersCount] = await Promise.all([
      prisma.user.update({
        where: { id: user.id },
        data: {
          displayName: data.displayName || user.displayName,
          handle: data.handle || user.handle,
          bio: data.bio || user.bio
        }
      }),
      prisma.user.count({
        where: {
          followingIds: {
            has: user.id
          }
        }
      })
    ]);

    return new Response(
      JSON.stringify({ ...newUser, followersCount, followingCount: user.followingIds.length, followingIds: undefined, id: undefined })
    );
  }

  return new Response(
    JSON.stringify({
      error: 'To update a user, you must use the @me handle'
    }),
    {
      status: 401
    }
  );
}
