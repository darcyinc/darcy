import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DiscordController } from './providers/discord/discord.controller';
import { DiscordService } from './providers/discord/discord.service';
import { PrismaService } from '@/lib/shared/services/prisma.service';

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
