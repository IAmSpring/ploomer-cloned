import React from 'react'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { FiltersProvider } from '@/contexts/FiltersContext'
import ReportBuilder from '../components/ReportBuilder'
import SavedReportsList from '../components/SavedReportsList'
import { Button } from '@tremor/react'
import { Plus } from 'lucide-react'

export default async function ReportsPage() {
  const session = await getServerSession()
  
  if (!session?.user?.id) return null

  const reports = await prisma.report.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' }
  })

  return (
    <FiltersProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Analytics Reports</h1>
          <Button icon={Plus}>Create New Report</Button>
        </div>
        <SavedReportsList
          reports={reports}
          onView={(id) => {}}
          onDelete={(id) => {}}
          onShare={(id) => {}}
        />
        <ReportBuilder />
      </div>
    </FiltersProvider>
  )
} 