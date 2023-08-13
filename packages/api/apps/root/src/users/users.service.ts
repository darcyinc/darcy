import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

import { CreateUserDto } from '@/lib/shared/dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy) {}

  async createUser(user: CreateUserDto) {
    return this.client.send('createUser', user).pipe(catchError((error) => throwError(() => new RpcException(error.response))));
  }

  async getUser(handle: string) {
    return this.client.send('getUser', handle).pipe(catchError((error) => throwError(() => new RpcException(error.response))));
  }
}
