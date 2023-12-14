# Darcy Social Network

Welcome to Darcy, an elegant and engaging social network that empowers you to connect with friends, express your thoughts, and discover endless possibilities.

This repository serves as a monorepo encompassing all the essential components required to run Darcy, including the frontend, API, API wrapper, and more.

## Table of Contents

- [Introduction](#darcy-social-network)
- [Getting Started](#getting-started)
- [Setting Up the API](#setting-up-the-api)
- [NPM Scripts](#npm-scripts)
- [License](#license)

## Getting Started

To embark on your Darcy journey, follow these simple steps:

1. Clone this repository to your local machine: `git clone https://github.com/davipatricio/darcy.git`
2. Navigate to the project directory: `cd darcy`
3. Install the dependencies using pnpm: `pnpm install`
4. Launch the development front-end and API in dev mode: `pnpm dev`
5. Access the website by opening http://localhost:3000 in your web browser. The API will be running on http://localhost:3001, while microservices will be accessible from http://localhost:4001 onwards.

## Setting Up the API

For detailed instructions on configuring and setting up the API, please refer to the [API README](packages/api/README.md).

## NPM Scripts

The monorepo comes with the following npm scripts:


- `build`: Compiles all the packages in the monorepo.
- `dev`: Initiates the development server with hot-reloading enabled.
- `start`: Launches the production version of the API, including all microservices.
- `lint`: Ensures codebase formatting adheres to the Biome standards.
- `format`: Automatically formats and rectifies codebase issues using Biome.

## License

Darcy is distributed under the MIT License. For complete details, please consult the [LICENSE](LICENSE) file.

---

We hope you enjoy using Darcy and have a fantastic experience connecting with others in this wonderful social network. If you encounter any issues or have any questions, feel free to open an issue on our GitHub repository.
