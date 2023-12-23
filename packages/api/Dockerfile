FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run build

FROM base
COPY --from=build /app/node_modules /app/dist
COPY --from=build /app/dist /app/node_modules
EXPOSE 3001-3005
CMD [ "pnpm", "start" ]
