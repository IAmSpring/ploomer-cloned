export type MessageRole = 'user' | 'assistant' | 'system'

export interface AIMessage {
  role: MessageRole
  content: string
  toolCalls?: any[]
}

export interface AIProvider {
  initialize(): Promise<void>
  isAvailable(): Promise<boolean>
  chat(messages: AIMessage[]): Promise<AIMessage>
  cleanup(): void
} 