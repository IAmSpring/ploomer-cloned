#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🚀 Setting up development environment...${NC}"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating .env file from .env.development...${NC}"
    cp .env.development .env
fi

# Ensure development environment
echo -e "${YELLOW}🔧 Ensuring development environment...${NC}"
export NODE_ENV=development

# Clean up any existing containers and volumes
echo -e "${YELLOW}🧹 Cleaning up existing containers and volumes...${NC}"
docker-compose down -v

# Start the development environment
echo -e "${YELLOW}🐳 Starting development environment...${NC}"
docker-compose -f docker-compose.dev.yml up -d

echo -e "${GREEN}✨ Development environment is ready!${NC}"
echo -e "You can now access:"
echo -e "- Next.js App: ${YELLOW}http://localhost:3000${NC}"
echo -e "- FastAPI: ${YELLOW}http://localhost:8000${NC}"
echo -e "- Streamlit: ${YELLOW}http://localhost:8501${NC}" 