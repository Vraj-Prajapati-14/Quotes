import { getAllQuotes, addQuote } from '@/lib/quotes'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    
    let quotes = getAllQuotes()
    
    if (category) {
      quotes = quotes.filter(q => q.category === category)
    }
    
    if (limit) {
      quotes = quotes.slice(0, parseInt(limit))
    }
    
    return NextResponse.json({ 
      success: true,
      count: quotes.length,
      quotes 
    })
  } catch (error) {
    console.error('Error fetching quotes:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { text, category, author } = body
    
    if (!text || !category) {
      return NextResponse.json({ 
        success: false, 
        error: 'Text and category are required' 
      }, { status: 400 })
    }
    
    const newQuote = addQuote({
      text,
      category,
      author: author || 'Unknown',
    })
    
    return NextResponse.json({ 
      success: true, 
      quote: newQuote 
    }, { status: 201 })
  } catch (error) {
    console.error('Error adding quote:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

