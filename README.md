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

## 🛠 Development Setup

### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- npm or yarn

### Quick Start
1. Clone the repository:
```bash
git clone https://github.com/yourusername/saas-platform.git
cd saas-platform
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Start the development environment:
```bash
npm run dev:setup
```

This command will:
- Build and start all Docker containers
- Set up PostgreSQL database
- Configure Redis for caching
- Start the Next.js development server
- Generate Prisma client

### Available Scripts
```bash
# Development
npm run dev           # Start Next.js development server
npm run docker:dev    # Start Docker development environment
npm run docker:build  # Build Docker containers
npm run docker:down   # Stop Docker containers

# Database
npm run prisma:migrate  # Run database migrations
npm run prisma:generate # Generate Prisma client

# Production
npm run build    # Build the application
npm run start    # Start production server
npm run clean    # Clean build files
```

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

## 🔄 Development Workflow

### Docker Services
- **PostgreSQL**: Main database (port 5432)
- **Redis**: Caching and real-time features (port 6379)
- **Next.js**: Application server (port 3000)

### Environment Variables
Key environment variables needed:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/saas_platform
REDIS_URL=redis://localhost:6379
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key
```

### Real-time Features
The platform uses Socket.IO for real-time updates:
- Analytics dashboard updates
- User activity tracking
- Team collaboration features

### Database Management
```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (development only)
npx prisma db push --force-reset

# View database with Prisma Studio
npx prisma studio
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