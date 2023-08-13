import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
