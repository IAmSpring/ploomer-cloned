import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import type { AnalyticsData } from '@/types/analytics'

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
      // Get metrics by activity type
      prisma.$queryRaw`
        SELECT type, COUNT(*) as _count
        FROM "Activity"
        WHERE "userId" = ${session.user.id}
        GROUP BY type
      `,
      
      // Get activities by timestamp
      prisma.$queryRaw`
        SELECT DATE_TRUNC('day', timestamp) as timestamp,
               COUNT(*) as _count
        FROM "Activity"
        WHERE "userId" = ${session.user.id}
        GROUP BY DATE_TRUNC('day', timestamp)
        ORDER BY timestamp DESC
        LIMIT 30
      `,
      
      // Get top users with their activity counts and subscription status
      prisma.$queryRaw`
        SELECT 
          u.id,
          u.name,
          u.email,
          s.status as subscription_status,
          COUNT(a.id) as activity_count
        FROM "User" u
        LEFT JOIN "Subscription" s ON s.userId = u.id
        LEFT JOIN "Activity" a ON a.userId = u.id
        GROUP BY u.id, u.name, u.email, s.status
        ORDER BY COUNT(a.id) DESC
        LIMIT 10
      `
    ])

    const topUsers = users.map((user: any) => ({
      name: user.name || '',
      email: user.email,
      activityCount: Number(user.activity_count),
      group: user.subscription_status || 'free'
    }))

    return NextResponse.json({
      metrics,
      activities,
      topUsers
    } satisfies AnalyticsData)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
} 