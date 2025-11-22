import { NextResponse } from 'next/server'

export async function GET(request) {
  const health = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercel: !!process.env.VERCEL,
    kvConfigured: !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN),
    kvUrl: process.env.KV_REST_API_URL ? 'Set' : 'Not set',
    kvToken: process.env.KV_REST_API_TOKEN ? 'Set' : 'Not set',
  }

  // Try to test KV connection
  if (health.kvConfigured) {
    try {
      // Try @upstash/redis first
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
        const { kv } = await import('@vercel/kv')
        await kv.get('test:connection')
        health.kvClient = 'vercel-kv'
        health.kvConnected = true
        health.status = 'healthy'
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

