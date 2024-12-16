import { AIProvider, AIMessage } from './types'
import { OpenAIProvider } from './openai-provider'
import { OllamaProvider } from './ollama-provider'
import { DemoProvider } from './demo-provider'

class AIService {
  private provider: AIProvider | null = null
  private openai = new OpenAIProvider()
  private ollama = new OllamaProvider()
  private demo = new DemoProvider()

  async initialize() {
    // Try OpenAI first
    await this.openai.initialize()
    if (await this.openai.isAvailable()) {
      this.provider = this.openai
      return
    }

    // Try Ollama next
    await this.ollama.initialize()
    if (await this.ollama.isAvailable()) {
      this.provider = this.ollama
      return
    }

    // Fall back to demo mode
    await this.demo.initialize()
    this.provider = this.demo
  }

  async chat(messages: AIMessage[]): Promise<AIMessage> {
    if (!this.provider) {
      await this.initialize()
    }
    return this.provider!.chat(messages)
  }

  async cleanup() {
    if (this.provider) {
      await this.provider.cleanup()
      this.provider = null
    }
  }

  isDemo(): boolean {
    return this.provider instanceof DemoProvider
  }
}

export const aiService = new AIService() 