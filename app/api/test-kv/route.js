import { NextResponse } from 'next/server'

export async function GET(request) {
  const result = {
    timestamp: new Date().toISOString(),
    env: {
      KV_REST_API_URL: process.env.KV_REST_API_URL ? 'Set' : 'Not set',
      KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ? 'Set' : 'Not set',
      VERCEL: !!process.env.VERCEL,
    },
    tests: {}
  }

  // Test 1: Try @upstash/redis
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
    
    // Test 2: Try @vercel/kv as fallback
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
      result.error = 'Both clients failed'
    }
  }

  return NextResponse.json(result, {
    status: result.status === 'success' ? 200 : 500
  })
}

