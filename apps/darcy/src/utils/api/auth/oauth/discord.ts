import { URLSearchParams } from 'node:url';
import { DISCORD_CALLBACK_URL, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from './data';

const generateAuthParams = (code: string) =>
  new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    redirect_uri: DISCORD_CALLBACK_URL,
    grant_type: 'authorization_code',
    code
  });

interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  error?: string;
}

interface DiscordUserData {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  locale?: string;
  verified?: boolean;
  email?: string | null;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}

export async function getDiscordToken(code: string) {
  const request = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: generateAuthParams(code)
  });
  const data = (await request.json()) as DiscordTokenResponse;

  if (data.error || !data.scope.includes('identify') || !data.scope.includes('email')) {
    throw new Error('Invalid scope or an error ocurred.');
  }

  return data.access_token;
}

export async function getDiscordUserData(token: string) {
  const request = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = (await request.json()) as DiscordUserData;

  return data;
}
