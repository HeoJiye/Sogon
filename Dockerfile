FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

ENV PORT 3000

CMD ["pnpm", "run", "start"]