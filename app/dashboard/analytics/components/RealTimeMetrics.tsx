'use client'

import React from 'react'
import { Card, Title, Metric, Flex, Text } from '@tremor/react'
import { useRealTimeAnalytics } from '@/hooks/useRealTimeAnalytics'
import { Activity, Users, Zap } from 'lucide-react'

interface RealTimeMetricsProps {
  userId: string
}

export default function RealTimeMetrics({ userId }: RealTimeMetricsProps) {
  const { activeUsers, realtimeEvents, currentUsage } = useRealTimeAnalytics(userId)

  const metrics = [
    {
      title: 'Active Users',
      value: activeUsers,
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Real-time Events',
      value: realtimeEvents,
      icon: Activity,
      color: 'green',
    },
    {
      title: 'Current Usage',
      value: `${currentUsage}%`,
      icon: Zap,
      color: 'indigo',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <Flex>
            <metric.icon
              className={`h-6 w-6 text-${metric.color}-500`}
            />
            <Title>{metric.title}</Title>
          </Flex>
          <Metric className="mt-2">{metric.value}</Metric>
          <Text className="mt-2">Live updates every 5s</Text>
        </Card>
      ))}
    </div>
  )
} 