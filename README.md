# Ploomer Clone - Modern SaaS Platform

A full-featured SaaS platform built with Next.js, Prisma, Docker, and more.

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

- **Caching & Real-time**
  - Redis for caching and Socket.IO
  - Real-time analytics updates
  - Performance optimizations

- **AI Integration**
  - Ollama integration for AI features
  - GPU acceleration support
  - Customizable AI models

## 🛠 Role-Based Access Control

### User Roles

1. **Super Admin**
   - Full system access
   - Can override admin actions
   - Access to all data and configurations
   - System-wide management capabilities

2. **Admin**
   - User management
   - Analytics access
   - Report management
   - Subscription management
   - Settings configuration

3. **User**
   - Basic platform access
   - Report creation
   - Report sharing
   - Analytics viewing

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
- **Backend**: Node.js, Prisma, PostgreSQL
- **Caching**: Redis
- **AI**: Ollama
- **DevOps**: Docker, Docker Compose

## 📦 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ploomer-clone.git
   cd ploomer-clone
   ```

2. **Environment Setup**
   ```bash
   # Copy example env file
   cp .env.example .env
   ```

3. **Start the Application**
   ```bash
   # Build and start containers
   docker compose up --build
   ```

## 🐳 Docker Configuration

The application uses Docker Compose with the following services:

- **app**: Next.js application
  - Auto-reloading in development
  - Prisma integration with auto-migrations
  - Health checks and automatic recovery

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

## 🔄 Development Workflow

1. **Start Development Environment**
   ```bash
   # Start with logs
   docker compose up

   # Start in background
   docker compose up -d
   ```

2. **Database Management**
   ```bash
   # Apply migrations
   npm run prisma:migrate

   # Generate Prisma client
   npm run prisma:generate
   ```

3. **Container Management**
   ```bash
   # View logs
   docker compose logs -f

   # Rebuild containers
   docker compose up --build

   # Clean up
   docker compose down
   ```

## 🔧 Configuration

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

# Application
NODE_ENV=development
```

### Docker Volumes

```yaml
volumes:
  postgres_data: # Database persistence
  redis_data:    # Cache persistence
  ollama_data:   # AI model storage
```

## 🚨 Health Checks

The platform includes comprehensive health monitoring:

- Database connection checks
- Redis connectivity monitoring
- Application health endpoint
- Container health checks
- Automatic service recovery

## 📚 Documentation

For more detailed documentation:
- [API Documentation](docs/api.md)
- [Development Guide](docs/development.md)
- [Deployment Guide](docs/deployment.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.