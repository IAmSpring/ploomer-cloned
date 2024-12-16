#!/bin/sh

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

echo "🟢 Services are ready!"

# Run database migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy

# Run seed data if needed
if [ "$NODE_ENV" = "development" ]; then
  echo "🌱 Seeding database..."
  npx prisma db seed
fi

# Start the application
exec "$@" 