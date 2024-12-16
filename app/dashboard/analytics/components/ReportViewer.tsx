'use client'

import React from 'react'
import { Card, Title, Button } from '@tremor/react'
import { FileSpreadsheetIcon, FileTextIcon } from 'lucide-react'
import TimeSeriesChart from './TimeSeriesChart'
import MetricsGrid from './MetricsGrid'
import TopUsers from './TopUsers'
import DonutChart from './DonutChart'
import { useFilteredAnalytics } from '@/hooks/useFilteredAnalytics'
import { exportToPDF, exportToExcel } from '@/lib/reportExport'
import type { Report } from '@/types/analytics'

interface ReportViewerProps {
  report: Report
  userId: string
}

export default function ReportViewer({ report, userId }: ReportViewerProps) {
  const { data } = useFilteredAnalytics()

  const renderComponent = (component: any) => {
    switch (component.type) {
      case 'time-series':
        return <TimeSeriesChart userId={userId} />
      case 'metrics':
        return <MetricsGrid userId={userId} />
      case 'top-users':
        return <TopUsers />
      case 'donut':
        return <DonutChart userId={userId} title={component.title} />
      default:
        return null
    }
  }

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1'
      case 'medium':
        return 'col-span-2'
      case 'large':
        return 'col-span-3'
      default:
        return 'col-span-2'
    }
  }

  const handleExport = (type: 'excel' | 'pdf') => {
    if (!data) return

    const exportData = {
      report,
      ...data
    }

    if (type === 'excel') {
      exportToExcel(exportData)
    } else {
      exportToPDF(exportData)
    }
  }

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Title>{report.name}</Title>
            {report.description && (
              <p className="mt-2 text-gray-600">{report.description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              size="xs"
              variant="secondary"
              icon={FileSpreadsheetIcon}
              onClick={() => handleExport('excel')}
              disabled={!data}
            >
              Export Excel
            </Button>
            <Button
              size="xs"
              variant="secondary"
              icon={FileTextIcon}
              onClick={() => handleExport('pdf')}
              disabled={!data}
            >
              Export PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {report.layout.components.map((component) => (
            <div key={component.id} className={getSizeClass(component.size)}>
              <Card>
                <Title>{component.title}</Title>
                {renderComponent(component)}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
} 