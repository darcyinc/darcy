import { Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateUserDto } from '../../shared/dtos/user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('createUser')
  async createUser(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @MessagePattern('getUser')
  async getUser(handle: string) {
    const user = await this.usersService.getUser(handle);

    if (!user) {
      throw new RpcException(new NotFoundException('User not found'));
    }

    return user;
  }
}
