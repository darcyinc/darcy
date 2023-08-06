import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@prisma/client';
import { AuthDto } from 'apps/shared/dtos/auth.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async discordCallback(data: AuthDto) {
    try {
      const user: User = await firstValueFrom(this.client.send('discordCallback', data));
      return user;
    } catch {
      throw new HttpException('User not found.', 404);
    }
  }
}
