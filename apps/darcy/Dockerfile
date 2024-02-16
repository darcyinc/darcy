FROM node:21-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Dependencies
COPY tsconfig.json /app/tsconfig.json
COPY /apps/darcy/package.json /app/apps/darcy/package.json

WORKDIR /app/apps/darcy

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Build
COPY /apps/darcy .
RUN pnpm prisma generate

ENV NODE_ENV=production
RUN pnpm build

# Production
EXPOSE 3000
CMD ["pnpm", "start"]