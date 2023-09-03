import { FastifyReply } from 'fastify';

type Microservice = 'users';
type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type BaseMicroserviceRequestOptions = {
  microservice?: Microservice;
  path: string;
  method: HttpMethods;
  data?: any;
  reply: FastifyReply;
};

type MicroserviceRequestOptions = BaseMicroserviceRequestOptions &
  (
    | {
        method?: 'GET' | 'undefined';
        data?: undefined;
      }
    | {
        method: 'POST' | 'PATCH' | 'DELETE';
        data: any;
      }
  );

export async function requestMicroservice(options: MicroserviceRequestOptions): Promise<Record<string, unknown>>;
export async function requestMicroservice(options: MicroserviceRequestOptions) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { headers, json, status } = await fetch(`http://localhost:3000/${options.microservice}/${options.path}`, {
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

  const response = (await json()) as Record<string, unknown>;
  return response;
}
