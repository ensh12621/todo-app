FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


# 런너 스테이지
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# 1. standalone 전체 복사 (.next/standalone 안에는 서버 실행에 필요한 최소한의 node_modules와 server.js가 들어있습니다)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# 2. static 파일 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 만약 서버 액션이나 빌드Manifest 파일이 누락되는 경우를 대비해 .next/server 폴더가 standalone 경로 내부에 정확히 위치하는지 확인해야 합니다.

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
