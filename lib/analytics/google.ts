declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export function initGoogleAnalytics() {
  if (typeof window === 'undefined') return
  
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID
  if (!GA_TRACKING_ID) return

  // Load Google Analytics Script
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(script1)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
    send_page_view: true
  })
}

export function trackPageView(url: string) {
  if (typeof window === 'undefined') return
  
  window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID!, {
    page_path: url,
  })
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window === 'undefined') return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}

export function trackUserProperties(properties: Record<string, any>) {
  if (typeof window === 'undefined') return

  window.gtag('set', 'user_properties', properties)
}

export function trackException(description: string, fatal: boolean = false) {
  if (typeof window === 'undefined') return

  window.gtag('event', 'exception', {
    description,
    fatal
  })
}

export function trackTiming(name: string, value: number, category?: string, label?: string) {
  if (typeof window === 'undefined') return

  window.gtag('event', 'timing_complete', {
    name,
    value,
    event_category: category,
    event_label: label
  })
} 