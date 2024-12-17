import { OpenAI } from 'openai'
import { AIProvider, AIMessage } from './types'

export class OpenAIProvider implements AIProvider {
  private client: OpenAI | null = null
  private ollamaEndpoint = 'http://localhost:11434/api/chat'

  async initialize() {
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      this.client = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      })
    }
  }

  async isAvailable(): Promise<boolean> {
    if (process.env.NODE_ENV === 'development') {
      try {
        const response = await fetch(this.ollamaEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'qwen:2.5',
            messages: [{ role: 'system', content: 'test' }]
          })
        })
        return response.ok
      } catch {
        return false
      }
    }

    if (!this.client) return false
    try {
      await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'system', content: 'test' }],
        max_tokens: 1
      })
      return true
    } catch {
      return false
    }
  }

  async chat(messages: AIMessage[]): Promise<AIMessage> {
    if (process.env.NODE_ENV === 'development') {
      try {
        const response = await fetch(this.ollamaEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'qwen:2.5',
            messages,
            stream: false
          })
        })

        if (!response.ok) {
          throw new Error('Ollama API error')
        }

        const data = await response.json()
        return {
          role: 'assistant',
          content: data.message?.content || 'No response from Ollama'
        }
      } catch (error) {
        console.error('Ollama chat error:', error)
        throw error
      }
    }

    if (!this.client) {
      throw new Error('OpenAI client not initialized in production')
    }

    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages,
        tools: [], // Add your tools here
      })

      return {
        role: 'assistant',
        content: response.choices[0].message.content || ''
      }
    } catch (error) {
      console.error('OpenAI chat error:', error)
      throw error
    }
  }

  async cleanup() {
    this.client = null
  }
} 