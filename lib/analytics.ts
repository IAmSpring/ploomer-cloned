import posthog from 'posthog-js'
import { datadogRum } from '@datadog/browser-rum'

type EventProperties = {
  [key: string]: any
}

export const analytics = {
  track: (eventName: string, properties?: EventProperties) => {
    // PostHog
    if (typeof window !== 'undefined') {
      posthog.capture(eventName, properties)
    }

    // Datadog
    datadogRum.addAction(eventName, properties)
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
  }
} 