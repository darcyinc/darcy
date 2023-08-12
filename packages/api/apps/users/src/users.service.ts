import { CreateUserDto } from '@/lib/shared/dtos/user.dto';
import { PrismaService } from '@/lib/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    return await this.prisma.user.create({
      data
    });
  }

  async getUser(handle: string) {
    return await this.prisma.user.findUnique({
      where: {
        handle
      }
    });
  }
}
