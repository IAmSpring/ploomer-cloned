import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { getSocket } from '@/lib/socket'

export async function POST(request: Request) {
  const session = await getServerSession()
  
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { event, data } = await request.json()
    const socket = getSocket()

    if (socket) {
      // Save event to database
      await prisma.activity.create({
        data: {
          type: event,
          description: data.description,
          userId: session.user.id,
        },
      })

      // Emit real-time update
      socket.to(`analytics:${session.user.id}`).emit('analytics-update', {
        activeUsers: Math.floor(Math.random() * 100) + 50, // Replace with actual data
        realtimeEvents: Math.floor(Math.random() * 1000) + 100,
        currentUsage: Math.floor(Math.random() * 100),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing analytics event:', error)
    return NextResponse.json(
      { error: 'Failed to process event' },
      { status: 500 }
    )
  }
} 