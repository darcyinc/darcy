import { Body, Controller, Post } from '@nestjs/common';

import { AuthDto } from '@/lib/shared/dtos/auth.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/discord/callback')
  async discordCallback(@Body() auth: AuthDto) {
    return this.authService.discordCallback(auth);
  }
}
