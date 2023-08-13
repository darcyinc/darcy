import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ClientsModule.register([{ name: 'AUTH_SERVICE', transport: Transport.TCP, options: { port: 4002 } }])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
