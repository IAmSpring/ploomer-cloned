# Ploomer Clone - Modern SaaS Platform

A full-featured SaaS platform built with Next.js, Prisma, Docker, and FastAPI.

## 🚀 Features

- **Authentication & Authorization**
  - NextAuth.js integration with multiple providers:
    - Google OAuth
    - LinkedIn OAuth
    - Email Magic Links
  - Role-based access control (RBAC):
    - Super Admin: Full system access with override capabilities
    - Admin: Full management without override abilities
    - User: Basic access with limited permissions
  - Secure session management with environment-aware configurations
  - Domain-based automatic role assignment

- **Database & ORM**
  - PostgreSQL for persistent storage
  - Prisma ORM with automatic migrations
  - Type-safe database operations
  - Role-based data access control
  - SQLAlchemy integration for Python services

- **Caching & Real-time**
  - Redis for caching and Socket.IO
  - Real-time analytics updates
  - Performance optimizations
  - Distributed session management

- **AI Integration**
  - Ollama integration for AI features
  - GPU acceleration support
  - Customizable AI models
  - Transformer models for advanced features
  - Sentence embeddings for semantic search

- **Python Backend Services**
  - FastAPI-based microservices
  - Real-time analytics processing
  - Machine learning pipelines
  - Async task processing
  - Health monitoring system

## 🛠 Role-Based Access Control

### User Roles

1. **Super Admin**
   - Full system access
   - Can override admin actions
   - Access to all data and configurations
   - System-wide management capabilities
   - ML model management

2. **Admin**
   - User management
   - Analytics access
   - Report management
   - Subscription management
   - Settings configuration
   - Data pipeline monitoring

3. **User**
   - Basic platform access
   - Report creation
   - Report sharing
   - Analytics viewing
   - Personal dashboard customization

### Permissions System

```typescript
Permissions include:
- canManageUsers
- canManageRoles
- canViewAnalytics
- canEditSettings
- canCreateReports
- canDeleteReports
- canShareReports
- canOverrideAdmin
- canAccessAllData
- canManageSubscriptions
- canConfigureSystem
- canManageMLModels
- canViewMetrics
```

### Access Levels

- **FULL**: Super admin access
- **ADMIN**: Administrative access
- **BASIC**: Regular user access

### Development Users

Automatic creation of development users:
- `superadmin@dev.local`: Super Admin access
- `admin@dev.local`: Admin access
- `user@dev.local`: Regular user access

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TailwindCSS, TypeScript
- **Backend**: 
  - Node.js, Prisma, PostgreSQL
  - FastAPI, SQLAlchemy, Pydantic
- **Caching**: Redis
- **AI**: 
  - Ollama
  - PyTorch
  - Transformers
  - Sentence Transformers
- **DevOps**: Docker, Docker Compose
- **Testing**: Jest, Pytest

## 📦 Local Development

### Quick Start
```bash
# Clone and setup
git clone https://github.com/yourusername/ploomer-clone.git
cd ploomer-clone

# Start development environment (includes all services)
docker-compose up --build

# Access the services:
# - Main Application: http://localhost:3000
# - FastAPI Backend: http://localhost:8000/docs
# - Streamlit Dashboard: http://localhost:3000/dashboard
```

### Development Environment Features

- **Integrated Development Experience**
  - All services run within Docker containers
  - Streamlit dashboard integrated into main application
  - Hot-reloading enabled for all services
  - Automatic database seeding with unique data
  - Built-in health checks and self-healing

- **Database Management**
  ```bash
  # Database operations are handled automatically, but can be run manually:
  npm run prisma:migrate  # Run migrations
  npm run prisma:generate # Generate client
  npm run prisma:seed     # Seed development data
  ```

- **Development Users (Auto-created)**
  - Super Admin: `superadmin@dev.local`
  - Admin: `admin@dev.local`
  - User: `user@dev.local`
  - Password (all users): `devpassword123`

### Self-Healing Development Environment

The platform includes automatic health checks and self-healing capabilities:

1. **Health Monitoring**
   ```bash
   # One-time health check
   npm run health
   
   # Continuous monitoring
   npm run health:watch
   ```

2. **Monitored Services**
   - Next.js Application (localhost:3000)
   - FastAPI Backend (localhost:8000)
   - Streamlit Dashboard (localhost:8501)
   - PostgreSQL database
   - Redis cache
   - Docker daemon
   - Prisma migrations
   - ML model services

3. **Auto-Recovery Actions**
   ```bash
   ✓ Docker daemon check and start
   ✓ PostgreSQL container recovery
   ✓ Redis container recovery
   ✓ Application restart if needed
   ✓ Database migration verification
   ✓ Python service health checks
   ```

### Development Commands
```bash
# Main Development Command
docker-compose up --build  # Starts all services with fresh build

# Other Development Commands
npm run docker:dev    # Start all services
npm run docker:down   # Clean up containers
npm run health:watch  # Monitor service health
```

### Local Environment Configuration
```env
# Application
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=saas_platform

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Python Services
PYTHON_API_PORT=8000
STREAMLIT_PORT=8501

# NextAuth
NEXTAUTH_URL=http://localhost:3000
```

## 🐳 Docker Configuration

The application uses Docker Compose with the following integrated services:

- **Main Application (port 3000)**
  - Next.js frontend
  - Integrated Streamlit dashboard
  - API routes
  - Authentication system
  - Health monitoring

- **Python Services**
  - FastAPI backend (integrated)
  - Streamlit analytics (integrated)
  - Machine learning pipelines
  - Real-time data processing

- **Supporting Services**
  - PostgreSQL database
  - Redis cache
  - Ollama AI service

### Environment Variables

Required environment variables:
```env
# Core Configuration
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}?schema=public"
REDIS_URL="redis://redis:6379"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-do-not-use-in-production"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Analytics Services
NEXT_PUBLIC_GA_TRACKING_ID=""  # Google Analytics
NEXT_PUBLIC_POSTHOG_API_KEY="phc_dev_123456789"  # PostHog
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
NEXT_PUBLIC_DATADOG_APPLICATION_ID="dev-app-id"  # Datadog
NEXT_PUBLIC_DATADOG_CLIENT_TOKEN="dev-client-token"
NEXT_PUBLIC_DATADOG_SITE="datadoghq.com"
NEXT_PUBLIC_SENTRY_DSN="https://dev-sentry-dsn.ingest.sentry.io/"  # Sentry

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""

# Stripe Integration
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_123456789"
STRIPE_WEBHOOK_SECRET=""

# Application Settings
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"

# AI Services
NEXT_PUBLIC_OPENAI_API_KEY="sk-dev-123456789"
NEXT_PUBLIC_OLLAMA_URL="http://ollama:11434"

# Database Configuration
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="saas_platform"
```

### Docker Volumes

```yaml
volumes:
  postgres_data: # Database persistence
  redis_data:    # Cache persistence
  ollama_data:   # AI model storage
  python_packages: # Python dependencies
```

## 🚨 Health Checks

The platform includes comprehensive health monitoring:

1. **Service Monitoring**
   - Next.js application health
   - FastAPI service status
   - Streamlit dashboard
   - Database connectivity
   - Redis availability
   - Docker daemon status
   - ML model service status

2. **Auto-Recovery Features**
   - Service restart on failure
   - Container recreation if missing
   - Database migration verification
   - Application restart if needed
   - Python service recovery

3. **Notification System**
   - Console output with color coding
   - Error reporting
   - Recovery status updates
   - Service state logging

## 🔧 Troubleshooting

Common development issues and solutions:

1. **Docker Build Issues**
   ```bash
   # Clean Docker cache and rebuild
   docker builder prune -f
   docker compose build --no-cache
   
   # If Husky fails during build
   npm set-script prepare ""  # Temporarily disable husky
   docker compose build
   npm set-script prepare "husky install"  # Re-enable after build
   ```

2. **Dependency Issues**
   ```bash
   # Update Node.js dependencies
   npm install -g npm@latest
   npm install
   
   # Update Python dependencies
   pip install -r requirements.api.txt --upgrade
   ```

3. **Docker Issues**
   ```bash
   # Restart Docker daemon
   sudo systemctl restart docker
   
   # Clean up Docker resources
   docker compose down -v
   docker system prune -f
   ```

4. **Database Issues**
   ```bash
   # Reset database
   npm run prisma:migrate reset
   
   # Regenerate Prisma client
   npm run prisma:generate
   ```

5. **Python Service Issues**
   ```bash
   # Rebuild Python services
   docker compose build python-api streamlit
   
   # Check Python logs
   docker compose logs python-api
   ```

6. **Application Issues**
   ```bash
   # Clean build cache
   npm run clean
   rm -rf .next
   
   # Rebuild application
   npm ci
   npm run build
   ```

## 📚 Documentation

For more detailed documentation:
- [API Documentation](docs/api.md)
- [Development Guide](docs/development.md)
- [Deployment Guide](docs/deployment.md)
- [Python Services](docs/python-services.md)
- [ML Pipeline](docs/ml-pipeline.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.