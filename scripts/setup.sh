#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Setting up development environment...${NC}"

# Check if .env exists, if not create it
if [ ! -f .env ]; then
    echo -e "${BLUE}📝 Creating .env file...${NC}"
    cp .env.example .env
fi

# Generate random keys for services
echo -e "${BLUE}🔑 Generating secure keys...${NC}"
NEXTAUTH_SECRET=$(openssl rand -base64 32)
sed -i '' "s/NEXTAUTH_SECRET=.*/NEXTAUTH_SECRET=$NEXTAUTH_SECRET/" .env

# Start Docker services
echo -e "${BLUE}🐳 Starting Docker services...${NC}"
docker-compose up -d

# Wait for PostgreSQL to be ready
echo -e "${BLUE}⏳ Waiting for PostgreSQL...${NC}"
until docker-compose exec -T postgres pg_isready; do
    sleep 1
done

# Run database migrations and seed data
echo -e "${BLUE}🌱 Setting up database...${NC}"
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npx prisma db seed

echo -e "${GREEN}✅ Development environment is ready!${NC}"
echo -e "${GREEN}📊 Analytics dashboard: http://localhost:3000/dashboard${NC}" 