import { addQuotes, updateSchedule } from './quotes'
import { quotePools } from './quotePools'

// Get random quotes from pool
function getRandomQuotes(category, count = 2) {
  const pool = quotePools[category] || []
  const shuffled = [...pool].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count).map(text => ({
    text,
    category,
    author: 'Unknown',
  }))
}

// Auto-update function - adds 2 quotes per category
export function performAutoUpdate() {
  const categories = ['Love Quotes', 'Attitude Status', 'Shayari', 'Motivation Quotes', 'Festival Wishes']
  let totalAdded = 0
  
  categories.forEach(category => {
    try {
      const newQuotes = getRandomQuotes(category, 2)
      if (newQuotes.length > 0) {
        addQuotes(newQuotes)
        updateSchedule(category, newQuotes.length)
        totalAdded += newQuotes.length
        console.log(`✅ Added ${newQuotes.length} new quotes to ${category}`)
      }
    } catch (error) {
      console.error(`❌ Error updating ${category}:`, error)
    }
  })
  
  console.log(`🔄 Auto-update completed: ${totalAdded} quotes added at ${new Date().toISOString()}`)
  return totalAdded
}

// Manual update function (can be called via API)
export function runManualUpdate() {
  console.log('🔄 Running manual update...')
  return performAutoUpdate()
}

