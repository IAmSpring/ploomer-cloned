import { datadogRum } from '@datadog/browser-rum'

let initialized = false

export function initDatadog() {
  if (initialized || process.env.NODE_ENV !== 'production') return
  
  if (!process.env.NEXT_PUBLIC_DATADOG_APP_ID || !process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN) {
    return
  }

  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DATADOG_APP_ID,
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
    site: 'datadoghq.com',
    service: 'saas-platform',
    env: process.env.NODE_ENV,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
  })

  initialized = true
} 