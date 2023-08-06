import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthDto } from 'apps/shared/dtos/auth.dto';
import { DiscordService } from './discord.service';

@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @MessagePattern('discordCallback')
  async discordCallback(data: AuthDto) {
    return this.discordService.callback(data);
  }
}
