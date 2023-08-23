import { APIBaseEntity } from './entity';
import { APIError } from './errors';
import { APIUser } from './user';

export interface APIUserAuth extends APIBaseEntity {
  user: APIUser;
  email: string;
}

export type APIUserAuthCreate = Pick<APIUserAuth, 'email'> | APIError;
export type APIUserAuthUpdate = APIUserAuthCreate | APIError;

export type APIUserOauthAuthCreate =
  | APIError
  | {
      token: string;
    };

export interface APIUserOauthAuthCreatePayload {
  code: string;
  service: string;
}
