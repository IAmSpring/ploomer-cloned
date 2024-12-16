'use client'

import React from 'react'
import { Card, Title } from '@tremor/react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { format } from 'date-fns'
import { useFilteredAnalytics } from '@/hooks/useFilteredAnalytics'

interface TimeSeriesChartProps {
  userId: string
}

export default function TimeSeriesChart({ userId }: TimeSeriesChartProps) {
  const { data, loading, isFiltered } = useFilteredAnalytics()

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-[400px] bg-gray-200 rounded"></div>
        </div>
      </Card>
    )
  }

  const chartData = data?.activities.map(activity => ({
    date: format(new Date(activity.timestamp), 'MMM dd'),
    count: activity._count,
  })) || []

  return (
    <Card>
      <Title>Activity Timeline {isFiltered && '(Filtered)'}</Title>
      <div className="h-[400px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="count"
              name="Events"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
} 