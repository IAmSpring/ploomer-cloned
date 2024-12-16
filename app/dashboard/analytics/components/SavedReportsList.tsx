'use client'

import React from 'react'
import { Card, Title, Text } from '@tremor/react'
import { Share2, Trash2, Eye } from 'lucide-react'
import type { Report } from '@/types/analytics'

interface SavedReportsListProps {
  reports: Array<{
    id: string
    userId: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    layout: any
    filters: any
    isPublic: boolean
    shareToken: string | null
  }>
  onView: (id: string) => void
  onDelete: (id: string) => void
  onShare: (id: string) => void
}

export default function SavedReportsList({ 
  reports, 
  onView,
  onDelete,
  onShare 
}: SavedReportsListProps) {
  const convertedReports: Report[] = reports.map(report => ({
    ...report,
    filters: report.filters as Report['filters'],
    layout: report.layout as Report['layout'],
    description: report.description || null,
    shareToken: report.shareToken || null
  }))

  return (
    <div className="space-y-6">
      {convertedReports.map((report) => (
        <Card key={report.id} className="relative">
          <div className="flex justify-between items-start">
            <div>
              <Title>{report.name}</Title>
              {report.description && <Text>{report.description}</Text>}
              <div className="mt-2 text-sm text-gray-500">
                Last updated: {report.updatedAt.toLocaleDateString()}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onView(report.id)}
                className="p-2 hover:bg-gray-100 rounded-full"
                title="View Report"
              >
                <Eye className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => onShare(report.id)}
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Share Report"
              >
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => onDelete(report.id)}
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Delete Report"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </button>
            </div>
          </div>
        </Card>
      ))}
      {convertedReports.length === 0 && (
        <Card>
          <Text className="text-center text-gray-500">No reports found</Text>
        </Card>
      )}
    </div>
  )
} 