#!/bin/bash

set -e  # Exit on error

echo "🚀 Starting deployment script..."

# Function to wait for a service
wait_for_service() {
    local host=$1
    local port=$2
    local service=$3
    local max_retries=30
    local retry_count=0
    
    echo "🟡 Waiting for $service to start..."
    until nc -z $host $port || [ $retry_count -eq $max_retries ]; do
        echo "⏳ Waiting for $service connection (attempt $((retry_count + 1))/$max_retries)..."
        sleep 2
        retry_count=$((retry_count + 1))
    done

    if [ $retry_count -eq $max_retries ]; then
        echo "❌ Failed to connect to $service after $max_retries attempts"
        exit 1
    fi

    echo "✅ Connected to $service ($host:$port)"
}

# Function to handle Prisma setup
setup_prisma() {
    echo "📦 Setting up Prisma..."
    
    echo "🔄 Cleaning up any existing Prisma artifacts..."
    rm -rf node_modules/.prisma
    rm -rf node_modules/@prisma/client

    echo "🔄 Installing Prisma dependencies..."
    npm install @prisma/client

    echo "🔄 Generating Prisma client..."
    npx prisma generate

    echo "🔄 Waiting for database to be ready..."
    npx prisma db push --skip-generate

    echo "🔄 Running database migrations..."
    npx prisma migrate deploy

    if [ "$NODE_ENV" = "development" ]; then
        echo "🌱 Seeding development database..."
        npx prisma db seed
        
        echo "👤 Creating development users..."
        npx ts-node scripts/create-dev-users.ts
    fi

    echo "✅ Prisma setup complete!"
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
    echo "ℹ️  Analytics and external services are mocked in development"
    npm run dev
fi