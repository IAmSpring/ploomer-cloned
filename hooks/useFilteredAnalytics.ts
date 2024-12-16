'use client'

import { useMemo } from 'react'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { useFilters } from '@/contexts/FiltersContext'
import { subDays, isAfter } from 'date-fns'
import type { AnalyticsData } from '@/types/analytics'

export function useFilteredAnalytics() {
  const { data, error, loading } = useAnalytics()
  const { filters } = useFilters()

  const filteredData = useMemo<AnalyticsData | null>(() => {
    if (!data) return null

    const now = new Date()
    const days = parseInt(filters.dateRange)
    const cutoff = subDays(now, days)

    return {
      ...data,
      activities: data.activities.filter(activity => {
        const activityDate = new Date(activity.timestamp)
        return isAfter(activityDate, cutoff)
      }),
      metrics: data.metrics.filter(metric => {
        if (filters.eventTypes.length > 0) {
          return filters.eventTypes.includes(metric.type)
        }
        return true
      }),
      topUsers: data.topUsers.filter(user => {
        if (filters.userGroups.length > 0 && !filters.userGroups.includes('all')) {
          return filters.userGroups.includes(user.group)
        }
        return true
      })
    }
  }, [data, filters])

  return {
    data: filteredData,
    error,
    loading,
    filters,
    isFiltered: filters.eventTypes.length > 0 || 
                filters.userGroups.length > 0 || 
                filters.dateRange !== '30d'
  }
} 