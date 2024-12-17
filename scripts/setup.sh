#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to show step progress
show_step() {
    echo -e "\n${BLUE}🔄 Step $1/${TOTAL_STEPS}: $2${NC}"
}

# Function to show success message
show_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to show warning message
show_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Total number of setup steps
TOTAL_STEPS=4

echo -e "${BLUE}🚀 Starting Ploomer Clone Development Setup${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Step 1: Check Docker
show_step 1 "Checking Docker status"
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi
show_success "Docker is running"

# Step 2: Environment setup
show_step 2 "Setting up environment"
if [ ! -f .env ]; then
    echo -e "${BLUE}📝 Creating .env file from template...${NC}"
    cp .env.example .env
    show_success "Created .env file"
else
    show_warning "Using existing .env file"
fi

# Step 3: Cleanup
show_step 3 "Cleaning up existing containers"
echo -e "${BLUE}🧹 Removing old containers and volumes...${NC}"
npm run docker:down
show_success "Cleanup complete"

# Step 4: Build and start
show_step 4 "Building and starting services"
echo -e "${BLUE}🏗️  Building containers...${NC}"
npm run docker:dev:build

# Final status
echo -e "\n${GREEN}✨ Setup Complete! ✨${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}📝 Development Users:${NC}"
echo -e "  • Super Admin: ${BLUE}superadmin@dev.local${NC}"
echo -e "  • Admin: ${BLUE}admin@dev.local${NC}"
echo -e "  • User: ${BLUE}user@dev.local${NC}"
echo -e "  • Password: ${BLUE}devpassword123${NC}"

echo -e "\n${GREEN}🌐 Access Points:${NC}"
echo -e "  • Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "  • API Docs: ${BLUE}http://localhost:8000/docs${NC}"
echo -e "  • Streamlit: ${BLUE}http://localhost:8501${NC}"

echo -e "\n${YELLOW}💡 Tip: Run 'npm run health:watch' in another terminal to monitor service health${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}" 