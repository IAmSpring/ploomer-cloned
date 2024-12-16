import { Server } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'
import type { NextApiRequest } from 'next'
import type { Server as HTTPServer } from 'http'

export const config = {
  api: {
    bodyParser: false,
  },
}

export function initSocketServer(server: HTTPServer) {
  const io = new Server(server, {
    path: '/api/socketio',
    addTrailingSlash: false,
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL,
      methods: ['GET', 'POST'],
    },
  })

  if (process.env.REDIS_URL) {
    const pubClient = createClient({ url: process.env.REDIS_URL })
    const subClient = pubClient.duplicate()

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
      io.adapter(createAdapter(pubClient, subClient))
      console.log('Socket.io Redis adapter initialized')
    })
  }

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    socket.on('join-analytics', (userId: string) => {
      socket.join(`analytics:${userId}`)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })

  return io
} 