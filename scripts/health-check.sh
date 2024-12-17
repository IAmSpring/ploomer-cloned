#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
APP_URL=${APP_URL:-"http://localhost:3000"}
DB_HOST=${DB_HOST:-"localhost"}
DB_PORT=${DB_PORT:-"5432"}
REDIS_HOST=${REDIS_HOST:-"localhost"}
REDIS_PORT=${REDIS_PORT:-"6379"}

echo -e "${YELLOW}🔍 Starting health check...${NC}"

# Function to check if Docker is running
check_docker() {
  if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running${NC}"
    echo -e "${YELLOW}🔄 Attempting to start Docker...${NC}"
    if command -v systemctl &> /dev/null; then
      sudo systemctl start docker
    elif command -v service &> /dev/null; then
      sudo service docker start
    else
      echo -e "${RED}❌ Could not start Docker - please start it manually${NC}"
      return 1
    fi
  fi
  echo -e "${GREEN}✅ Docker is running${NC}"
  return 0
}

# Function to check and heal a service
check_and_heal_service() {
  local service_name=$1
  local container_name=$2
  local check_command=$3
  local start_command=$4

  echo -e "${YELLOW}🔍 Checking $service_name...${NC}"
  
  if eval "$check_command"; then
    echo -e "${GREEN}✅ $service_name is running${NC}"
    return 0
  else
    echo -e "${RED}❌ $service_name is not responding${NC}"
    echo -e "${YELLOW}🔄 Attempting to restart $service_name...${NC}"
    
    if docker ps -q -f name=$container_name > /dev/null; then
      docker restart $container_name
    else
      eval "$start_command"
    fi
    
    # Wait for service to be ready
    sleep 5
    if eval "$check_command"; then
      echo -e "${GREEN}✅ $service_name recovered${NC}"
      return 0
    else
      echo -e "${RED}❌ Failed to recover $service_name${NC}"
      return 1
    fi
  fi
}

# Main health check logic
main() {
  local has_error=0

  # Check Docker first
  check_docker || has_error=1

  # Check and heal PostgreSQL
  check_and_heal_service \
    "PostgreSQL" \
    "postgres" \
    "pg_isready -h $DB_HOST -p $DB_PORT" \
    "docker run -d --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p $DB_PORT:5432 postgres:15" \
    || has_error=1

  # Check and heal Redis
  check_and_heal_service \
    "Redis" \
    "redis" \
    "redis-cli -h $REDIS_HOST -p $REDIS_PORT ping" \
    "docker run -d --name redis -p $REDIS_PORT:6379 redis:alpine" \
    || has_error=1

  # Check application health
  echo -e "${YELLOW}🔍 Checking application health...${NC}"
  if curl -s "$APP_URL/api/health" > /dev/null; then
    echo -e "${GREEN}✅ Application is healthy${NC}"
  else
    echo -e "${RED}❌ Application is not responding${NC}"
    echo -e "${YELLOW}🔄 Attempting to restart application...${NC}"
    
    if [ -f "docker-compose.yml" ]; then
      docker-compose restart app
    else
      npm run dev &
    fi
    has_error=1
  fi

  # Run Prisma migrations if needed
  if [ -f "prisma/schema.prisma" ]; then
    echo -e "${YELLOW}🔄 Running database migrations...${NC}"
    npx prisma migrate deploy
  fi

  if [ $has_error -eq 0 ]; then
    echo -e "${GREEN}✅ All services are healthy${NC}"
  else
    echo -e "${RED}⚠️  Some services required healing${NC}"
  fi

  return $has_error
}

# Run the main function
main 