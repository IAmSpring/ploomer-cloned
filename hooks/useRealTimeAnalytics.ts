'use client'

import { useEffect, useState } from 'react'
import { initializeSocket, getSocket } from '@/lib/socket'

interface AnalyticsData {
  activeUsers: number
  realtimeEvents: number
  currentUsage: number
}

export function useRealTimeAnalytics(userId: string) {
  const [data, setData] = useState<AnalyticsData>({
    activeUsers: 0,
    realtimeEvents: 0,
    currentUsage: 0,
  })

  useEffect(() => {
    const socket = initializeSocket()

    if (socket) {
      socket.connect()
      socket.emit('join-analytics', userId)

      socket.on('analytics-update', (newData: AnalyticsData) => {
        setData(newData)
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [userId])

  return data
} 