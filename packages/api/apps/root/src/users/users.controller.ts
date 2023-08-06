import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../../../shared/dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':handle')
  async getUser(@Param('handle') handle: string) {
    return this.usersService.getUser(handle);
  }
}
