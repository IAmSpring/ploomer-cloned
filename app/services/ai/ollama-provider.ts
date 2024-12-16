import { AIProvider, AIMessage } from './types'

export class OllamaProvider implements AIProvider {
  private baseUrl: string
  private model: string = 'qwen:3b'
  private isInitialized: boolean = false

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_OLLAMA_URL || 'http://localhost:11434'
  }

  async initialize() {
    try {
      await fetch(`${this.baseUrl}/api/pull`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.model })
      })
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize Ollama:', error)
    }
  }

  async isAvailable(): Promise<boolean> {
    if (!this.isInitialized) return false
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`)
      const data = await response.json()
      return data.models?.includes(this.model) || false
    } catch {
      return false
    }
  }

  async chat(messages: AIMessage[]): Promise<AIMessage> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        messages,
        stream: false
      })
    })

    const data = await response.json()
    return {
      role: 'assistant',
      content: data.response
    }
  }

  async cleanup() {
    if (this.isInitialized) {
      try {
        await fetch(`${this.baseUrl}/api/delete`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: this.model })
        })
      } catch (error) {
        console.error('Failed to cleanup Ollama:', error)
      }
    }
  }
} 