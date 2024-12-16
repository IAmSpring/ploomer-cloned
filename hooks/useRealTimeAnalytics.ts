'use client'

import { useEffect, useState } from 'react'
import { initializeSocket, getSocket } from '@/lib/socketClient'
import type { RealTimeData } from '@/types/analytics'

export function useRealTimeAnalytics(userId: string) {
  const [data, setData] = useState<RealTimeData | null>(null)

  useEffect(() => {
    const socket = initializeSocket()
    if (!socket) return

    socket.connect()
    socket.emit('join-room', `analytics:${userId}`)

    socket.on('analytics-update', (newData: RealTimeData) => {
      setData(newData)
    })

    return () => {
      socket.emit('leave-room', `analytics:${userId}`)
      socket.disconnect()
    }
  }, [userId])

  return data
} 