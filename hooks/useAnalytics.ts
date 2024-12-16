'use client'

import { useState, useEffect } from 'react'
import type { AnalyticsData } from '@/types/analytics'

interface UseAnalyticsOptions {
  refreshInterval?: number
}

export type { AnalyticsData }

export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics')
      if (!response.ok) throw new Error('Failed to fetch analytics')
      const data = await response.json()
      setData(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()

    if (options.refreshInterval) {
      const interval = setInterval(fetchAnalytics, options.refreshInterval)
      return () => clearInterval(interval)
    }
  }, [options.refreshInterval])

  return { data, loading, error, refresh: fetchAnalytics }
} 