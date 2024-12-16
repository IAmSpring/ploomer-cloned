'use client'

import React from 'react'
import { Card, Title, Badge } from '@tremor/react'
import { Clock, Eye, Share2, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { useReports } from '@/hooks/useReports'
import ShareReportModal from './ShareReportModal'

interface Report {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

interface SavedReportsListProps {
  reports: Report[]
  onView: (reportId: string) => void
  onDelete: (reportId: string) => void
  onShare: (reportId: string) => void
}

export default function SavedReportsList({
  reports,
  onView,
  onDelete,
  onShare
}: SavedReportsListProps) {
  const {
    deleteReport,
    shareReport,
    showShareModal,
    setShowShareModal,
    selectedReport
  } = useReports()

  return (
    <>
      <Card>
        <Title>Saved Reports</Title>
        <div className="mt-6 space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="text-lg font-medium">{report.name}</h3>
                {report.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {report.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Updated {format(new Date(report.updatedAt), 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onView(report.id)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                  title="View Report"
                >
                  <Eye className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => shareReport({ id: report.id, name: report.name })}
                  className="p-2 hover:bg-gray-200 rounded-full"
                  title="Share Report"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => deleteReport(report.id)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                  title="Delete Report"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </button>
              </div>
            </div>
          ))}
          {reports.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No saved reports yet
            </div>
          )}
        </div>
      </Card>
      {showShareModal && selectedReport && (
        <ShareReportModal
          reportId={selectedReport.id}
          reportName={selectedReport.name}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  )
} 