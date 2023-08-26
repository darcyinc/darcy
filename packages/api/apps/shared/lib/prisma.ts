import { PrismaClient } from '@prisma/client';

export async function setupPrisma() {
  global.prisma = global.prisma || new PrismaClient();
  await prisma.$connect();
}
