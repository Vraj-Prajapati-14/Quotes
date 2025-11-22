// Quotes storage using Vercel KV (Redis)
// Fallback to file system for local development

let kvClient = null
let useKV = false
let kvInitialized = false

// Initialize Vercel KV (lazy initialization)
async function initKV() {
  if (kvInitialized) {
    return useKV
  }
  
  kvInitialized = true
  
  try {
    // Option 1: Direct Redis connection (REDIS_URL)
    if (process.env.REDIS_URL) {
      try {
        const { createClient } = await import('redis')
        const redis = createClient({
          url: process.env.REDIS_URL,
        })
        await redis.connect()
        kvClient = redis
        useKV = true
        console.log('✅ Using Redis direct connection (REDIS_URL) for storage')
        return true
      } catch (redisError) {
        console.error('❌ Failed to connect to Redis:', redisError.message)
        throw redisError
      }
    }
    
    // Option 2: REST API connection (KV_REST_API_URL + KV_REST_API_TOKEN)
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      try {
        const { Redis } = await import('@upstash/redis')
        kvClient = new Redis({
          url: process.env.KV_REST_API_URL,
          token: process.env.KV_REST_API_TOKEN,
        })
        useKV = true
        console.log('✅ Using Vercel KV (Upstash Redis REST API) for storage')
        return true
      } catch (upstashError) {
        console.log('⚠️ Upstash Redis not available, trying @vercel/kv:', upstashError.message)
        // Fallback to @vercel/kv
        const kvModule = await import('@vercel/kv')
        kvClient = kvModule.kv
        useKV = true
        console.log('✅ Using Vercel KV (@vercel/kv) for storage')
        return true
      }
    }
  } catch (error) {
    console.log('⚠️ Vercel KV not available, using file system (local only):', error.message)
  }
  return false
}

// Fallback to file system for local development
import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data')
const quotesFile = path.join(dataDirectory, 'quotes.json')

const QUOTES_KEY = 'quotes:data'

// Sample quotes for initialization
const sampleQuotes = [
  {
    id: 1,
    text: "Love is not about how much you say 'I love you', but how much you prove that it's true.",
    category: "Love Quotes",
    author: "Unknown",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    text: "The best thing to hold onto in life is each other.",
    category: "Love Quotes",
    author: "Audrey Hepburn",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    text: "I don't need a perfect person, I need someone who makes me feel perfect.",
    category: "Love Quotes",
    author: "Unknown",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    text: "I am who I am, and I don't need to prove anything to anyone.",
    category: "Attitude Status",
    author: "Unknown",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    text: "My attitude is based on how you treat me.",
    category: "Attitude Status",
    author: "Unknown",
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    text: "I'm not perfect, but I'm limited edition.",
    category: "Attitude Status",
    author: "Unknown",
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    text: "Dil ki baat labon tak aayi, Shayari ban kar rah gayi.",
    category: "Shayari",
    author: "Unknown",
    createdAt: new Date().toISOString(),
  },
  {
    id: 8,
    text: "Mohabbat ek aisi kitaab hai, Jise padh kar dil ko sukoon milta hai.",
    category: "Shayari",
    author: "Unknown",
    createdAt: new Date().toISOString(),
  },
  {
    id: 9,
    text: "Zindagi mein kuch pal aise aate hain, Jo hamesha yaad rahte hain.",
    category: "Shayari",
    author: "Unknown",
    createdAt: new Date().toISOString(),
  },
  {
    id: 10,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    category: "Motivation Quotes",
    author: "Winston Churchill",
    createdAt: new Date().toISOString(),
  },
  {
    id: 11,
    text: "The only way to do great work is to love what you do.",
    category: "Motivation Quotes",
    author: "Steve Jobs",
    createdAt: new Date().toISOString(),
  },
  {
    id: 12,
    text: "Believe you can and you're halfway there.",
    category: "Motivation Quotes",
    author: "Theodore Roosevelt",
    createdAt: new Date().toISOString(),
  },
  {
    id: 13,
    text: "May this festival bring joy, happiness, and prosperity to your life. Happy Diwali!",
    category: "Festival Wishes",
    author: "Unknown",
    createdAt: new Date().toISOString(),
  },
  {
    id: 14,
    text: "Wishing you a year filled with happiness, success, and new opportunities. Happy New Year!",
    category: "Festival Wishes",
    author: "Unknown",
    createdAt: new Date().toISOString(),
  },
  {
    id: 15,
    text: "May the colors of Holi fill your life with happiness and joy. Happy Holi!",
    category: "Festival Wishes",
    author: "Unknown",
    createdAt: new Date().toISOString(),
  },
]

// Get data from KV or file system
async function getData() {
  // Initialize KV if not already done
  if (!kvInitialized) {
    await initKV()
  }
  
  if (useKV && kvClient) {
    try {
      // Handle different Redis client types
      let data
      
      // Direct Redis connection (redis package)
      if (kvClient.isOpen !== undefined || kvClient.isReady !== undefined) {
        // redis package client
        const rawData = await kvClient.get(QUOTES_KEY)
        data = rawData ? JSON.parse(rawData) : null
      } 
      // REST API clients (@upstash/redis or @vercel/kv)
      else if (typeof kvClient.get === 'function') {
        data = await kvClient.get(QUOTES_KEY)
      } else {
        data = await kvClient.get(QUOTES_KEY)
      }
      
      if (data) {
        console.log('✅ Data retrieved from KV')
        return data
      }
      
      // Initialize with sample data if empty
      console.log('📝 Initializing KV with sample data...')
      const initialData = {
        quotes: sampleQuotes,
        lastUpdate: new Date().toISOString(),
        updateSchedule: {
          loveQuotes: { lastUpdate: null, count: 0 },
          attitudeStatus: { lastUpdate: null, count: 0 },
          shayari: { lastUpdate: null, count: 0 },
          motivationQuotes: { lastUpdate: null, count: 0 },
          festivalWishes: { lastUpdate: null, count: 0 },
        }
      }
      
      // Save initial data
      if (kvClient.isOpen !== undefined || kvClient.isReady !== undefined) {
        // redis package - need to stringify
        await kvClient.set(QUOTES_KEY, JSON.stringify(initialData))
      } else if (typeof kvClient.set === 'function') {
        await kvClient.set(QUOTES_KEY, initialData)
      } else {
        await kvClient.set(QUOTES_KEY, initialData)
      }
      
      console.log('✅ Initial data saved to KV')
      return initialData
    } catch (error) {
      console.error('❌ Error reading from KV:', error)
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        kvClientType: kvClient?.constructor?.name
      })
      // Don't fallback to file system on Vercel
      if (process.env.VERCEL || process.env.VERCEL_ENV) {
        throw new Error(`KV read error: ${error.message}`)
      }
    }
  }

  // File system fallback (local development only)
  try {
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory, { recursive: true })
    }
    
    if (!fs.existsSync(quotesFile)) {
      const initialData = {
        quotes: sampleQuotes,
        lastUpdate: new Date().toISOString(),
        updateSchedule: {
          loveQuotes: { lastUpdate: null, count: 0 },
          attitudeStatus: { lastUpdate: null, count: 0 },
          shayari: { lastUpdate: null, count: 0 },
          motivationQuotes: { lastUpdate: null, count: 0 },
          festivalWishes: { lastUpdate: null, count: 0 },
        }
      }
      fs.writeFileSync(quotesFile, JSON.stringify(initialData, null, 2))
      return initialData
    }
    
    const fileContents = fs.readFileSync(quotesFile, 'utf8')
    const data = JSON.parse(fileContents)
    
    // Initialize if empty
    if (!data.quotes || data.quotes.length === 0) {
      data.quotes = sampleQuotes
      data.lastUpdate = new Date().toISOString()
      fs.writeFileSync(quotesFile, JSON.stringify(data, null, 2))
    }
    
    return data
  } catch (error) {
    console.error('Error reading quotes file:', error)
    return { 
      quotes: sampleQuotes, 
      lastUpdate: new Date().toISOString(), 
      updateSchedule: {} 
    }
  }
}

// Save data to KV or file system
async function saveData(data) {
  // Initialize KV if not already done
  if (!kvInitialized) {
    await initKV()
  }
  
  if (useKV && kvClient) {
    try {
      console.log('💾 Saving data to KV...')
      
      // Handle different Redis client types
      if (kvClient.isOpen !== undefined || kvClient.isReady !== undefined) {
        // redis package client - need to stringify
        await kvClient.set(QUOTES_KEY, JSON.stringify(data))
      } else if (typeof kvClient.set === 'function') {
        // REST API clients (@upstash/redis or @vercel/kv)
        await kvClient.set(QUOTES_KEY, data)
      } else {
        await kvClient.set(QUOTES_KEY, data)
      }
      
      console.log('✅ Data saved to KV successfully')
      return true
    } catch (error) {
      console.error('❌ Error saving to KV:', error)
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        kvClientType: kvClient?.constructor?.name,
        hasSet: typeof kvClient?.set === 'function'
      })
      throw new Error(`Failed to save to KV: ${error.message}`)
    }
  }

  // File system fallback (local development only)
  // On Vercel, this will fail silently, so we should throw an error
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    const errorMsg = 'Redis/KV not configured! Please set up Redis in your Vercel dashboard. ' +
      `REDIS_URL: ${process.env.REDIS_URL ? 'Set' : 'Not set'}, ` +
      `KV_REST_API_URL: ${process.env.KV_REST_API_URL ? 'Set' : 'Not set'}, ` +
      `KV_REST_API_TOKEN: ${process.env.KV_REST_API_TOKEN ? 'Set' : 'Not set'}. ` +
      `See VERCEL_KV_SETUP.md for instructions.`
    console.error('❌', errorMsg)
    throw new Error(errorMsg)
  }

  try {
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory, { recursive: true })
    }
    fs.writeFileSync(quotesFile, JSON.stringify(data, null, 2))
    console.log('✅ Data saved to file system successfully')
    return true
  } catch (error) {
    console.error('❌ Error saving quotes file:', error)
    throw new Error(`Failed to save to file system: ${error.message}`)
  }
}

// Category slugs mapping
const categorySlugs = {
  'Love Quotes': 'love-quotes',
  'Attitude Status': 'attitude-status',
  'Shayari': 'shayari',
  'Motivation Quotes': 'motivation-quotes',
  'Festival Wishes': 'festival-wishes',
}

// Get all quotes (async)
export async function getAllQuotes() {
  const data = await getData()
  return data.quotes || []
}

// Get all quotes (sync - for static generation)
export function getAllQuotesSync() {
  try {
    if (fs.existsSync(quotesFile)) {
      const fileContents = fs.readFileSync(quotesFile, 'utf8')
      const data = JSON.parse(fileContents)
      return data.quotes || []
    }
  } catch (error) {
    console.error('Error reading quotes file (sync):', error)
  }
  return []
}

// Get quote by ID
export async function getQuoteById(id) {
  const quotes = await getAllQuotes()
  return quotes.find(quote => quote.id === parseInt(id))
}

// Get quote by ID (sync)
export function getQuoteByIdSync(id) {
  const quotes = getAllQuotesSync()
  return quotes.find(quote => quote.id === parseInt(id))
}

// Get all categories
export async function getAllCategories() {
  const quotes = await getAllQuotes()
  return buildCategories(quotes)
}

// Get all categories (sync)
export function getAllCategoriesSync() {
  const quotes = getAllQuotesSync()
  return buildCategories(quotes)
}

function buildCategories(quotes) {
  const categoriesMap = {}
  
  quotes.forEach(quote => {
    if (!categoriesMap[quote.category]) {
      categoriesMap[quote.category] = {
        name: quote.category,
        slug: categorySlugs[quote.category] || quote.category.toLowerCase().replace(/\s+/g, '-'),
        quotes: [],
        description: getCategoryDescription(quote.category),
        keywords: getCategoryKeywords(quote.category),
      }
    }
    categoriesMap[quote.category].quotes.push(quote)
  })
  
  return Object.values(categoriesMap)
}

// Get category by slug
export async function getCategoryBySlug(slug) {
  const categories = await getAllCategories()
  return categories.find(cat => cat.slug === slug)
}

// Get category by slug (sync)
export function getCategoryBySlugSync(slug) {
  const categories = getAllCategoriesSync()
  return categories.find(cat => cat.slug === slug)
}

// Get category description
function getCategoryDescription(category) {
  const descriptions = {
    'Love Quotes': 'Beautiful love quotes to express your feelings and emotions.',
    'Attitude Status': 'Cool attitude status messages to show your confidence.',
    'Shayari': 'Heart-touching shayari in Hindi and Urdu to express emotions.',
    'Motivation Quotes': 'Inspiring motivation quotes to boost your confidence and achieve success.',
    'Festival Wishes': 'Festival wishes and greetings for all occasions.',
  }
  return descriptions[category] || `Explore our collection of ${category.toLowerCase()}.`
}

// Get category keywords
function getCategoryKeywords(category) {
  const keywords = {
    'Love Quotes': 'love quotes, romantic quotes, relationship quotes, heart touching quotes',
    'Attitude Status': 'attitude status, cool status, attitude quotes, swag status',
    'Shayari': 'shayari, hindi shayari, urdu shayari, love shayari, sad shayari',
    'Motivation Quotes': 'motivation quotes, inspirational quotes, success quotes, life quotes',
    'Festival Wishes': 'festival wishes, festival greetings, diwali wishes, holi wishes, new year wishes',
  }
  return keywords[category] || category.toLowerCase()
}

// Add new quote
export async function addQuote(quote) {
  const data = await getData()
  const newId = data.quotes.length > 0 
    ? Math.max(...data.quotes.map(q => q.id)) + 1 
    : 1
  
  const newQuote = {
    id: newId,
    ...quote,
    createdAt: new Date().toISOString(),
  }
  
  data.quotes.push(newQuote)
  data.lastUpdate = new Date().toISOString()
  await saveData(data)
  return newQuote
}

// Add multiple quotes
export async function addQuotes(quotes) {
  try {
    const data = await getData()
    const maxId = data.quotes.length > 0 
      ? Math.max(...data.quotes.map(q => q.id)) 
      : 0
    
    const newQuotes = quotes.map((quote, index) => ({
      id: maxId + index + 1,
      ...quote,
      createdAt: new Date().toISOString(),
    }))
    
    data.quotes.push(...newQuotes)
    data.lastUpdate = new Date().toISOString()
    
    const saved = await saveData(data)
    if (!saved) {
      throw new Error('Failed to save quotes to storage')
    }
    
    console.log(`✅ Successfully added ${newQuotes.length} quotes`)
    return newQuotes
  } catch (error) {
    console.error('❌ Error in addQuotes:', error)
    throw error
  }
}

// Update schedule
export async function updateSchedule(category, count) {
  const data = await getData()
  if (!data.updateSchedule) {
    data.updateSchedule = {}
  }
  
  const categoryKey = category.toLowerCase().replace(/\s+/g, '')
  data.updateSchedule[categoryKey] = {
    lastUpdate: new Date().toISOString(),
    count: count,
  }
  
  await saveData(data)
}

