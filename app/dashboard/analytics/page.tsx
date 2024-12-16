import React from 'react'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import AnalyticsOverview from './components/AnalyticsOverview'
import UsageChart from './components/UsageChart'
import TopUsers from './components/TopUsers'
import MetricsGrid from './components/MetricsGrid'
import RealTimeMetrics from './components/RealTimeMetrics'
import ExportButton from './components/ExportButton'
import DateRangeSelector from './components/DateRangeSelector'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { FiltersProvider } from '@/contexts/FiltersContext'
import AnalyticsFilters from './components/AnalyticsFilters'
import TimeSeriesChart from './components/TimeSeriesChart'
import { AnalyticsProvider } from '@/contexts/AnalyticsContext'
import ReportViewer from './components/ReportViewer'
import type { Report } from '@/types/analytics'
import { initializeSocket } from '@/lib/socketClient'  // Client-side socket

export default async function AnalyticsPage() {
  const session = await getServerSession()
  
  if (!session?.user?.id) return null

  const report: Report = {
    id: 'default',
    name: 'Analytics Overview',
    description: null,
    filters: {
      dateRange: '30d',
      eventTypes: [],
      userGroups: [],
      view: 'detailed'
    },
    layout: {
      components: [
        {
          id: 'overview',
          type: 'metrics',
          title: 'Overview Metrics',
          size: 'large'
        },
        {
          id: 'timeline',
          type: 'timeseries',
          title: 'Activity Timeline',
          size: 'large'
        },
        {
          id: 'users',
          type: 'topUsers',
          title: 'Top Users',
          size: 'medium'
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: session.user.id,
    isPublic: false,
    shareToken: null
  }

  return (
    <ReportViewer report={report} userId={session.user.id} />
  )
} 