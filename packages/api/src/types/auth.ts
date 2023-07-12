import { APIBaseEntity } from './entity';
import { APIError } from './errors';
import { APIUser } from './user';

export interface APIUserAuth extends APIBaseEntity {
  user: APIUser;
  email: string;
}

export interface APIUserAuthCreate {
  email: string;
}

export type APIUserAuthUpdate = APIUserAuthCreate | APIError;
