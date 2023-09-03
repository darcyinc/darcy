# Darcy Social Network

Welcome to Darcy, a beautiful and engaging social network that allows you to connect with friends, share your thoughts, and explore a world of possibilities.

This is the folder for the API of Darcy. The API is built using Node.js and Fastify, and uses PostgreSQL as the database. The API is split into multiple microservices, each of which is contained in its own folder in the `apps` directory.

## Table of Contents

- [Introduction](#darcy-social-network)
- [Getting Started](#getting-started)
- [Setting Up the API](#setting-up-the-api)
- [Environment Variables](#environment-variables)
- [License](#license)

## Getting Started

To kickstart your Darcy API experience, follow these simple steps:

1. **Install Dependencies:** Begin by installing the required dependencies using pnpm: `pnpm install`.

2. **Configure Environment:** Rename `.env.example` to `.env` and populate it with the necessary environment variables.

3. **Build and Start:** Initialize all the microservices with this command: `pnpm build && pnpm start`.

4. **Explore the API:** Open your web browser and go to http://localhost:3001 to access the API. Each microservice can be reached starting from http://localhost:4001.


## Folder Structure

```bash
  .
    ├── apps - Contains the microservices that make up the API.
      ├── shared - Contains code shared between the microservices. This includes the Prisma client, JWT functions, and more.
    ├── prisma - Contains the Prisma schema and migrations.
    ├── scripts - Contains useful scripts for running the API.
    ├── types - Contains TypeScript type definitions.
```

## NPM Scripts

The monorepo comes with the following npm scripts:

- `build`: Compiles the server and all microservices.
- `dev`: Initiates the development server with hot-reloading enabled.
- `start`: Launches the production version of the API, including all microservices.
- `lint`: Ensures codebase formatting adheres to Prettier and ESLint standards.
- `format`: Automatically formats and rectifies codebase issues using Prettier and ESLint.

## License

Darcy and the Darcy API are distributed under the MIT License. For detailed licensing information, please consult the [LICENSE](LICENSE) file.

---

We hope you enjoy using Darcy and have a fantastic experience connecting with others in this wonderful social network. If you encounter any issues or have any questions, feel free to open an issue on our GitHub repository.
