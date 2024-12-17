import posthog from 'posthog-js'
import { datadogRum } from '@datadog/browser-rum'
import * as ga from './analytics/google'
import * as Sentry from '@sentry/nextjs'

type EventProperties = {
  [key: string]: any
}

export const analytics = {
  init: () => {
    // Initialize all analytics services
    ga.initGoogleAnalytics()

    // Initialize PostHog
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_API_KEY
    if (posthogKey && typeof window !== 'undefined') {
      posthog.init(posthogKey, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        autocapture: true,
        capture_pageview: true,
        disable_session_recording: false
      })
    }

    // Initialize Datadog
    const datadogAppId = process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID
    const datadogClientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN
    if (datadogAppId && datadogClientToken && typeof window !== 'undefined') {
      datadogRum.init({
        applicationId: datadogAppId,
        clientToken: datadogClientToken,
        site: process.env.NEXT_PUBLIC_DATADOG_SITE || 'datadoghq.com',
        service: 'saas-platform',
        env: process.env.NODE_ENV,
        version: process.env.NEXT_PUBLIC_APP_VERSION,
        sessionSampleRate: 100,
        sessionReplaySampleRate: 20,
        trackUserInteractions: true,
        trackResources: true,
        trackLongTasks: true,
        defaultPrivacyLevel: 'mask-user-input'
      })
    }

    // Initialize Sentry
    const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN
    if (sentryDsn && typeof window !== 'undefined') {
      Sentry.init({
        dsn: sentryDsn,
        environment: process.env.NODE_ENV,
        release: process.env.NEXT_PUBLIC_APP_VERSION,
        tracesSampleRate: 1.0,
      })
    }
  },

  track: (eventName: string, properties?: EventProperties) => {
    // PostHog
    if (typeof window !== 'undefined') {
      posthog.capture(eventName, properties)
    }

    // Datadog
    datadogRum.addAction(eventName, properties)

    // Google Analytics
    ga.trackEvent(
      eventName,
      properties?.category || 'general',
      properties?.label,
      properties?.value
    )

    // Sentry
    if (properties?.error) {
      Sentry.captureEvent({
        message: eventName,
        level: properties.level || 'info',
        extra: properties
      })
    }
  },

  identify: (userId: string, traits?: EventProperties) => {
    // PostHog
    if (typeof window !== 'undefined') {
      posthog.identify(userId, traits)
    }

    // Datadog
    datadogRum.setUser({
      id: userId,
      ...traits
    })

    // Google Analytics
    ga.trackUserProperties({
      user_id: userId,
      ...traits
    })

    // Sentry
    Sentry.setUser({
      id: userId,
      ...traits
    })
  },

  pageView: (url: string) => {
    // Google Analytics
    ga.trackPageView(url)

    // PostHog
    if (typeof window !== 'undefined') {
      posthog.capture('$pageview', { url })
    }

    // Datadog
    datadogRum.addAction('pageview', { url })
  },

  timing: (name: string, value: number, category?: string, label?: string) => {
    // Google Analytics
    ga.trackTiming(name, value, category, label)

    // Datadog
    datadogRum.addAction('timing', { name, value, category, label })
  },

  error: (error: Error, fatal: boolean = false) => {
    // Google Analytics
    ga.trackException(error.message, fatal)

    // Datadog
    datadogRum.addError(error)

    // PostHog
    if (typeof window !== 'undefined') {
      posthog.capture('error', {
        message: error.message,
        stack: error.stack,
        fatal
      })
    }

    // Sentry
    Sentry.captureException(error, {
      level: fatal ? 'fatal' : 'error'
    })
  }
} 