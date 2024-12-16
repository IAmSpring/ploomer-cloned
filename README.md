# Modern SaaS Analytics Platform

A modern, full-stack SaaS analytics platform built with Next.js 14, featuring real-time analytics, customizable dashboards, and team collaboration.

## 🚀 Features

### Analytics & Reporting
- 📊 Real-time analytics dashboard
- 📈 Customizable metrics and charts
- 📋 Shareable reports
- 🔍 Advanced filtering and date range selection
- 📱 Responsive design for all devices

### Technical Stack
- **Frontend**: Next.js 14, React, TypeScript
- **UI**: Tremor, TailwindCSS, Lucide Icons
- **Backend**: Next.js API Routes, Socket.IO
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for real-time data
- **Authentication**: NextAuth.js
- **Analytics**: PostHog, Datadog
- **Monitoring**: Sentry
- **Payments**: Stripe

## 🏗 Project Structure
```
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── auth/             # Authentication pages
├── components/            # Reusable components
├── contexts/             # React contexts
├── hooks/               # Custom React hooks
├── lib/                # Utility functions
├── prisma/            # Database schema and migrations
├── public/           # Static assets
└── types/           # TypeScript type definitions
```

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

### Sample Data Included
- 📊 Pre-configured analytics dashboard
- 📈 100 sample analytics events
- 📑 Example reports and layouts
- 👤 Demo user with Pro subscription

## 🛠 Development Environment

### Docker Services
```yaml
services:
  # PostgreSQL Database (port 5432)
  postgres:
    - Persistent data storage
    - Sample data auto-seeding
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

## 🔄 Development Workflow

### Working with Data
- Sample analytics events are automatically created
- Real-time updates via Socket.IO
- Redis caching for performance
- PostgreSQL for persistent storage

### Environment Variables
All necessary environment variables are automatically configured, including:
- Database connections
- Redis settings
- NextAuth configuration
- API keys (development ones for third-party services)

### Docker Volumes
```yaml
volumes:
  postgres_data: # Persistent database storage
  redis_data:    # Persistent cache storage
```

## 📚 Documentation

### API Routes
- `/api/analytics/*` - Analytics endpoints
- `/api/reports/*` - Report management
- `/api/auth/*` - Authentication endpoints

### Components
- **TimeSeriesChart**: Visualize trends over time
- **MetricsGrid**: Display key metrics in a grid layout
- **TopUsers**: Track most active users
- **DonutChart**: Show data distribution
- **AnalyticsOverview**: Quick metrics summary
- **ReportViewer**: Customizable report layouts

## 🔐 Security

- All API routes are protected with NextAuth.js
- Database credentials managed via environment variables
- CORS configured for specified origins
- Rate limiting on API routes
- Input validation using Zod

## 📈 Monitoring

- Error tracking with Sentry
- Performance monitoring with Datadog
- User analytics with PostHog
- Custom event tracking