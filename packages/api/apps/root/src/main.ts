import compression from '@fastify/compress';
import fastifyCsrf from '@fastify/csrf-protection';
import helmet from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from './validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  await app.register(helmet);
  await app.register(fastifyCsrf);
  await app.register(compression, { encodings: ['gzip', 'deflate'] });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001, '0.0.0.0');
}
bootstrap();
