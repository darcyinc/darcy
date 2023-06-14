import { PrismaClient } from '@prisma/client';

declare namespace NodeJS {
  interface ProcessEnvironment {
    NODE_ENV: 'development' | 'production';
    PORT: string;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}
