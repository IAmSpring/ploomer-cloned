import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
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
    const { type, message } = await request.json()
    const socket = getSocket()

    if (socket) {
      socket.to(`user:${session.user.id}`).emit('notification', {
        type,
        message,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
} 