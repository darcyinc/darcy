import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'apps/shared/services/prisma.service';
import { DiscordController } from './providers/discord/discord.controller';
import { DiscordService } from './providers/discord/discord.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [DiscordController],
  providers: [DiscordService, PrismaService]
})
export class OauthModule {}
