FROM node:19-bullseye-slim as builder

WORKDIR /build

COPY ./ ./

RUN npm ci

RUN npm run build

FROM node:19-bullseye-slim as target

WORKDIR /app

COPY --from=builder /build/package* /app/
COPY --from=builder /build/dist/frontend /app/frontend
COPY --from=builder /build/dist/server /app/server

RUN npm ci --omit=dev

CMD ["node", "/app/server/index.js"]