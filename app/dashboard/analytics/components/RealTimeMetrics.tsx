'use client'

import React from 'react'
import { Card, Grid, Metric, Text } from '@tremor/react'
import { useRealTimeAnalytics } from '@/hooks/useRealTimeAnalytics'

interface RealTimeMetricsProps {
  userId: string
}

export default function RealTimeMetrics({ userId }: RealTimeMetricsProps) {
  const data = useRealTimeAnalytics(userId)

  if (!data) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </Card>
    )
  }

  const metrics = [
    {
      title: 'Active Users',
      value: data.metrics.reduce((acc, curr) => acc + curr._count, 0),
      description: 'Currently online'
    },
    {
      title: 'Real-time Events',
      value: data.activities.length,
      description: 'Last 30 minutes'
    },
    {
      title: 'Current Usage',
      value: `${data.topUsers.length} users`,
      description: 'System load'
    }
  ]

  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <Text>{metric.title}</Text>
          <Metric>{metric.value}</Metric>
          <Text className="mt-2">{metric.description}</Text>
        </Card>
      ))}
    </Grid>
  )
} 