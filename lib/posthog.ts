import posthog from 'posthog-js'

export function initPostHog() {
  if (typeof window === 'undefined') return
  
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_API_KEY
  if (!apiKey) return

  posthog.init(apiKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    autocapture: true,
    capture_pageview: true,
    disable_session_recording: false
  })
}

export { posthog } 