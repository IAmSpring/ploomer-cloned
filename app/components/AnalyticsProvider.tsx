"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { analyticsTracker } from '@/app/services/analytics'
import { analytics } from '@/lib/analytics'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize all analytics services
    analytics.init()
    analyticsTracker.startTracking()

    return () => analyticsTracker.stopTracking()
  }, [])

  // Track page views
  useEffect(() => {
    if (pathname) {
      const url = searchParams.size > 0
        ? `${pathname}?${searchParams.toString()}`
        : pathname

      analytics.pageView(url)
    }
  }, [pathname, searchParams])

  return <>{children}</>
} 