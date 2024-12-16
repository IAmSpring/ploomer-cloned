'use client'

import { useEffect } from 'react'
import { getSocket } from '@/lib/socketClient'
import type { AnalyticsData } from '@/types/analytics'

interface AnalyticsUpdaterProps {
  onUpdate: (data: AnalyticsData) => void
}

export default function AnalyticsUpdater({ onUpdate }: AnalyticsUpdaterProps) {
  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    socket.on('analytics-update', onUpdate)

    return () => {
      socket.off('analytics-update')
    }
  }, [onUpdate])

  return null
} 