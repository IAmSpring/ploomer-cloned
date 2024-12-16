'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function useReports() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<{
    id: string
    name: string
  } | null>(null)

  const deleteReport = async (reportId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/reports?id=${reportId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete report')

      router.refresh()
    } catch (error) {
      console.error('Error deleting report:', error)
      // Show error notification
    } finally {
      setLoading(false)
    }
  }

  const shareReport = (report: { id: string; name: string }) => {
    setSelectedReport(report)
    setShowShareModal(true)
  }

  return {
    deleteReport,
    shareReport,
    loading,
    showShareModal,
    setShowShareModal,
    selectedReport
  }
} 