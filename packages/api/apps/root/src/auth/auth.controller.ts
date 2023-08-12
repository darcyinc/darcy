import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '@/lib/shared/dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/discord/callback')
  async discordCallback(@Body() auth: AuthDto) {
    return this.authService.discordCallback(auth);
  }
}
