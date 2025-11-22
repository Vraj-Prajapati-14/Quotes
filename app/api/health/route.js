import { NextResponse } from 'next/server'

export async function GET(request) {
  const health = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercel: !!process.env.VERCEL,
    redisUrl: process.env.REDIS_URL ? 'Set' : 'Not set',
    kvRestUrl: process.env.KV_REST_API_URL ? 'Set' : 'Not set',
    kvRestToken: process.env.KV_REST_API_TOKEN ? 'Set' : 'Not set',
    kvConfigured: !!(process.env.REDIS_URL || (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)),
    connectionType: process.env.REDIS_URL ? 'Direct Redis (REDIS_URL)' : 
                    (process.env.KV_REST_API_URL ? 'REST API (KV_REST_API_URL)' : 'Not configured'),
  }

  // Try to test KV connection
  if (health.kvConfigured) {
    try {
      // Try direct Redis connection first (REDIS_URL)
      if (process.env.REDIS_URL) {
        try {
          const { createClient } = await import('redis')
          const redis = createClient({
            url: process.env.REDIS_URL,
          })
          await redis.connect()
          await redis.get('test:connection')
          await redis.disconnect()
          health.kvClient = 'redis-direct'
          health.kvConnected = true
          health.status = 'healthy'
        } catch (redisError) {
          health.kvClient = 'redis-direct'
          health.kvConnected = false
          health.kvError = redisError.message
          health.status = 'kv_error'
        }
      } 
      // Try REST API connection (KV_REST_API_URL)
      else if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        try {
          const { Redis } = await import('@upstash/redis')
          const redis = new Redis({
            url: process.env.KV_REST_API_URL,
            token: process.env.KV_REST_API_TOKEN,
          })
          await redis.get('test:connection')
          health.kvClient = 'upstash-redis'
          health.kvConnected = true
          health.status = 'healthy'
        } catch (upstashError) {
          // Fallback to @vercel/kv
          try {
            const { kv } = await import('@vercel/kv')
            await kv.get('test:connection')
            health.kvClient = 'vercel-kv'
            health.kvConnected = true
            health.status = 'healthy'
          } catch (vercelError) {
            health.kvClient = 'rest-api'
            health.kvConnected = false
            health.kvError = upstashError.message
            health.status = 'kv_error'
          }
        }
      }
    } catch (error) {
      health.kvConnected = false
      health.kvError = error.message
      health.status = 'kv_error'
    }
  } else {
    health.status = health.vercel ? 'kv_not_configured' : 'local_dev'
  }

  return NextResponse.json(health, { 
    status: health.status === 'healthy' || health.status === 'local_dev' ? 200 : 500 
  })
}

