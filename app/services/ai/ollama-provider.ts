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
      const response = await fetch(`${this.baseUrl}/api/pull`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.model })
      })
      
      if (!response.ok) {
        throw new Error(`Failed to pull model: ${response.statusText}`)
      }
      
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize Ollama:', error)
      // Don't throw - allow graceful degradation
    }
  }

  async isAvailable(): Promise<boolean> {
    if (!this.isInitialized) return false
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`)
      if (!response.ok) return false
      const data = await response.json()
      return data.models?.includes(this.model) || false
    } catch {
      return false
    }
  }

  async chat(messages: AIMessage[]): Promise<AIMessage> {
    try {
      if (!this.isInitialized) {
        throw new Error('Ollama not initialized')
      }

      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          messages,
          stream: false
        })
      })

      if (!response.ok) {
        throw new Error(`Chat failed: ${response.statusText}`)
      }

      const data = await response.json()
      return {
        role: 'assistant',
        content: data.response
      }
    } catch (error) {
      console.error('Ollama chat error:', error)
      return {
        role: 'assistant',
        content: "I'm having trouble connecting to the AI service. Please try again later."
      }
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
        // Don't throw - allow graceful cleanup
      }
    }
  }
} 