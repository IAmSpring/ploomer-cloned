import { datadogRum } from '@datadog/browser-rum'

export function initDatadog() {
  if (typeof window === 'undefined') return

  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID!,
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN!,
    site: process.env.NEXT_PUBLIC_DATADOG_SITE || 'datadoghq.com',
    service: 'your-service-name',
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