'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SavedReportsList from '../components/SavedReportsList'
import ReportBuilder from '../components/ReportBuilder'
import { useReports } from '@/hooks/useReports'

export default function ReportsPage() {
  const router = useRouter()
  const { reports, deleteReport, shareReport } = useReports()
  const [showBuilder, setShowBuilder] = useState(false)

  const handleView = (id: string) => {
    router.push(`/dashboard/analytics/reports/${id}`)
  }

  const handleDelete = async (id: string) => {
    await deleteReport(id)
    router.refresh()
  }

  const handleShare = (id: string) => {
    shareReport(id)
  }

  return (
    <div className="space-y-6">
      <SavedReportsList
        reports={reports}
        onView={handleView}
        onDelete={handleDelete}
        onShare={handleShare}
      />
      {showBuilder && <ReportBuilder />}
    </div>
  )
} 