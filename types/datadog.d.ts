declare module '@datadog/browser-rum' {
  interface DatadogUser {
    id?: string
    name?: string
    email?: string
    [key: string]: any
  }

  interface DatadogInitOptions {
    applicationId: string
    clientToken: string
    site?: string
    service?: string
    env?: string
    version?: string
    sessionSampleRate?: number
    sessionReplaySampleRate?: number
    trackUserInteractions?: boolean
    trackResources?: boolean
    trackLongTasks?: boolean
    defaultPrivacyLevel?: 'mask-user-input' | 'allow' | 'mask' | 'mask-all'
  }

  interface DatadogRum {
    init(options: DatadogInitOptions): void
    startSessionReplayRecording(): void
    addRumGlobalContext(key: string, value: any): void
    setRumUserProp(key: string, value: any): void
    setUser(user: DatadogUser): void
    removeUser(): void
    addAction(name: string, context?: Record<string, unknown>): void
    addError(error: Error, context?: Record<string, unknown>): void
    addTiming(name: string, time?: number): void
  }

  export const datadogRum: DatadogRum
} 