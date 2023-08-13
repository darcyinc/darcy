import { Module } from '@nestjs/common';

import { OauthModule } from './oauth/oauth.module';

@Module({
  imports: [OauthModule]
})
export class AuthModule {}
