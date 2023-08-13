import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ClientsModule.register([{ name: 'USERS_SERVICE', transport: Transport.TCP, options: { port: 4001 } }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
