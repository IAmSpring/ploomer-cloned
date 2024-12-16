interface OllamaResponse {
  model: string
  created_at: string
  response: string
  done: boolean
}

class OllamaService {
  private baseUrl: string
  private model: string = 'qwen:3b'

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
    } catch (error) {
      console.error('Failed to pull Ollama model:', error)
    }
  }

  async chat(messages: any[]) {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          messages,
          stream: false
        })
      })

      const data: OllamaResponse = await response.json()
      return data
    } catch (error) {
      console.error('Ollama chat error:', error)
      throw error
    }
  }

  async cleanup() {
    try {
      await fetch(`${this.baseUrl}/api/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.model })
      })
    } catch (error) {
      console.error('Failed to delete Ollama model:', error)
    }
  }
}

export const ollamaService = new OllamaService() 