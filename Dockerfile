FROM node:18-alpine

WORKDIR /app

# Install necessary tools including OpenSSL
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    netcat-openbsd \
    openssl \
    openssl-dev

# Copy package files
COPY package*.json ./

# Install dependencies but skip Sentry CLI
ENV SKIP_SENTRY_SETUP=true
ENV DATABASE_URL="postgresql://postgres:postgres@postgres:5432/saas_platform"
RUN npm install --ignore-scripts

# Install ts-node and other dev dependencies
RUN npm install --save-dev \
    ts-node \
    typescript@4.9.5 \
    @types/node

# Install Sentry CLI separately
RUN wget -O /usr/local/bin/sentry-cli https://downloads.sentry-cdn.com/sentry-cli/1.77.3/sentry-cli-Linux-x86_64 \
    && chmod +x /usr/local/bin/sentry-cli

# Copy everything needed for Prisma and types
COPY prisma ./prisma/
RUN rm -rf prisma/migrations/*
COPY types ./types/
COPY tsconfig.json ./
COPY tsconfig.node.json ./

# Copy the rest of the application
COPY . .

# Setup entrypoint script
COPY scripts/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"] 