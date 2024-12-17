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
- **Feature Flags**: LaunchDarkly
- **Container Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Infrastructure**: Terraform
- **Stage Management**: Docker Compose with multi-stage builds
- **Feature Management**: LaunchDarkly with environment segmentation

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

## Environment Variables

### Core Configuration
```env
# Base URLs and Security
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-development-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_VERSION=1.0.0

# Database Configuration
DATABASE_URL="postgresql://postgres:password@postgres:5432/saas_platform?schema=public"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=saas_platform

# Redis Configuration
REDIS_URL="redis://localhost:6379"
```

### Authentication & OAuth
```env
# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""
```

### Payment Processing
```env
# Stripe Configuration
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

### Analytics & Monitoring
```env
# PostHog Analytics
NEXT_PUBLIC_POSTHOG_API_KEY=your_posthog_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Datadog Monitoring
NEXT_PUBLIC_DATADOG_APPLICATION_ID=your_datadog_app_id
NEXT_PUBLIC_DATADOG_CLIENT_TOKEN=your_datadog_token
NEXT_PUBLIC_DATADOG_SITE=datadoghq.com

# Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=""
```

### AI Features
```env
# OpenAI Configuration
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

## AI Chat Assistant Setup

The platform includes an AI-powered chat assistant that helps users navigate the platform and understand pricing options.

### Features
- Real-time UI interaction
- Pricing plan guidance
- Feature explanations
- Interactive tutorials
- Form filling assistance
- Navigation help

### AI Assistant Capabilities

1. **Navigation**
   - Guide users through different sections
   - Highlight relevant UI elements
   - Smooth scroll to important features

2. **Plan Selection**
   - Compare pricing plans
   - Highlight plan features
   - Explain plan differences
   - Recommend suitable plans

3. **Feature Discovery**
   - Demonstrate platform features
   - Interactive feature tours
   - Contextual explanations

4. **Form Assistance**
   - Help with form filling
   - Validate input
   - Provide suggestions

### Setting up OpenAI Integration

1. Get your OpenAI API key:
   ```bash
   # Visit https://platform.openai.com/api-keys
   # Create a new API key
   # Add it to your .env file:
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   ```

2. The AI assistant uses GPT-4 with function calling capabilities. Ensure your OpenAI account has access to GPT-4.

3. Available AI Tools:
   ```typescript
   - navigate: Navigate to specific pages
   - select_plan: Help with plan selection
   - show_feature: Highlight and explain features
   - fill_form: Assist with form filling
   - click_element: Help with button/link interactions
   ```

### Example AI Interactions

```typescript
// Ask about pricing
"What plan would you recommend for a small team?"

// Learn about features
"Can you show me the AI features available?"

// Get setup help
"Help me set up my account"

// Compare plans
"What's the difference between Professional and Teams plans?"
```

### Customizing the AI Assistant

The AI assistant can be customized by:
1. Adding new tools in `services/openai.ts`
2. Modifying the system prompt
3. Adding new UI interactions in `services/ui-helpers.ts`
4. Customizing the chat interface in `components/AIChat`

## Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev
```

For more detailed documentation on specific features, check the docs directory.