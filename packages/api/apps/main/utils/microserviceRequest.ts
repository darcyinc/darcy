import { FastifyReply } from 'fastify';

import { microserviceUrls } from './constants';

type Microservice = 'users' | 'auth';
type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type BaseMicroserviceRequestOptions = {
  microservice: Microservice;
  path: string;
  method: HttpMethods;
  data?: unknown;
  reply: FastifyReply;
};

type MicroserviceRequestOptions = BaseMicroserviceRequestOptions &
  (
    | {
        method?: 'GET';
        data?: undefined;
      }
    | {
        method: 'POST' | 'PATCH' | 'DELETE';
        data?: unknown;
      }
  );

export async function requestMicroservice(options: MicroserviceRequestOptions): Promise<Record<string, unknown>>;
export async function requestMicroservice(options: MicroserviceRequestOptions) {
  const req = await fetch(`${microserviceUrls[options.microservice]}${options.path}`, {
    method: options.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: options.data ? JSON.stringify(options.data) : undefined
  });

  options.reply.status(req.status);

  for (const [key, value] of Object.entries(req.headers)) {
    options.reply.header(key, value);
  }

  const response = (await req.json()) as Record<string, unknown>;
  return response;
}
