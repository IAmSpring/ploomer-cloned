import { jsPDF } from 'jspdf'
import * as XLSX from 'xlsx'
import type { AnalyticsData } from '@/hooks/useAnalytics'

export function exportToExcel(data: AnalyticsData, filename = 'analytics') {
  const workbook = XLSX.utils.book_new()

  // Activities sheet
  const activitiesData = data.activities.map(a => ({
    Date: new Date(a.timestamp).toLocaleDateString(),
    Count: a._count
  }))
  const activitiesSheet = XLSX.utils.json_to_sheet(activitiesData)
  XLSX.utils.book_append_sheet(workbook, activitiesSheet, 'Activities')

  // Top Users sheet
  const usersSheet = XLSX.utils.json_to_sheet(data.topUsers)
  XLSX.utils.book_append_sheet(workbook, usersSheet, 'Top Users')

  // Metrics sheet
  const metricsSheet = XLSX.utils.json_to_sheet(data.metrics)
  XLSX.utils.book_append_sheet(workbook, metricsSheet, 'Metrics')

  XLSX.writeFile(workbook, `${filename}.xlsx`)
}

export function exportToPDF(data: AnalyticsData, filename = 'analytics') {
  const doc = new jsPDF()
  let yOffset = 20

  // Title
  doc.setFontSize(20)
  doc.text('Analytics Report', 20, yOffset)
  yOffset += 20

  // Activities Summary
  doc.setFontSize(16)
  doc.text('Activities Summary', 20, yOffset)
  yOffset += 10

  doc.setFontSize(12)
  data.activities.slice(-5).forEach(activity => {
    doc.text(
      `${new Date(activity.timestamp).toLocaleDateString()}: ${activity._count} events`,
      30,
      yOffset
    )
    yOffset += 10
  })
  yOffset += 10

  // Top Users
  doc.setFontSize(16)
  doc.text('Top Users', 20, yOffset)
  yOffset += 10

  doc.setFontSize(12)
  data.topUsers.forEach(user => {
    doc.text(
      `${user.name}: ${user.activityCount} activities`,
      30,
      yOffset
    )
    yOffset += 10
  })
  yOffset += 10

  // Metrics
  doc.setFontSize(16)
  doc.text('Metrics Distribution', 20, yOffset)
  yOffset += 10

  doc.setFontSize(12)
  data.metrics.forEach(metric => {
    doc.text(
      `${metric.type}: ${metric._count}`,
      30,
      yOffset
    )
    yOffset += 10
  })

  doc.save(`${filename}.pdf`)
} 