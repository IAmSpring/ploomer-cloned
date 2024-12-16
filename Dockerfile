FROM node:18-alpine

WORKDIR /app

# Install necessary tools
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    netcat-openbsd

# Copy package files
COPY package*.json ./

# Install dependencies with clean slate
RUN npm ci

# Copy prisma files first to optimize layer caching
COPY prisma ./prisma/

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Setup entrypoint script
COPY scripts/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"] 