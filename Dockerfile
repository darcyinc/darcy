FROM node:21-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Dependencies
WORKDIR /app
COPY tsconfig.json package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Build
COPY . .

ENV NODE_ENV=production
VOLUME ["/.next/cache"]
RUN pnpm build

# Production
EXPOSE 3001
CMD ["pnpm", "start"]