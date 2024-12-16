import { Server } from 'socket.io'
import { createServer } from 'http'
import { chat } from '../app/services/openai'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL,
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('Client connected')

  socket.on('message', async (message) => {
    // Broadcast message to all clients
    io.emit('message', message)

    // Process with OpenAI and send response
    try {
      const response = await chat([message])
      const assistantMessage = {
        content: response.choices[0].message.content,
        role: 'assistant',
        timestamp: Date.now()
      }
      io.emit('message', assistantMessage)
    } catch (error) {
      console.error('OpenAI error:', error)
      io.emit('message', {
        content: 'Sorry, there was an error processing your request.',
        role: 'system',
        timestamp: Date.now()
      })
    }
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

const PORT = process.env.SOCKET_PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`)
}) 