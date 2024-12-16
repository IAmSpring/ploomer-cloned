export interface DemoCredentials {
  email: string
  password: string
}

export interface DemoStep {
  id: string
  message: string
  waitForResponse?: boolean
  location?: string
  action?: 'login' | 'navigate' | 'highlight'
  credentials?: DemoCredentials
  path?: string
  selector?: string
}

export interface DemoResponses {
  stop: string
  continue: string
  notFound: string
  error: string
  completed: string
} 