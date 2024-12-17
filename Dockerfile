FROM node:18-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    netcat-openbsd \
    curl \
    bash \
    coreutils

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Make the entrypoint script executable
RUN chmod +x scripts/docker-entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["scripts/docker-entrypoint.sh"]