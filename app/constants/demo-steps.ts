import { DemoStep, DemoResponses } from '@/app/types/demo'

export const DEMO_STEPS: DemoStep[] = [
  {
    id: 'welcome',
    message: "Hi! I'm your AI assistant. Would you like a tour of our platform?",
    waitForResponse: true,
    location: '/'
  },
  {
    id: 'login',
    message: "Let's start by logging in with a demo account.",
    action: 'login',
    credentials: {
      email: 'demo@example.com',
      password: 'demo123'
    }
  },
  {
    id: 'dashboard',
    message: "Great! Let's check out your dashboard.",
    action: 'navigate',
    path: '/dashboard'
  },
  {
    id: 'analytics',
    message: "Here you can see your analytics overview. Notice the real-time data updates.",
    action: 'highlight',
    selector: '.analytics-overview'
  },
  {
    id: 'features',
    message: "Let's explore some key features. You can customize these charts and export data.",
    action: 'highlight',
    selector: '.chart-controls'
  },
  {
    id: 'settings',
    message: "You can manage your account settings here.",
    action: 'navigate',
    path: '/dashboard/settings'
  },
  {
    id: 'customization',
    message: "Feel free to customize your dashboard layout and preferences.",
    action: 'highlight',
    selector: '.customization-panel'
  },
  {
    id: 'completion',
    message: "That completes our tour! Would you like to explore anything specific?",
    waitForResponse: true
  }
]

export const DEMO_RESPONSES: DemoResponses = {
  stop: "Demo stopped. I'm still here if you need help!",
  continue: "Let's continue where we left off.",
  notFound: "I couldn't find what you're looking for in demo mode.",
  error: "Something went wrong. Let's try that again.",
  completed: "You've completed the demo! Feel free to explore on your own."
} 