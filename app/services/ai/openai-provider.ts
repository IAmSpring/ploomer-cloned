import { OpenAI } from 'openai'
import { AIProvider, AIMessage } from './types'

export class OpenAIProvider implements AIProvider {
  private client: OpenAI | null = null

  async initialize() {
    if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      this.client = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
      })
    }
  }

  async isAvailable(): Promise<boolean> {
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
    if (!this.client) throw new Error('OpenAI not initialized')
    
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      tools: [], // Add your tools here
    })

    return {
      role: 'assistant',
      content: response.choices[0].message.content || ''
    }
  }

  async cleanup() {
    this.client = null
  }
} 