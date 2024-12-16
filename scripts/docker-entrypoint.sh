#!/bin/sh
set -e

echo "🚀 Starting deployment script..."

# Wait for PostgreSQL
until nc -z postgres 5432; do
  echo "🟡 Waiting for PostgreSQL to start..."
  sleep 1
done

# Wait for Redis
until nc -z redis 6379; do
  echo "🟡 Waiting for Redis to start..."
  sleep 1
done

echo "🟢 All services are ready!"

# Setup database
echo "📦 Setting up database..."
npx prisma migrate deploy
if [ "$NODE_ENV" = "development" ]; then
  echo "🌱 Seeding database with sample data..."
  npx prisma db seed
fi

# Generate Prisma Client
echo "⚙️ Generating Prisma Client..."
npx prisma generate

# Start the application
echo "🚀 Starting Next.js..."
exec "$@" 