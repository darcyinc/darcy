import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DiscordService } from './discord.service';
import { AuthDto } from '@/lib/shared/dtos/auth.dto';

@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @MessagePattern('discordCallback')
  async discordCallback(data: AuthDto) {
    return this.discordService.callback(data);
  }
}
