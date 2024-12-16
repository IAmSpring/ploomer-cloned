'use client'

import React from 'react'
import { Card, Title, DonutChart, Legend } from '@tremor/react'
import { 
  Activity,
  MessageSquare,
  FileText,
  Share2
} from 'lucide-react'

interface MetricsGridProps {
  userId: string
}

export default function MetricsGrid({ userId }: MetricsGridProps) {
  const activityMetrics = [
    { name: 'API Calls', value: 456, icon: Activity },
    { name: 'Messages', value: 351, icon: MessageSquare },
    { name: 'Documents', value: 271, icon: FileText },
    { name: 'Shares', value: 191, icon: Share2 }
  ]

  const valueFormatter = (number: number) => 
    `${Intl.NumberFormat('us').format(number).toString()}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <Title>Activity Distribution</Title>
        <DonutChart
          className="mt-6"
          data={activityMetrics}
          category="value"
          index="name"
          valueFormatter={valueFormatter}
          colors={["indigo", "blue", "cyan", "purple"]}
        />
        <Legend
          className="mt-3"
          categories={activityMetrics.map(m => m.name)}
          colors={["indigo", "blue", "cyan", "purple"]}
        />
      </Card>

      <Card>
        <Title>Performance Metrics</Title>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {activityMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div
                key={metric.name}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="p-3 rounded-full bg-white">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {metric.name}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {valueFormatter(metric.value)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
} 