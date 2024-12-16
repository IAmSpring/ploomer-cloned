import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const initializeSocket = () => {
  if (!socket && typeof window !== 'undefined') {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      autoConnect: false,
    })
  }
  return socket
}

export const getSocket = () => socket 