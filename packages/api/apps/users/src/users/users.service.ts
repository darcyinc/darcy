import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../../shared/dtos/user.dto';
import { PrismaService } from '../../../shared/services/prisma.service';

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
