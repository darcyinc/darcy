import { PrismaClient } from '@prisma/client';

declare namespace NodeJS {
  interface ProcessEnvironment {
    NODE_ENV: 'development' | 'production';
    PORT: string;
  }
}

declare global {
  // biome-ignore lint/style/noVar: <explanation>
  var prisma: PrismaClient;
}
