#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting initialization sequence...${NC}"

# Function to wait for a service
wait_for_service() {
    local host=$1
    local port=$2
    local service=$3
    local max_retries=30
    local retry_count=0
    
    echo -e "${YELLOW}🟡 Waiting for $service to start...${NC}"
    until nc -z $host $port || [ $retry_count -eq $max_retries ]; do
        echo -e "${BLUE}⏳ Waiting for $service connection (attempt $((retry_count + 1))/$max_retries)...${NC}"
        sleep 2
        retry_count=$((retry_count + 1))
    done

    if [ $retry_count -eq $max_retries ]; then
        echo -e "${RED}❌ Failed to connect to $service after $max_retries attempts${NC}"
        exit 1
    fi

    echo -e "${GREEN}✅ Connected to $service ($host:$port)${NC}"
}

# Function to handle Prisma setup
setup_prisma() {
    echo -e "${BLUE}📦 Setting up Prisma...${NC}"
    
    echo -e "${BLUE}🔄 Cleaning up any existing Prisma artifacts...${NC}"
    rm -rf node_modules/.prisma
    rm -rf node_modules/@prisma/client

    echo -e "${BLUE}🔄 Installing Prisma dependencies...${NC}"
    npm install @prisma/client

    echo -e "${BLUE}🔄 Generating Prisma client...${NC}"
    npx prisma generate

    echo -e "${BLUE}🔄 Running database migrations...${NC}"
    npx prisma migrate deploy

    if [ "$NODE_ENV" = "development" ]; then
        echo -e "${BLUE}🌱 Seeding development database...${NC}"
        npx prisma db seed
        echo -e "${GREEN}✅ Database seeded with development data${NC}"
    fi

    echo -e "${GREEN}✅ Prisma setup complete!${NC}"
}

# Wait for required services
wait_for_service postgres 5432 "PostgreSQL"
wait_for_service redis 6379 "Redis"

echo -e "${GREEN}🟢 All services are ready!${NC}"

# Setup Prisma and database
setup_prisma

# Start the application based on NODE_ENV
if [ "$NODE_ENV" = "production" ]; then
    echo -e "${BLUE}🚀 Starting in production mode...${NC}"
    exec "$@"
else
    echo -e "${BLUE}🚀 Starting in development mode...${NC}"
    echo -e "${BLUE}ℹ️  Analytics and external services are mocked in development${NC}"
    
    # Start the application with the passed command
    echo -e "${GREEN}✨ Initialization complete - starting application${NC}"
    exec "$@"
fi