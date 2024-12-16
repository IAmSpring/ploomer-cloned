export interface TopUser {
  name: string
  email: string
  activityCount: number
  group: string
}

export interface AnalyticsData {
  metrics: Array<{
    type: string
    _count: number
  }>
  activities: Array<{
    timestamp: string
    _count: number
  }>
  topUsers: TopUser[]
}

export interface RealTimeData {
  metrics: Array<{
    type: string
    _count: number
  }>
  activities: Array<{
    timestamp: string
    _count: number
  }>
  topUsers: TopUser[]
}

export interface UserData {
  name: string
  value: number
  icon?: React.ComponentType<any>
  color?: string
  href?: string
}

export interface Report {
  id: string
  name: string
  description: string | null
  filters: {
    dateRange: string
    eventTypes: string[]
    userGroups: string[]
    view: 'detailed' | 'summary'
  }
  layout: {
    components: Array<{
      id: string
      type: string
      title: string
      size: 'small' | 'medium' | 'large'
    }>
  }
  createdAt: Date
  updatedAt: Date
  userId: string
  isPublic: boolean
  shareToken: string | null
}

export interface ReportViewerProps {
  report: Report
  userId: string
} 