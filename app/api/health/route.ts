import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import Redis from 'ioredis'

const prisma = new PrismaClient()
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    // Check Redis connection
    await redis.ping()
    
    return NextResponse.json(
      { 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          database: 'connected',
          redis: 'connected'
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { 
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    )
  } finally {
    await prisma.$disconnect()
    await redis.quit()
  }
} 