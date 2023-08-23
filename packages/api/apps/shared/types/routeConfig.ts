import { RouteShorthandOptions } from 'fastify';

export type DarcyRouteConfig = RouteShorthandOptions['config'] & {
  requiresAuth?: boolean;
};
