#!/bin/bash

set -e  # Exit on error

echo "🚀 Starting deployment script..."

# Function to wait for a service
wait_for_service() {
    local host=$1
    local port=$2
    local service=$3
    
    echo "🟡 Waiting for $service to start..."
    until nc -z $host $port; do
        echo "⏳ Waiting for $service connection..."
        sleep 2
    done
    echo "✅ Connected to $service ($host:$port)"
}

# Function to handle Prisma setup
setup_prisma() {
    echo "📦 Setting up Prisma..."
    
    # Check if Prisma client is stale by comparing schema modification time with client generation time
    SCHEMA_MTIME=$(stat -c %Y prisma/schema.prisma 2>/dev/null || stat -f %m prisma/schema.prisma)
    CLIENT_MTIME=$(stat -c %Y node_modules/.prisma/client/index.js 2>/dev/null || stat -f %m node_modules/.prisma/client/index.js 2>/dev/null || echo 0)
    
    if [ $SCHEMA_MTIME -gt $CLIENT_MTIME ]; then
        echo "🔄 Schema changes detected, regenerating Prisma client..."
        npx prisma generate
    else
        echo "✅ Prisma client is up to date"
    fi
    
    echo "🔄 Running database migrations..."
    npx prisma migrate deploy
    
    if [ "$NODE_ENV" != "production" ]; then
        echo "🌱 Seeding database with initial data..."
        npx prisma db seed
    fi
}

# Wait for required services
wait_for_service postgres 5432 "PostgreSQL"
wait_for_service redis 6379 "Redis"

echo "🟢 All services are ready!"

# Setup Prisma and database
setup_prisma

# Start the application based on NODE_ENV
if [ "$NODE_ENV" = "production" ]; then
    echo "🚀 Starting in production mode..."
    npm run start
else
    echo "🚀 Starting in development mode..."
    npm run dev
fi