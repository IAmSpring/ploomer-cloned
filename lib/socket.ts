import { Server } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'
import type { SocketServer } from '@/types/socket'

let io: SocketServer

export async function initSocket(httpServer: any) {
  if (!io) {
    io = new Server(httpServer, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL,
        methods: ['GET', 'POST']
      }
    })

    const pubClient = createClient({ url: process.env.REDIS_URL })
    const subClient = pubClient.duplicate()

    await Promise.all([pubClient.connect(), subClient.connect()])
    io.adapter(createAdapter(pubClient, subClient))

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id)

      socket.on('join-room', (roomId) => {
        socket.join(roomId)
      })

      socket.on('leave-room', (roomId) => {
        socket.leave(roomId)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })
  }

  return io
}

export { io } 