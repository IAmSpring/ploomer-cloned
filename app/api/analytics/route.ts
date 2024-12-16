import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'
import type { AnalyticsData } from '@/types/analytics'
import type { User } from '@/types/prisma'

interface MetricCount {
  type: string
  _count: number
}

interface ActivityCount {
  timestamp: string
  _count: number
}

export async function GET() {
  const session = await getServerSession()
  
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const [metrics, activities, users] = await Promise.all([
      prisma.$queryRaw<MetricCount[]>`
        SELECT type, COUNT(*) as _count
        FROM "Activity"
        WHERE "userId" = ${session.user.id}
        GROUP BY type
      `,
      
      prisma.$queryRaw<ActivityCount[]>`
        SELECT DATE_TRUNC('day', timestamp) as timestamp,
               COUNT(*) as _count
        FROM "Activity"
        WHERE "userId" = ${session.user.id}
        GROUP BY DATE_TRUNC('day', timestamp)
        ORDER BY timestamp DESC
        LIMIT 30
      `,
      
      prisma.user.findMany({
        where: {
          OR: [
            { id: session.user.id },
            { reports: {
              some: {
                sharedWith: {
                  some: { userId: session.user.id }
                }
              }
            }}
          ]
        },
        include: {
          subscription: true,
          _count: {
            select: {
              activities: true
            }
          }
        }
      })
    ])

    const topUsers = users.map((user: User) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      activityCount: user._count.activities,
      group: user.subscription?.status || 'free'
    }))

    const analyticsData: AnalyticsData = {
      metrics,
      activities,
      topUsers
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
} 