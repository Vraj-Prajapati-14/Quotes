import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data')
const quotesFile = path.join(dataDirectory, 'quotes.json')

// Ensure data directory exists
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true })
}

// Initialize quotes data if file doesn't exist
if (!fs.existsSync(quotesFile)) {
  const initialData = {
    quotes: [],
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
}

// Sample quotes data for initialization
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

// Initialize with sample data if empty
function initializeData() {
  const data = getData()
  if (data.quotes.length === 0) {
    data.quotes = sampleQuotes
    saveData(data)
  }
}

// Get data from file
function getData() {
  try {
    const fileContents = fs.readFileSync(quotesFile, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading quotes file:', error)
    return { quotes: [], lastUpdate: new Date().toISOString(), updateSchedule: {} }
  }
}

// Save data to file
function saveData(data) {
  try {
    fs.writeFileSync(quotesFile, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error saving quotes file:', error)
  }
}

// Initialize on module load
initializeData()

// Category slugs mapping
const categorySlugs = {
  'Love Quotes': 'love-quotes',
  'Attitude Status': 'attitude-status',
  'Shayari': 'shayari',
  'Motivation Quotes': 'motivation-quotes',
  'Festival Wishes': 'festival-wishes',
}

// Get all quotes
export function getAllQuotes() {
  const data = getData()
  return data.quotes || []
}

// Get quote by ID
export function getQuoteById(id) {
  const quotes = getAllQuotes()
  return quotes.find(quote => quote.id === parseInt(id))
}

// Get all categories
export function getAllCategories() {
  const quotes = getAllQuotes()
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
export function getCategoryBySlug(slug) {
  const categories = getAllCategories()
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
export function addQuote(quote) {
  const data = getData()
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
  saveData(data)
  return newQuote
}

// Add multiple quotes (for auto-update)
export function addQuotes(quotes) {
  const data = getData()
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
  saveData(data)
  return newQuotes
}

// Get update schedule
export function getUpdateSchedule() {
  const data = getData()
  return data.updateSchedule || {}
}

// Update schedule
export function updateSchedule(category, count) {
  const data = getData()
  if (!data.updateSchedule) {
    data.updateSchedule = {}
  }
  
  const categoryKey = category.toLowerCase().replace(/\s+/g, '')
  data.updateSchedule[categoryKey] = {
    lastUpdate: new Date().toISOString(),
    count: count,
  }
  
  saveData(data)
}

