declare module '@sentry/nextjs' {
  interface SentryOptions {
    dsn?: string
    tracesSampleRate: number
    replaysSessionSampleRate?: number
    replaysOnErrorSampleRate?: number
    enabled?: boolean
    environment?: string
    debug?: boolean
  }

  export function init(options: SentryOptions): void
  export function captureException(error: Error): void
  export function captureMessage(message: string): void
} 