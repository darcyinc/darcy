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
