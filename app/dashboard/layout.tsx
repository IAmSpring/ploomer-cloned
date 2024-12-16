import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import DashboardNav from './components/DashboardNav'
import DashboardSidebar from './components/DashboardSidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="h-screen flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {children}
        </main>
      </div>
    </div>
  )
} 