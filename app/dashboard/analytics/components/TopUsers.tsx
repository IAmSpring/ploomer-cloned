'use client'

import React from 'react'
import { Card, Title, BarList } from '@tremor/react'
import { User } from 'lucide-react'
import { useFilteredAnalytics } from '@/hooks/useFilteredAnalytics'
import type { UserData } from '@/types/analytics'

export default function TopUsers() {
  const { data, loading } = useFilteredAnalytics()

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  const userData: UserData[] = data?.topUsers.map(user => ({
    name: user.name || user.email,
    value: user.activityCount,
    icon: User,
    color: 'indigo',
    href: `/users/${user.email}`
  })) || []

  return (
    <Card>
      <Title>Top Users</Title>
      <BarList
        data={userData}
        className="mt-4"
        valueFormatter={(value: number) => value.toString()}
      />
    </Card>
  )
} 