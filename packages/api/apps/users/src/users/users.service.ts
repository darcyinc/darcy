import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '@/lib/shared/dtos/user.dto';
import { PrismaService } from '@/lib/shared/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data
    });
  }

  async getUser(handle: string) {
    return this.prisma.user.findUnique({
      where: {
        handle
      }
    });
  }
}
