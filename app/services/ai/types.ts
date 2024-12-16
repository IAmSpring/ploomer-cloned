export interface AIMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  toolCalls?: any[]
}

export interface AIProvider {
  initialize(): Promise<void>
  chat(messages: AIMessage[]): Promise<AIMessage>
  cleanup(): Promise<void>
  isAvailable(): Promise<boolean>
} 