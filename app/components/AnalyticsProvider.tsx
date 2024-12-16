"use client"

import { useEffect } from 'react'
import { analyticsTracker } from '@/app/services/analytics'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    analyticsTracker.startTracking()
    return () => analyticsTracker.stopTracking()
  }, [])

  return <>{children}</>
} 