import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@prisma/client';
import { CreateUserDto } from 'apps/shared/dtos/user.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy) {}

  async createUser(user: CreateUserDto) {
    try {
      const createdUser: User = await firstValueFrom(this.client.send('createUser', user));
      return createdUser;
    } catch {
      throw new HttpException('User creation failed.', 500);
    }
  }

  async getUser(handle: string) {
    try {
      const user: User = await firstValueFrom(this.client.send('getUser', handle));
      return user;
    } catch {
      throw new HttpException('User not found.', 404);
    }
  }
}
