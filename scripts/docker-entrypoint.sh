#!/bin/sh
set -e

echo "🚀 Starting deployment script..."

# Wait for PostgreSQL with timeout
timeout=30
counter=0
echo "🟡 Waiting for PostgreSQL to start..."
until nc -z postgres 5432 || [ $counter -eq $timeout ]; do
  counter=$((counter+1))
  sleep 1
done

if [ $counter -eq $timeout ]; then
  echo "❌ Failed to connect to PostgreSQL within $timeout seconds"
  exit 1
fi

# Wait for Redis with timeout
counter=0
echo "🟡 Waiting for Redis to start..."
until nc -z redis 6379 || [ $counter -eq $timeout ]; do
  counter=$((counter+1))
  sleep 1
done

if [ $counter -eq $timeout ]; then
  echo "❌ Failed to connect to Redis within $timeout seconds"
  exit 1
fi

echo "🟢 All services are ready!"

# Setup database and generate types
echo "📦 Setting up database and generating types..."

# Generate Prisma Client
echo "⚙️ Generating Prisma Client..."
npx prisma generate

# Run migrations
echo "🔄 Running database migrations..."
# Reset the database in development
if [ "$NODE_ENV" = "development" ]; then
  echo "🗑️ Resetting database..."
  npx prisma migrate dev --name init
else
  npx prisma migrate deploy
fi

if [ "$NODE_ENV" = "development" ]; then
  echo "🌱 Seeding database with sample data..."
  npx prisma db seed
fi

# Start the application
echo "🚀 Starting Next.js..."
exec "$@" 