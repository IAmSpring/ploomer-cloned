'use client'

import React from 'react'
import { Card, Metric, Text, Flex, Grid } from '@tremor/react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import LoadingSkeleton from './LoadingSkeleton'
import { Report } from '@/types/analytics'

interface MetricCardProps {
  title: string
  metric: string | number
  subtext: string
  trend: number
}

function MetricCard({ title, metric, subtext, trend }: MetricCardProps) {
  const isPositive = trend >= 0

  return (
    <Card>
      <Text>{title}</Text>
      <Flex justifyContent="start" alignItems="baseline" className="space-x-3 truncate">
        <Metric>{metric}</Metric>
        <Text className={isPositive ? 'text-green-600' : 'text-red-600'}>
          <Flex justifyContent="start" alignItems="baseline" className="space-x-1">
            <span>{Math.abs(trend)}%</span>
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
          </Flex>
        </Text>
      </Flex>
      <Text className="mt-2">{subtext}</Text>
    </Card>
  )
}

const defaultReport: Report = {
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
    components: [{
      id: 'overview',
      type: 'metrics',
      title: 'Overview Metrics',
      size: 'large'
    }]
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 'system',
  isPublic: false,
  shareToken: null
}

export default function AnalyticsOverview() {
  const { data, loading } = useAnalytics()

  if (loading || !data) {
    return <LoadingSkeleton />
  }

  const totalActivities = data.metrics.reduce((acc, curr) => acc + curr._count, 0)

  const overviewMetrics = [
    {
      title: 'Total Activities',
      metric: totalActivities,
      subtext: 'Last 30 days',
      trend: 12.3
    },
    {
      title: 'Active Users',
      metric: '1,234',
      subtext: 'Unique users this month',
      trend: 8.2
    },
    {
      title: 'Avg. Session Duration',
      metric: '12m 30s',
      subtext: 'Per user session',
      trend: -2.1
    },
    {
      title: 'Conversion Rate',
      metric: '3.8%',
      subtext: 'From trial to paid',
      trend: 4.1
    }
  ]

  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
      {overviewMetrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </Grid>
  )
} 