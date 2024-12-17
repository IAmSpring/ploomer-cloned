FROM node:18-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    netcat-openbsd \
    curl \
    bash \
    coreutils \
    python3 \
    build-base \
    g++

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Make the entrypoint script executable
RUN chmod +x scripts/docker-entrypoint.sh

# Set environment variables
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true
ENV PATH /app/node_modules/.bin:$PATH

# Set the entrypoint
ENTRYPOINT ["scripts/docker-entrypoint.sh"]