const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, WEBSITE_URL } = process.env;

if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !WEBSITE_URL) {
  throw new Error('Missing environment variables for Discord OAuth2.');
}

export const DISCORD_CALLBACK_URL = `${WEBSITE_URL}/auth/callback/discord`;
export const DISCORD_AUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_CALLBACK_URL}&response_type=code&scope=identify%20email`;

const generateAuthParams = (code: string) =>
  new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    redirect_uri: DISCORD_CALLBACK_URL,
    grant_type: 'authorization_code',
    code
  });

export interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  error?: string;
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

  console.log(data.scope);

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
  const data = (await request.json()) as Record<string, unknown>;

  return data;
}
