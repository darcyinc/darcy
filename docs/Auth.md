# The Darcy API documentation

The API is built using Next.js [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and uses PostgreSQL as the database.

## Authentication process

To authenticate with the API, the user must go to `localhost:3000/auth`, choose an OAuth service. After choosing a service, the user will be redirected to the OAuth service's website to authenticate. After authenticating, the user will be redirected back to `localhost:3000/auth/callback/:service` (where service can be: `discord`, `google` or `github`), which the front-end will make a request to the Darcy's API `localhost:3000/api/auth/:service/callback?code=:code` (where service can be: `discord`, `google` or `github` and code is the code returned by the OAuth service). The API will then return a JWT token `{ "token": "..." }`, which the front-end will store in the browser's local storage.
