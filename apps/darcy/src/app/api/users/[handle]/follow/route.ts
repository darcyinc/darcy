import { prisma } from '@/utils/api/prisma';
import requireAuthorization from '@/utils/api/requireAuthorization';
import { NextRequest } from 'next/server';

interface FollowUserOptions {
  params: {
    handle: string;
  };
}

export async function POST(_request: NextRequest, { params }: FollowUserOptions) {
  const authData = await requireAuthorization();
  if (!authData.authorized) return authData.response;

  const [user, userToFollow] = await Promise.all([
    prisma.user.findFirst({
      where: {
        auth: {
          email: authData.email
        }
      }
    }),
    prisma.user.findFirst({
      where: {
        handle: params.handle
      }
    })
  ]);

  if (!user || !userToFollow) {
    return new Response(
      JSON.stringify({
        error: 'User not found'
      }),
      {
        status: 404
      }
    );
  }

  if (user.handle === userToFollow.handle) {
    return new Response(
      JSON.stringify({
        error: "You can't follow yourself."
      }),
      {
        status: 404
      }
    );
  }

  if (user.followingIds.includes(userToFollow.id)) {
    return new Response(
      JSON.stringify({
        error: 'You already follows this user'
      }),
      {
        status: 404
      }
    );
  }

  await prisma.user.update({
    where: {
      handle: user.handle
    },
    data: {
      followingIds: [...user.followingIds, userToFollow.id]
    }
  });

  return new Response('', {
    status: 200
  });
}

export async function DELETE(_request: NextRequest, { params }: FollowUserOptions) {
  const authData = await requireAuthorization();
  if (!authData.authorized) return authData.response;

  const [user, userToUnfollow] = await Promise.all([
    prisma.user.findFirst({
      where: {
        auth: {
          email: authData.email
        }
      }
    }),
    prisma.user.findFirst({
      where: {
        handle: params.handle
      }
    })
  ]);

  if (!user || !userToUnfollow) {
    return new Response(
      JSON.stringify({
        error: 'User not found'
      }),
      {
        status: 404
      }
    );
  }

  if (user.handle === userToUnfollow.handle) {
    return new Response(
      JSON.stringify({
        error: "You can't unfollow yourself"
      }),
      {
        status: 404
      }
    );
  }

  if (!user.followingIds.includes(userToUnfollow.id)) {
    return new Response(
      JSON.stringify({
        error: "You don't follow this user"
      }),
      {
        status: 404
      }
    );
  }

  await prisma.user.update({
    where: {
      handle: user.handle
    },
    data: {
      followingIds: user.followingIds.filter((id) => id !== userToUnfollow.id)
    }
  });

  return new Response('', {
    status: 200
  });
}
