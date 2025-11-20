import { addQuotes } from '@/lib/quotes'
import { expandQuotes } from '@/lib/quotePools'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { category, count = 300 } = await request.json().catch(() => ({}))
    
    const categories = category 
      ? [category] 
      : ['Love Quotes', 'Attitude Status', 'Shayari', 'Motivation Quotes', 'Festival Wishes']
    
    let totalAdded = 0
    
    for (const cat of categories) {
      const expandedQuotes = expandQuotes(cat, count)
      const quotesToAdd = expandedQuotes.map(text => ({
        text,
        category: cat,
        author: 'Unknown',
      }))
      
      if (quotesToAdd.length > 0) {
        addQuotes(quotesToAdd)
        totalAdded += quotesToAdd.length
        console.log(`✅ Added ${quotesToAdd.length} quotes to ${cat}`)
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully added ${totalAdded} quotes`,
      quotesAdded: totalAdded,
      categories: categories,
    })
  } catch (error) {
    console.error('Error initializing quotes:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

export async function GET(request) {
  return NextResponse.json({ 
    message: 'Use POST method to initialize quotes',
    endpoint: '/api/init',
    usage: 'POST with { "category": "Love Quotes", "count": 300 } or { "count": 300 } for all categories'
  })
}
