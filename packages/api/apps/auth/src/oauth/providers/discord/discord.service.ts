import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { AuthDto } from 'apps/shared/dtos/auth.dto';
import { PrismaService } from 'apps/shared/services/prisma.service';
import { DiscordTokenResponse, generateDiscordAuthParams } from './discord.utils';

@Injectable()
export class DiscordService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async callback({ code }: AuthDto) {
    const token = await this.getDiscordToken(code);
    const { email, verified, username } = (await this.getDiscordUserData(token)) as { email: string; verified: boolean; username: string };

    if (!email || !verified) {
      throw new RpcException('no_email_associated');
    }

    const existingUser = await this.prismaService.userAuth.findFirst({
      where: {
        email
      }
    });

    if (existingUser) {
      return {
        token: await this.jwtService.signAsync({ email, updatedAt: existingUser.updatedAt }),
        user: await this.prismaService.user.findUnique({
          where: {
            id: existingUser.userId
          }
        })
      };
    }

    const newUser = await this.prismaService.user.create({
      data: {
        auth: {
          create: { email }
        },
        displayName: username,
        // TODO: generate random handle
        handle: username
      },
      include: {
        auth: true
      }
    });

    return {
      token: await this.jwtService.signAsync({ email, updatedAt: newUser.auth.updatedAt }),
      user: newUser
    };
  }

  private async getDiscordToken(code: string) {
    const request = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: generateDiscordAuthParams(code)
    });
    const data = (await request.json()) as DiscordTokenResponse;

    if (data.error || !data.scope.includes('identify') || !data.scope.includes('email')) {
      throw new Error('Invalid scope or an error ocurred.');
    }

    return data.access_token;
  }

  private async getDiscordUserData(token: string) {
    const request = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = (await request.json()) as Record<string, unknown>;

    return data;
  }
}
