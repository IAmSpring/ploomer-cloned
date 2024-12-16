'use client'

import React from 'react'
import { Card, Title, DonutChart as TremorDonut } from '@tremor/react'
import { useFilteredAnalytics } from '@/hooks/useFilteredAnalytics'

interface DonutChartProps {
  userId: string
  title?: string
}

export default function DonutChart({ userId, title = 'Event Distribution' }: DonutChartProps) {
  const { data, loading, isFiltered } = useFilteredAnalytics()

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-[300px] bg-gray-200 rounded"></div>
        </div>
      </Card>
    )
  }

  const chartData = data?.metrics.map(metric => ({
    name: metric.type.replace('_', ' ').toUpperCase(),
    value: metric._count
  })) || []

  const valueFormatter = (number: number) => 
    `${Intl.NumberFormat('us').format(number).toString()}`

  return (
    <Card>
      <Title>{title} {isFiltered && '(Filtered)'}</Title>
      <TremorDonut
        className="mt-6"
        data={chartData}
        category="value"
        index="name"
        valueFormatter={valueFormatter}
        colors={[
          'indigo',
          'violet',
          'fuchsia',
          'rose',
          'cyan'
        ]}
      />
    </Card>
  )
} 