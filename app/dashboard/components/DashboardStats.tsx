'use client'

import React from 'react'
import { CreditCard, Users, Activity, TrendingUp } from 'lucide-react'
import type { Subscription } from '@/types/prisma'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  description: string
}

function StatsCard({ title, value, icon: Icon, description }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-indigo-50">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  )
}

interface DashboardStatsProps {
  subscription: Subscription | null
}

export default function DashboardStats({ subscription }: DashboardStatsProps) {
  const stats = [
    {
      title: 'Subscription Status',
      value: subscription?.status || 'No Active Plan',
      icon: CreditCard,
      description: subscription
        ? `Renews on ${new Date(subscription.currentPeriodEnd!).toLocaleDateString()}`
        : 'Start your subscription today'
    },
    {
      title: 'Active Users',
      value: '2,453',
      icon: Users,
      description: '+12.5% from last month'
    },
    {
      title: 'Usage Rate',
      value: '85.2%',
      icon: Activity,
      description: 'Last 30 days'
    },
    {
      title: 'Growth',
      value: '+23.1%',
      icon: TrendingUp,
      description: 'Compared to last quarter'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  )
} 