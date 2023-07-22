# Darcy Social Network

Welcome to Darcy, a beautiful and engaging social network that allows you to connect with friends, share your thoughts, and explore a world of possibilities.

This repository is a monorepo containing all the necessary components to run Darcy, including the frontend, API, API wrapper, and more. 


## Table of Contents

- [Introduction](#darcy-social-network)
- [Getting Started](#getting-started)
- [Setting Up the API](#setting-up-the-api)
- [Environment Variables](#environment-variables)
- [License](#license)

## Getting Started

To get started with Darcy, follow these steps:

1. Clone this repository to your local machine: `git clone https://github.com/davipatricio/darcy.git`
2. Navigate to the project directory: `cd darcy`
3. Install the dependencies using pnpm: `pnpm install`
4. Start the development front-end and API in dev mode: `npm run dev`
5. Open http://localhost:3000 in your browser to view the website. The API will be running on http://localhost:3001.

## Setting Up the API
The Darcy API, built with Fastify and TypeScript, is located in the `packages/api` directory. Before using the API, you need to set up the required environment variables. Create a .env file in the packages/api directory and fill in the values.

## NPM Scripts
Darcy comes with the following npm scripts:

`build`: Builds the frontend, API and API Wrapper.
`start`: Starts the production version of the website and API. You **must run build** before running this script.
`dev`: Starts the development server with hot-reloading enabled.
`lint`: Lints the codebase using ESLint and Prettier.

## License
Darcy is released under the MIT License. For more details, see the LICENSE file.

---

We hope you enjoy using Darcy and have a fantastic experience connecting with others in this wonderful social network. If you encounter any issues or have any questions, feel free to open an issue on our GitHub repository. Happy networking!