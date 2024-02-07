import { cookies } from 'next/headers';
import { verifyToken } from './tokenJwt';

type UnauthorizedResponse = {
  authorized: false;
  response: Response;
};

type AuthorizedResponse = {
  authorized: true;
  email: string;
};

type AuthorizationResponse = AuthorizedResponse | UnauthorizedResponse;

export default async function requireAuthorization(): Promise<AuthorizationResponse> {
  const token = cookies().get('darcy_token');

  if (!token || !token.value) {
    return {
      authorized: false,
      response: new Response('Missing Authentication Cookie', {
        status: 401
      })
    };
  }

  try {
    const decodedToken = await verifyToken(token.value);

    if (!decodedToken.email || !decodedToken.updatedAt) {
      cookies().delete('darcy_token');

      return {
        authorized: false,
        response: new Response('Invalid Token', {
          status: 401
        })
      };
    }

    return {
      authorized: true,
      email: decodedToken.email
    };
  } catch (e) {
    cookies().delete('darcy_token');

    return {
      authorized: false,
      response: new Response('Invalid Token', {
        status: 401
      })
    };
  }
}
