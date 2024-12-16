import { socketService } from './socket'

export interface UserInteraction {
  type: 'click' | 'scroll' | 'hover' | 'input' | 'navigation' | 'error' | 'success'
  target?: {
    element: string
    id?: string
    class?: string
    text?: string
  }
  location: {
    path: string
    hash?: string
    query?: Record<string, string>
  }
  position?: {
    x?: number
    y?: number
    scrollY?: number
    viewportHeight?: number
    pageHeight?: number
    scrollPercentage?: number
  }
  metadata?: Record<string, any>
  timestamp: number
  sessionId?: string
  userId?: string
}

class AnalyticsTracker {
  private buffer: UserInteraction[] = []
  private isTracking = false
  private sessionId: string
  private batchSize = 10
  private batchTimeout = 5000 // 5 seconds

  constructor() {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    this.setupEventListeners()
  }

  private setupEventListeners() {
    if (typeof window === 'undefined') return

    // Click tracking
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      this.trackInteraction({
        type: 'click',
        target: {
          element: target.tagName.toLowerCase(),
          id: target.id,
          class: target.className,
          text: target.textContent?.slice(0, 100)
        },
        position: {
          x: e.clientX,
          y: e.clientY
        }
      })
    })

    // Scroll tracking with throttle
    let scrollTimeout: NodeJS.Timeout
    window.addEventListener('scroll', () => {
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY
        const viewportHeight = window.innerHeight
        const pageHeight = document.documentElement.scrollHeight
        const scrollPercentage = (scrollY / (pageHeight - viewportHeight)) * 100

        this.trackInteraction({
          type: 'scroll',
          position: {
            x: window.scrollX,
            y: window.scrollY,
            scrollY,
            viewportHeight,
            pageHeight,
            scrollPercentage
          }
        })
      }, 100)
    })

    // Navigation tracking
    const originalPushState = history.pushState
    history.pushState = function(...args) {
      const result = originalPushState.apply(this, args)
      analyticsTracker.trackNavigation()
      return result
    }

    window.addEventListener('popstate', () => {
      this.trackNavigation()
    })
  }

  private trackNavigation() {
    const location = window.location
    this.trackInteraction({
      type: 'navigation',
      location: {
        path: location.pathname,
        hash: location.hash,
        query: Object.fromEntries(new URLSearchParams(location.search))
      }
    })
  }

  public trackInteraction(interaction: Partial<UserInteraction>) {
    const fullInteraction: UserInteraction = {
      ...interaction,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      location: {
        path: window.location.pathname,
        hash: window.location.hash,
        query: Object.fromEntries(new URLSearchParams(window.location.search))
      },
      userId: this.getUserId(),
      type: interaction.type || 'click'
    }

    this.buffer.push(fullInteraction)
    this.processBatchIfNeeded()
  }

  private processBatchIfNeeded() {
    if (this.buffer.length >= this.batchSize) {
      this.sendBatch()
    }
  }

  private async sendBatch() {
    if (this.buffer.length === 0) return

    const batch = this.buffer.splice(0, this.batchSize)
    try {
      socketService.emit('analytics', batch)
    } catch (error) {
      console.error('Failed to send analytics batch:', error)
      // Optionally store failed batches for retry
      this.buffer = [...batch, ...this.buffer]
    }
  }

  private getUserId(): string | undefined {
    // Implement your user ID retrieval logic here
    return localStorage.getItem('userId') || undefined
  }

  public startTracking() {
    this.isTracking = true
    // Start periodic batch sending
    setInterval(() => this.sendBatch(), this.batchTimeout)
  }

  public stopTracking() {
    this.isTracking = false
  }

  // Utility methods for specific tracking needs
  public trackError(error: Error, metadata?: Record<string, any>) {
    this.trackInteraction({
      type: 'error',
      metadata: {
        message: error.message,
        stack: error.stack,
        ...metadata
      }
    })
  }

  public trackSuccess(action: string, metadata?: Record<string, any>) {
    this.trackInteraction({
      type: 'success',
      metadata: {
        action,
        ...metadata
      }
    })
  }
}

export const analyticsTracker = new AnalyticsTracker() 