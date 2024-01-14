import { headers } from 'next/headers';
import { verifyToken } from './tokenJwt';

export default async function requireAuthorization() {
  const rawToken = headers().get('Authorization');

  if (!rawToken) {
    return {
      authorized: false,
      response: new Response('Missing Authentication Header', {
        status: 401
      })
    };
  }

  const [type, token] = rawToken.split(' ');

  if (type !== 'Bearer') {
    return {
      authorized: false,
      response: new Response('Invalid Authentication Header', {
        status: 401
      })
    };
  }
  try {
    const decodedToken = await verifyToken(token);

    if (!decodedToken.email || !decodedToken.updatedAt)
      return {
        authorized: false,
        response: new Response('Invalid Token', {
          status: 401
        })
      };

    return {
      authorized: true,
      email: decodedToken.email
    };
  } catch (e) {
    return {
      authorized: false,
      response: new Response('Invalid Token', {
        status: 401
      })
    };
  }
}
