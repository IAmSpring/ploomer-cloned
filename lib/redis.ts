import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.REDIS_URL
})

redisClient.on('error', (err) => console.error('Redis Client Error', err))
redisClient.on('connect', () => console.log('Redis Client Connected'))

// Connect to redis on app startup
redisClient.connect().catch(console.error)

const CACHE_TTL = 60 * 5 // 5 minutes

export async function cacheGet<T>(key: string): Promise<T | null> {
  const data = await redisClient.get(key)
  return data ? JSON.parse(data) : null
}

export async function cacheSet(key: string, data: any, ttl = CACHE_TTL) {
  await redisClient.setEx(key, ttl, JSON.stringify(data))
}

export { redisClient } 