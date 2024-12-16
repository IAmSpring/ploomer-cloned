import React from 'react'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { analytics } from '@/lib/analytics'
import DashboardStats from './components/DashboardStats'
import RecentActivity from './components/RecentActivity'

export default async function DashboardPage() {
  const session = await getServerSession()
  
  if (!session?.user?.id) return null

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id }
  })

  return (
    <div className="space-y-6">
      <DashboardStats subscription={subscription} />
      <RecentActivity userId={session.user.id} />
    </div>
  )
} 