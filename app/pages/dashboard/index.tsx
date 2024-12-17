"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { UserRole } from '@prisma/client'
import Layout from '@/components/Layout'
import AdminDashboard from '@/components/admin/AdminDashboard'
import SuperAdminDashboard from '@/components/admin/SuperAdminDashboard'
import UserDashboard from '@/components/dashboard/UserDashboard'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      </Layout>
    )
  }

  if (!session?.user) {
    return null
  }

  return (
    <Layout>
      {session.user.role === UserRole.SUPER_ADMIN && <SuperAdminDashboard />}
      {session.user.role === UserRole.ADMIN && <AdminDashboard />}
      {session.user.role === UserRole.USER && <UserDashboard />}
    </Layout>
  )
} 