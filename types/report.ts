export interface Report {
  id: string
  name: string
  description?: string
  filters: {
    dateRange: string
    eventTypes: string[]
    userGroups: string[]
    view: string
  }
  layout: {
    components: {
      id: string
      type: string
      title: string
      size: string
    }[]
  }
  isPublic: boolean
  shareToken: string | null
} 