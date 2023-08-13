import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
    transport: Transport.TCP,
    options: {
      port: 4001
    }
  });
  await app.listen();
}
void bootstrap();
