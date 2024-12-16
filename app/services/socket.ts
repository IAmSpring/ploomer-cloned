import { io, Socket } from 'socket.io-client'

interface MessagePayload {
  content: string
  role: 'user' | 'assistant' | 'system'
  timestamp: number
}

class SocketService {
  private socket: Socket | null = null
  private messageHandlers: ((message: MessagePayload) => void)[] = []

  connect() {
    if (!this.socket) {
      this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
        transports: ['websocket'],
        autoConnect: true
      })

      this.socket.on('connect', () => {
        console.log('Socket connected')
      })

      this.socket.on('message', (message: MessagePayload) => {
        this.messageHandlers.forEach(handler => handler(message))
      })

      this.socket.on('disconnect', () => {
        console.log('Socket disconnected')
      })
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  onMessage(handler: (message: MessagePayload) => void) {
    this.messageHandlers.push(handler)
  }

  removeMessageHandler(handler: (message: MessagePayload) => void) {
    this.messageHandlers = this.messageHandlers.filter(h => h !== handler)
  }

  sendMessage(content: string, role: 'user' | 'assistant' | 'system' = 'user') {
    if (this.socket) {
      const payload: MessagePayload = {
        content,
        role,
        timestamp: Date.now()
      }
      this.socket.emit('message', payload)
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data)
    }
  }
}

export const socketService = new SocketService() 