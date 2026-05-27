FROM node:24-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs20-debian12:nonroot
WORKDIR /app

COPY --from=deps /app .

EXPOSE 3001

USER nonroot:nonroot

CMD ["index.js"]
