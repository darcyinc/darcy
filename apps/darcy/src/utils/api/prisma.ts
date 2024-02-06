import { PrismaClient } from '@prisma/client';

// biome-ignore lint/style/useConst: <explanation>
export let prisma: PrismaClient;
// @ts-expect-error
prisma = prisma ?? new PrismaClient();
