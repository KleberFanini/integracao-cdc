FROM node:20-slim AS builder
WORKDIR /app

# Instala dependências do sistema (se precisar)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates openssl \
    && rm -rf /var/lib/apt/lists/*

# Copia arquivos de dependência
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# Copia o resto do código e faz build
COPY . .
RUN npm run build

# Etapa de runtime (leve)
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copia os arquivos do build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]