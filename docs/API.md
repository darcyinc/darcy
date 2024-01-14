# The Darcy API documentation

The API is built using Next.js [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and uses PostgreSQL as the database.

## Front-end

### Authentication

To authenticate with the API, the user must go to `localhost:3000/auth`, choose an OAuth service. After choosing a service, the user will be redirected to the OAuth service's website to authenticate. After authenticating, the user will be redirected back to `localhost:3000/auth/callback/:service` (where service can be: `discord`, `google` or `github`), which the front-end will make a request to the Darcy's API `localhost:3000/api/auth/:service/callback?code=:code` (where service can be: `discord`, `google` or `github` and code is the code returned by the OAuth service). The API will then return a JWT token `{ "token": "..." }`, which the front-end will store in the browser's local storage.

## Endpoints

The API base URL is `localhost:3000/api`.

### API Errors

If an error occurs, the API will return a JSON object with the following fields and the appropriate HTTP status code:

- `error`: The code of the error to be translated by the front-end. (e.g. `user_not_found`)

### Users

#### GET `/users/:handle`

Returns a user's profile information. The `handle` parameter should not include the `@` symbol. To get the currently authenticated user's profile, use `@me` as the `handle` parameter.

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

#### GET `/users/:handle/posts`

Returns a user's posts. The `handle` parameter should not include the `@` symbol. To get the currently authenticated user's posts, use `@me` as the `handle` parameter.

Can have the following search parameters:
- `page`: The page of posts to return. Defaults to 1. Should be a number greater than 0.
- `limit`: The maximum number of posts to return. Defaults to 50. Should be a number between 1 and 50.

**Example Response:**

```json
[
  {
    "id": "clrcswoys00001o087o82kff6",
    "authorId": "clrcqqjxu0000ifudofglmmhk",
    "content": "Hello world!",
    "mediaUrls": [],
    "createdAt": "2024-01-14T01:11:57.796Z",
    "updatedAt": "2024-01-14T01:11:42.952Z",
    "parentId": null,
    "likeCount": 0,
    "repostCount": 0,
    "commentCount": 0
  }
]
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

#### GET `/popular-posts`

Gets the most popular posts from the last week. Mostly used for the home page when the user is not logged in. Can have the following search parameters:
- `page`: The page of posts to return. Defaults to 1. Should be a number greater than 0.
- `limit`: The maximum number of posts to return. Defaults to 50. Should be a number between 1 and 50.

**Example Response:**

```json
[
  {
    "id": "clrcswoys00001o087o82kff6",
    "authorId": "clrcqqjxu0000ifudofglmmhk",
    "content": "Hello world!",
    "mediaUrls": [],
    "createdAt": "2024-01-14T01:11:57.796Z",
    "updatedAt": "2024-01-14T01:11:42.952Z",
    "parentId": null,
    "likeCount": 0,
    "repostCount": 0,
    "commentCount": 0
  }
]
```

#### POST `/post`

Creates a new post. The request body should contain the following fields:

- `content`: The content of the post.
- `postId`?: The ID of the post to reply to. If this field is present, the post will be a reply to the post with the given ID.

If the post is created successfully, the post will be returned in the response body.
