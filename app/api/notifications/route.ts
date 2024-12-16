import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { io } from '@/lib/socket'

export async function POST(request: Request) {
  const session = await getServerSession()
  
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const data = await request.json()

    io?.to(`user:${session.user.id}`).emit('notification', {
      type: data.type,
      message: data.message,
      timestamp: new Date()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
} 