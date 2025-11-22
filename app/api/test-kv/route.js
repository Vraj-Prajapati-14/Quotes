import { NextResponse } from 'next/server'

export async function GET(request) {
  const result = {
    timestamp: new Date().toISOString(),
    env: {
      REDIS_URL: process.env.REDIS_URL ? 'Set' : 'Not set',
      KV_REST_API_URL: process.env.KV_REST_API_URL ? 'Set' : 'Not set',
      KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ? 'Set' : 'Not set',
      VERCEL: !!process.env.VERCEL,
      connectionType: process.env.REDIS_URL ? 'Direct Redis (REDIS_URL)' : 
                      (process.env.KV_REST_API_URL ? 'REST API (KV_REST_API_URL)' : 'Not configured'),
    },
    tests: {}
  }

  // Test 1: Try direct Redis connection (REDIS_URL)
  if (process.env.REDIS_URL) {
    try {
      const { createClient } = await import('redis')
      const redis = createClient({
        url: process.env.REDIS_URL,
      })
      await redis.connect()
      
      // Test write
      await redis.set('test:key', JSON.stringify({ message: 'Hello from KV', timestamp: Date.now() }))
      result.tests.redisDirectWrite = '✅ Success'
      
      // Test read
      const rawValue = await redis.get('test:key')
      const value = rawValue ? JSON.parse(rawValue) : null
      result.tests.redisDirectRead = value ? '✅ Success' : '❌ Failed'
      result.tests.redisDirectValue = value
      
      // Test delete
      await redis.del('test:key')
      result.tests.redisDirectDelete = '✅ Success'
      
      await redis.disconnect()
      result.status = 'success'
      result.client = 'redis-direct'
    } catch (error) {
      result.tests.redisDirectError = error.message
      result.tests.redisDirectStack = error.stack
      result.status = 'error'
      result.error = 'Redis direct connection failed'
    }
  }
  // Test 2: Try REST API (@upstash/redis)
  else if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const { Redis } = await import('@upstash/redis')
      const redis = new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
      
      // Test write
      await redis.set('test:key', { message: 'Hello from KV', timestamp: Date.now() })
      result.tests.upstashWrite = '✅ Success'
      
      // Test read
      const value = await redis.get('test:key')
      result.tests.upstashRead = value ? '✅ Success' : '❌ Failed'
      result.tests.upstashValue = value
      
      // Test delete
      await redis.del('test:key')
      result.tests.upstashDelete = '✅ Success'
      
      result.status = 'success'
      result.client = 'upstash-redis'
    } catch (error) {
      result.tests.upstashError = error.message
      result.tests.upstashStack = error.stack
      
      // Test 3: Try @vercel/kv as fallback
      try {
        const { kv } = await import('@vercel/kv')
        await kv.set('test:key', { message: 'Hello from KV', timestamp: Date.now() })
        result.tests.vercelKvWrite = '✅ Success'
        
        const value = await kv.get('test:key')
        result.tests.vercelKvRead = value ? '✅ Success' : '❌ Failed'
        result.tests.vercelKvValue = value
        
        await kv.del('test:key')
        result.tests.vercelKvDelete = '✅ Success'
        
        result.status = 'success'
        result.client = 'vercel-kv'
      } catch (vercelError) {
        result.tests.vercelKvError = vercelError.message
        result.status = 'error'
        result.error = 'Both REST API clients failed'
      }
    }
  } else {
    result.status = 'error'
    result.error = 'No Redis configuration found (neither REDIS_URL nor KV_REST_API_URL)'
  }

  return NextResponse.json(result, {
    status: result.status === 'success' ? 200 : 500
  })
}

