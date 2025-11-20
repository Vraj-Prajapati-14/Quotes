import { runManualUpdate } from '@/lib/scheduler'
import { NextResponse } from 'next/server'

// This API route can be called to manually trigger updates
// In production, you might want to protect this with authentication
export async function POST(request) {
  try {
    // Optional: Add authentication check here
    // const authHeader = request.headers.get('authorization')
    // if (authHeader !== `Bearer ${process.env.API_SECRET}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const count = runManualUpdate()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Update triggered successfully',
      quotesAdded: count,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error triggering update:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

export async function GET(request) {
  return NextResponse.json({ 
    message: 'Use POST method to trigger manual update',
    endpoint: '/api/update'
  })
}

