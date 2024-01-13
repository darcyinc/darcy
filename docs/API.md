# The Darcy API documentation

The API is built using Node.js and Fastify, and uses PostgreSQL as the database. The API is split into multiple microservices (which uses the API Gateway design pattern), each of which is contained in its own folder in the `packages/api/apps` directory.

## Front-end

### Authentication

To authenticate with the API, the user must go to `localhost:3000/auth`, choose an OAuth service. After choosing a service, the user will be redirected to the OAuth service's website to authenticate. After authenticating, the user will be redirected back to `localhost:3000/auth/callback/:service` (where service can be: `discord`, `google` or `github`), which the front-end will make a request to the Darcy API `localhost:3001/auth/:service/callback?code=:code` (where service can be: `discord`, `google` or `github` and code is the code returned by the OAuth service). The API will then return a JWT token `{ "token": "..." }`, which the front-end will store in the browser's local storage.

## Endpoints

### Users

#### GET `/users/:handle`

Returns a user's profile information. The `handle` parameter should not include the `@` symbol.

If the user is not found, a 404 error will be returned.

**Example Response:**

```json
{
  "displayName": "John Doe",
  "handle": "johndoe",
  "bio": "I'm a software engineer.",
  "private": false,
  "avatarUrl": "",
  "bannerUrl": "",
  "createdAt": "2021-01-01T00:00:00.000Z",
  "updatedAt": "2021-01-01T00:00:00.000Z",
  "postCount": 0,
  "followerCount": 0,
  "followingCount": 0
}
```

### Authentication

#### POST `/auth/:service/callback`

Handles the callback from an OAuth service. The `service` parameter should be one of `github`, `discord`, or `google`.

The request body should contain the following fields:

- `code`: The code returned by the OAuth service.

If the oauth authentication is successful, a token will be returned in the response body. This token should be used in the `Authorization` header.

**Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Posts

#### POST `/post`

Creates a new post. The request body should contain the following fields:

- `content`: The content of the post.
- `postId`?: The ID of the post to reply to. If this field is present, the post will be a reply to the post with the given ID.

If the post is created successfully, the post will be returned in the response body.