FROM node:20-slim AS base

ENV NODE_ENV=production

FROM base AS prod

RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json ./
COPY indexer/package.json indexer/

COPY indexer/ ./indexer/
RUN npm install
WORKDIR /app/indexer

FROM base
COPY --from=prod /app /app
WORKDIR /app/indexer
EXPOSE 42069
CMD [ "npm", "run", "start" ]