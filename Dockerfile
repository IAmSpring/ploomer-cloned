FROM node:18-alpine

WORKDIR /app

# Install system dependencies including bcrypt requirements and OpenSSL
RUN apk add --no-cache \
    curl \
    python3 \
    make \
    g++ \
    git \
    python3-dev \
    build-base \
    openssl \
    openssl-dev \
    netcat-openbsd \
    bash

# Copy package files first (for better caching)
COPY package.json package-lock.json ./

# Disable Husky and install dependencies
ENV HUSKY=0
ENV HUSKY_SKIP_INSTALL=1
ENV DISABLE_HUSKY=1
ENV NODE_ENV=development

# Install dependencies
RUN npm pkg delete scripts.prepare && \
    npm install --legacy-peer-deps --no-optional && \
    npm install -g prisma && \
    npm cache clean --force

# Copy TypeScript configuration and type definitions
COPY tsconfig.json ./
COPY types ./types/

# Copy prisma schema and environment files first
COPY prisma ./prisma/
COPY .env .env.development ./

# Generate Prisma client
RUN npx prisma generate

# Copy scripts directory first
COPY scripts ./scripts/

# Make entrypoint script executable
RUN chmod +x ./scripts/docker-entrypoint.sh

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Use the entrypoint script
ENTRYPOINT ["/bin/bash", "./scripts/docker-entrypoint.sh"]

# Start command that handles all initialization
CMD ["npm", "run", "dev"]