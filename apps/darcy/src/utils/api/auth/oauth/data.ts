export const DISCORD_CALLBACK_URL = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/auth/callback/discord`;
export const DISCORD_AUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_CALLBACK_URL}&response_type=code&scope=identify%20email`;
