'use client'

import { useState } from 'react'
import { Report } from '@/types/analytics'

export function useReports() {
  const [reports, setReports] = useState<Report[]>([])

  const deleteReport = async (id: string) => {
    try {
      const response = await fetch(`/api/reports?id=${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete report')
      
      setReports(prev => prev.filter(report => report.id !== id))
    } catch (error) {
      console.error('Error deleting report:', error)
    }
  }

  const shareReport = async (id: string) => {
    try {
      const response = await fetch(`/api/reports/${id}/share`, {
        method: 'POST',
      })
      
      if (!response.ok) throw new Error('Failed to share report')
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error sharing report:', error)
    }
  }

  return {
    reports,
    deleteReport,
    shareReport,
  }
} 