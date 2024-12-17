#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}🚀 Starting development environment...${NC}"

# Check if .env exists, if not create it
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating .env file...${NC}"
    cp .env.example .env
fi

# Generate NEXTAUTH_SECRET if not exists
if ! grep -q "NEXTAUTH_SECRET" .env; then
    echo -e "${YELLOW}🔑 Generating NEXTAUTH_SECRET...${NC}"
    echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)" >> .env
fi

# Build containers if needed
if [ "$1" == "--build" ]; then
    echo -e "${YELLOW}🏗️  Building containers...${NC}"
    docker compose build
fi

# Start services
echo -e "${YELLOW}🐳 Starting Docker services...${NC}"
docker compose up -d

# Watch container logs
echo -e "${GREEN}✨ Environment is starting up!${NC}"
echo -e "${YELLOW}📊 Watching container logs...${NC}"
docker compose logs -f 