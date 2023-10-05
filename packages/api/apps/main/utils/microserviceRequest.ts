import { FastifyReply } from 'fastify';

import { microserviceUrls } from './constants';

type Microservice = 'users' | 'auth';
type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type BaseMicroserviceRequestOptions = {
  microservice: Microservice;
  path: string;
  method: HttpMethods;
  data?: any;
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
        data?: any;
      }
  );

export async function requestMicroservice(options: MicroserviceRequestOptions): Promise<Record<string, unknown>>;
export async function requestMicroservice(options: MicroserviceRequestOptions) {
  const { headers, status, ...req } = await fetch(`${microserviceUrls[options.microservice]}/${options.path}`, {
    method: options.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: options.data ? JSON.stringify(options.data) : undefined
  });

  options.reply.status(status);

  for (const [key, value] of Object.entries(headers)) {
    options.reply.header(key, value);
  }

  const response = (await req.json()) as Record<string, unknown>;
  return response;
}
