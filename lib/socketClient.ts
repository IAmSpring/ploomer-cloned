import { io, Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '@/types/socket'

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null

export const initializeSocket = () => {
  if (!socket && typeof window !== 'undefined') {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      autoConnect: false,
    })
  }
  return socket
}

export const getSocket = () => socket