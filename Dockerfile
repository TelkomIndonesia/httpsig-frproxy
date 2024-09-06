# syntax = docker/dockerfile:1.2

FROM node:hydrogen-bookworm-slim AS base
RUN apt-get update && apt-get install -y \
  ca-certificates \
  git \
  && rm -rf /var/lib/apt/lists/*



FROM base AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/src/node_modules \
    npm install \
    && cp -r node_modules node_modules.bak
RUN rm -rf node_modules && mv node_modules.bak node_modules
COPY . .
RUN npm run build 
ENV NODE_EXTRA_CA_CERTS=/src/config/upstream-transport/ca.crt
ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD [ "npm", "run", "server-dev" ]



FROM build AS pruned
RUN npm prune --production



FROM base AS final
WORKDIR /src
COPY --from=pruned /src .
ENV NODE_EXTRA_CA_CERTS=/src/config/upstream-transport/ca.crt \
    NODE_ENV=production
ENTRYPOINT [ "./docker-entrypoint.sh" ]