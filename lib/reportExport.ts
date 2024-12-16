import { jsPDF } from 'jspdf'
import * as XLSX from 'xlsx'
import { format } from 'date-fns'
import type { AnalyticsData, Report } from '@/types/analytics'

interface ExportData extends AnalyticsData {
  report: Report
}

export function exportToPDF(data: ExportData) {
  const doc = new jsPDF()
  let yOffset = 20

  // Title
  doc.setFontSize(20)
  doc.text(data.report.name, 20, yOffset)
  yOffset += 10

  if (data.report.description) {
    doc.setFontSize(12)
    doc.text(data.report.description, 20, yOffset)
    yOffset += 10
  }

  // Metadata
  doc.setFontSize(10)
  doc.text(`Generated: ${format(new Date(), 'PPpp')}`, 20, yOffset)
  yOffset += 20

  // Metrics Summary
  doc.setFontSize(16)
  doc.text('Metrics Summary', 20, yOffset)
  yOffset += 10

  doc.setFontSize(12)
  data.metrics.forEach(metric => {
    doc.text(
      `${metric.type}: ${metric._count}`,
      30,
      yOffset
    )
    yOffset += 8
  })
  yOffset += 10

  // Top Users
  doc.setFontSize(16)
  doc.text('Top Users', 20, yOffset)
  yOffset += 10

  doc.setFontSize(12)
  data.topUsers.slice(0, 5).forEach(user => {
    doc.text(
      `${user.name}: ${user.activityCount} activities`,
      30,
      yOffset
    )
    yOffset += 8
  })

  // Save the PDF
  doc.save(`${data.report.name}-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
}

export function exportToExcel(data: ExportData) {
  const workbook = XLSX.utils.book_new()

  // Metrics Sheet
  const metricsData = data.metrics.map(m => ({
    Type: m.type,
    Count: m._count
  }))
  const metricsSheet = XLSX.utils.json_to_sheet(metricsData)
  XLSX.utils.book_append_sheet(workbook, metricsSheet, 'Metrics')

  // Activities Sheet
  const activitiesData = data.activities.map(a => ({
    Date: format(new Date(a.timestamp), 'PPpp'),
    Count: a._count
  }))
  const activitiesSheet = XLSX.utils.json_to_sheet(activitiesData)
  XLSX.utils.book_append_sheet(workbook, activitiesSheet, 'Activities')

  // Top Users Sheet
  const usersSheet = XLSX.utils.json_to_sheet(data.topUsers)
  XLSX.utils.book_append_sheet(workbook, usersSheet, 'Top Users')

  // Save the Excel file
  XLSX.writeFile(
    workbook,
    `${data.report.name}-${format(new Date(), 'yyyy-MM-dd')}.xlsx`
  )
} 