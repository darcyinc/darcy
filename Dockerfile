FROM node:21-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build

FROM base
RUN ls
COPY --from=prod-deps . /app
COPY --from=build . /app
EXPOSE 4000
CMD ["pnpm start"]