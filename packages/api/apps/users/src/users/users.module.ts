import { Module } from '@nestjs/common';

import { PrismaService } from '@/lib/shared/services/prisma.service';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UsersService]
})
export class UsersModule {}
