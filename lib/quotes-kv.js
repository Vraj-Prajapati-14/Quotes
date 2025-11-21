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
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      // Dynamic import for ES modules
      const kvModule = await import('@vercel/kv')
      kvClient = kvModule.kv
      useKV = true
      console.log('✅ Using Vercel KV for storage')
      return true
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
      const data = await kvClient.get(QUOTES_KEY)
      if (data) {
        return data
      }
      // Initialize with sample data if empty
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
      await kvClient.set(QUOTES_KEY, initialData)
      return initialData
    } catch (error) {
      console.error('Error reading from KV:', error)
      // Fallback to file system
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
      await kvClient.set(QUOTES_KEY, data)
      return true
    } catch (error) {
      console.error('Error saving to KV:', error)
      return false
    }
  }

  // File system fallback (local development only)
  try {
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory, { recursive: true })
    }
    fs.writeFileSync(quotesFile, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error saving quotes file:', error)
    return false
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
  await saveData(data)
  return newQuotes
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

