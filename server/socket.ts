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

  socket.on('analytics', (batch) => {
    console.log('Analytics batch received:', batch)
    // Here you would typically:
    // 1. Store in database
    // 2. Process for real-time analytics
    // 3. Forward to analytics service
    
    try {
      // Example: Store in database
      storeAnalytics(batch)
      
      // Example: Real-time processing
      processRealTimeAnalytics(batch)
      
      // Example: Forward to analytics service
      forwardToAnalyticsService(batch)
    } catch (error) {
      console.error('Error processing analytics:', error)
    }
  })
})

// Example implementation functions
async function storeAnalytics(batch: any[]) {
  // Store in your database
  // await prisma.userInteraction.createMany({ data: batch })
}

function processRealTimeAnalytics(batch: any[]) {
  // Process for real-time insights
  const errorCount = batch.filter(i => i.type === 'error').length
  const uniqueUsers = new Set(batch.map(i => i.userId)).size
  
  // Emit real-time stats to admin dashboard
  io.to('admin').emit('analytics_stats', {
    errorCount,
    uniqueUsers,
    timestamp: Date.now()
  })
}

function forwardToAnalyticsService(batch: any[]) {
  // Forward to external analytics service
  // Example: PostHog, Mixpanel, etc.
}

const PORT = process.env.SOCKET_PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`)
}) 