import { AIProvider, AIMessage } from './types'
import { DEMO_STEPS } from '@/app/constants/demo-steps'

export class DemoProvider implements AIProvider {
  private currentStep = 0

  async initialize() {
    this.currentStep = 0
  }

  async isAvailable(): Promise<boolean> {
    return true // Demo mode is always available
  }

  async chat(messages: AIMessage[]): Promise<AIMessage> {
    const lastMessage = messages[messages.length - 1]
    
    // Handle demo flow
    if (this.currentStep < DEMO_STEPS.length) {
      const step = DEMO_STEPS[this.currentStep]
      this.currentStep++
      return {
        role: 'assistant',
        content: step.message
      }
    }

    // Default responses for out-of-demo interactions
    return {
      role: 'assistant',
      content: "I'm in demo mode. I can show you around the platform's features!"
    }
  }

  async cleanup() {
    this.currentStep = 0
  }
} 