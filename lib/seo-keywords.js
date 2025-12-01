// Comprehensive SEO Keywords for Quotes, Shayari & Status Website
// 100+ keywords optimized for search engine ranking

export const SEO_KEYWORDS = {
  // Core Keywords (High Priority)
  core: [
    'quotes', 'best quotes', 'top quotes', 'famous quotes', 'daily quotes', 
    'quote of the day', 'free quotes', 'download quotes', 'quotes images', 
    'status', 'shayari', 'whatsapp status', 'facebook status', 'instagram status',
    'latest quotes', 'new quotes', 'trending quotes', 'popular quotes',
    'emotional quotes', 'heart touching quotes', 'beautiful quotes'
  ],

  // Modifiers (High Search Volume)
  modifiers: [
    'free', 'best', 'latest', 'new', 'top', 'trending', 'popular', 
    'amazing', 'beautiful', 'emotional', 'heart touching', 'inspiring',
    'motivational', 'powerful', 'deep', 'meaningful', 'famous', 'viral',
    'unique', 'special', 'awesome', 'wonderful', 'fantastic', 'excellent'
  ],

  // Love & Relationships
  love: [
    'love quotes', 'romantic quotes', 'relationship quotes', 'couple quotes',
    'love status', 'romantic status', 'breakup quotes', 'sad love quotes',
    'husband wife quotes', 'boyfriend girlfriend quotes', 'crush quotes',
    'one sided love quotes', 'true love quotes', 'pure love quotes',
    'love shayari', 'romantic shayari', 'love messages', 'romantic messages',
    'propose quotes', 'marriage quotes', 'wedding quotes', 'anniversary quotes'
  ],

  // Attitude & Personality
  attitude: [
    'attitude quotes', 'attitude status', 'cool status', 'swag quotes',
    'boys attitude', 'girls attitude', 'killer attitude', 'royal attitude',
    'savage quotes', 'personality quotes', 'bad boy status', 'bad girl status',
    'boss attitude', 'king attitude', 'queen attitude', 'attitude shayari',
    'cool quotes', 'swag status', 'attitude caption', 'attitude images'
  ],

  // Motivation & Success
  motivation: [
    'motivational quotes', 'inspirational quotes', 'success quotes',
    'hard work quotes', 'dream quotes', 'goal quotes', 'confidence quotes',
    'leadership quotes', 'business quotes', 'study motivation',
    'fitness motivation', 'morning motivation', 'life motivation',
    'work motivation', 'career quotes', 'achievement quotes', 'winner quotes'
  ],

  // Emotions
  emotions: [
    'sad quotes', 'emotional quotes', 'happy quotes', 'smile quotes',
    'angry quotes', 'lonely quotes', 'depression quotes', 'heart touching quotes',
    'feeling quotes', 'mood quotes', 'pain quotes', 'tears quotes',
    'crying quotes', 'broken heart quotes', 'missing quotes', 'hurt quotes',
    'sad shayari', 'emotional shayari', 'heart broken shayari'
  ],

  // Life & Wisdom
  life: [
    'life quotes', 'wisdom quotes', 'deep quotes', 'meaningful quotes',
    'reality quotes', 'life lessons', 'truth of life quotes', 'karma quotes',
    'spiritual quotes', 'positive quotes', 'life struggle quotes',
    'philosophy quotes', 'thoughtful quotes', 'wise quotes', 'life status'
  ],

  // Occasions & Festivals
  occasions: [
    'birthday wishes', 'anniversary quotes', 'wedding wishes',
    'good morning quotes', 'good night quotes', 'festival wishes',
    'diwali quotes', 'new year quotes', 'christmas quotes', 'eid mubarak',
    'raksha bandhan quotes', 'mothers day quotes', 'fathers day quotes',
    'valentine day quotes', 'holi wishes', 'dussehra quotes', 'janmashtami quotes'
  ],

  // Friendship
  friendship: [
    'friendship quotes', 'best friend quotes', 'dosti shayari',
    'friends forever quotes', 'funny friendship quotes', 'true friend quotes',
    'friend status', 'brother quotes', 'sister quotes', 'squad quotes'
  ],

  // Shayari Specific
  shayari: [
    'hindi shayari', 'urdu shayari', 'love shayari', 'sad shayari',
    'dosti shayari', 'romantic shayari', 'attitude shayari', '2 line shayari',
    'sher o shayari', 'ghazal', 'funny shayari', 'morning shayari',
    'night shayari', 'heart touching shayari', 'emotional shayari',
    'best shayari', 'latest shayari', 'new shayari', 'famous shayari'
  ],

  // Language Specific
  languages: [
    'hindi quotes', 'english quotes', 'marathi quotes', 'gujarati quotes',
    'punjabi status', 'tamil quotes', 'telugu quotes', 'bengali quotes',
    'hindi status', 'english status', 'urdu quotes', 'hindi shayari',
    'urdu shayari', 'punjabi quotes', 'marathi shayari'
  ],

  // Social Media Specific
  social: [
    'whatsapp status', 'facebook status', 'instagram status', 'twitter status',
    'whatsapp quotes', 'instagram quotes', 'facebook quotes', 'share quotes',
    'status for whatsapp', 'caption for instagram', 'dp quotes', 'bio quotes',
    'story quotes', 'reels quotes', 'whatsapp dp status'
  ],

  // Time Based
  time: [
    'morning quotes', 'good morning quotes', 'morning motivation',
    'night quotes', 'good night quotes', 'evening quotes', 'afternoon quotes',
    'daily quotes', 'weekly quotes', 'monthly quotes', 'today quotes'
  ],

  // Gender Specific
  gender: [
    'boys quotes', 'girls quotes', 'boys status', 'girls status',
    'boys attitude', 'girls attitude', 'boys shayari', 'girls shayari',
    'men quotes', 'women quotes', 'ladies quotes', 'gentleman quotes'
  ],

  // Age Specific
  age: [
    'teenage quotes', 'youth quotes', 'young quotes', 'adult quotes',
    'teenage status', 'youth status', 'college quotes', 'student quotes'
  ],

  // Quality & Type
  quality: [
    'short quotes', 'long quotes', 'one line quotes', 'two line quotes',
    'deep quotes', 'funny quotes', 'sarcastic quotes', 'witty quotes',
    'philosophical quotes', 'spiritual quotes', 'religious quotes'
  ]
}

// Generate all keyword combinations
export function getAllKeywords() {
  const allKeywords = []
  
  // Add all categories
  Object.values(SEO_KEYWORDS).forEach(category => {
    if (Array.isArray(category)) {
      allKeywords.push(...category)
    }
  })
  
  // Generate modifier combinations with core keywords
  const modifiers = SEO_KEYWORDS.modifiers
  const core = SEO_KEYWORDS.core
  
  modifiers.forEach(modifier => {
    core.forEach(keyword => {
      if (!keyword.includes(modifier)) {
        allKeywords.push(`${modifier} ${keyword}`)
      }
    })
  })
  
  // Remove duplicates and return
  return [...new Set(allKeywords)]
}

// Get keywords for specific category
export function getCategoryKeywords(categoryName) {
  const categoryLower = categoryName.toLowerCase()
  const keywords = []
  
  // Add category-specific keywords
  if (categoryLower.includes('love')) {
    keywords.push(...SEO_KEYWORDS.love)
  }
  if (categoryLower.includes('attitude')) {
    keywords.push(...SEO_KEYWORDS.attitude)
  }
  if (categoryLower.includes('motivation')) {
    keywords.push(...SEO_KEYWORDS.motivation)
  }
  if (categoryLower.includes('shayari')) {
    keywords.push(...SEO_KEYWORDS.shayari)
  }
  if (categoryLower.includes('festival')) {
    keywords.push(...SEO_KEYWORDS.occasions)
  }
  
  // Add modifiers
  keywords.push(...SEO_KEYWORDS.modifiers.map(m => `${m} ${categoryName.toLowerCase()}`))
  
  // Add core
  keywords.push(...SEO_KEYWORDS.core)
  
  return [...new Set(keywords)].join(', ')
}

// Get all keywords as comma-separated string
export function getAllKeywordsString() {
  return getAllKeywords().join(', ')
}

// Get meta keywords for homepage
export function getHomePageKeywords() {
  const keywords = [
    ...SEO_KEYWORDS.core,
    ...SEO_KEYWORDS.modifiers.map(m => `${m} quotes`),
    ...SEO_KEYWORDS.love.slice(0, 10),
    ...SEO_KEYWORDS.attitude.slice(0, 10),
    ...SEO_KEYWORDS.motivation.slice(0, 10),
    ...SEO_KEYWORDS.shayari.slice(0, 10),
    ...SEO_KEYWORDS.social,
    'quotes collection', 'quotes website', 'quotes app', 'free quotes online',
    'best quotes site', 'daily quotes website', 'quotes and shayari',
    'status messages', 'whatsapp status collection', 'instagram quotes'
  ]
  
  return [...new Set(keywords)].join(', ')
}

