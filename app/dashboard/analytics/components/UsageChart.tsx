'use client'

import React, { useEffect, useState } from 'react'
import { Card, Title } from '@tremor/react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { format, subDays } from 'date-fns'

interface UsageData {
  date: string
  value: number
}

interface UsageChartProps {
  userId: string
}

export default function UsageChart({ userId }: UsageChartProps) {
  const [data, setData] = useState<UsageData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching usage data
    const generateData = () => {
      const data: UsageData[] = []
      for (let i = 30; i >= 0; i--) {
        data.push({
          date: format(subDays(new Date(), i), 'MMM dd'),
          value: Math.floor(Math.random() * 100) + 50
        })
      }
      setData(data)
      setLoading(false)
    }

    generateData()
  }, [userId])

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse h-[400px] bg-gray-100 rounded"></div>
      </Card>
    )
  }

  return (
    <Card>
      <Title>Daily Usage</Title>
      <div className="h-[400px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
} 