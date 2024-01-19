export const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, WEBSITE_URL } = process.env as Record<string, string>;

if (typeof window === 'undefined') {
  const isCI = require('is-ci');
  if (!isCI && (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !WEBSITE_URL)) {
    throw new Error('Missing environment variables for Discord OAuth2.');
  }
}

export const DISCORD_CALLBACK_URL = `${WEBSITE_URL}/auth/callback/discord`;
export const DISCORD_AUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_CALLBACK_URL}&response_type=code&scope=identify%20email`;
