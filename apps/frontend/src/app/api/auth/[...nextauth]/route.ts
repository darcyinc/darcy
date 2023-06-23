import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID as string,
      clientSecret: process.env.GITHUB_CLIENTSECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID as string,
      clientSecret: process.env.GOOGLE_CLIENTSECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
});

// eslint-disable-next-line import/no-unused-modules
export { handler as GET, handler as POST };
