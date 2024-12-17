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
cp .env.example .env

# Start development environment
npm run docker:dev   # Starts all services
npm run health:watch # In another terminal, for health monitoring
```

The application will be available at:
- Next.js Frontend: http://localhost:3000
- FastAPI Backend: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Streamlit Dashboard: http://localhost:8501

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
# Docker Operations
npm run docker:dev    # Start all services
npm run docker:build  # Rebuild containers
npm run docker:down   # Clean up

# Database Operations
npm run prisma:migrate  # Run migrations
npm run prisma:generate # Generate client
npm run prisma:seed     # Seed data

# Development Tools
npm run format      # Format code
npm run lint       # Check linting
npm run lint:fix   # Fix linting issues
npm run type-check # Check types

# Python Services
npm run python:test    # Run Python tests
npm run python:lint    # Lint Python code
npm run python:format  # Format Python code
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

The application uses Docker Compose with the following services:

- **app**: Next.js application
  - Auto-reloading in development
  - Prisma integration with auto-migrations
  - Health checks and automatic recovery

- **python-api**: FastAPI service
  - Machine learning pipelines
  - Analytics processing
  - Real-time data updates
  - Health monitoring

- **streamlit**: Data visualization
  - Interactive dashboards
  - Real-time metrics
  - Custom visualizations

- **postgres**: PostgreSQL database
  - Persistent volume storage
  - Automatic initialization
  - Health monitoring

- **redis**: Redis server
  - Caching and Socket.IO adapter
  - Persistent storage
  - Health checks

- **ollama**: AI service
  - GPU support
  - Model management
  - API endpoints

## 🔄 Configuration

### Environment Variables

Required environment variables:
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/saas_platform?schema=public

# Redis
REDIS_URL=redis://redis:6379

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret

# Email Provider
EMAIL_SERVER_HOST=localhost
EMAIL_SERVER_PORT=1025
EMAIL_SERVER_USER=dev-user
EMAIL_SERVER_PASSWORD=dev-password
EMAIL_FROM=noreply@localhost

# Admin Configuration
ADMIN_DOMAINS=yourdomain.com,admin.yourdomain.com

# Python Services
PYTHON_API_URL=http://localhost:8000
STREAMLIT_URL=http://localhost:8501

# Application
NODE_ENV=development
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

1. **Docker Issues**
   ```bash
   # Restart Docker daemon
   sudo systemctl restart docker
   
   # Clean up Docker resources
   npm run docker:down
   ```

2. **Database Issues**
   ```bash
   # Reset database
   npm run prisma:migrate reset
   
   # Regenerate Prisma client
   npm run prisma:generate
   ```

3. **Python Service Issues**
   ```bash
   # Rebuild Python services
   docker compose build python-api streamlit
   
   # Check Python logs
   docker compose logs python-api
   ```

4. **Application Issues**
   ```bash
   # Clean Next.js cache
   npm run clean
   
   # Rebuild application
   npm run docker:build
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