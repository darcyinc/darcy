import { Prisma } from '@prisma/client';

export const getUserByHandle = async (handle: string) => prisma.user.findFirst({ where: { handle } });

export const getUserByEmail = async (email: string) =>
  prisma.user.findFirst({
    where: {
      auth: {
        email
      }
    }
  });

export const createUser = async (data: Prisma.UserCreateInput) => prisma.user.create({ data });

export const updateUser = async (handle: string, data: Prisma.UserUpdateInput) =>
  prisma.user.update({
    where: {
      handle
    },
    data
  });

export const deleteUser = async (handle: string) => prisma.user.delete({ where: { handle } });
