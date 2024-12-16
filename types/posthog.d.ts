declare module 'posthog-js' {
  interface PostHogOptions {
    api_host?: string
    autocapture?: boolean
    capture_pageview?: boolean
    disable_session_recording?: boolean
    loaded?: (posthog: PostHog) => void
    bootstrap?: any
  }

  interface Properties {
    [key: string]: any
  }

  interface PostHog {
    init(apiKey: string, options?: PostHogOptions): void
    capture(event: string, properties?: Properties): void
    identify(distinctId: string, properties?: Properties): void
    reset(): void
    opt_in_capturing(): void
    opt_out_capturing(): void
  }

  const posthog: PostHog
  export default posthog
} 