#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}🧹 Starting cleanup process...${NC}"

# Stop all containers
echo -e "${YELLOW}⏹️  Stopping containers...${NC}"
docker compose down

# Remove all containers
echo -e "${YELLOW}🗑️  Removing containers...${NC}"
docker compose rm -f

# Remove volumes if --volumes flag is passed
if [ "$1" == "--volumes" ]; then
    echo -e "${YELLOW}📦 Removing volumes...${NC}"
    docker volume rm postgres_data redis_data ollama_data 2>/dev/null || true
fi

# Clean up unused Docker resources
echo -e "${YELLOW}🧼 Cleaning up unused Docker resources...${NC}"
docker system prune -f

# Remove node_modules and build artifacts
if [ "$1" == "--full" ]; then
    echo -e "${YELLOW}🗑️  Removing node_modules and build artifacts...${NC}"
    rm -rf node_modules .next
    rm -rf prisma/*.db
    rm -rf prisma/migrations/*.sql
fi

echo -e "${GREEN}✨ Cleanup complete!${NC}"