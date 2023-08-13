import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { FastifyReply } from 'fastify';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError() as Record<string, any> | undefined;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    return response.status(error?.statusCode ?? 500).send(error ?? 'Internal server error');
  }
}
