'use client'

import React, { useState } from 'react'
import { Button, Select, SelectItem } from '@tremor/react'
import { Download } from 'lucide-react'
import { exportToExcel, exportToPDF } from '@/lib/export'
import type { AnalyticsData } from '@/hooks/useAnalytics'

interface ExportButtonProps {
  data: AnalyticsData
  isLoading?: boolean
}

export default function ExportButton({ data, isLoading }: ExportButtonProps) {
  const [format, setFormat] = useState('excel')

  const handleExport = () => {
    const filename = `analytics-${new Date().toISOString().split('T')[0]}`
    
    if (format === 'excel') {
      exportToExcel(data, filename)
    } else if (format === 'pdf') {
      exportToPDF(data, filename)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        value={format}
        onValueChange={setFormat}
        className="w-32"
      >
        <SelectItem value="excel">Excel</SelectItem>
        <SelectItem value="pdf">PDF</SelectItem>
      </Select>
      <Button
        onClick={handleExport}
        disabled={isLoading}
        icon={Download}
        variant="secondary"
      >
        Export
      </Button>
    </div>
  )
} 