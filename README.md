# Modern SaaS Analytics Platform

A modern, full-stack SaaS analytics platform built with Next.js 14, featuring real-time analytics, customizable dashboards, and team collaboration.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Git

### One-Command Setup
```bash
# Clone the repository
git clone https://github.com/IAmSpring/ploomer-cloned.git
cd ploomer-cloned

# Start the application
docker-compose up
```

That's it! The setup script will automatically:
1. 🐳 Start all Docker containers (PostgreSQL, Redis, Next.js)
2. 📦 Run database migrations
3. 🌱 Seed the database with sample data
4. 🚀 Start the development server

### Access the Application
- **Dashboard**: http://localhost:3000/dashboard
- **Demo Account**:
  ```
  Email: demo@example.com
  Password: demo123
  ```

### Docker Services
```yaml
services:
  # PostgreSQL Database (port 5432)
  postgres:
    - Sample data auto-seeding
    - Persistent storage
    - Automatic migrations

  # Redis Cache (port 6379)
    - Real-time analytics
    - Socket.IO adapter
    - Performance caching

  # Next.js Application (port 3000)
    - Hot-reload development
    - API routes
    - SSR/Static Generation
```

### Development Commands
```bash
# Start all services
docker-compose up

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Reset everything (including database)
docker-compose down -v
docker-compose up
```

[Rest of README remains the same with Project Structure, Features, etc.]