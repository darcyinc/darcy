import { URLSearchParams } from 'node:url';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, WEBSITE_URL } = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !WEBSITE_URL) {
  throw new Error('Missing environment variables for Google OAuth2.');
}

export const GOOGLE_CALLBACK_URL = `${WEBSITE_URL}/auth/callback/google`;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&response_type=code&scope=openid%20email%20profile`;

const generateAuthParams = (code: string) =>
  new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_CALLBACK_URL,
    grant_type: 'authorization_code',
    code
  });

export interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
}

export async function getGoogleToken(code: string) {
  const request = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: generateAuthParams(code)
  });
  const data = (await request.json()) as GoogleTokenResponse;

  // if (!data.scope.includes('')) {
  //   throw new Error('Invalid scope or an error ocurred.');
  // }

  return data.access_token;
}

export async function getGoogleUserData(token: string) {
  const request = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = (await request.json()) as Record<string, unknown>;

  return data;
}
